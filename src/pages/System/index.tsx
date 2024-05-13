import PageContainer from '@/components/PageContainer';
import { Product } from '@/utils/enum';
import { ProCard } from '@ant-design/pro-components';
import { FormattedMessage, useModel } from '@umijs/max';
import type { TabPaneProps } from 'antd';
import { useEffect, useState } from 'react';
import DataBackupConfig from './DataBackup';
import FirmwareConfig from './Firmware';
import NetworkConfig from './Network';
import Network4GConfig from './Network4g';
import NetworkStatus from './NetworkStatus';
import PortSettings from './PortMgt';
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
    label: <FormattedMessage id="system.tab.resource" />,
    key: 'resource',
    children: <Resource />,
  },
  {
    label: <FormattedMessage id="system.tab.port" />,
    key: 'port',
    children: <PortSettings />,
  },
  {
    label: <FormattedMessage id="system.tab.netStatus" />,
    key: 'netStatus',
    children: <NetworkStatus />,
  },
  {
    label: <FormattedMessage id="system.tab.network" />,
    key: 'network',
    children: <NetworkConfig />,
  },
  {
    label: <FormattedMessage id="system.tab.wifi" />,
    key: 'wifi',
    children: <WIFIConfig />,
  },
  {
    label: <FormattedMessage id="system.tab.time" />,
    key: 'time',
    children: <TimeConfig />,
  },
  {
    label: <FormattedMessage id="system.tab.routing" />,
    key: 'routing',
    children: <RoutingConfig />,
  },
  {
    label: <FormattedMessage id="system.tab.firmware" />,
    key: 'firmware',
    children: <FirmwareConfig />,
  },
  {
    label: (
      <div>
        4G&nbsp;&nbsp;
        <FormattedMessage id="system.tab.4gNetwork" />
      </div>
    ),
    key: 'apn',
    children: <Network4GConfig />,
  },
  {
    label: <FormattedMessage id="system.tab.backup" />,
    key: 'backup',
    children: <DataBackupConfig />,
  },
  {
    label: <FormattedMessage id="system.tab.user" />,
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
    // setActiveKey('resource');
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
