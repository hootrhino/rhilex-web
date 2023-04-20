import {
ProForm,
ProFormDigit,
ProFormList,
ProFormSelect,
ProFormText
} from '@ant-design/pro-components';

const UartConfigForm = () => {
  return (
    <ProForm.Group title="串口配置">
      <ProFormList
        name={['config', 'uartConfig']}
        creatorButtonProps={false}
        copyIconProps={false}
        deleteIconProps={false}
      >
        <ProForm.Group>
          <ProFormDigit
            width="lg"
            label="超时时间（毫秒）"
            name="timeout"
            rules={[{ required: true, message: '请输入超时时间' }]}
          />
          <ProFormSelect
            width="lg"
            label="波特率"
            name="baudRate"
            placeholder="请选择串口通信波特率"
            rules={[{ required: true, message: '请选择串口通信波特率' }]}
            options={[
              { label: '4800', value: 4800 },
              { label: '9600', value: 9600 },
              { label: '115200', value: 115200 },
            ]}
          />
          <ProFormDigit
            width="lg"
            label="数据位"
            name="dataBits"
            placeholder="请输入串口通信数据位"
            rules={[{ required: true, message: '请输入串口通信数据位' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="lg"
            label="奇偶校验"
            name="parity"
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
            name="stopBits"
            rules={[{ required: true, message: '请输入串口通信停止位' }]}
          />
          <ProFormText
            width="lg"
            label="串口路径"
            name="uart"
            placeholder="请输入本地系统的串口路径"
            rules={[
              {
                required: true,
                message: '请输入本地系统的串口路径',
              },
            ]}
          />
        </ProForm.Group>
      </ProFormList>
    </ProForm.Group>
  );
};

export default UartConfigForm;
