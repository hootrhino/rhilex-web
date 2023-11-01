import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useEffect } from 'react';
import FourGConfig from './components/4G';
import APNConfig from './components/Apn';
import DataBackupConfig from './components/DataBackup';
import FirmwareConfig from './components/Firmware';
import NetworkConfig from './components/Network';
import SiteConfig from './components/Site';
import TimeConfig from './components/Time';
import UserConfig from './components/User';
import WIFIConfig from './components/Wifi';

const System = () => {
  const { activeKey, setActiveKey } = useModel('useSetting');
  const { isWindows } = useModel('useSystem');

  const DefaultConfig = isWindows
    ? []
    : [
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
          label: '固件配置',
          key: 'firmware',
          children: <FirmwareConfig />,
        },
        {
          label: '数据备份',
          key: 'backup',
          children: <DataBackupConfig />,
        },
        {
          label: 'APN配置',
          key: 'apn',
          children: <APNConfig />,
        },
      ];

  useEffect(() => {
    if (isWindows) {
      setActiveKey('user');
    }
  }, [isWindows]);

  return (
    <PageContainer>
      <ProCard
        tabs={{
          tabPosition: 'left',
          activeKey,
          style: { minHeight: 700 },
          items: [
            ...DefaultConfig,
            {
              label: '用户配置',
              key: 'user',
              children: <UserConfig />,
            },

            {
              label: '站点配置',
              key: 'site',
              children: <SiteConfig />,
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
