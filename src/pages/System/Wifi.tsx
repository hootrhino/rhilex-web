import { message } from '@/components/PopupHack';
import {
  getSettingsWifi,
  getSettingsWifiScan,
  postSettingsWifi,
} from '@/services/rulex/wuxianwifipeizhi';
import { WifiOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { AutoComplete, Button, Space } from 'antd';
import { useRef } from 'react';

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
  const { formatMessage } = useIntl();

  // 扫描 wifi
  const {
    data: wifiList,
    run: GetWifiList,
    loading,
  } = useRequest(() => getSettingsWifiScan(), {
    onSuccess: () => message.success(formatMessage({ id: 'message.success.scan' })),
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
      message.success(formatMessage({ id: 'message.success.update' }));
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <ProCard title={formatMessage({ id: 'system.tab.wifi' })}>
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelWrap
        labelCol={{ span: 3 }}
        submitter={{
          render: (props, dom) => (
            <ProForm.Item
              labelCol={{ span: 3 }}
              label={<div className="invisible">action</div>}
              colon={false}
            >
              <div className="w-[552px] flex justify-end">
                <Space>
                  {dom}
                  <Button
                    icon={<WifiOutlined />}
                    type="primary"
                    onClick={GetWifiList}
                    loading={loading}
                  >
                    {formatMessage({ id: 'system.button.wifi.ntp' })}
                  </Button>
                </Space>
              </div>
            </ProForm.Item>
          ),
        }}
      >
        <ProForm.Item
          name="ssid"
          label="SSID"
          rules={[{ required: true, message: formatMessage({ id: 'system.form.rules.ssid' }) }]}
        >
          <AutoComplete
            options={wifiList?.map((item) => ({
              label: item,
              value: item,
              key: `${item}-${Math.random()}`,
            }))}
            style={{ width: 552 }}
            placeholder={formatMessage({ id: 'system.form.rules.ssid' })}
          />
        </ProForm.Item>
        <ProFormText.Password
          name="password"
          label={formatMessage({ id: 'form.title.password' })}
          width="xl"
          allowClear
          placeholder={formatMessage({ id: 'form.placeholder.password' })}
          rules={[{ required: true, message: formatMessage({ id: 'form.placeholder.password' }) }]}
        />
        <ProFormSelect
          options={[
            { label: 'wpa-psk', value: 'wpa-psk' },
            { label: 'wpa2-psk', value: 'wpa2-psk' },
          ]}
          name="security"
          label={formatMessage({ id: 'system.form.title.security' })}
          width="xl"
          placeholder={formatMessage({ id: 'system.form.rules.security' })}
          rules={[{ required: true, message: formatMessage({ id: 'system.form.rules.security' }) }]}
        />
      </ProForm>
    </ProCard>
  );
};

export default WIFIConfig;
