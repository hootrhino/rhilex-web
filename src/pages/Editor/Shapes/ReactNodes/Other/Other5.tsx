import type { BulletConfig } from '@ant-design/plots';
import { Bullet } from '@ant-design/plots';

// 子弹图
const Other5 = () => {
  const data = [
    {
      title: 'A',
      ranges: [30, 90, 120],
      measures: [65],
      target: 80,
    },
    {
      title: 'B',
      ranges: [30, 90, 120],
      measures: [50],
      target: 100,
    },
    {
      title: 'C',
      ranges: [30, 90, 120],
      measures: [40],
      target: 85,
    },
    {
      title: 'D',
      ranges: [30, 90, 120],
      measures: [50],
      target: 100,
    },
  ];

  const config = {
    data,
    measureField: 'measures',
    rangeField: 'ranges',
    targetField: 'target',
    xField: 'title',
    color: {
      range: ['#79DAFF', '#79DAFF', '#BDFDFF'],
      measure: '#0C73FF',
      target: '#ffffff',
    },
    label: {
      measure: {
        position: 'middle',
        style: {
          fill: '#fff',
        },
      },
    },
    xAxis: {
      line: null,
    },
    yAxis: false,
    legend: false,
  } as BulletConfig;

  return <Bullet {...config} />;
};

export default Other5;
