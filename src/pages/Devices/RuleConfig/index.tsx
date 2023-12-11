import { getRulesByDevice } from '@/services/rulex/shebeiguanli';
import { history, useModel, useParams, useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';
import RuleConfig from '../../RuleConfig';

const RuleConfigList = () => {
  const { deviceId } = useParams();
  const {data: deviceList} = useModel('useDevice');
  const [deviceName, setName] = useState<string>('');

  const { data, run: getRuleList, refresh } = useRequest(
    (params: API.getRulesByDeviceParams) => getRulesByDevice(params),
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (deviceId) {
      const device = deviceList?.find(item => item?.uuid === deviceId);
      setName(device?.name || '');
      getRuleList({ deviceId });
    }
  }, [deviceId, deviceList]);

  return <RuleConfig pageTitle={`${deviceName} 规则配置`} dataSource={data} type="device" typeId={deviceId || ''} refresh={refresh} onBack={() => history.push('/device/list')}/>;
};

export default RuleConfigList;
