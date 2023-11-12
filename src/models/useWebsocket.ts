import { useWebSocket } from 'ahooks';
import orderBy from 'lodash/orderBy';
import slice from 'lodash/slice';
import { useEffect, useState } from 'react';

export type LogItem = {
  time: number;
  msg: string;
  [key: string]: any;
};

const useWebsocket = () => {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [currentLog, setLog] = useState<LogItem>();
  const [sockUrl, setUrl] = useState<string>('');

  const { sendMessage, readyState } = useWebSocket(sockUrl, {
    reconnectInterval: 1000,
    onMessage: ({ data }) => {
      let newLog: any = logs;

      if (data && data !== 'Connected') {
        newLog = [...newLog, JSON.parse(data)];
        newLog = orderBy(newLog, 'time', 'desc');
        newLog = slice(newLog, 0, 100);

        setLogs(newLog);
        setLog(JSON.parse(data));
        newLog = null;
      }
    },
  });

  useEffect(() => {
    if (readyState === WebSocket.OPEN) {
      sendMessage?.('WsTerminal');
    }
  }, [sendMessage, readyState, sockUrl]);

  useEffect(() => {
    if (window?.location?.hostname) {
      setUrl(`ws://${window?.location?.host}/ws`);
     // setUrl(`ws://106.15.225.172:2580/ws`)
    }
  }, [window?.location?.hostname]);

  return { logs, currentLog };
};

export default useWebsocket;
