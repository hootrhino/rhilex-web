import PageContainer from '@/components/PageContainer';
import ProLog from '@/components/ProLog';
import { useIntl } from '@umijs/max';
import { Col, Row } from 'antd';
import { useModel } from 'umi';
import DeviceList from './Device';
import SourceCountCard from './SourceCountCard';
import ProStatisticCard from './StatisticCard';

const Dashboard = () => {
  const { runningLogs, setLogs } = useModel('useWebsocket');
  const { formatMessage } = useIntl();

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
        title={formatMessage({ id: 'dashboard.title.log' })}
        dataSource={runningLogs}
        handleOnReset={() => setLogs([])}
      />
    </PageContainer>
  );
};

export default Dashboard;
