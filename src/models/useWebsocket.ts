import { useWebSocket } from 'ahooks';
import { useEffect, useState } from 'react';

const useWebsocket = () => {
  const [sockUrl, setUrl] = useState<string>('');
  const [runningLogs, setLogs] = useState<string[]>([]);
  const [latestLog, setLatestLog] = useState<string>('');

  const { sendMessage, readyState, latestMessage, disconnect, connect } = useWebSocket(sockUrl, {
    reconnectInterval: 1000,
    onMessage(message) {
      if (message?.data && message?.data !== 'Connected') {
        setLatestLog(message.data);
      }
    },
  });

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

  return {
    latestMessage,
    connect,
    disconnect,
    runningLogs,
    setLogs,
    latestLog,
  };
};

export default useWebsocket;
