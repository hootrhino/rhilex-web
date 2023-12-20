import { useWebSocket } from 'ahooks';
import { useEffect, useMemo, useRef, useState } from 'react';

export type LogItem = {
  time: number;
  msg: string;
  ts: number;
  [key: string]: any;
};

const useWebsocket = () => {
  const messageHistory = useRef<any[]>([]);
  const [sockUrl, setUrl] = useState<string>('');

  const { sendMessage, readyState, latestMessage } = useWebSocket(sockUrl, {
    reconnectInterval: 1000,
  });

  useMemo(() => {
    if (latestMessage?.data && latestMessage?.data !== 'Connected') {
      messageHistory.current = messageHistory.current.concat(latestMessage?.data);
      if (messageHistory.current?.length > 50) {
        messageHistory.current.shift();
      }
    }
  }, [latestMessage]);

  useEffect(() => {
    if (readyState === WebSocket.OPEN && sockUrl) {
      setTimeout(() => {
        sendMessage?.('WsTerminal');
      }, 600);
    }
  }, [sendMessage, readyState, sockUrl]);

  useEffect(() => {
    if (window?.location?.host) {
      setUrl(`ws://${window?.location?.host}/ws`);
    }
    // setUrl(`ws://106.15.225.172:2580/ws`)
  }, [window?.location?.host]);

  return { latestMessage, messageHistory };
};

export default useWebsocket;
