import {
ProCard,
ProForm,
ProFormDependency,
ProFormDigit,
ProFormList,
ProFormSegmented,
ProFormSelect,
ProFormText
} from '@ant-design/pro-components';

const SnmpForm = () => {
  return (
    <ProForm.Group title="通用配置">
      <ProFormList
        name={['config', 'commonConfig']}
        initialValue={[
          {
            mode: 'RTU',
            timeout: 5,
            frequency: 5,
            decollator: '/n',
            dataBits: 8,
            stopBits: 1,
            securityModel: 0,
            target: '127.0.0.1',
            transport: 'udp',
            community: 'public',
            port: 161,
            slaverIds: 1,
          },
        ]}
        creatorButtonProps={false}
        copyIconProps={false}
        deleteIconProps={false}
      >
        <ProCard bordered>
          <ProForm.Group>
            <ProFormText
              width="lg"
              label="主机地址"
              name="target"
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
              name="port"
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
              name="transport"
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
              name="community"
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
              name="autoRequest"
              label="是否启动轮询"
              valueEnum={{
                true: '是',
                false: '否',
              }}
              fieldProps={{ block: true } as any}
            />
            <ProFormDigit
              width="lg"
              label="采集频率（毫秒）"
              name="frequency"
              rules={[{ required: true, message: '请输入采集频率' }]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              width="lg"
              label="用户名"
              name="username"
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
              name="securityModel"
              placeholder="请选择安全模式"
              rules={[{ required: true, message: '请选择安全模式' }]}
              options={[
                { label: '不认证', value: 0 },
                { label: 'V3 认证', value: 3 },
              ]}
            />
          </ProForm.Group>

          <ProFormDependency name={['securityModel']}>
            {({ securityModel }) =>
              securityModel === 3 && (
                <>
                  <ProForm.Group>
                    <ProFormSelect
                      width="lg"
                      label="消息选项"
                      name="snmpV3MsgFlags"
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
                      name="snmpV3AuthProtocol"
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
                      name="authenticationPassphrase"
                      placeholder="请选择 SNMP 认证密钥"
                      rules={[{ required: true, message: '请选择 SNMP 认证密钥' }]}
                    />
                  </ProForm.Group>
                  <ProForm.Group>
                    <ProFormSelect
                      width="lg"
                      label="私有认证协议"
                      name="privacyProtocol"
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
                      name="privacyPassphrase"
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
              )
            }
          </ProFormDependency>
        </ProCard>
      </ProFormList>
    </ProForm.Group>
  );
};

export default SnmpForm;
