import { useIntl } from '@umijs/max';
import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';
import RuleList from './RuleList';

type RuleExampleProps = DrawerProps;

// TODO 暂时隐藏自定义规则
const RuleExample = ({ ...props }: RuleExampleProps) => {
  const { formatMessage } = useIntl();

  // const [activeTabKey, setActiveTabKey] = useState<string>('example');
  // const [open, setOpen] = useState<boolean>(false);
  // const [tplId, setTplId] = useState<string>('');

  // const items: TabsProps['items'] = [
  //   {
  //     key: 'example',
  //     label: formatMessage({ id: 'component.tab.example' }),
  //   },
  //   {
  //     key: 'addRule',
  //     label: formatMessage({ id: 'component.tab.addRule' }),
  //   },
  // ];

  // const children = {
  //   example: <RuleList activeTabKey={activeTabKey} />,
  //   addRule: <CustomRule open={open} tplId={tplId} updateId={setTplId} onOpenChange={setOpen} />,
  // };

  return (
    <Drawer
      destroyOnClose
      maskClosable={false}
      // styles={{
      //   header: { border: 'none', padding: '16px 24px 10px 24px' },
      // }}
      placement="right"
      size="large"
      title={formatMessage({ id: 'component.tab.example' })}
      // title={
      //   <Tabs
      //     activeKey={activeTabKey}
      //     items={items}
      //     onChange={(activeKey) => setActiveTabKey(activeKey)}
      //     rootClassName="lua-example-tabs"
      //   />
      // }
      // extra={
      //   activeTabKey === 'addRule' ? (
      //     <Button
      //       key="add"
      //       type="primary"
      //       icon={<PlusOutlined />}
      //       onClick={() => {
      //         setOpen(true);
      //         setTplId('');
      //       }}
      //     >
      //       {formatMessage({ id: 'button.new' })}
      //     </Button>
      //   ) : null
      // }
      {...props}
    >
      <RuleList />
      {/* {children[activeTabKey]} */}
    </Drawer>
  );
};

export default RuleExample;
