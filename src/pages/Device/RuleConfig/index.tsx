import type { TestType } from '@/pages/RuleConfig/Debug';
import { getDevicesDetail, getRulesByDevice } from '@/services/rulex/shebeiguanli';
import { useParams, useRequest } from '@umijs/max';
import RuleConfig, { RuleType } from '../../RuleConfig';

const RuleConfigList = () => {
  const { deviceId } = useParams();

  const { data, refresh } = useRequest(() => getRulesByDevice({ deviceId: deviceId || '' }), {
    ready: !!deviceId,
    refreshDeps: [deviceId],
  });

  // 获取设备详情
  const { data: deviceDetail } = useRequest(() => getDevicesDetail({ uuid: deviceId || '' }), {
    ready: !!deviceId,
    refreshDeps: [deviceId],
  });

  return (
    <RuleConfig
      dataSource={data}
      pageTitle={deviceDetail?.name || ''}
      type={RuleType.DEVICE}
      typeId={deviceId || ''}
      testType={deviceDetail?.type as TestType}
      refresh={refresh}
    />
  );
};

export default RuleConfigList;
