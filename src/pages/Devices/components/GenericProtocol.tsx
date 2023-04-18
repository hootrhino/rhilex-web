import {
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormList,
  ProFormSegmented,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';

const GenericProtocolForm = () => {
  return (
    <>
      <ProForm.Group title="通用配置">
        <ProFormSelect
          width="lg"
          label="通信形式"
          name={['config', 'commonConfig', 'transport']}
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
          label="重试时间"
          tooltip="单位为秒"
          name={['config', 'commonConfig', 'retryTime']}
          rules={[{ required: true, message: '请输入时间' }]}
        />
        <ProFormDigit
          width="lg"
          label="采集频率"
          tooltip="单位为秒"
          name={['config', 'commonConfig', 'frequency']}
          rules={[{ required: true, message: '请输入采集频率' }]}
        />
      </ProForm.Group>

      <ProForm.Group title="串口配置">
        <ProForm.Group>
          <ProFormDigit
            width="lg"
            label="超时时间"
            tooltip="单位为秒"
            name={['config', 'uartConfig', 'timeout']}
            rules={[{ required: true, message: '请输入超时时间' }]}
          />
          <ProFormSelect
            width="lg"
            label="波特率"
            name={['config', 'uartConfig', 'baudRate']}
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
            name={['config', 'uartConfig', 'dataBits']}
            placeholder="请输入串口通信数据位"
            rules={[{ required: true, message: '请输入串口通信数据位' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="lg"
            label="奇偶校验"
            name={['config', 'uartConfig', 'parity']}
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
            name={['config', 'uartConfig', 'stopBits']}
            rules={[{ required: true, message: '请输入串口通信停止位' }]}
          />
          <ProFormText
            width="lg"
            label="串口路径"
            name={['config', 'uartConfig', 'uart']}
            placeholder="请输入本地系统的串口路径"
            rules={[
              {
                required: true,
                message: '请输入本地系统的串口路径',
              },
            ]}
          />
        </ProForm.Group>
      </ProForm.Group>
      <ProForm.Group title="设备配置">
        <ProFormList
          name={['config', 'deviceConfig']}
          initialValue={[
            {
              type: 1,
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
                { label: '只读', value: 'RO' },
                { label: '只写', value: 'WO' },
                { label: '读写', value: 'RW' },
              ]}
            />
            <ProFormDigit
              width="lg"
              label="缓冲区大小"
              name="bufferSize"
              rules={[{ required: true, message: '请输入缓冲区大小' }]}
            />
            <ProFormDigit
              width="lg"
              label="指令等待时间"
              name="timeout"
              rules={[{ required: true, message: '请输入指令等待时间' }]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              width="lg"
              label="数据校验算法"
              name="checkAlgorithm"
              placeholder="请选择校验算法"
              rules={[
                {
                  required: true,
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
              label="校验对比值位置"
              name="checksumValuePos"
              rules={[{ required: true, message: '请输入校验对比值位置' }]}
            />
            <ProFormDigit
              width="lg"
              label="开始校验位置"
              name="checksumBegin"
              rules={[{ required: true, message: '请输入开始校验位置' }]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormDigit
              width="lg"
              label="结束校验位置"
              name="checksumEnd"
              rules={[{ required: true, message: '请输入结束校验位置' }]}
            />
            <ProFormSelect
              width="lg"
              label="校验失败处理"
              name="onCheckError"
              placeholder="请选择校验失败处理"
              rules={[
                {
                  required: true,
                  message: '请选择校验失败处理',
                },
              ]}
              options={[
                { label: '输出到日志', value: 'LOG' },
                { label: '忽略错误', value: 'IGNORE' },
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
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText width="lg" name={['protocol', 'in']} label="协议请求参数" />
          </ProForm.Group>
        </ProFormList>
      </ProForm.Group>
    </>
  );
};

export default GenericProtocolForm;
