import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import FourGConfig from './components/4G';
import FirmwareConfig from './components/Firmware';
import NetworkConfig from './components/Network';
import TimeConfig from './components/Time';
import UserConfig from './components/User';
import WIFIConfig from './components/Wifi';
import SiteConfig from './components/Site';

const System = () => {
  const [activeKey, setActiveKey] = useState<string>('network');

  return (
    <PageContainer>
      <ProCard
        tabs={{
          tabPosition: 'left',
          activeKey,
          style: { minHeight: 700 },
          items: [
            {
              label: '网卡配置',
              key: 'network',
              children: <NetworkConfig />,
            },
            {
              label: 'WIFI配置',
              key: 'wifi',
              children: <WIFIConfig />,
            },
            {
              label: '时间配置',
              key: 'time',
              children: <TimeConfig />,
            },
            {
              label: '4G 配置',
              key: '4g',
              children: <FourGConfig />,
            },
            {
              label: '用户配置',
              key: 'user',
              children: <UserConfig />,
            },
            {
              label: '固件配置',
              key: 'firmware',
              children: <FirmwareConfig />,
            },
            {
              label: '站点配置',
              key: 'site',
              children: <SiteConfig  />,
            },
          ],
          onChange: (key) => {
            setActiveKey(key);
          },
        }}
        style={{ minHeight: 700 }}
      />
    </PageContainer>
  );
};

export default System;
