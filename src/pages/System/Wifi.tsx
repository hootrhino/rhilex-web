import { message } from '@/components/PopupHack';
import {
  getSettingsWifi,
  getSettingsWifiScanSignal,
  postSettingsWifi,
} from '@/services/rhilex/wuxianwifipeizhi';
import { WifiOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { useSize } from 'ahooks';
import { AutoComplete, Button, Progress, Space } from 'antd';
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
  const sizeRef = useRef(null);
  const size = useSize(sizeRef);

  // 扫描信号强度
  const { data, loading, run } = useRequest(() => getSettingsWifiScanSignal(), {
    formatResult: (res) => res?.data?.filter((item) => item && item[0] && item[1]),
  });

  // 详情
  const { data: detail } = useRequest(() => getSettingsWifi(), {
    onSuccess: (data) => {
      if (!data) {
        formRef.current?.setFieldsValue({
          security: 'wpa-psk',
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
    <ProCard
      title={formatMessage({ id: 'system.tab.wifi' })}
      headStyle={{ paddingBlock: 0 }}
      ref={sizeRef}
    >
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout={size && size?.width < 1200 ? 'vertical' : 'horizontal'}
        labelCol={size && size?.width < 1200 ? {} : { span: 3 }}
        submitter={{
          render: (props, dom) => (
            <ProForm.Item
              labelCol={{ span: 3 }}
              label={<div className="invisible">action</div>}
              colon={false}
            >
              <div className="max-w-[552px] flex justify-end">
                <Space>
                  {dom}
                  <Button
                    icon={<WifiOutlined />}
                    type="primary"
                    onClick={() => {
                      run();
                      message.success(formatMessage({ id: 'message.success.scan' }));
                    }}
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
            options={data?.map((item) => ({
              label: (
                <Space className="w-full justify-between">
                  <span>{item[0]}</span>
                  <Progress
                    steps={10}
                    size="small"
                    percent={Number(item[1]) || 0}
                    className="pr-[24px]"
                    format={(percent) => `${percent}dbm`}
                  />
                </Space>
              ),
              value: item[0],
              key: `${item[0]}-${Math.random()}`,
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
          allowClear={false}
          placeholder={formatMessage({ id: 'system.form.rules.security' })}
          rules={[{ required: true, message: formatMessage({ id: 'system.form.rules.security' }) }]}
        />
      </ProForm>
    </ProCard>
  );
};

export default WIFIConfig;
