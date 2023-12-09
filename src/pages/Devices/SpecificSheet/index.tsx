import { PageContainer } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import ModbusSheet from './ModbusSheet';
import PlcSheet from './PlcSheet';

const SpecificSheet = () => {
  const { deviceType } = useParams();

  return (
    <PageContainer onBack={() => history.push('/device/list')}>
      {deviceType === 'GENERIC_MODBUS' && <ModbusSheet />}
      {deviceType === 'S1200PLC' && <PlcSheet />}
    </PageContainer>
  );
};

export default SpecificSheet;
