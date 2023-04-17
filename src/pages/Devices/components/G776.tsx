import {
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';

const G776Form = () => {
  return (
    <>
      <ProFormText
        label="数据 Tag"
        name={['config', 'tag']}
        placeholder="给数据打个tag"
        rules={[
          {
            required: true,
            message: '请输入数据tag',
          },
        ]}
      />
      <ProFormText
        label="串口路径"
        name={['config', 'uart']}
        placeholder="请输入本地系统的串口路径"
        rules={[
          {
            required: true,
            message: '请输入本地系统的串口路径',
          },
        ]}
      />

      <ProFormSelect
        label="波特率"
        name={['config', 'baudRate']}
        placeholder="请选择串口通信波特率"
        rules={[{ required: true, message: '请选择串口通信波特率' }]}
        options={[
          { label: '4800', value: 4800 },
          { label: '9600', value: 9600 },
          { label: '115200', value: 115200 },
        ]}
      />
      <ProFormDigit
        label="数据位"
        name={['config', 'dataBits']}
        placeholder="请输入串口通信数据位"
        rules={[{ required: true, message: '请输入串口通信数据位' }]}
      />
      <ProFormText
        label="协议分隔符"
        name={['config', 'decollator']}
        placeholder="请输入协议分隔符"
        rules={[
          {
            required: true,
            message: '请输入协议分隔符',
          },
        ]}
      />
      <ProFormSwitch name={['config', 'autoRequest']} label="是否启动轮询" />
      <ProFormDigit
        label="采集频率"
        tooltip="单位为秒"
        name={['config', 'frequency']}
        rules={[{ required: true, message: '请输入采集频率' }]}
      />
      <ProFormDigit
        label="超时时间"
        tooltip="单位为秒"
        name={['config', 'timeout']}
        rules={[{ required: true, message: '请输入超时时间' }]}
      />
      <ProFormSelect
        label="奇偶校验"
        name={['config', 'parity']}
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
        label="停止位"
        name={['config', 'stopBits']}
        rules={[{ required: true, message: '请输入串口通信停止位' }]}
      />
    </>
  );
};

export default G776Form;
