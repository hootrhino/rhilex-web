import { useEffect, useState } from 'react';
import { useModel } from 'umi';

import { RingProgress } from '@ant-design/charts';
import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { FilterValue } from 'antd/es/table/interface';
import add from 'lodash/add';
import RcResizeObserver from 'rc-resize-observer';

import ExportIcon from '@/assets/fontIcons/export.svg';
import ImportIcon from '@/assets/fontIcons/import.svg';
import PluginIcon from '@/assets/fontIcons/plugin.svg';
import RuleIcon from '@/assets/fontIcons/rule.svg';

import LogTable from '@/components/LogTable';
import { LogItem } from '@/models/useWebsocket';

const { Divider } = StatisticCard;

const Dashboard = () => {
  const { logs } = useModel('useWebsocket');
  const { data } = useModel('useSystem');
  const [logData, setLogData] = useState<LogItem[]>([]);
  const [responsive, setResponsive] = useState(false);

  const inCount = add(data?.statistic?.inSuccess || 0, data?.statistic?.inFailed || 0);
  const outCount = add(data?.statistic?.outSuccess || 0, data?.statistic?.outFailed || 0);

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

  useEffect(() => {
    setLogData(logs);
  }, [logs]);

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
              value: data?.hardWareInfo.version,
            }}
          />
          <StatisticCard
            statistic={{
              title: '操作系统',
              value: data?.hardWareInfo?.osArch,
            }}
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: 'CPU 使用',
              value: `${data?.hardWareInfo?.cpuPercent || 0}%`,
            }}
            chart={
              <RingProgress
                width={80}
                height={80}
                percent={(data?.hardWareInfo?.cpuPercent || 0) / 100}
                color="#1677ff"
                statistic={{ title: false, content: false }}
              />
            }
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: '磁盘使用',
              value: `${data?.hardWareInfo?.diskInfo || 0}%`,
            }}
            chart={
              <RingProgress
                width={80}
                height={80}
                percent={(data?.hardWareInfo?.diskInfo || 0) / 100}
                statistic={{ title: false, content: false }}
              />
            }
            chartPlacement="left"
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
              value: data?.sourceCount?.inends,
              icon: <img src={ImportIcon} alt="入口总数" className="w-[42px] h-[42px]" />,
            }}
          />
          <StatisticCard
            statistic={{
              title: '出口总数',
              value: data?.sourceCount?.outends,
              icon: <img src={ExportIcon} alt="出口总数" className="w-[42px] h-[42px]" />,
            }}
          />
          <StatisticCard
            statistic={{
              title: '规则总数',
              value: data?.sourceCount?.rules,
              icon: <img src={RuleIcon} alt="规则总数" className="w-[42px] h-[42px]" />,
            }}
          />
          <StatisticCard
            statistic={{
              title: '插件总数',
              value: data?.sourceCount?.plugins,
              icon: <img src={PluginIcon} alt="插件总数" className="w-[42px] h-[42px]" />,
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
              value: data?.statistic?.inSuccess,
              status: 'success',
            }}
          />
          <StatisticCard
            statistic={{
              title: '输入失败',
              value: data?.statistic?.inFailed,
              status: 'error',
            }}
          />
          <StatisticCard
            statistic={{
              title: '输出成功',
              value: data?.statistic?.outSuccess,
              status: 'success',
            }}
          />
          <StatisticCard
            statistic={{
              title: '输出失败',
              value: data?.statistic?.outFailed,
              status: 'error',
            }}
          />
        </StatisticCard.Group>
      </RcResizeObserver>
      <ProCard className="mt-6">
        <LogTable
          dataSource={logData}
          filters={true}
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
          onChange={(_, filters: any) => handleOnsearch(undefined, filters)}
        />
      </ProCard>
    </PageContainer>
  );
};

export default Dashboard;
