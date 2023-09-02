// 柱状图
import { Column } from '@ant-design/plots';

const Interval2 = () => {
  const data = [
    {
      type: 'A',
      sales: 38,
    },
    {
      type: 'B',
      sales: 52,
    },
    {
      type: 'C',
      sales: 61,
    },
    {
      type: 'D',
      sales: 145,
    },
    {
      type: 'E',
      sales: 48,
    },
    {
      type: 'F',
      sales: 38,
    },
    {
      type: 'G',
      sales: 38,
    },
  ];

  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };

  return <Column {...config} />;
};

export default Interval2;
