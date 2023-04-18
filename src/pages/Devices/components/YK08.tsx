import { ProForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';

const YK08Form = () => {
  return (
    <>
      <ProForm.Group>
        <ProFormSelect
          width="lg"
          label="Modbus 模式"
          name={['config', 'mode']}
          options={[{ label: 'RTU', value: 'RTU' }]}
          placeholder="请选择Modbus 模式"
          rules={[{ required: true, message: '请选择Modbus 模式' }]}
        />
        <ProFormDigit
          width="lg"
          label="从设备ID"
          name={['config', 'slaverIds']}
          rules={[{ required: true, message: '请输入设备ID' }]}
        />
        <ProFormDigit
          width="lg"
          label="超时时间"
          tooltip="单位为秒"
          name={['config', 'timeout']}
          rules={[{ required: true, message: '请输入超时时间' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          width="lg"
          label="采集频率"
          tooltip="单位为秒"
          name={['config', 'frequency']}
          rules={[{ required: true, message: '请输入采集频率' }]}
        />
        <ProFormText
          width="lg"
          label="串口路径"
          name={['config', 'config', 'uart']}
          placeholder="请输入本地系统的串口路径"
          rules={[
            {
              required: true,
              message: '请输入本地系统的串口路径',
            },
          ]}
        />

        <ProFormSelect
          width="lg"
          label="波特率"
          name={['config', 'config', 'baudRate']}
          placeholder="请选择串口通信波特率"
          rules={[{ required: true, message: '请选择串口通信波特率' }]}
          options={[
            { label: '4800', value: 4800 },
            { label: '9600', value: 9600 },
            { label: '115200', value: 115200 },
          ]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormDigit
          width="lg"
          label="数据位"
          name={['config', 'config', 'dataBits']}
          placeholder="请输入串口通信数据位"
          rules={[{ required: true, message: '请输入串口通信数据位' }]}
        />
        <ProFormSelect
          width="lg"
          label="奇偶校验"
          name={['config', 'config', 'parity']}
          placeholder="请选择奇偶校验"
          rules={[
            {
              required: true,
              message: '请选择奇偶校验',
            },
          ]}
          options={[
            { label: '奇校验', value: 'E' },
            { label: '偶校验', value: 'O' },
            { label: '不校验', value: 'N' },
          ]}
        />
        <ProFormDigit
          width="lg"
          label="停止位"
          name={['config', 'config', 'stopBits']}
          rules={[{ required: true, message: '请输入串口通信停止位' }]}
        />
      </ProForm.Group>
    </>
  );
};

export default YK08Form;
