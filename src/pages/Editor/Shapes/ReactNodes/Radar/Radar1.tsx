import { Radar } from '@ant-design/plots';

// 雷达图
const Radar1 = () => {
  const data = [
    {
      name: 'A',
      star: 10371,
    },
    {
      name: 'B',
      star: 7380,
    },
    {
      name: 'C',
      star: 7414,
    },
    {
      name: 'D',
      star: 2140,
    },
    {
      name: 'E',
      star: 660,
    },
    {
      name: 'F',
      star: 885,
    },
    {
      name: 'G',
      star: 1626,
    },
  ];

  const config = {
    data: data.map((d) => ({ ...d, star: Math.sqrt(d.star) })),
    xField: 'name',
    yField: 'star',
    appendPadding: [0, 10, 0, 10],
    meta: {
      star: {
        alias: 'star 数量',
        min: 0,
        nice: true,
        formatter: (v: any) => Number(v).toFixed(2),
      },
    },
    xAxis: {
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    // 开启辅助点
    point: {
      size: 2,
    },
    area: {},
  };

  return <Radar {...config} />;
};

export default Radar1;
