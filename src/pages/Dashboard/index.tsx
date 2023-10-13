import { useEffect, useState } from 'react';
import { useModel } from 'umi';

import { Progress, TinyArea } from '@ant-design/plots';
import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { FilterValue } from 'antd/es/table/interface';
import add from 'lodash/add';
import RcResizeObserver from 'rc-resize-observer';

import AppIcon from '@/assets/fontIcons/app.svg';
import DeviceIcon from '@/assets/fontIcons/device.svg';
import ExportIcon from '@/assets/fontIcons/export.svg';
import ImportIcon from '@/assets/fontIcons/import.svg';
import PluginIcon from '@/assets/fontIcons/plugin.svg';
import RuleIcon from '@/assets/fontIcons/rule.svg';

import LogTable from '@/components/LogTable';
import { modal } from '@/components/PopupHack';
import { LogItem } from '@/models/useWebsocket';
import { getOsOsRelease } from '@/services/rulex/xitongshuju';
import { useRequest } from '@umijs/max';
import { Descriptions } from 'antd';

const { Divider } = StatisticCard;

const Dashboard = () => {
  const { logs } = useModel('useWebsocket');
  const { dataSource, cpuData } = useModel('useSystem');
  const [logData, setLogData] = useState<LogItem[]>([]);
  const [responsive, setResponsive] = useState(false);

  const inCount = add(dataSource?.statistic?.inSuccess || 0, dataSource?.statistic?.inFailed || 0);
  const outCount = add(
    dataSource?.statistic?.outSuccess || 0,
    dataSource?.statistic?.outFailed || 0,
  );

  const handleOnsearch = (keyword?: string, filters?: Record<string, FilterValue | null>) => {
    let filteredLogs = logs;
    if (keyword) {
      filteredLogs = logs.filter((log) => {
        return log.msg.includes(keyword);
      });
    }
    if (filters) {
      filteredLogs = logs.filter((log) => filters?.level?.includes(log?.level));
    }
    setLogData(filteredLogs);
  };

  // 获取系统详情
  const { data: osDetail } = useRequest(() => getOsOsRelease({}), {
    formatResult: (res) => res?.data,
  });

  // 展示系统详情
  const detailConfig = {
    title: '系统详情',
    width: 700,
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
    setLogData(logs);
  }, [logs]);

  const config = {
    width: 200,
    height: 60,
    data: cpuData,
    xField: 'index',
    yField: 'value',
    smooth: true,
    guideLine: [
      {
        type: 'mean',
        text: {
          position: 'start',
          content: '平均值',
          style: {
            stroke: 'white',
            lineWidth: 2,
          },
        },
      },
    ],
  };

  return (
    <PageContainer>
      <RcResizeObserver
        key="resize-observer1"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
          <StatisticCard
            statistic={{
              title: '当前版本',
              value: dataSource?.hardWareInfo.version,
            }}
            extra={<a className="invisible">详情</a>}
          />
          <StatisticCard
            statistic={{
              title: '操作系统',
              value: dataSource?.hardWareInfo?.osArch,
            }}
            extra={<a onClick={() => modal.info(detailConfig)}>详情</a>}
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: 'CPU 使用',
              value: dataSource?.hardWareInfo?.cpuPercent || 0,
              suffix: '%',
            }}
            chart={<TinyArea {...config} />}
          />
          <StatisticCard
            statistic={{
              title: '磁盘使用',
              value: dataSource?.hardWareInfo?.diskInfo || 0,
              suffix: '%',
            }}
            chart={
              <Progress
                width={80}
                height={20}
                percent={(dataSource?.hardWareInfo?.diskInfo || 0) / 100}
                className="mt-[30px]"
              />
            }
          />
        </StatisticCard.Group>
      </RcResizeObserver>
      <RcResizeObserver
        key="resize-observer2"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <StatisticCard.Group direction={responsive ? 'column' : 'row'} className="mt-6">
          <StatisticCard
            statistic={{
              title: '入口总数',
              value: dataSource?.sourceCount?.inends,
              icon: <img src={ImportIcon} alt="入口总数" className="w-[42px] h-[42px]" />,
            }}
          />
          <StatisticCard
            statistic={{
              title: '出口总数',
              value: dataSource?.sourceCount?.outends,
              icon: <img src={ExportIcon} alt="出口总数" className="w-[42px] h-[42px]" />,
            }}
          />
          <StatisticCard
            statistic={{
              title: '规则总数',
              value: dataSource?.sourceCount?.rules,
              icon: <img src={RuleIcon} alt="规则总数" className="w-[42px] h-[42px]" />,
            }}
          />
          <StatisticCard
            statistic={{
              title: '插件总数',
              value: dataSource?.sourceCount?.plugins,
              icon: <img src={PluginIcon} alt="插件总数" className="w-[42px] h-[42px]" />,
            }}
          />
          <StatisticCard
            statistic={{
              title: '应用总数',
              value: dataSource?.sourceCount?.apps,
              icon: <img src={AppIcon} alt="应用总数" className="w-[42px] h-[42px]" />,
            }}
          />
          <StatisticCard
            statistic={{
              title: '设备总数',
              value: dataSource?.sourceCount?.devices,
              icon: <img src={DeviceIcon} alt="设备总数" className="w-[42px] h-[42px]" />,
            }}
          />
        </StatisticCard.Group>
      </RcResizeObserver>
      <RcResizeObserver
        key="resize-observer3"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <StatisticCard.Group direction={responsive ? 'column' : 'row'} className="mt-6">
          <StatisticCard
            statistic={{
              title: '输入 / 输出总数',
              value: add(inCount, outCount),
            }}
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: '输入成功',
              value: dataSource?.statistic?.inSuccess,
              status: 'success',
            }}
          />
          <StatisticCard
            statistic={{
              title: '输入失败',
              value: dataSource?.statistic?.inFailed,
              status: 'error',
            }}
          />
          <StatisticCard
            statistic={{
              title: '输出成功',
              value: dataSource?.statistic?.outSuccess,
              status: 'success',
            }}
          />
          <StatisticCard
            statistic={{
              title: '输出失败',
              value: dataSource?.statistic?.outFailed,
              status: 'error',
            }}
          />
        </StatisticCard.Group>
      </RcResizeObserver>
      <ProCard className="mt-6">
        <LogTable
          dataSource={logData}
          filters={true}
          type="home"
          options={{
            search: {
              onSearch: (keyword: string) => {
                handleOnsearch(keyword);
                return true;
              },
              placeholder: '请输入内容进行搜索',
              allowClear: true,
            },
            reload: false,
            setting: false,
            density: false,
          }}
          onChange={(_: any, filters: any) => handleOnsearch(undefined, filters)}
        />
      </ProCard>
    </PageContainer>
  );
};

export default Dashboard;
