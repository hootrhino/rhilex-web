import { useEffect, useState } from "react";
import { useWebSocket } from 'ahooks';
import orderBy from "lodash/orderBy";

const useWebsocket = () => {
  const [logs, setLogs] = useState<Record<string, any>[]>([]);

  const { readyState, sendMessage, connect } = useWebSocket('ws://10.55.23.96:2580/ws', {
    onMessage: ({data}) => {
      if (data && data !== 'Connected') {
        let newLog = [...logs, JSON.parse(data)];
        newLog = orderBy(newLog, 'time', 'desc');
        setLogs(newLog);
      }
    },
  });

  useEffect(() => {
    if (readyState === 0) {
      connect?.();
    } else if (readyState === 1) {
      sendMessage?.('WsTerminal');
    } else if (readyState === 3) {
      connect?.();
    }
  }, [readyState, connect, sendMessage]);

  return {logs}
}

export default useWebsocket
