import PageContainer from '@/components/ProPageContainer';
import { getSettingsCtrlTree } from '@/services/rulex/wangluopeizhi';
import { Product } from '@/utils/enum';
import { ProCard } from '@ant-design/pro-components';
import { FormattedMessage, useModel, useRequest } from '@umijs/max';
import type { TabPaneProps } from 'antd';
import { useEffect, useState } from 'react';
import DataBackupConfig from './DataBackup';
import FirmwareConfig from './Firmware';
import NetworkConfig from './Network';
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

type NetworkItem = {
  name: string;
  [key: string]: any;
};

const defaultConfig = ['resource', 'port', 'firmware', 'backup', 'user'];

const System = () => {
  const { isWindows, product, activeKey, setActiveKey } = useModel('useSystem');
  const [interfaceOption, setInterfaceOption] = useState<OptionItem[]>([]);
  const [tabItems, setItems] = useState<TabItem[]>([]);

  const accessToken = localStorage.getItem('accessToken');

  const baseItems = [
    {
      label: <FormattedMessage id="system.tab.resource" />,
      key: 'resource',
      children: <Resource />,
    },
    {
      label: <FormattedMessage id="system.tab.netStatus" />,
      key: 'netStatus',
      children: <NetworkStatus />,
    },
    {
      label: <FormattedMessage id="system.tab.port" />,
      key: 'port',
      children: <PortSettings />,
    },
    {
      label: <FormattedMessage id="system.tab.network" />,
      key: 'network',
      children: <NetworkConfig interfaceOption={interfaceOption} />,
    },
    {
      label: <FormattedMessage id="system.tab.routing" />,
      key: 'routing',
      children: <RoutingConfig />,
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
      label: <FormattedMessage id="system.tab.firmware" />,
      key: 'firmware',
      children: <FirmwareConfig />,
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

  const changeItems = (hasWifi: boolean, hasRoute: boolean) => {
    const filteredItems = baseItems.filter((item) => {
      if (isWindows) {
        return defaultConfig.includes(item.key);
      } else {
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
  };

  const changeInterface = (network: NetworkItem[]) => {
    const newOption =
      network && network.length > 0
        ? network?.map((item) => ({ label: item?.name || '', value: item?.name || '' }))
        : [];
    setInterfaceOption(newOption);
  };

  useRequest(() => getSettingsCtrlTree(), {
    ready: !!accessToken,
    onSuccess: (res) => {
      if (!res) return;
      const { wlan, soft_router, network } = res;

      const hasWifi = wlan && wlan.length > 0;
      const hasRoute = soft_router && soft_router.length > 0;

      changeItems(hasWifi, hasRoute);
      changeInterface(network);
    },
  });

  useEffect(() => {
    setItems(baseItems);
  }, []);

  return (
    <PageContainer>
      <ProCard
        tabs={{
          tabPosition: 'left',
          activeKey,
          className: 'min-h-[700px] overflow-hidden',
          cardProps: { bodyStyle: { paddingBlock: 24 } },
          items: tabItems,
          onChange: (key) => {
            setActiveKey(key);
          },
        }}
        className="h-full"
      />
    </PageContainer>
  );
};

export default System;
