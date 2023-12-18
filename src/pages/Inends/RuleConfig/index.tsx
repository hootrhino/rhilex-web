import { getInendsList, getRulesByInend } from '@/services/rulex/shuruziyuanguanli';
import { useParams, useRequest } from '@umijs/max';
import RuleConfig from '../../RuleConfig';

const RuleConfigList = () => {
  const { inendId } = useParams();

  const { data, refresh } = useRequest(
    () => getRulesByInend({ inendId: inendId || '' }),
    {
      ready: !!inendId,
    },
  );

  const {data: inendsList} = useRequest(() => getInendsList())

  return <RuleConfig dataSource={data} pageTitleData={inendsList as Record<string, any>[]} type="inends" typeId={inendId || ''} refresh={refresh} />;
};

export default RuleConfigList;
