import {
ProForm,
ProFormDigit,
ProFormList,
ProFormSegmented,
ProFormSelect,
ProFormText
} from '@ant-design/pro-components';

type CommonConfigProps = {
  type?: 'GENERIC_SNMP' | 'USER_G776' | 'GENERIC_PROTOCOL' | 'MODBUS';
};

const CommonConfigForm = ({ type = 'GENERIC_SNMP' }: CommonConfigProps) => {
  return (
    <ProForm.Group title="通用配置">
      <ProFormList
        name={['config', 'commonConfig']}
        creatorButtonProps={false}
        copyIconProps={false}
        deleteIconProps={false}
      >
        <ProForm.Group>
          <ProFormDigit
            width="lg"
            label="采集频率（毫秒）"
            name="frequency"
            rules={[{ required: true, message: '请输入采集频率' }]}
          />
          {type !== 'GENERIC_PROTOCOL' && (
            <ProFormSegmented
              width="lg"
              name="autoRequest"
              label="是否启动轮询"
              valueEnum={{
                true: '是',
                false: '否',
              }}
              fieldProps={{ block: true } as any}
            />
          )}

          {type === 'USER_G776' && (
            <>
              <ProFormText
                width="lg"
                label="数据标签"
                name="tag"
                placeholder="请输入数据标签"
                rules={[
                  {
                    required: true,
                    message: '请输入数据标签',
                  },
                ]}
              />
            </>
          )}
          {type === 'GENERIC_PROTOCOL' && (
            <>
              <ProFormSelect
                width="lg"
                label="通信形式"
                name="transport"
                placeholder="请选择通信形式"
                rules={[{ required: true, message: '请选择通信形式' }]}
                options={[
                  // { label: 'rawtcp', value: 'rawtcp' },
                  // { label: 'rawudp', value: 'rawudp' },
                  { label: 'RS485串口连接', value: 'rs485rawserial' },
                  // { label: 'rs485rawtcp', value: 'rs485rawtcp' },
                ]}
              />
              <ProFormDigit
                width="lg"
                label="重试次数"
                name="retryTime"
                rules={[{ required: true, message: '请输入重试次数' }]}
              />
            </>
          )}
          {type === 'MODBUS' && (
            <ProFormDigit
              width="lg"
              label="超时时间（毫秒）"
              name="timeout"
              rules={[{ required: true, message: '请输入超时时间' }]}
            />
          )}
        </ProForm.Group>
        <ProForm.Group>
          {type === 'USER_G776' && (
            <ProFormSelect
              width="lg"
              label="协议分隔符"
              name="separator"
              placeholder="请输入协议分隔符"
              options={[
                { label: 'LF', value: 'LF' },
                { label: 'CRLF', value: 'CRLF' },
              ]}
            />
          )}
          {type === 'MODBUS' && (
            <ProFormSelect
              width="lg"
              label="工作模式"
              name="mode"
              placeholder="请选择工作模式"
              options={[
                { label: 'RTU', value: 'rtu' },
                { label: 'TCP', value: 'tcp' },
              ]}
              rules={[{ required: true, message: '请选择工作模式' }]}
            />
          )}
        </ProForm.Group>
      </ProFormList>
    </ProForm.Group>
  );
};

export default CommonConfigForm;
