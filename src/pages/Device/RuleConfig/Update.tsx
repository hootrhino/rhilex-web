import { RuleType } from '@/pages/RuleConfig';
import RuleForm from '@/pages/RuleConfig/Update';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { useParams, useRequest } from '@umijs/max';
import { useEffect } from 'react';
import { DeviceType } from '../enum';

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

  return (
    <RuleForm
      type={RuleType.DEVICE}
      typeId={deviceId || ''}
      deviceType={detail?.type as DeviceType}
    />
  );
};

export default RuleConfigUpdate;
