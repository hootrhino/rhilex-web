import { getInendsDetail, getRulesByInend } from '@/services/rulex/shuruziyuanguanli';
import { useParams, useRequest } from '@umijs/max';
import RuleConfig from '../../RuleConfig';

const RuleConfigList = () => {
  const { inendId } = useParams();

  const { data, refresh } = useRequest(() => getRulesByInend({ inendId: inendId || '' }), {
    ready: !!inendId,
  });

  const { data: inendsDetail } = useRequest(() => getInendsDetail({ uuid: inendId || '' }), {
    ready: !!inendId,
    refreshDeps: [inendId],
  });

  return (
    <RuleConfig
      dataSource={data}
      pageTitle={inendsDetail?.name || ''}
      type="inends"
      typeId={inendId || ''}
      refresh={refresh}
    />
  );
};

export default RuleConfigList;
