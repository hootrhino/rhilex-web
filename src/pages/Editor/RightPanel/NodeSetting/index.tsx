import { cn, IconFont } from '@/utils/utils';
import { ConfigProvider, Space, Tabs } from 'antd';
import { useState } from 'react';
import CommonStyle from './CommonStyle';
import DataSource from './DataSource';
import './index.less';

const NodeSetting = () => {
  const [activeTab, setActiveTab] = useState<string>('commonStyle');

  const getLabel = (label: string, key: string, icon: string) => (
    <Space align="center">
      <IconFont type={activeTab === key ? `${icon}-active` : icon} />
      <span>{label}</span>
    </Space>
  );

  const items = [
    {
      label: getLabel('样式', 'commonStyle', 'icon-style-setting'),
      key: 'commonStyle',
      children: <CommonStyle />,
    },
    {
      label: getLabel('数据源', 'dataSource', 'icon-data-setting'),
      key: 'dataSource',
      children: <DataSource />,
    },
    {
      label: getLabel('高级', 'advanced', 'icon-widget'),
      key: 'advanced',
      disabled: true,
      children: <CommonStyle />,
    },
  ];

  return (
    <div className="h-full w-[332px]">
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              cardGutter: 0,
              itemActiveColor: '#DBDBDB',
              itemSelectedColor: '#DBDBDB',
              itemHoverColor: '#7A7A7A',
              inkBarColor: 'transparent',
            },
          },
        }}
      >
        <Tabs
          activeKey={activeTab}
          destroyInactiveTabPane={true}
          size="small"
          items={items}
          className={cn('node-setting-tab')}
          onChange={(activeKey) => setActiveTab(activeKey)}
        />
      </ConfigProvider>
    </div>
  );
};

export default NodeSetting;
