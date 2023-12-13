import { PageContainer } from '@ant-design/pro-components';
import { history, useModel, useParams } from '@umijs/max';
import ModbusSheet from './ModbusSheet';
import PlcSheet from './PlcSheet';
import { useEffect, useState } from 'react';

const SpecificSheet = () => {
  const { deviceType, deviceId } = useParams();
  const {data: deviceList} = useModel('useDevice');
  const [deviceName, setName] = useState<string>('');

 useEffect(() => {
  const device = deviceList?.find(item => item?.uuid === deviceId);
  setName(device?.name || '');
 }, [deviceId, deviceList]);

  return (
    <PageContainer title={deviceName ? `${deviceName} 点位表配置` : '点位表配置'} onBack={() => history.push('/device/list')}>
      {deviceType === 'GENERIC_MODBUS' && <ModbusSheet />}
      {deviceType === 'SIEMENS_PLC' && <PlcSheet />}
    </PageContainer>
  );
};

export default SpecificSheet;
