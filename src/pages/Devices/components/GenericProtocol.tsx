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

const GenericProtocolForm = () => {
  return (
    <>
      <ProFormList
        name={['config', 'commonConfig']}
        initialValue={[
          {
            transport: 'rawtcp',
            frequency: 5,
          },
        ]}
        creatorButtonProps={false}
        copyIconProps={false}
        deleteIconProps={false}
      >
        <ProForm.Group title="通用配置">
          <ProFormSelect
            width="lg"
            label="通信形式"
            name="transport"
            placeholder="请选择通信形式"
            rules={[{ required: true, message: '请选择通信形式' }]}
            options={[
              { label: 'rawtcp', value: 'rawtcp' },
              { label: 'rawudp', value: 'rawudp' },
              { label: 'rs485rawserial', value: 'rs485rawserial' },
              { label: 'rs485rawtcp', value: 'rs485rawtcp' },
            ]}
          />
          <ProFormDigit
            width="lg"
            label="重试时间（毫秒）"
            name="retryTime"
            rules={[{ required: true, message: '请输入时间' }]}
          />
          <ProFormDigit
            width="lg"
            label="采集频率（毫秒）"
            name="frequency"
            rules={[{ required: true, message: '请输入采集频率' }]}
          />
        </ProForm.Group>
      </ProFormList>

      <ProForm.Group title="串口配置">
        <ProFormList
          name={['config', 'uartConfig']}
          initialValue={[
            {
              timeout: 5,
              baudRate: 9600,
              dataBits: 8,
              parity: 'N',
              stopBits: 1,
            },
          ]}
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
      <ProForm.Group title="设备配置">
        <ProFormList
          name={['config', 'deviceConfig']}
          initialValue={[
            {
              type: 1,
              rw: 1,
              checkAlgorithm: 'NONECHECK',
              bufferSize: 0,
              checksumValuePos: 0,
              checksumBegin: 0,
              checksumEnd: 0,
              autoRequest: 'false',
              onCheckError: 'IGNORE',
            },
          ]}
          creatorRecord={{
            type: 1,
          }}
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
                { label: '不定长协议', value: 3 },
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
              {({ type }) =>
                type !== 3 && (
                  <ProFormDigit
                    width="lg"
                    label="缓冲区大小"
                    name="bufferSize"
                    rules={[{ required: true, message: '请输入缓冲区大小' }]}
                  />
                )
              }
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

              return (
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
                        { label: 'XOR', value: 'XOR' },
                        { label: 'CRC16', value: 'CRC16' },
                        { label: 'NONECHECK', value: 'NONECHECK' },
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
                      rules={[
                        {
                          required: isRequired,
                          message: '请输入协议请求参数',
                        },
                      ]}
                    />
                  </ProForm.Group>
                </>
              );
            }}
          </ProFormDependency>
        </ProFormList>
      </ProForm.Group>
    </>
  );
};

export default GenericProtocolForm;
