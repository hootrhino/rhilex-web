import { RuleType } from '@/pages/RuleConfig';
import RuleForm from '@/pages/RuleConfig/Update';
import { getInendsDetail } from '@/services/rulex/shuruziyuanguanli';
import { useParams, useRequest } from '@umijs/max';
import { useEffect } from 'react';
import { InendType } from '../enum';

const RuleConfigUpdate = () => {
  const { inendId } = useParams();

  const { data: detail, run: getDetail } = useRequest(
    (params: API.getInendsDetailParams) => getInendsDetail(params),
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (inendId) {
      getDetail({ uuid: inendId });
    }
  }, [inendId]);

  return (
    <RuleForm type={RuleType.INEND} typeId={inendId || ''} inendType={detail?.type as InendType} />
  );
};

export default RuleConfigUpdate;
