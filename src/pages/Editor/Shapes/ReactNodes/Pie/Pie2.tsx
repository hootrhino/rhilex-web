import type { PieConfig } from '@ant-design/plots';
import { Pie } from '@ant-design/plots';

// 进度环图
const Pie2 = () => {
  const data = [
    {
      type: '分类一',
      value: 45,
    },
    {
      type: '分类二',
      value: 55,
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    legend: false,
    label: {
      type: 'inner',
      offset: '-50%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '45%\nTITLE',
      },
    },
  } as PieConfig;

  return <Pie {...config} />;
};

export default Pie2;
