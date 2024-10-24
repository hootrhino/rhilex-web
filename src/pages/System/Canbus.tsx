import { ProCard } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Empty } from 'antd';

const CanBus = () => {
  const { formatMessage } = useIntl();
  const { canbus: ifaceData } = useModel('useSystem');

  return (
    <ProCard
      title={formatMessage({ id: 'system.tab.setting' }, { item: 'CAN' })}
      className="h-full"
      headStyle={{ paddingBlock: 0 }}
      bodyStyle={
        ifaceData && ifaceData.length > 0
          ? {}
          : { display: 'flex', justifyContent: 'center', alignItems: 'center' }
      }
    >
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={formatMessage({ id: 'system.desc.empty' })}
      />
    </ProCard>
  );
};

export default CanBus;
