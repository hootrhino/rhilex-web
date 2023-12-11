import { getInendsList, getRulesByInend } from '@/services/rulex/shuruziyuanguanli';
import { history, useParams, useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';
import RuleConfig from '../../RuleConfig';

const RuleConfigList = () => {
  const { inendId } = useParams();
  const [name, setName] = useState<string>('');

  const { data, run: getRuleList, refresh } = useRequest(
    (params: API.getRulesByInendParams) => getRulesByInend(params),
    {
      manual: true,
    },
  );

  useRequest(() => getInendsList(), {
    onSuccess: (res) => {
      const inends = (res || [])?.find(item => item?.uuid === inendId);
      setName(inends?.name);
    }
  })

  useEffect(() => {
    if (inendId) {
      getRuleList({ inendId });
    }
  }, [inendId]);

  return <RuleConfig pageTitle={`${name} 规则配置`} dataSource={data} type="inends" typeId={inendId || ''} refresh={refresh} onBack={() => history.push('/inends/list')}/>;
};

export default RuleConfigList;
