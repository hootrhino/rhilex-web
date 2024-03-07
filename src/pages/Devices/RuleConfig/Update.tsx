import RuleForm from '@/pages/RuleConfig/Update';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { useParams, useRequest } from '@umijs/max';
import { useEffect } from 'react';

const RuleConfigUpdate = () => {
  const { deviceId } = useParams();
  const { data: detail, run: getDetail } = useRequest(
    (params: API.getDevicesDetailParams) => getDevicesDetail(params),
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (deviceId) {
      getDetail({ uuid: deviceId });
    }
  }, [deviceId]);

  return <RuleForm type="device" typeId={deviceId || ''} deviceType={detail?.type} />;
};

export default RuleConfigUpdate;
