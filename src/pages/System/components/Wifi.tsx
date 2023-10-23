import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { AutoComplete, Space } from 'antd';
import { useRef } from 'react';

const WIFIConfig = () => {
  const formRef = useRef<ProFormInstance>();

  const handleOnFinish = async (values) => {
    console.log(values);
    try {
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <div className="text-[20px] mb-[12px] font-medium">WIFI配置</div>
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        initialValues={{ type: 'WPA-PSK' }}
        submitter={{
          render: (props, dom) => <Space className="flex justify-end">{dom}</Space>,
        }}
      >
        <ProForm.Item name="ssid" label="SSID">
          <AutoComplete
            options={[]}
            style={{ width: 550 }}
            // onSelect={onSelect}
            // onSearch={(text) => setOptions(getPanelValue(text))}
            placeholder="请输入 SSID"
          />
        </ProForm.Item>
        <ProFormText.Password name="password" label="密码" width="xl" placeholder="请输入密码" />
        <ProFormSelect
          options={[
            { label: 'WPA-PSK', value: 'WPA-PSK' },
            { label: 'WPA2-PSK', value: 'WPA2-PSK' },
          ]}
          name="type"
          label="加密方式"
          width="xl"
          placeholder="请选择加密方式"
        />
      </ProForm>
    </>
  );
};

export default WIFIConfig;
