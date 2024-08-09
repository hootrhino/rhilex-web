import { ensureArrayLength } from '@/utils/utils';
import { useLocalStorageState, useWebSocket } from 'ahooks';
import { useEffect, useMemo, useState } from 'react';

const useWebsocket = () => {
  const [sockUrl, setUrl] = useState<string>('');
  const [runningLogs, setLogs] = useLocalStorageState<string[]>('running-logs', {
    defaultValue: [],
  });

  const { sendMessage, readyState, latestMessage, disconnect, connect } = useWebSocket(sockUrl, {
    reconnectInterval: 1000,
  });

  useMemo(() => {
    if (latestMessage?.data && latestMessage?.data !== 'Connected') {
      const newLogs = [...(runningLogs || [])];
      newLogs.push(latestMessage?.data);
      ensureArrayLength(newLogs);
      setLogs(newLogs);
    }
  }, [latestMessage]);

  useEffect(() => {
    if (readyState === WebSocket.OPEN && sockUrl) {
      const timer = setTimeout(() => {
        sendMessage?.('WsTerminal');
      }, 600);

      return () => clearTimeout(timer);
    }
    return;
  }, [sendMessage, readyState, sockUrl]);

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
  };
};

export default useWebsocket;
