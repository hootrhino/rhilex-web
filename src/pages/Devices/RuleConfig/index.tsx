import { getRulesByDevice } from '@/services/rulex/shebeiguanli';
import { useParams, useRequest } from '@umijs/max';
import { useEffect } from 'react';
import RuleConfig from '../../RuleConfig';

const RuleConfigList = () => {
  const { deviceId } = useParams();

  const { data, run: getRuleList } = useRequest(
    (params: API.getRulesByDeviceParams) => getRulesByDevice(params),
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (deviceId) {
      getRuleList({ deviceId });
    }
  }, [deviceId]);

  return <RuleConfig dataSource={data} type="device" typeId={deviceId || ''} />;
};

export default RuleConfigList;
