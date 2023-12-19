import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useEffect } from 'react';
import FourGConfig from './4G';
import APNConfig from './Apn';
import DataBackupConfig from './DataBackup';
import FirmwareConfig from './Firmware';
import NetworkConfig from './Network';
import RoutingConfig from './Routing';
import SiteConfig from './Site';
import TimeConfig from './Time';
import UserConfig from './User';
import WIFIConfig from './Wifi';

const System = () => {
  const { activeKey, setActiveKey } = useModel('useSetting');
  const { isWindows, data } = useModel('useSystem');
  const isH3 = data?.hardWareInfo?.product === 'EEKITH3';
  const h3Config = isH3
    ? [
        {
          label: <div>4G&nbsp;&nbsp;配置</div>,
          key: '4g',
          children: <FourGConfig />,
        },
        {
          label: 'APN配置',
          key: 'apn',
          children: <APNConfig />,
        },
      ]
    : [];

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
          label: '路由设置',
          key: 'routing',
          children: <RoutingConfig />,
        },
        {
          label: '固件配置',
          key: 'firmware',
          children: <FirmwareConfig />,
        },
        ...h3Config,
      ];

  useEffect(() => {
    if (isWindows) {
      setActiveKey('backup');
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
              label: '数据备份',
              key: 'backup',
              children: <DataBackupConfig />,
            },
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
