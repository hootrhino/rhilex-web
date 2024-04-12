import { message } from '@/components/PopupHack';
import {
  getSettingsWifi,
  getSettingsWifiScan,
  postSettingsWifi,
} from '@/services/rulex/wifIpeizhi';
import { WifiOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { AutoComplete, Button, Space } from 'antd';
import { useRef } from 'react';
import Title from './components/Title';

type UpdateForm = {
  ssid: string;
  password: string;
  security: string;
};

type UpdateParams = UpdateForm & {
  interface: string;
};

const WIFIConfig = () => {
  const formRef = useRef<ProFormInstance>();

  // 扫描 wifi
  const {
    data: wifiList,
    run: GetWifiList,
    loading,
  } = useRequest(() => getSettingsWifiScan(), {
    onSuccess: () => message.success('扫描完成'),
  });

  // 详情
  const { data: detail } = useRequest(() => getSettingsWifi(), {
    onSuccess: (data) => {
      if (!data) {
        formRef.current?.setFieldsValue({
          security: 'WPA-PSK',
        });
      } else {
        formRef.current?.setFieldsValue({ ...data.wlan0 });
      }
    },
  });

  const handleOnFinish = async (values: UpdateForm) => {
    try {
      if (!detail?.wlan0?.interface) return;

      const params: UpdateParams = {
        ...values,
        interface: detail?.wlan0?.interface,
      };
      await postSettingsWifi(params);
      message.success('更新成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <Title name="WIFI 配置" />
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        submitter={{
          render: (props, dom) => (
            <Space>
              {dom}
              <Button
                icon={<WifiOutlined />}
                type="primary"
                onClick={GetWifiList}
                loading={loading}
              >
                扫描 WIFI
              </Button>
            </Space>
          ),
        }}
      >
        <ProForm.Item name="ssid" label="SSID" rules={[{ required: true, message: '请输入 SSID' }]}>
          <AutoComplete
            options={wifiList?.map((item) => ({
              label: item,
              value: item,
              key: `${item}-${Math.random()}`,
            }))}
            style={{ width: 552 }}
            placeholder="请输入 SSID"
          />
        </ProForm.Item>
        <ProFormText.Password
          name="password"
          label="密码"
          width="xl"
          allowClear
          placeholder="请输入密码"
          rules={[{ required: true, message: '请输入密码' }]}
        />
        <ProFormSelect
          options={[
            { label: 'wpa-psk', value: 'wpa-psk' },
            { label: 'wpa2-psk', value: 'wpa2-psk' },
          ]}
          name="security"
          label="加密方式"
          width="xl"
          placeholder="请选择加密方式"
          rules={[{ required: true, message: '请选择加密方式' }]}
        />
      </ProForm>
    </>
  );
};

export default WIFIConfig;
