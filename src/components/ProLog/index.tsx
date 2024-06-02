import { cn } from '@/utils/utils';
import {
  DeleteOutlined,
  DownloadOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import type { ProCardTabsProps } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { Button, Space } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

type cardProps = Pick<ProCardTabsProps, 'cardProps'>;

type ProLogProps = Omit<cardProps, 'extra'> &
  React.HTMLAttributes<HTMLDivElement> & {
    dataSource: string[] | undefined;
    topic?: string;
    extra?: boolean;
    hidePadding?: boolean;
    headStyle?: React.CSSProperties;
    handleOnReset?: () => void;
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

const ProLog = ({
  dataSource = [],
  extra = false,
  topic = 'all',
  hidePadding = false,
  handleOnReset,
  className,
  title,
  ...props
}: ProLogProps) => {
  const { disconnect, connect } = useModel('useWebsocket');
  const logRef = useRef<any>(null);
  const { formatMessage } = useIntl();
  const [play, setPlay] = useState<boolean>(true);

  const handleOutput = (inputValue: Record<string, any>) => {
    const time = dayjs(inputValue.time).format('YYYY-MM-DD HH:mm:ss');
    const level = inputValue.level;
    const msg = inputValue.msg;

    const timeColor = '\u001b[38;2;56;158;13m';
    const msgColor = '\u001b[37m';
    const levelColor = getAnsiColor(level);

    return `${timeColor}${time} ${levelColor}[${level}] ${msgColor}${msg}\r\n`;
  };

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

  useEffect(() => {
    dataSource?.forEach((msg) => {
      const parsedItem = msg && JSON.parse(msg);
      const output = handleOutput(parsedItem);
      logRef.current.write(output);
    });
  }, [dataSource, topic]);

  return (
    <ProCard
      className={cn(className, 'overflow-y-auto')}
      title={<span className="text-[14px]">{title}</span>}
      bodyStyle={hidePadding ? { paddingBlock: 0, paddingInline: 0 } : {}}
      extra={
        extra ? (
          <Space>
            <Button
              key="download"
              type="primary"
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => (window.location.href = '/api/v1/backup/runningLog')}
            >
              {formatMessage({ id: 'dashboard.button.download' })}
            </Button>
            <Button
              ghost
              key="stop"
              type="primary"
              icon={play ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
              size="small"
              onClick={() => {
                if (play) {
                  disconnect();
                } else {
                  connect();
                }
                setPlay(!play);
              }}
            >
              {play
                ? formatMessage({ id: 'button.pause' })
                : formatMessage({ id: 'button.resume' })}
            </Button>
            <Button
              danger
              key="reload"
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => {
                handleOnReset?.();
                logRef.current.clear();
              }}
            >
              {formatMessage({ id: 'dashboard.button.clear' })}
            </Button>
          </Space>
        ) : null
      }
      {...props}
    >
      <div id="terminal" ref={logRef} style={{ width: '100%', height: '100%' }} />
    </ProCard>
  );
};

export default ProLog;
