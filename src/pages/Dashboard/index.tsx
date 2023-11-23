import { useState } from 'react';
import { useModel } from 'umi';

import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';

import LogTable from '@/components/LogTable';
import { modal } from '@/components/PopupHack';
import { getOsOsRelease } from '@/services/rulex/xitongshuju';
import { useRequest } from '@umijs/max';
import { Col, Descriptions, Row, Space } from 'antd';
import HardWareInfoCard from './components/hardWareInfoCard';
import SourceCountCard from './components/SourceCountCard';
import ProStatisticCard from './components/StatisticCard';

const { Divider } = StatisticCard;

const Dashboard = () => {
  const { dataSource } = useModel('useSystem');
  const { version, osUpTime, osArch } = dataSource?.hardWareInfo || {};
  const [responsive, setResponsive] = useState(false);

  // 获取系统详情
  const { data: osDetail } = useRequest(() => getOsOsRelease({}), {
    formatResult: (res) => res?.data,
  });

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
      <ProCard className="mt-6">
        <LogTable filters={true} headerTitle="日志列表" />
      </ProCard>
    </PageContainer>
  );
};

export default Dashboard;
