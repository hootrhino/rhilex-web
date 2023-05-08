import { useWebSocket } from 'ahooks';
import orderBy from 'lodash/orderBy';
import { useEffect,useState } from 'react';

const useWebsocket = () => {
  const [logs, setLogs] = useState<Record<string, any>[]>([]);
  const [connected, setConnected] = useState(false);

  const { sendMessage, readyState } = useWebSocket('ws://10.55.23.96:2580/ws', {
    onMessage: ({ data }) => {
      if (data && data !== 'Connected') {
        let newLog = [...logs, JSON.parse(data)];
        newLog = orderBy(newLog, 'time', 'desc');
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
    if (!connected) {
      setTimeout(() => {
        if (readyState === WebSocket.OPEN) {}
        sendMessage?.('WsTerminal');
      }, 2000);
    }
  }, [connected, sendMessage]);
  // useEffect(() => {
  //   let pingInterval: NodeJS.Timeout;

  //   if (!connected) {
  //     const retryInterval = setInterval(() => {
  //       sendMessage?.('WsTerminal');
  //     }, 2000);

  //     pingInterval = setInterval(() => {
  //       sendMessage?.('ping');
  //     }, 30000);

  //     return () => {
  //       clearInterval(retryInterval);
  //       clearInterval(pingInterval);
  //     };
  //   }
  // }, [connected, sendMessage]);

  return { logs };
};

export default useWebsocket;
