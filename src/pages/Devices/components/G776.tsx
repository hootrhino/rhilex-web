import {
  ProForm,
  ProFormDigit,
  ProFormList,
  ProFormSegmented,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import UartConfigForm from './UartConfig';

const G776Form = () => {
  return (
    <ProForm.Group title="通用配置">
      <ProFormList
        name={['config', 'commonConfig']}
        creatorButtonProps={false}
        copyIconProps={false}
        deleteIconProps={false}
      >
        <ProForm.Group>
          <ProFormText
            width="lg"
            label="数据 Tag"
            name="tag"
            placeholder="给数据打个tag"
            rules={[
              {
                required: true,
                message: '请输入数据tag',
              },
            ]}
          />

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
          <ProFormDigit
            width="lg"
            label="采集频率（毫秒）"
            name="frequency"
            rules={[{ required: true, message: '请输入采集频率' }]}
          />
        </ProForm.Group>
      </ProFormList>
      <UartConfigForm />
    </ProForm.Group>
  );
};

export default G776Form;
