import { ProCard } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Empty } from 'antd';

const Network5G = () => {
  const { formatMessage } = useIntl();
  const { net5g: ifaceData } = useModel('useSystem');

  return (
    <ProCard
      title={formatMessage({ id: 'system.tab.setting' }, { item: '5G' })}
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

export default Network5G;
