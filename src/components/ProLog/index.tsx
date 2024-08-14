import { useModel } from '@umijs/max';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import dayjs from 'dayjs';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';

export type LogRef = {
  clearLog: () => void;
};

type ProLogProps = React.HTMLAttributes<HTMLDivElement> & {
  topic?: string;
};

// text color 30-37
export const getAnsiColor = (level: string) => {
  const colorMap = {
    fatal: '\u001b[38;2;255;77;79m',
    error: '\u001b[38;2;255;77;79m',
    warn: '\u001b[38;2;250;173;20m',
    warning: '\u001b[38;2;250;173;20m',
    debug: '\u001b[38;2;89;156;211m',
    info: '\u001b[38;2;182;206;171m',
  };

  return colorMap[level] || '\u001b[37m';
};

const ProLog = forwardRef(({ topic = 'all' }: ProLogProps, ref) => {
  const { latestLog } = useModel('useWebsocket');
  const logRef = useRef<any>(null);

  const handleOutput = (inputValue: Record<string, any>) => {
    const time = dayjs(inputValue.time).format('YYYY-MM-DD HH:mm:ss');
    const level = inputValue.level;
    const msg = inputValue.msg;

    const timeColor = '\u001b[38;2;56;158;13m';
    const msgColor = '\u001b[37m';
    const levelColor = getAnsiColor(level);

    const output = `${timeColor}${time} ${levelColor}[${level}] ${msgColor}${msg}\r\n`;
    logRef.current?.write(output);
  };

  // 清空编辑器
  const handleOnClear = () => {
    logRef.current.clear();
  };

  useMemo(() => {
    if (latestLog) {
      const parsedItem = latestLog && JSON.parse(latestLog);

      if (!parsedItem) return;

      if (topic === 'all') {
        handleOutput(parsedItem);
      } else {
        if (parsedItem?.topic === topic) {
          handleOutput(parsedItem);
        }
      }
    }
  }, [latestLog, topic]);

  useEffect(() => {
    const term = new Terminal({
      disableStdin: true, // 禁止输入
      cursorStyle: 'underline',
      cursorBlink: true,
      cursorInactiveStyle: 'underline',
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    const terminalContainer = document.getElementById('terminal');
    if (terminalContainer) {
      term.open(terminalContainer);
      fitAddon.fit();
    }

    window.addEventListener('resize', () => fitAddon.fit());
    logRef.current = term;
  }, []);

  useImperativeHandle(ref, () => ({
    clearLog: handleOnClear,
  }));

  return <div id="terminal" ref={logRef} />;
});

export default ProLog;
