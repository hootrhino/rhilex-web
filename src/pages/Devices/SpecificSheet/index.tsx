import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { PageContainer } from '@ant-design/pro-components';
import { history, useParams, useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';
import ModbusSheet from './ModbusSheet';
import PlcSheet from './PlcSheet';

const SpecificSheet = () => {
  const { deviceType, deviceId } = useParams();
  const [title, setTitle] = useState<string>('点位表配置');

  // 设备详情
  const { run } = useRequest((params: API.getDevicesDetailParams) => getDevicesDetail(params), {
    manual: true,
    onSuccess: (record) =>
      setTitle(record?.name ? `设备 ${record?.name} - 点位表配置` : '点位表配置'),
  });

  useEffect(() => {
    if (deviceId) {
      run({ uuid: deviceId });
    }
  }, [deviceId]);

  return (
    <PageContainer title={title} onBack={() => history.push('/device/list')}>
      {deviceType === 'GENERIC_MODBUS' && deviceId && <ModbusSheet deviceUuid={deviceId} />}
      {deviceType === 'SIEMENS_PLC' && deviceId && <PlcSheet deviceUuid={deviceId} />}
    </PageContainer>
  );
};

export default SpecificSheet;
