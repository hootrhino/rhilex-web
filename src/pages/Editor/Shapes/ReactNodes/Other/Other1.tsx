// 水波图
import { Liquid } from '@ant-design/plots';

const Other1 = () => {
  const config = {
    percent: 0.25,
    outline: {
      border: 4,
    },
    statistic: {
      content: {
        style: {
          color: '#fff',
        },
      },
    },
  };

  return <Liquid {...config} />;
};

export default Other1;
