import PageContainer from '@/components/ProPageContainer';
import { getMenuDistConfig } from '@/services/rhilex/caozuocaidan';
import { getSettingsCtrlTree } from '@/services/rhilex/wangluopeizhi';
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
import ScheduledReboot from './ScheduledReboot';
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

const System = () => {
  const { activeKey, setActiveKey } = useModel('useSystem');
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
    {
      label: <FormattedMessage id="system.tab.reboot" />,
      key: 'reboot',
      children: <ScheduledReboot />,
    },
  ];

  //获取系统菜单权限
  useRequest(() => getMenuDistConfig(), {
    onSuccess: (data) => {
      const accessMenu = baseItems.filter((item) => {
        const activeMenu = data.find((menu) => menu.key === item.key);

        return activeMenu && activeMenu.access;
      });

      setItems(accessMenu);
    },
  });

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
      changeInterface(res?.network);
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
