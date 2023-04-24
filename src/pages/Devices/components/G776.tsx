import CommonConfigForm from './CommonConfig';
import UartConfigForm from './UartConfig';

const G776Form = () => {
  return (
    <>
      <CommonConfigForm type="USER_G776" />
      <UartConfigForm />
    </>
  );
};

export default G776Form;
