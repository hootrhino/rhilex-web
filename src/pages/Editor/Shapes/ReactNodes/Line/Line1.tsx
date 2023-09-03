// 折线图
import { Line } from '@ant-design/plots';

const Line1 = () => {
  const data = [
    {
      year: 'A',
      value: 3,
    },
    {
      year: 'B',
      value: 4,
    },
    {
      year: 'C',
      value: 3.5,
    },
    {
      year: 'D',
      value: 5,
    },
    {
      year: 'E',
      value: 4.9,
    },
    {
      year: 'F',
      value: 6,
    },
    {
      year: 'G',
      value: 7,
    },
  ];

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'circle',
      style: {
        fill: '#5B8FF9',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };

  return <Line {...config} />;
};

export default Line1;
