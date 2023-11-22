import { ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import Title from '../TItle';
import Config from './Config';
import List from './List';

const RoutingConfig = () => {
  const [activeKey, setActiveKey] = useState<string>('config');

  return (
    <>
      <Title name="路由设置" />
      <ProCard
        className="mb-[12px]"
        tabs={{
          tabPosition: 'top',
          activeKey,
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
    </>
  );
};

export default RoutingConfig;
