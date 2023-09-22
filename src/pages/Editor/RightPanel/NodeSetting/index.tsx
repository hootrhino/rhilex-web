import { cn, IconFont } from '@/utils/utils';
import { ConfigProvider, Space, Tabs } from 'antd';
import { useState } from 'react';
import CommonStyle from './CommonStyle';
import DataSource from './DataSource';
import './index.less';

type NodeSettingProps = {
  // shape: string;
};

const NodeSetting = ({  }: NodeSettingProps) => {
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
      label: getLabel('高级', 'advanced', 'icon-advance-setting'),
      key: 'advanced',
      disabled: true,
      children: <div>advance setting</div>,
    },
  ];

  return (
    <div className={cn('h-full', activeTab === 'dataSource' ? 'w-[400px]' : 'w-[332px]')}>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              cardGutter: 0,
              itemColor: '#7a7a7a',
              itemActiveColor: '#DBDBDB',
              itemSelectedColor: '#DBDBDB',
              itemHoverColor: '#7A7A7A',
              inkBarColor: 'transparent',
              fontSize: 12,
            },
          },
        }}
      >
        <Tabs
          activeKey={activeTab}
          destroyInactiveTabPane={true}
          size="small"
          items={items}
          className={cn('node-setting-tab', activeTab === 'dataSource' && 'node-setting-tab-lg')}
          onChange={(activeKey) => setActiveTab(activeKey)}
        />
      </ConfigProvider>
    </div>
  );
};

export default NodeSetting;
