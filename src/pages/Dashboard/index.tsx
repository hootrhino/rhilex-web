import PageContainer from '@/components/PageContainer';
import ProLog from '@/components/ProLog';
import { useModel } from 'umi';
// import { getOsOsRelease } from '@/services/rulex/xitongshuju';
// import { useRequest } from '@umijs/max';
import { Col, Row } from 'antd';
import DeviceList from './components/Device';
import SourceCountCard from './components/SourceCountCard';
import ProStatisticCard from './components/StatisticCard';

const Dashboard = () => {
  //  const { dataSource } = useModel('useSystem');
  // const { version, osUpTime, osArch, product } = dataSource?.hardWareInfo || {};
  // const [responsive, setResponsive] = useState(false);
  const { runningLogs, setLogs } = useModel('useWebsocket');

  // 获取系统详情
  // const { data: osDetail } = useRequest(() => getOsOsRelease({}));

  // 展示系统详情
  // const detailConfig = {
  //   title: '系统详情',
  //   width: 700,
  //   autoFocusButton: null,
  //   content: (
  //     <Descriptions
  //       className="w-[500px]"
  //       column={1}
  //       labelStyle={{ justifyContent: 'flex-end', minWidth: 180, marginRight: 15 }}
  //     >
  //       {osDetail &&
  //         Object.keys(osDetail)?.map((item) => (
  //           <Descriptions.Item label={item} key={item}>
  //             {osDetail[item]}
  //           </Descriptions.Item>
  //         ))}
  //     </Descriptions>
  //   ),
  // };

  return (
    <PageContainer
      className="overflow-x-hidden"
      // content={
      //   <Space split={<StatisticCard.Divider type="vertical" className="h-[12px]" />}>
      //     <span className="text-[#585858] text-[13px]">产品 {product}</span>
      //     <span className="text-[#585858] text-[13px]">当前版本 {version || 'v0.0.0'}</span>
      //     <span className="text-[#585858] text-[13px]">运行时长 {osUpTime}</span>
      //     <span className="text-[#585858] text-[13px]">
      //       操作系统 {osArch}
      //       <a className="pl-[5px]" onClick={() => modal.info(detailConfig)}>
      //         查看详情
      //       </a>
      //     </span>
      //   </Space>
      // }
    >
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
