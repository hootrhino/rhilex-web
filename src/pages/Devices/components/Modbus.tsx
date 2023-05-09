import CommonConfigForm from './CommonConfig';
import RegisterConfigForm from './RegisterConfig';

import TcpConfigForm from './TcpConfig';
import UartConfigForm from './UartConfig';


type ModbusFormProps = {
  mode: string;
};

const ModbusForm = ({ mode }: ModbusFormProps) => {
  return (
    <>
      <CommonConfigForm type="GENERIC_MODBUS" />
      {mode === 'rtu' ? <UartConfigForm type="GENERIC_MODBUS" /> : <TcpConfigForm />}
      <RegisterConfigForm />
    </>
  );
};

export default ModbusForm;
