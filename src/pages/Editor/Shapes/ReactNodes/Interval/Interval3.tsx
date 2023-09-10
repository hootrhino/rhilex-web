// 瀑布图
import type { WaterfallConfig } from '@ant-design/plots';
import { Waterfall } from '@ant-design/plots';

const Interval3 = () => {
  const data = [
    {
      type: 'A',
      money: 38,
    },
    {
      type: 'B',
      money: 52,
    },
    {
      type: 'C',
      money: -61,
    },
    {
      type: 'D',
      money: 145,
    },
    {
      type: 'E',
      money: 48,
    },
    {
      type: 'F',
      money: 38,
    },
    {
      type: 'G',
      money: -38,
    },
  ];

  const config = {
    data,
    xField: 'type',
    yField: 'money',
    appendPadding: [15, 0, 0, 0],
    meta: {
      type: {
        alias: '类别',
      },
      money: {
        alias: '收支',
      },
    },
    total: false,
    legend: false,
    risingFill: '#588AEF',
    fallingFill: '#79DAFF',
  } as WaterfallConfig;

  return <Waterfall {...config} />;
};

export default Interval3;
