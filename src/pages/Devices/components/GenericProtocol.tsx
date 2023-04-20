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
import { DEFAULT_DEVICE_CONFIG } from './BaseForm';
import UartConfigForm from './UartConfig';

const GenericProtocolForm = () => {
  return (
    <>
      <ProForm.Group title="通用配置">
        <ProFormList
          name={['config', 'commonConfig']}
          creatorButtonProps={false}
          copyIconProps={false}
          deleteIconProps={false}
        >
          <ProForm.Group>
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
            <ProFormDigit
              width="lg"
              label="采集频率（毫秒）"
              name="frequency"
              rules={[{ required: true, message: '请输入采集频率' }]}
            />
          </ProForm.Group>
        </ProFormList>
      </ProForm.Group>

      <UartConfigForm />

      <ProForm.Group title="设备配置">
        <ProFormList
          name={['config', 'deviceConfig']}
          creatorRecord={DEFAULT_DEVICE_CONFIG}
          creatorButtonProps={{ position: 'top' }}
          min={1}
          itemRender={({ listDom, action }, { record }) => {
            return (
              <ProCard
                bordered
                extra={action}
                title={record?.name}
                style={{
                  marginBlockEnd: 8,
                }}
              >
                {listDom}
              </ProCard>
            );
          }}
        >
          <ProForm.Group>
            <ProFormText
              width="lg"
              name="name"
              label="协议名称"
              rules={[
                {
                  required: true,
                  message: '请输入协议名称',
                },
              ]}
            />
            <ProFormSelect
              width="lg"
              label="协议类型"
              name="type"
              tooltip={
                <a
                  href="https://github.com/i4de/rulex/blob/master/device/custom_protocol_device.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  详细戳这里
                </a>
              }
              placeholder="请选择协议类型"
              rules={[
                {
                  required: true,
                  message: '请选择协议类型',
                },
              ]}
              options={[
                { label: '静态协议', value: 1 },
                { label: '动态协议', value: 2 },
                { label: '自定义时间片读', value: 3 },
                { label: '自定义时间片读写', value: 4 },
              ]}
            />
            <ProFormText width="lg" label="备注信息" name="description" />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              width="lg"
              label="读取权限"
              name="rw"
              placeholder="请选择读取权限"
              rules={[
                {
                  required: true,
                  message: '请选择读取权限',
                },
              ]}
              options={[
                { label: '只读', value: 1 },
                { label: '只写', value: 2 },
                { label: '读写', value: 3 },
              ]}
            />
            <ProFormDependency name={['type']}>
              {({ type }) => {
                if (type === 1) {
                  return (
                    <ProFormDigit
                      width="lg"
                      label="缓冲区大小"
                      name="bufferSize"
                      rules={[{ required: true, message: '请输入缓冲区大小' }]}
                    />
                  );
                } else if ([3, 4].includes(type)) {
                  return (
                    <ProFormDigit
                      width="lg"
                      label="定时请求倒计时（毫秒）"
                      name="timeSlice"
                      rules={[{ required: true, message: '请输入定时请求倒计时' }]}
                    />
                  );
                } else {
                  return null;
                }
              }}
            </ProFormDependency>

            <ProFormDigit
              width="lg"
              label="指令等待时间（毫秒）"
              name="timeout"
              rules={[{ required: true, message: '请输入指令等待时间' }]}
            />
          </ProForm.Group>
          <ProFormDependency name={['type']}>
            {({ type }) => {
              const isRequired = type === 1;
              const show = [1, 2].includes(type);

              return show ? (
                <>
                  <ProForm.Group>
                    <ProFormSelect
                      width="lg"
                      label="数据校验算法"
                      name="checkAlgorithm"
                      placeholder="请选择校验算法"
                      rules={[
                        {
                          required: isRequired,
                          message: '请选择校验算法',
                        },
                      ]}
                      options={[
                        { label: 'XOR 校验', value: 'XOR' },
                        { label: 'CRC16 校验', value: 'CRC16' },
                        { label: '不校验（默认）', value: 'NONECHECK' },
                      ]}
                    />
                    <ProFormDigit
                      width="lg"
                      label="校验值比对位"
                      name="checksumValuePos"
                      rules={[{ required: isRequired, message: '请输入校验值比对位' }]}
                    />
                    <ProFormDigit
                      width="lg"
                      label="校验算法起始位置"
                      name="checksumBegin"
                      rules={[{ required: isRequired, message: '请输入校验算法起始位置' }]}
                    />
                  </ProForm.Group>
                  <ProForm.Group>
                    <ProFormDigit
                      width="lg"
                      label="校验算法结束位置"
                      name="checksumEnd"
                      rules={[{ required: isRequired, message: '请输入校验算法结束位置' }]}
                    />
                    <ProFormDependency name={['checkAlgorithm']}>
                      {({ checkAlgorithm }) =>
                        checkAlgorithm !== 'NONECHECK' && (
                          <ProFormSelect
                            width="lg"
                            label="校验失败处理"
                            name="onCheckError"
                            placeholder="请选择校验失败处理"
                            rules={[
                              {
                                required: isRequired,
                                message: '请选择校验失败处理',
                              },
                            ]}
                            options={[
                              { label: '输出到日志', value: 'LOG' },
                              { label: '忽略错误', value: 'IGNORE' },
                            ]}
                          />
                        )
                      }
                    </ProFormDependency>

                    <ProFormSegmented
                      width="lg"
                      name="autoRequest"
                      label="是否启动轮询"
                      valueEnum={{
                        true: '是',
                        false: '否',
                      }}
                      fieldProps={{ block: true } as any}
                      rules={[
                        {
                          required: isRequired,
                          message: '请选择是否启动轮询',
                        },
                      ]}
                    />
                  </ProForm.Group>
                  <ProForm.Group>
                    <ProFormText
                      width="lg"
                      name={['protocol', 'in']}
                      label="协议请求参数"
                      tooltip="用大写十六进制表示法，否则会解析失败, 例如：FFFFFF014CB2AA55"
                      rules={[
                        {
                          required: isRequired,
                          message: '请输入协议请求参数',
                        },
                      ]}
                    />
                  </ProForm.Group>
                </>
              ) : null;
            }}
          </ProFormDependency>
        </ProFormList>
      </ProForm.Group>
    </>
  );
};

export default GenericProtocolForm;
