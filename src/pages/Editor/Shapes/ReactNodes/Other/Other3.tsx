// 漏斗图
import type { FunnelConfig } from '@ant-design/plots';
import { Funnel } from '@ant-design/plots';

const Other3 = () => {
  const data = [
    {
      stage: '简历筛选',
      number: 253,
    },
    {
      stage: '面试人数',
      number: 151,
    },
    // {
    //   stage: '复试人数',
    //   number: 113,
    // },
    {
      stage: '录取人数',
      number: 87,
    },
    {
      stage: '入职人数',
      number: 59,
    },
  ];

  const config = {
    data: data,
    xField: 'stage',
    yField: 'number',
    legend: false,
    dynamicHeight: true
  } as FunnelConfig;

  return <Funnel {...config} />;
};

export default Other3;
