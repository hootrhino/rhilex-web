import { getName } from '@/utils/utils';
import { PageContainer } from '@ant-design/pro-components';
import { history, useModel, useParams } from '@umijs/max';
import { useEffect, useState } from 'react';
import ModbusSheet from './ModbusSheet';
import PlcSheet from './PlcSheet';

const SpecificSheet = () => {
  const { run: getDeviceList } = useModel('useDevice');
  const { deviceType, deviceId, groupId } = useParams();
  const { data: deviceList } = useModel('useDevice');
  const [title, setTitle] = useState<string>('点位表配置');

  useEffect(() => {
    const pageTitle = deviceList && deviceId && getName(deviceList, deviceId);

    setTitle(pageTitle ? `${pageTitle} 点位表配置` : '点位表配置');
  }, [deviceId, deviceList]);

  useEffect(() => {
    getDeviceList({ uuid: groupId || '' });
  }, [groupId]);

  return (
    <PageContainer title={title} onBack={() => history.push('/device/list')}>
      {deviceType === 'GENERIC_MODBUS' && deviceId && <ModbusSheet deviceUuid={deviceId} />}
      {deviceType === 'SIEMENS_PLC' && deviceId && <PlcSheet deviceUuid={deviceId} />}
    </PageContainer>
  );
};

export default SpecificSheet;
