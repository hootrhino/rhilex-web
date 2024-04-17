import { ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import Config from './Config';
import List from './List';

const RoutingConfig = () => {
  const [activeKey, setActiveKey] = useState<string>('config');

  return (
    <ProCard
      title="路由设置"
      className="mb-[12px]"
      tabs={{
        tabPosition: 'top',
        className: 'px-[24px] routing-tab',
        activeKey,
        indicator: { align: 'start' },
        items: [
          {
            label: `DHCP 配置`,
            key: 'config',
            children: <Config />,
          },
          {
            label: `DHCP 列表`,
            key: 'list',
            children: <List />,
          },
        ],
        onChange: (key) => setActiveKey(key),
      }}
    />
  );
};

export default RoutingConfig;
