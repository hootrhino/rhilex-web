// 旭日图
import type { SunburstConfig } from '@ant-design/plots';
import { Sunburst } from '@ant-design/plots';
import { useEffect, useState } from 'react';

const Other2 = () => {
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    data,
    innerRadius: 0.3,
    interactions: [
      {
        type: 'element-active',
      },
    ],
    hierarchyConfig: {
      field: 'sum',
    },
    drilldown: {
      breadCrumb: {
        rootText: '起始',
      },
    },
  } as SunburstConfig;

  useEffect(() => {
    asyncFetch();
  }, []);

  return <Sunburst {...config} />;
};

export default Other2;
