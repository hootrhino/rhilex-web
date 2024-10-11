import PageContainer from '@/components/ProPageContainer';
import { getMenuDistConfig } from '@/services/rhilex/caozuocaidan';
import { ProCard } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import DataBackupConfig from './DataBackup';
import FirmwareConfig from './Firmware';
import NetworkConfig from './Network';
import NetworkStatus from './NetworkStatus';
// TODO v0.7.5 版本移除这个模块 import PortSettings from './PortMgt';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useMemo } from 'react';
import NoFoundPage from '../403';
import Resource from './Resource';
import ScheduledReboot from './ScheduledReboot';
import TimeConfig from './Time';
import UserConfig from './User';
import WIFIConfig from './Wifi';

type MenuItem = Required<MenuProps>['items'][number];

const System = () => {
  const { formatMessage } = useIntl();
  const { activeKey, setActiveKey } = useModel('useSystem');

  const menuItems: MenuItem[] = [
    {
      key: 'resource',
      label: formatMessage({ id: 'system.tab.resource' }),
    },

    {
      type: 'divider',
    },
    {
      key: 'nerworking',
      label: formatMessage({ id: 'system.tab.nerworking' }),
      type: 'group',
      children: [
        { key: 'netStatus', label: formatMessage({ id: 'system.tab.netStatus' }) },
        { key: 'network', label: formatMessage({ id: 'system.tab.network' }) },
        { key: 'wifi', label: formatMessage({ id: 'system.tab.setting' }, { item: 'WIFI' }) },
        { key: 'net4g', label: formatMessage({ id: 'system.tab.setting' }, { item: '4G' }) },
        { key: 'net5g', label: formatMessage({ id: 'system.tab.setting' }, { item: '5G' }) },
        { key: 'can', label: formatMessage({ id: 'system.tab.setting' }, { item: 'CAN' }) },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'datetime',
      label: formatMessage({ id: 'system.tab.datetime' }),
      type: 'group',
      children: [
        { key: 'time', label: formatMessage({ id: 'system.tab.time' }) },
        { key: 'reboot', label: formatMessage({ id: 'system.tab.reboot' }) },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'sysver',
      label: formatMessage({ id: 'system.tab.sysver' }),
      type: 'group',
      children: [
        { key: 'firmware', label: formatMessage({ id: 'system.tab.firmware' }) },
        { key: 'backup', label: formatMessage({ id: 'system.tab.backup' }) },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'user',
      label: formatMessage({ id: 'system.tab.user' }),
    },
  ];

  const renderComponent = () => {
    // TODO 4g,5g,can
    switch (activeKey) {
      case 'resource':
        return <Resource />;
      case 'netStatus':
        return <NetworkStatus />;
      case 'network':
        return <NetworkConfig />;
      case 'wifi':
        return <WIFIConfig />;
      case 'time':
        return <TimeConfig />;
      case 'reboot':
        return <ScheduledReboot />;
      case 'firmware':
        return <FirmwareConfig />;
      case 'backup':
        return <DataBackupConfig />;
      case 'user':
        return <UserConfig />;
      default:
        return <NoFoundPage />;
    }
  };

  // 获取系统菜单权限
  const { data } = useRequest(() => getMenuDistConfig());

  const accessItems = useMemo(() => {
    const newData = menuItems.filter((item) => {
      if (item?.type === 'divider') return true;
      const activeMenu = data?.find((menu) => menu.key === item?.key);

      if (item?.type === 'group' && item.children) {
        item.children = item.children.filter((child) => {
          const accessChild = activeMenu?.children.find((c) => c.key === child?.key);
          return accessChild && accessChild.access;
        });

        // 如果过滤后的子项数组为空，则不返回该 group
        if (item.children.length === 0) return false;
      }

      return activeMenu && activeMenu.access;
    });

    return newData;
  }, [data]);

  return (
    <PageContainer>
      <ProCard bodyStyle={{ paddingInline: '0 24px' }} split="vertical">
        <ProCard colSpan={3} bodyStyle={{ paddingInline: '12px 0' }}>
          <Menu
            onClick={(e) => setActiveKey(e.key)}
            selectedKeys={[activeKey]}
            mode="inline"
            items={accessItems}
            style={{ paddingRight: 12, border: 'none' }}
          />
        </ProCard>
        <ProCard className="h-full">{renderComponent()}</ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default System;
