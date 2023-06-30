import { useWebSocket } from 'ahooks';
import { FilterValue } from 'antd/es/table/interface';
import orderBy from 'lodash/orderBy';
import slice from 'lodash/slice';
import { useEffect, useState } from 'react';

const useWebsocket = () => {
  const [logs, setLogs] = useState<Record<string, any>[]>([]);
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

  const handleOnsearch = (keyword?: string, filters?: Record<string, FilterValue | null>) => {
    let filteredLogs = logs;
    if (keyword) {
      filteredLogs = logs.filter((log) => {
        return log.msg.includes(keyword);
      });
    }
    if (filters) {
      filteredLogs = logs.filter((log) => filters?.level?.includes(log?.level));
    }
    setLogs(filteredLogs);
  };

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

  return { logs, handleOnsearch };
};

export default useWebsocket;
