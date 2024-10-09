import { getSettingsNetStatus } from '@/services/rhilex/wangluopeizhi';
import { ProCard, ProField } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';

const NetworkStatus = () => {
  const { formatMessage } = useIntl();

  const { data } = useRequest(() => getSettingsNetStatus());

  return (
    <ProCard
      title={formatMessage({ id: 'system.tab.netStatus' })}
      headStyle={{ paddingBlock: 0 }}
      className="network-card"
    >
      <ProField text={data} valueType="jsonCode" mode="read" />
    </ProCard>
  );
};

export default NetworkStatus;
