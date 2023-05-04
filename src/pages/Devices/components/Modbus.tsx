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
      <CommonConfigForm type="MODBUS" />
      {mode === 'rtu' ? <UartConfigForm type="Modbus" /> : <TcpConfigForm />}
      <RegisterConfigForm />
    </>
  );
};

export default ModbusForm;
