import { useEffect, useState } from 'react';
import { useRequest, useModel } from 'umi';

import { RingProgress } from '@ant-design/charts';
import { PageContainer, ProCard, ProTable, StatisticCard } from '@ant-design/pro-components';
import add from 'lodash/add';
import RcResizeObserver from 'rc-resize-observer';
import { nanoid } from 'nanoid'

import { getSystem } from '@/services/rulex/xitongshuju';

import ExportIcon from '@/assets/dashboard/export.svg';
import ImportIcon from '@/assets/dashboard/import.svg';
import PluginIcon from '@/assets/dashboard/plugin.svg';
import RuleIcon from '@/assets/dashboard/rule.svg';

import './index.less';
import { Tag } from 'antd';

enum levelColor {
  fatal = 'error',
  error = 'error',
  warn = 'warning',
  warning = 'warning',
  debug = 'default',
  info = 'blue'
}

const { Divider } = StatisticCard;

type Pagination = {
  current: number;
  pageSize: number;
  total: number;
}

const Dashboard = () => {
  const {logs} = useModel('useWebsocket');
  const [responsive, setResponsive] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({current: 1, pageSize: 10, total: 0});

  const { data } = useRequest(() => getSystem(), {
    formatResult: (res) => res.data,
  });

  const inCount = add(data?.statistic?.inSuccess || 0, data?.statistic?.inFailed || 0);
  const outCount = add(data?.statistic?.outSuccess || 0, data?.statistic?.outFailed || 0);

  const columns = [{
    title: '时间',
    dataIndex: 'time',
    valueType: 'dateTime',
    width: 180,
  },{
    title: '等级',
    dataIndex: 'level',
    renderText: (level: string) =>  <Tag color={levelColor[level]}>{level}</Tag>,
    width: 80,
  },
  {
    title: '内容',
    dataIndex: 'msg',
    ellipsis: true,
  }];

  useEffect(() => {
    setPagination({...pagination, total: logs?.length})
  }, [logs?.length])

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
              // description: <Statistic title="占比" value="61.5%" />,
            }}
            chart={
              <RingProgress
                width={80}
                height={80}
                percent={(data?.hardWareInfo?.cpuPercent || 0) / 100}
                color="#1890ff"
                statistic={{ title: false, content: false }}
              />
            }
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: '磁盘使用',
              value: `${data?.hardWareInfo?.diskInfo || 0}%`,
              // description: <Statistic title="占比" value="38.5%" />,
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
        <StatisticCard.Group
          direction={responsive ? 'column' : 'row'}
          style={{ marginBlockStart: 24 }}
        >
          <StatisticCard
            statistic={{
              title: '入口总数',
              value: data?.sourceCount?.inends,
              icon: <img src={ImportIcon} alt="入口总数" />,
            }}
          />
          <StatisticCard
            statistic={{
              title: '出口总数',
              value: data?.sourceCount?.outends,
              icon: <img src={ExportIcon} alt="出口总数" />,
            }}
          />
          <StatisticCard
            statistic={{
              title: '规则总数',
              value: data?.sourceCount?.rules,
              icon: <img src={RuleIcon} alt="规则总数" />,
            }}
          />
          <StatisticCard
            statistic={{
              title: '插件总数',
              value: data?.sourceCount?.plugins,
              icon: <img src={PluginIcon} alt="插件总数" />,
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
        <StatisticCard.Group
          direction={responsive ? 'column' : 'row'}
          style={{ marginBlockStart: 24 }}
        >
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
      <ProCard style={{marginTop: 24}}>
      <ProTable
          rowKey={() => nanoid()}
          columns={columns}
          dataSource={logs}
          search={false}
          pagination={{...pagination, onChange: (current, pageSize) => setPagination({...pagination, current, pageSize})}}
          options={false}

        />
      </ProCard>
    </PageContainer>
  );
};

export default Dashboard;
