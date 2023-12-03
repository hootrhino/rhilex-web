/** 旭日图  */
import { Sunburst } from '@ant-design/plots';
import type { SunburstConfig } from '@ant-design/plots';
import { useEffect, useState } from 'react';

type BaseSunburstProps = {
  // baseConfig?: SunburstConfig;
  color?: string[];
  labelLayoutType?: string;
}

const DEFAULT_CONFIG = {
  radius: 1,
  innerRadius: 0.3,
    hierarchyConfig: {
      field: 'sum',
    },
    color: ['#73A0FA', '#fc8c23', '#fff'],
    interactions: [
      {
        type: 'element-active',
      },
    ],
    state: {
      active: {
        style: {
          stroke: '#fff',
          lineWidth: 2,
        },
      },
    },
} as SunburstConfig;

const BaseSunburst = ({color, labelLayoutType}: BaseSunburstProps) => {
  const [dataSource, setData] = useState({})
  // const [config, setConfig] = useState<SunburstConfig>(DEFAULT_CONFIG);

  const config = {
    ...DEFAULT_CONFIG,
    data: dataSource,
    color,
    label: labelLayoutType ? {
      layout: [
        {
          type: labelLayoutType,
        },
      ],
    } : false,
  }

  const defaultDataFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json')
      .then((response) => response.json())
      .then((json) => {setData(json);})
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  useEffect(() => {
    defaultDataFetch();
  }, [])

  return <Sunburst {...config} />
}

export default BaseSunburst;
