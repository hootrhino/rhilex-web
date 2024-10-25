import { message } from '@/components/PopupHack';
import type { LogRef } from '@/components/ProLog';
import ProLog from '@/components/ProLog';
import PageContainer from '@/components/ProPageContainer';
import { getDevicesList } from '@/services/rhilex/shebeiguanli';
import { postOsResetInterMetric } from '@/services/rhilex/xitongshuju';
import { DEVICE_LIST } from '@/utils/constant';
import { sum } from '@/utils/redash';
import { cn, IconFont } from '@/utils/utils';
import {
  DeleteOutlined,
  DownloadOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { ProCard, ProList, StatisticCard } from '@ant-design/pro-components';
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
      value: inSuccess || 0,
      status: 'success',
      key: 'inSuccess',
    },
    {
      label: formatMessage({ id: 'dashboard.statistic.inFailed' }),
      value: inFailed || 0,
      status: 'error',
      key: 'inFailed',
    },
    {
      label: formatMessage({ id: 'dashboard.statistic.outSuccess' }),
      value: outSuccess || 0,
      status: 'success',
      key: 'outSuccess',
    },
    {
      label: formatMessage({ id: 'dashboard.statistic.outFailed' }),
      value: outFailed || 0,
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
      <Row gutter={[16, 16]}>
        <Col xl={{ span: 12 }} lg={{ span: 24 }} md={{ span: 24 }}>
          <ProList
            rowKey="uuid"
            size="small"
            className="dashboard-device-card h-full"
            cardProps={{ className: 'h-full' }}
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
                      history.push(DEVICE_LIST);
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
        <Col xl={{ span: 12 }} lg={{ span: 24 }} md={{ span: 24 }}>
          <ProCard bodyStyle={{ padding: 0 }} className="dashboard-card h-full">
            <StatisticCard.Group direction="row" className="w-full h-full">
              <StatisticCard
                title={
                  <div className="text-[14px]">
                    {formatMessage({ id: 'dashboard.title.resourceTotal' })}
                  </div>
                }
                statistic={{
                  value: sum(sourceCountData, (s) => s.value || 0),
                }}
                chart={
                  <Row gutter={[16, 16]}>
                    {sourceCountData.map(({ key, title, value }) => (
                      <Col span={8} key={key}>
                        <Statistic
                          title={title}
                          value={value}
                          prefix={<IconFont type={`icon-dashboard-${key}`} />}
                        />
                      </Col>
                    ))}
                  </Row>
                }
              />
              <StatisticCard.Divider type="vertical" />
              <StatisticCard
                title={
                  <div className="text-[14px]">
                    {formatMessage({ id: 'dashboard.title.statistic' })}
                  </div>
                }
                statistic={{
                  value: sum(statisticData, (s) => s.value || 0),
                }}
                chart={
                  <Row gutter={[16, 16]}>
                    {statisticData.map(({ key, label, value, status }) => (
                      <Col span={12} key={key}>
                        <Statistic
                          title={label}
                          value={value}
                          prefix={
                            <div
                              className={cn(
                                'w-[4px] h-[16px] bg-[#52C41B] mr-[4px]',
                                status === 'success' ? 'bg-[#52C41B]' : 'bg-[#F54C4F]',
                              )}
                            />
                          }
                        />
                      </Col>
                    ))}
                  </Row>
                }
                extra={
                  <Button
                    size="small"
                    type="primary"
                    ghost
                    icon={<ReloadOutlined />}
                    onClick={reset}
                  >
                    {formatMessage({ id: 'button.reset' })}
                  </Button>
                }
              />
            </StatisticCard.Group>
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
