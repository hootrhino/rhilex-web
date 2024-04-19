import type { DrawerProps, TabsProps } from 'antd';
import { Drawer, Tabs } from 'antd';
import { useState } from 'react';
import CommonRule from './CommonRule';
import CustomRule from './CustomRule';

type LuaExampleProps = DrawerProps;

const LuaExample = ({ ...props }: LuaExampleProps) => {
  const [activeTabKey, setActiveTabKey] = useState<string>('example');

  const items: TabsProps['items'] = [
    {
      key: 'example',
      label: '常用规则示例',
      children: <CommonRule activeTabKey={activeTabKey} />,
    },
    {
      key: 'addRule',
      label: '新建规则示例',
      children: <CustomRule />,
    },
  ];

  return (
    <>
      <Drawer
        destroyOnClose
        maskClosable={false}
        styles={{
          body: { padding: '0px 24px 24px 24px' },
          header: { border: 'none', padding: '16px 24px 10px 24px' },
        }}
        placement="right"
        size="large"
        {...props}
      >
        <Tabs
          activeKey={activeTabKey}
          items={items}
          onChange={(activeKey) => setActiveTabKey(activeKey)}
        />
      </Drawer>
    </>
  );
};

export default LuaExample;
