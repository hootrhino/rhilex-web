import { getRulesByDevice } from '@/services/rulex/shebeiguanli';
import { useModel, useParams, useRequest } from '@umijs/max';
import RuleConfig from '../../RuleConfig';

const RuleConfigList = () => {
  const { deviceId } = useParams();
  const {data: deviceList} = useModel('useDevice');

  const { data, refresh } = useRequest(
    () => getRulesByDevice({ deviceId: deviceId || '' }),
    {
      ready: !!deviceId
    },
  );

  return <RuleConfig dataSource={data} pageTitleData={deviceList as Record<string, any>[]} type="device" typeId={deviceId || ''} refresh={refresh} />;
};

export default RuleConfigList;
