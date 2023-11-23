import { cn } from '@/utils/utils';
import { RingProgress, TinyArea } from '@ant-design/plots';
import { StatisticCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

const HardWareInfoCard = () => {
  const { dataSource, cpuData } = useModel('useSystem');
  const { memPercent, diskInfo, cpuPercent } = dataSource?.hardWareInfo || {
    memPercent: 0,
    diskInfo: 0,
    cpuPercent: 0,
  };

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

  const ringConfig = {
    height: 60,
    width: 60,
    autoFit: false,
    statistic: false,
    percent: Number(memPercent) / 100,
  };

  return (
    <StatisticCard.Group direction="row" className={cn('dashboard-card', 'h-full')}>
      <StatisticCard
        layout="center"
        statistic={{
          title: <div className="text-[#585858]">内存使用</div>,
          value: memPercent,
          suffix: '%',
        }}
        chart={<RingProgress color={['#5B8FF9', '#E8EDF3']} {...ringConfig} />}
      />
      <StatisticCard
        layout="center"
        statistic={{
          title: <div className="text-[#585858]">磁盘使用</div>,
          value: diskInfo,
          suffix: '%',
        }}
        chart={<RingProgress color={['#F4664A', '#E8EDF3']} {...ringConfig} />}
      />
      <StatisticCard
        layout="center"
        statistic={{
          title: <div className="text-[#585858]">CPU 使用</div>,
          value: cpuPercent,
          suffix: '%',
        }}
        chart={<TinyArea {...config} />}
      />
    </StatisticCard.Group>
  );
};

export default HardWareInfoCard;
