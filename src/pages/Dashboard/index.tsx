import { message } from '@/components/PopupHack';
import ProLog from '@/components/ProLog';
import PageContainer from '@/components/ProPageContainer';
import { getDevicesList } from '@/services/rulex/shebeiguanli';
import { postOsResetInterMetric } from '@/services/rulex/xitongshuju';
import { sum } from '@/utils/redash';
import { cn, IconFont } from '@/utils/utils';
import { ReloadOutlined } from '@ant-design/icons';
import { ProCard, ProList } from '@ant-design/pro-components';
import { history, useIntl, useModel, useRequest } from '@umijs/max';
import { Badge, Button, Col, Row, Space, Statistic } from 'antd';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const { dataSource, run } = useModel('useSystem');
  const { runningLogs, setLogs } = useModel('useWebsocket');
  const { setDeviceConfig } = useModel('useDevice');
  const { formatMessage } = useIntl();
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.Key[]>([]);

  const { inends, outends, rules, plugins, apps, devices } = dataSource?.sourceCount || {};
  const { inSuccess, inFailed, outSuccess, outFailed } = dataSource?.statistic || {};

  const sourceCountData = [
    {
      title: formatMessage({ id: 'dashboard.count.inend' }),
      value: inends,
      key: 'inend',
    },
    {
      title: formatMessage({ id: 'dashboard.count.outend' }),
      value: outends,
      key: 'outend',
    },
    {
      title: formatMessage({ id: 'dashboard.count.rule' }),
      value: rules,
      key: 'rule',
    },
    {
      title: formatMessage({ id: 'dashboard.count.plugin' }),
      value: plugins,
      key: 'plugin',
    },
    {
      title: formatMessage({ id: 'dashboard.count.app' }),
      value: apps,
      key: 'app',
    },
    {
      title: formatMessage({ id: 'dashboard.count.device' }),
      value: devices,
      key: 'device',
    },
    // {
    //   title: formatMessage({ id: 'dashboard.count.extend' }),
    //   value: 0,
    //   key: 'extend',
    // },
  ];

  const statisticData = [
    {
      label: formatMessage({ id: 'dashboard.statistic.inSuccess' }),
      value: inSuccess,
      status: 'success',
      key: 'inSuccess',
    },
    {
      label: formatMessage({ id: 'dashboard.statistic.inFailed' }),
      value: inFailed,
      status: 'error',
      key: 'inFailed',
    },
    {
      label: formatMessage({ id: 'dashboard.statistic.outSuccess' }),
      value: outSuccess,
      status: 'success',
      key: 'outSuccess',
    },
    {
      label: formatMessage({ id: 'dashboard.statistic.outFailed' }),
      value: outFailed,
      status: 'error',
      key: 'outFailed',
    },
  ];

  const { data: deviceData } = useRequest(() => getDevicesList({ current: 1, size: 999 }));

  const { run: reset } = useRequest(() => postOsResetInterMetric(), {
    manual: true,
    onSuccess: () => {
      message.success(formatMessage({ id: 'dashboard.message.reset.success' }));
      run();
    },
  });

  useEffect(() => {
    run();
  }, []);

  return (
    <PageContainer className="overflow-x-hidden">
      <div className="mb-6 flex justify-between">
        {sourceCountData.map(({ key, title, value }) => (
          <div
            key={key}
            className="flex-1 h-[80px] rounded-[10px] odd:bg-[rgba(230,240,255,0.6)] even:bg-[rgba(42,46,54,0.03)] mr-[16px] last-of-type:mr-0"
          >
            <div className="p-[10px]">
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#585858]">{title}</span>
                <IconFont type={`icon-dashboard-${key}`} />
              </div>
              <div className="text-[20px] font-bold mt-[6px]">{value}</div>
            </div>
          </div>
        ))}
      </div>
      <Row gutter={16}>
        <Col lg={{ span: 12 }} md={{ span: 24 }}>
          <ProList
            rowKey="uuid"
            size="small"
            className="dashboard-device-card"
            headerTitle={
              <span className="text-[14px]">{formatMessage({ id: 'dashboard.title.device' })}</span>
            }
            dataSource={deviceData?.records}
            expandable={{
              expandedRowKeys,
              onExpandedRowsChange: setExpandedRowKeys,
              // rowExpandable: ({ description }) => !!description,
            }}
            metas={{
              title: {
                dataIndex: 'name',
                render: (_, { name, uuid }) => (
                  <a
                    onClick={() => {
                      if (!uuid) return;
                      history.push('/device/list');
                      setDeviceConfig({ open: true, uuid });
                    }}
                  >
                    {name}
                  </a>
                ),
              },
              subTitle: {
                dataIndex: 'uuid',
              },
              avatar: {
                render: () => <IconFont type="icon-active-device" />,
              },
              description: {
                render: (_, { description }) => <div className="truncate">{description}</div>,
              },
              actions: {
                render: (_, { state }) => (
                  <Badge
                    status={state === 0 ? 'error' : 'success'}
                    text={
                      state === 0
                        ? formatMessage({ id: 'status.offline' })
                        : formatMessage({ id: 'status.online' })
                    }
                  />
                ),
              },
            }}
          />
        </Col>
        <Col lg={{ span: 12 }} md={{ span: 24 }}>
          <ProCard bodyStyle={{ padding: 0 }} className="dashboard-card">
            <Button
              size="small"
              type="primary"
              ghost
              className="absolute top-[8px] left-[8px]"
              icon={<ReloadOutlined />}
              onClick={reset}
            >
              {formatMessage({ id: 'button.reset' })}
            </Button>
            <ProCard layout="center" direction="column" type="inner" colSpan="25%">
              <div className="text-[#585858]">
                {formatMessage({ id: 'dashboard.title.statistic' })}
              </div>
              <Statistic value={sum(statisticData, (s) => s.value || 0)} />
            </ProCard>
            <ProCard gutter={[16, 16]} wrap bodyStyle={{ paddingInline: 14 }}>
              {statisticData?.map((item) => (
                <ProCard
                  key={item.key}
                  layout="center"
                  direction="column"
                  type="inner"
                  colSpan="50%"
                  className="bg-[rgba(42,46,54,0.04)]"
                  bodyStyle={{ paddingBlock: 14, paddingInline: 14 }}
                >
                  <Space>
                    <div
                      className={cn(
                        'w-[4px] h-[10px] bg-[#52C41B]',
                        item.status === 'success' ? 'bg-[#52C41B]' : 'bg-[#F54C4F]',
                      )}
                    />
                    <div className="text-[#585858] text-[13px]">{item.label}</div>
                  </Space>
                  <Statistic value={item.value} />
                </ProCard>
              ))}
            </ProCard>
          </ProCard>
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
