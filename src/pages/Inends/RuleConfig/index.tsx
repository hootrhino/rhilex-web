import { getRulesByInend } from '@/services/rulex/shuruziyuanguanli';
import { useParams, useRequest } from '@umijs/max';
import { useEffect } from 'react';
import RuleConfig from '../../RuleConfig';

const RuleConfigList = () => {
  const { inendId } = useParams();

  const { data, run: getRuleList, refresh } = useRequest(
    (params: API.getRulesByInendParams) => getRulesByInend(params),
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (inendId) {
      getRuleList({ inendId });
    }
  }, [inendId]);

  return <RuleConfig dataSource={data} type="inends" typeId={inendId || ''} refresh={refresh} />;
};

export default RuleConfigList;
