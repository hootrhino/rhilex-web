import { Liquid } from "@ant-design/plots";

const Other1 = () => {
  const config = {
    percent: 0.25,
    outline: {
      border: 4,
      // distance: 8,
    },
    statistic: {
      content: {
        style: {
          color: '#fff'
        }
      }
  }
    // wave: {
    //   length: 128,
    // },
  }

  return <Liquid {...config} />;
}

export default Other1;
