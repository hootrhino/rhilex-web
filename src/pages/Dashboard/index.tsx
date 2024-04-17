import PageContainer from '@/components/PageContainer';
import ProLog from '@/components/ProLog';
import { Col, Row } from 'antd';
import { useModel } from 'umi';
import DeviceList from './Device';
import SourceCountCard from './SourceCountCard';
import ProStatisticCard from './StatisticCard';

const Dashboard = () => {
  const { runningLogs, setLogs } = useModel('useWebsocket');

  return (
    <PageContainer className="overflow-x-hidden">
      <SourceCountCard />
      <Row gutter={16}>
        <Col lg={{ span: 12 }} md={{ span: 24 }}>
          <DeviceList />
        </Col>
        <Col lg={{ span: 12 }} md={{ span: 24 }}>
          <ProStatisticCard />
        </Col>
      </Row>
      <ProLog
        extra
        className="mt-6"
        title="运行日志"
        dataSource={runningLogs}
        handleOnReset={() => setLogs([])}
      />
    </PageContainer>
  );
};

export default Dashboard;
