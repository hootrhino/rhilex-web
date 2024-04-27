import PageContainer from '@/components/PageContainer';
import { Product } from '@/utils/enum';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import type { TabPaneProps } from 'antd';
import { useEffect, useState } from 'react';
import DataBackupConfig from './DataBackup';
import FirmwareConfig from './Firmware';
import NetworkConfig from './Network';
import Network4GConfig from './Network4g';
import NetworkStatus from './NetworkStatus';
import Resource from './Resource';
import RoutingConfig from './Routing';
import TimeConfig from './Time';
import UserConfig from './User';
import WIFIConfig from './Wifi';

type TabItem = Omit<TabPaneProps, 'tab'> & {
  key: string;
  label: React.ReactNode;
};

const baseItems = [
  {
    label: '系统资源',
    key: 'resource',
    children: <Resource />,
  },
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
    label: <div>4G&nbsp;&nbsp;网络</div>,
    key: 'apn',
    children: <Network4GConfig />,
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
];

const defaultConfig = ['resource', 'firmware', 'backup', 'user'];

const System = () => {
  const { isWindows, product, activeKey, setActiveKey, hasWifi, hasRoute } = useModel('useSystem');
  const [tabItems, setItems] = useState<TabItem[]>(baseItems);

  useEffect(() => {
    const filteredItems = baseItems.filter((item) => {
      if (isWindows) {
        return defaultConfig.includes(item.key);
      } else {
        // mac linux
        if (product === Product.EN6400) {
          return !['apn'].includes(item.key);
        }
        if ([Product.COMMON].includes(product)) {
          return defaultConfig.includes(item.key);
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
    setActiveKey('resource');
  }, [isWindows, product, hasRoute, hasWifi]);

  return (
    <PageContainer>
      <ProCard
        tabs={{
          tabPosition: 'left',
          activeKey,
          className: 'min-h-[700px] overflow-hidden',
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
