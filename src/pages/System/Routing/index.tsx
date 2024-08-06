import { ProCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useState } from 'react';
import Config from './Config';
import List from './List';

const RoutingConfig = () => {
  const { formatMessage } = useIntl();
  const [activeKey, setActiveKey] = useState<string>('config');

  return (
    <ProCard
      title={formatMessage({ id: 'system.tab.routing' })}
      className="mb-[12px]"
      headStyle={{ paddingBlock: 0 }}
      tabs={{
        tabPosition: 'top',
        className: 'px-[24px] routing-tab',
        activeKey,
        indicator: { align: 'start' },
        items: [
          {
            label: formatMessage({ id: 'system.routing.tab.config' }),
            key: 'config',
            children: <Config />,
          },
          {
            label: formatMessage({ id: 'system.routing.tab.list' }),
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
