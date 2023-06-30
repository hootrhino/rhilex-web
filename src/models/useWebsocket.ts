import { useWebSocket } from 'ahooks';
import orderBy from 'lodash/orderBy';
import slice from 'lodash/slice';
import { useEffect, useState } from 'react';

export type LogItem = {
  level: string;
  msg: string;
  [key: string]: any;
};

const useWebsocket = () => {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [connected, setConnected] = useState(false);
  const [sockUrl, setUrl] = useState<string>('');

  const { sendMessage, readyState, connect } = useWebSocket(sockUrl, {
    manual: true,
    onMessage: ({ data }) => {
      if (data && data !== 'Connected') {
        let newLog = [...logs, JSON.parse(data)];
        newLog = orderBy(newLog, 'time', 'desc');
        newLog = slice(newLog, 0, 100);
        setLogs(newLog);
      }
    },
    onClose: () => {
      setConnected(false);
    },
    onOpen: () => {
      setConnected(true);
    },
  });

  useEffect(() => {
    if (connected) {
      setTimeout(() => {
        if (readyState === WebSocket.OPEN) {
        }
        sendMessage?.('WsTerminal');
      }, 2000);
    }
  }, [connected, sendMessage]);

  useEffect(() => {
    if (window?.location?.hostname) {
      setUrl(`ws://${window?.location?.hostname}:2580/ws`);
    }
  }, [window?.location?.hostname]);

  useEffect(() => {
    if (sockUrl) {
      connect!();
    }
  }, [sockUrl]);

  return { logs };
};

export default useWebsocket;
