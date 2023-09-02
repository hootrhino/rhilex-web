// 玉钰图
import { RadialBar } from '@ant-design/plots';

const Interval4 = () => {
  const data = [
    {
      name: 'A',
      star: 297,
    },
    {
      name: 'B',
      star: 506,
    },
    {
      name: 'C',
      star: 805,
    },
    {
      name: 'D',
      star: 1478,
    },
    {
      name: 'E',
      star: 2029,
    },
    {
      name: 'F',
      star: 7100,
    },
    {
      name: 'G',
      star: 7346,
    },
  ];

  const config = {
    data,
    xField: 'name',
    yField: 'star',
    radius: 0.8,
    innerRadius: 0.2,
    barBackground: {
      style: {
        fill: '#4A4A4A',
        fillOpacity: 0.1,
      },
    },
  };

  return <RadialBar {...config} />;
};

export default Interval4;
