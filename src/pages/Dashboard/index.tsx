import { message } from '@/components/PopupHack';
import type { LogRef } from '@/components/ProLog';
import ProLog from '@/components/ProLog';
import PageContainer from '@/components/ProPageContainer';
import { getDevicesList } from '@/services/rhilex/shebeiguanli';
import { postOsResetInterMetric } from '@/services/rhilex/xitongshuju';
import { sum } from '@/utils/redash';
import { cn, IconFont } from '@/utils/utils';
import {
  DeleteOutlined,
  DownloadOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { ProCard, ProList } from '@ant-design/pro-components';
import { history, useIntl, useModel, useRequest } from '@umijs/max';
import { Badge, Button, Col, Empty, Row, Space, Statistic } from 'antd';
import { useEffect, useRef, useState } from 'react';

const Dashboard = () => {
  const logRef = useRef<LogRef>(null);

  const { dataSource, run } = useModel('useSystem');
  const { changeConfig } = useModel('useCommon');

  const { formatMessage } = useIntl();

  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.Key[]>([]);
  const [play, setPlay] = useState<boolean>();

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

  // 获取设备列表
  const { data: allDeviceData } = useRequest(() => getDevicesList({ current: 1, size: 999 }), {
    formatResult: (res) => res?.data?.records,
  });

  const { run: reset } = useRequest(() => postOsResetInterMetric(), {
    manual: true,
    onSuccess: () => {
      message.success(formatMessage({ id: 'message.success.reset' }));
      run();
    },
  });

  useEffect(() => {
    setPlay(JSON.parse(localStorage.getItem('play-log-state') || 'false'));
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
      <Row gutter={[16, 16]}>
        <Col lg={{ span: 12 }} md={{ span: 24 }}>
          <ProList
            rowKey="uuid"
            size="small"
            className="dashboard-device-card"
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={formatMessage({ id: 'dashboard.empty.resource' })}
                />
              ),
            }}
            headerTitle={
              <span className="text-[14px]">
                {formatMessage({ id: 'dashboard.title.resource' })}
              </span>
            }
            dataSource={allDeviceData}
            expandable={{
              expandedRowKeys,
              onExpandedRowsChange: setExpandedRowKeys,
            }}
            metas={{
              title: {
                dataIndex: 'name',
                render: (_, { name, uuid }) => (
                  <a
                    onClick={() => {
                      if (!uuid) return;
                      history.push('/device/list');
                      changeConfig({ open: true, uuid });
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
      <ProCard
        className="overflow-y-auto mt-6"
        title={<span className="text-[14px]">{formatMessage({ id: 'dashboard.title.log' })}</span>}
        extra={
          <Space>
            <Button
              key="download"
              type="primary"
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => (window.location.href = '/api/v1/backup/runningLog')}
            >
              {formatMessage({ id: 'button.download' })}
            </Button>
            <Button
              ghost
              key="stop"
              type="primary"
              icon={play ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
              size="small"
              onClick={() => {
                if (play) {
                  logRef.current?.stopLog();
                  localStorage.setItem('play-log-state', 'false');
                } else {
                  logRef.current?.startLog();
                  localStorage.setItem('play-log-state', 'true');
                }
                setPlay(!play);
              }}
            >
              {play
                ? formatMessage({ id: 'button.pause' })
                : formatMessage({ id: 'button.resume' })}
            </Button>
            <Button
              danger
              key="reload"
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => logRef.current?.clearLog()}
            >
              {formatMessage({ id: 'button.clear' })}
            </Button>
          </Space>
        }
      >
        <ProLog ref={logRef} />
      </ProCard>
    </PageContainer>
  );
};

export default Dashboard;
