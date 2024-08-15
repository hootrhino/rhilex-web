import { FitAddon } from '@xterm/addon-fit';
import { WebglAddon } from '@xterm/addon-webgl';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { useWebSocket } from 'ahooks';
import dayjs from 'dayjs';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

export type LogRef = {
  clearLog: () => void;
  startLog: () => void;
  stopLog: () => void;
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
  const [sockUrl, setUrl] = useState<string>('');
  const logRef = useRef<any>(null);

  const { sendMessage, readyState, latestMessage, disconnect, connect } = useWebSocket(sockUrl, {
    reconnectInterval: 1000,
  });

  // 输出日志
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

  // 开始连接 ws
  const handleOnStart = () => {
    connect();
  };

  // 结束连接 ws
  const handleOnStop = () => {
    disconnect();
  };

  // 初始化 Term
  const initialTerm = () => {
    const term = new Terminal({
      disableStdin: true, // 禁止输入
      cursorStyle: 'underline',
      cursorBlink: true,
      cursorInactiveStyle: 'underline',
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(new WebglAddon());

    const terminalContainer = document.getElementById('terminal');
    if (terminalContainer) {
      term.open(terminalContainer);
      fitAddon.fit();
    }

    window.addEventListener('resize', () => fitAddon.fit());
    logRef.current = term;
  };

  useMemo(() => {
    if (latestMessage?.data && latestMessage?.data !== 'Connected') {
      const parsedItem = latestMessage?.data && JSON.parse(latestMessage?.data);

      if (!parsedItem) return;

      if (topic === 'all') {
        handleOutput(parsedItem);
      } else {
        if (parsedItem?.topic === topic) {
          handleOutput(parsedItem);
        }
      }
    }
  }, [latestMessage?.data, topic]);

  useEffect(() => {
    if (readyState === WebSocket.OPEN && sockUrl) {
      const timer = setTimeout(() => {
        sendMessage?.('WsTerminal');
      }, 600);

      return () => clearTimeout(timer);
    }
    return;
  }, [readyState, sockUrl]);

  useEffect(() => {
    const { protocol } = window?.location;
    const prefix = protocol === 'http:' ? 'ws' : 'wss';
    if (window?.location?.host) {
      setUrl(`${prefix}://${window?.location?.host}/${prefix}`);
    }

    // setUrl(`ws://wangwenhai.vicp.io/ws`);
  }, [window?.location]);

  useEffect(() => {
    initialTerm();
  }, []);

  useImperativeHandle(ref, () => ({
    clearLog: handleOnClear,
    startLog: handleOnStart,
    stopLog: handleOnStop,
  }));

  return <div id="terminal" ref={logRef} />;
});

export default ProLog;
