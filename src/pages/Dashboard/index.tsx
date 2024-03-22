import { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';

import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';

import PageContainer from '@/components/PageContainer';
import { modal } from '@/components/PopupHack';
import { getOsOsRelease } from '@/services/rulex/xitongshuju';
import {
  DownloadOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { useLocalStorageState } from 'ahooks';
import { Button, Col, Descriptions, Row, Space } from 'antd';
import HardWareInfoCard from './components/hardWareInfoCard';
import SourceCountCard from './components/SourceCountCard';
import ProStatisticCard from './components/StatisticCard';

const { Divider } = StatisticCard;

const Dashboard = () => {
  const [message, setMessage] = useLocalStorageState<string[]>('running-logs', {
    defaultValue: [],
  });
  const { latestMessage, disconnect, connect } = useModel('useWebsocket');
  const { dataSource } = useModel('useSystem');
  const { version, osUpTime, osArch } = dataSource?.hardWareInfo || {};
  const [responsive, setResponsive] = useState(false);
  const [play, setPlay] = useState<boolean>(true);
  const logRef = useRef<any>(null);

  // 获取系统详情
  const { data: osDetail } = useRequest(() => getOsOsRelease({}));

  // 展示系统详情
  const detailConfig = {
    title: '系统详情',
    width: 700,
    autoFocusButton: null,
    content: (
      <Descriptions
        className="w-[500px]"
        column={1}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 180, marginRight: 15 }}
      >
        {osDetail &&
          Object.keys(osDetail)?.map((item) => (
            <Descriptions.Item label={item} key={item}>
              {osDetail[item]}
            </Descriptions.Item>
          ))}
      </Descriptions>
    ),
  };

  useEffect(() => {
    const term = new Terminal({
      disableStdin: true, // 禁止输入
      cursorStyle: 'underline',
      cursorBlink: true,
      cursorInactiveStyle: 'underline',
    });
    const fitAddon = new FitAddon();
    const terminalContainer = document.getElementById('terminal');
    if (terminalContainer) {
      term.open(terminalContainer);
      term.loadAddon(fitAddon);
      fitAddon.fit();
    }
    window.addEventListener('resize', () => fitAddon.fit());
    logRef.current = term;
  }, []);

  useEffect(() => {
    message?.forEach((msg) => {
      const activeInput = msg && JSON.parse(msg);
      if (activeInput?.level === 'error') {
        logRef.current.write(`\x1b[31m${msg}\x1b[0m\r`);
      }
      logRef.current.write(`${msg}\r`);
    });
  }, [message]);

  useEffect(() => {
    if (latestMessage?.data && latestMessage?.data !== 'Connected') {
      const newMsg = message?.concat(latestMessage?.data);
      setMessage(newMsg?.filter((msg) => msg));
      if (message && message?.length > 50) {
        message.shift();
      }
    }
  }, [latestMessage]);

  return (
    <PageContainer
      className="overflow-x-hidden"
      content={
        <Space split={<Divider type="vertical" className="h-[12px]" />}>
          <span className="text-[#585858] text-[13px]">当前版本 {version}</span>
          <span className="text-[#585858] text-[13px]">运行时长 {osUpTime}</span>
          <span className="text-[#585858] text-[13px]">
            操作系统 {osArch}
            <a className="pl-[5px]" onClick={() => modal.info(detailConfig)}>
              查看详情
            </a>
          </span>
        </Space>
      }
    >
      <RcResizeObserver
        key="resize-observer1"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <Row gutter={16}>
          <Col lg={{ span: 12 }} md={{ span: 24 }}>
            <HardWareInfoCard />
          </Col>
          <Col lg={{ span: 12 }} md={{ span: 24 }}>
            <ProStatisticCard />
          </Col>
        </Row>
      </RcResizeObserver>
      <RcResizeObserver
        key="resize-observer2"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <SourceCountCard responsive={responsive} />
      </RcResizeObserver>
      <ProCard
        className="mt-6"
        title="运行日志"
        extra={
          <Space>
            <Button
              key="download"
              type="primary"
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => (window.location.href = '/api/v1/backup/runningLog')}
            >
              下载日志
            </Button>
            <Button
              ghost
              key="stop"
              type="primary"
              icon={<PauseCircleOutlined />}
              size="small"
              onClick={() => {
                setPlay(false);
                disconnect();
              }}
              disabled={!play}
            >
              停止
            </Button>
            <Button
              ghost
              key="play"
              type="primary"
              icon={<PlayCircleOutlined />}
              size="small"
              disabled={play}
              onClick={() => {
                setPlay(true);
                connect();
              }}
            >
              恢复
            </Button>
            <Button
              key="reload"
              icon={<ReloadOutlined />}
              size="small"
              onClick={() => {
                setMessage([]);
                logRef.current.clear();
              }}
            >
              刷新
            </Button>
          </Space>
        }
      >
        <div id="terminal" ref={logRef} />
      </ProCard>
    </PageContainer>
  );
};

export default Dashboard;
