import { Heatmap } from '@ant-design/plots';
import { useEffect, useState } from 'react';

// 热力图
const Other4 = () => {
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/68d3f380-089e-4683-ab9e-4493200198f9.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    data,
    xField: 'name',
    yField: 'country',
    colorField: 'value',
    sizeField: 'value',
    shape: 'square',
    color: ['#dddddd', '#9ec8e0', '#5fa4cd', '#2e7ab6', '#114d90'],
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  return <Heatmap {...config} />;
};

export default Other4;
