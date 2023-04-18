import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormSegmented,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';

const SnmpForm = () => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
          width="lg"
          label="主机地址"
          name={['config', 'target']}
          placeholder="请输入主机地址"
          rules={[
            {
              required: true,
              message: '请输入主机地址',
            },
          ]}
        />
        <ProFormDigit
          width="lg"
          label="主机端口"
          name={['config', 'port']}
          placeholder="请输入主机端口"
          rules={[
            {
              required: true,
              message: '请输入主机端口',
            },
          ]}
        />
        <ProFormSelect
          width="lg"
          label="通信形式"
          name={['config', 'transport']}
          placeholder="请选择通信形式"
          rules={[{ required: true, message: '请选择通信形式' }]}
          options={[
            { label: 'TCP', value: 'tcp' },
            { label: 'UDP', value: 'udp' },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="lg"
          label="Community"
          name={['config', 'community']}
          placeholder="请输入Community"
          rules={[
            {
              required: true,
              message: '请输入Community',
            },
          ]}
        />
        <ProFormSegmented
          width="lg"
          name={['config', 'autoRequest']}
          label="是否启动轮询"
          valueEnum={{
            true: '是',
            false: '否',
          }}
          fieldProps={{ block: true } as any}
        />
        <ProFormDigit
          width="lg"
          label="采集频率"
          tooltip="单位为秒"
          name={['config', 'frequency']}
          rules={[{ required: true, message: '请输入采集频率' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="lg"
          label="用户名"
          name={['config', 'username']}
          placeholder="请输入用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        />
        <ProFormSelect
          width="lg"
          label="安全模式"
          name={['config', 'securityModel']}
          placeholder="请选择安全模式"
          rules={[{ required: true, message: '请选择安全模式' }]}
          options={[
            { label: '不认证', value: 0 },
            { label: 'V3 认证', value: 3 },
          ]}
        />
      </ProForm.Group>

      <ProFormDependency name={['config', 'securityModel']}>
        {({ config: { securityModel } }) =>
          securityModel === 3 ? (
            <>
              <ProForm.Group>
                <ProFormSelect
                  width="lg"
                  label="消息选项"
                  name={['config', 'snmpV3MsgFlags']}
                  placeholder="请选择消息选项"
                  rules={[{ required: true, message: '请选择消息选项' }]}
                  options={[
                    { label: 'NoAuthNoPriv', value: 0 },
                    { label: 'AuthNoPriv', value: 1 },
                    { label: 'AuthPriv', value: 2 },
                    { label: 'Reportable', value: 3 },
                  ]}
                />
                <ProFormSelect
                  width="lg"
                  label="SNMP 认证协议"
                  name={['config', 'snmpV3AuthProtocol']}
                  placeholder="请选择 SNMP 认证协议"
                  rules={[{ required: true, message: '请选择 SNMP 认证协议' }]}
                  options={[
                    { label: 'NoAuth', value: 1 },
                    { label: 'MD5', value: 2 },
                    { label: 'SHA', value: 3 },
                    { label: 'SHA224', value: 4 },
                    { label: 'SHA256', value: 5 },
                    { label: 'SHA384', value: 6 },
                    { label: 'SHA512', value: 7 },
                  ]}
                />

                <ProFormText
                  width="lg"
                  label="SNMP 认证密钥"
                  name={['config', 'authenticationPassphrase']}
                  placeholder="请选择 SNMP 认证密钥"
                  rules={[{ required: true, message: '请选择 SNMP 认证密钥' }]}
                />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormSelect
                  width="lg"
                  label="私有认证协议"
                  name={['config', 'privacyProtocol']}
                  placeholder="请选择私有认证协议"
                  rules={[{ required: true, message: '请选择私有认证协议' }]}
                  options={[
                    { label: 'NoPriv', value: 1 },
                    { label: 'DES', value: 2 },
                    { label: 'AES', value: 3 },
                    { label: 'AES192', value: 4 },
                    { label: 'AES256', value: 5 },
                    { label: 'AES192C', value: 6 },
                    { label: 'AES256C', value: 7 },
                  ]}
                />
                <ProFormText
                  width="lg"
                  label="私有认证协议密钥"
                  name={['config', 'privacyPassphrase']}
                  placeholder="请输入私有认证协议密钥"
                  rules={[
                    {
                      required: true,
                      message: '请输入私有认证协议密钥',
                    },
                  ]}
                />
              </ProForm.Group>
            </>
          ) : null
        }
      </ProFormDependency>
    </>
  );
};

export default SnmpForm;
