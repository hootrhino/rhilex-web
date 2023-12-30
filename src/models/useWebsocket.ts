import { useWebSocket } from 'ahooks';
import { useEffect, useMemo, useRef, useState } from 'react';

export type LogItem = {
  time: number;
  msg: string;
  ts: number;
  [key: string]: any;
};

type TopicData = {
  ruleLog: string[];
  ruleTest: string[];
  appConsole: string[];
  goodsConsole: string[];
  pingLog: string[];
  scanLog: string[];
};

const useWebsocket = () => {
  const messageHistory = useRef<string[]>([]);
  const [sockUrl, setUrl] = useState<string>('');
  const [topicData, setTopicData] = useState<TopicData>({
    ruleLog: [],
    ruleTest: [],
    appConsole: [],
    goodsConsole: [],
    pingLog: [],
    scanLog: [],
  });

  const { sendMessage, readyState, latestMessage } = useWebSocket(sockUrl, {
    reconnectInterval: 1000,
  });

  const getLogData = (dataSource: string[], topic: string, maxLen = 50) => {
    const newData = JSON.parse(latestMessage?.data);
    let filterData = dataSource;

    if (newData.topic.includes(topic)) {
      filterData = dataSource.concat(latestMessage?.data);
    }
    if (filterData?.length > maxLen) {
      filterData.shift();
    }
    return filterData;
  };

  useMemo(() => {
    if (latestMessage?.data && latestMessage?.data !== 'Connected') {
      if (JSON.parse(latestMessage?.data)?.topic) {
        const { ruleLog, ruleTest, appConsole, goodsConsole, pingLog, scanLog } = topicData;
        // TODO getLogData(ruleTest, 'rule/test/', 10),

        const newTopicData = {
          ruleLog: getLogData(ruleLog, 'rule/log/'),
          ruleTest: getLogData(ruleTest, 'rule/log/', 10),
          appConsole: getLogData(appConsole, 'app/console/'),
          goodsConsole: getLogData(goodsConsole, 'goods/console/'),
          pingLog: getLogData(pingLog, 'plugin/ICMPSenderPing/'),
          scanLog: getLogData(scanLog, 'plugin/ModbusScanner/'),
        };

        setTopicData(newTopicData);
      }

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
    // setUrl(`ws://106.15.225.172:2580/ws`);
  }, [window?.location?.host]);

  return {
    latestMessage,
    messageHistory,
    topicData,
  };
};

export default useWebsocket;
