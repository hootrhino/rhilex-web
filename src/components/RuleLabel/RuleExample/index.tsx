import { PlusOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import type { DrawerProps, TabsProps } from 'antd';
import { Button, Drawer, Tabs } from 'antd';
import { useState } from 'react';
import BuiltInRule from './BuiltIn';
import CustomRule from './Custom';

type RuleExampleProps = DrawerProps;

const RuleExample = ({ ...props }: RuleExampleProps) => {
  const { formatMessage } = useIntl();

  const [activeTabKey, setActiveTabKey] = useState<string>('example');
  const [open, setOpen] = useState<boolean>(false);
  const [tplId, setTplId] = useState<string>('');

  const items: TabsProps['items'] = [
    {
      key: 'example',
      label: formatMessage({ id: 'component.tab.example' }),
    },
    {
      key: 'addRule',
      label: formatMessage({ id: 'component.tab.addRule' }),
    },
  ];

  const children = {
    example: <BuiltInRule activeTabKey={activeTabKey} />,
    addRule: <CustomRule open={open} tplId={tplId} updateId={setTplId} onOpenChange={setOpen} />,
  };

  return (
    <Drawer
      destroyOnClose
      maskClosable={false}
      styles={{
        header: { border: 'none', padding: '16px 24px 10px 24px' },
      }}
      placement="right"
      size="large"
      title={
        <Tabs
          activeKey={activeTabKey}
          items={items}
          onChange={(activeKey) => setActiveTabKey(activeKey)}
          rootClassName="lua-example-tabs"
        />
      }
      extra={
        activeTabKey === 'addRule' ? (
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpen(true);
              setTplId('');
            }}
          >
            {formatMessage({ id: 'button.new' })}
          </Button>
        ) : null
      }
      {...props}
    >
      {children[activeTabKey]}
    </Drawer>
  );
};

export default RuleExample;
