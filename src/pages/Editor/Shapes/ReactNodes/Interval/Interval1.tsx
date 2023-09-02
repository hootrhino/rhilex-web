// 区间柱状图
import { Column } from '@ant-design/plots';

const Interval1 = () => {
  const data = [
    {
      type: 'A',
      values: [76, 100],
    },
    {
      type: 'B',
      values: [56, 108],
    },
    {
      type: 'C',
      values: [38, 129],
    },
    {
      type: 'D',
      values: [58, 155],
    },
    {
      type: 'E',
      values: [45, 120],
    },
    {
      type: 'F',
      values: [23, 99],
    },
    {
      type: 'G',
      values: [18, 56],
    },
  ];

  const config = {
    data,
    xField: 'type',
    yField: 'values',
    isRange: true,
  };

  return <Column {...config} />;
};

export default Interval1;
