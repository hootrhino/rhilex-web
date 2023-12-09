import { PageContainer } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import ModbusSheet from './ModbusSheet';
import PlcSheet from './PlcSheet';
import useGoBack from '@/hooks/useGoBack';

const SpecificSheet = () => {
  const { showModal } = useGoBack();
  const { deviceType } = useParams();

  return (
    <PageContainer onBack={() => showModal({ url: '/device/list' })}>
      {deviceType === 'GENERIC_MODBUS' && <ModbusSheet />}
      {deviceType === 'S1200PLC' && <PlcSheet />}
    </PageContainer>
  );
};

export default SpecificSheet;
