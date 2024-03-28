import PageContainer from '@/components/PageContainer';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import type { TabPaneProps } from 'antd';
import { useEffect, useState } from 'react';
import FourGConfig from './4G';
import APNConfig from './Apn';
import DataBackupConfig from './DataBackup';
import FirmwareConfig from './Firmware';
import NetworkConfig from './Network';
import NetworkStatus from './NetworkStatus';
import RoutingConfig from './Routing';
import SiteConfig from './Site';
import TimeConfig from './Time';
import UserConfig from './User';
import WIFIConfig from './Wifi';

type TabItem = Omit<TabPaneProps, 'tab'> & {
  key: string;
  label: React.ReactNode;
};

const baseItems = [
  {
    label: '网络状态',
    key: 'netStatus',
    children: <NetworkStatus />,
  },
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
];

const System = () => {
  const { activeKey, setActiveKey, hasWifi, hasRoute } = useModel('useSetting');
  const { isWindows, isH3 } = useModel('useSystem');
  const [tabItems, setItems] = useState<TabItem[]>(baseItems);

  useEffect(() => {
    const filteredItems = tabItems.filter((item) => {
      if (isWindows) {
        return ['firmware', 'backup', 'user', 'site'].includes(item.key);
      } else {
        if (!isH3) {
          return !['4g', 'apn'].includes(item.key);
        }
        if (!hasRoute) {
          return !['routing'].includes(item.key);
        }
        if (!hasWifi) {
          return !['wifi'].includes(item.key);
        }
        return item;
      }
    });

    setItems(filteredItems);
    setActiveKey(isWindows ? 'backup' : 'netStatus');
  }, [isWindows, isH3, hasRoute, hasWifi]);

  return (
    <PageContainer>
      <ProCard
        tabs={{
          tabPosition: 'left',
          activeKey,
          className: 'min-h-[700px]',
          items: tabItems,
          onChange: (key) => {
            setActiveKey(key);
          },
        }}
      />
    </PageContainer>
  );
};

export default System;
