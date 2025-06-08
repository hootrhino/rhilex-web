import { message } from '@/components/PopupHack';
import {
  getSettingsWifi,
  getSettingsWifiScanSignal,
  postSettingsWifi,
} from '@/services/rhilex/wuxianwifipeizhi';
import { WifiOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { useSize } from 'ahooks';
import { AutoComplete, Button, Empty, Progress, Space } from 'antd';
import { useEffect, useRef } from 'react';

type UpdateFormParams = {
  ssid: string;
  password: string;
  security: string;
  interface: string;
};

const WIFIConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const { formatMessage, locale } = useIntl();
  const sizeRef = useRef(null);
  const size = useSize(sizeRef);
  const { wlan: ifaceData } = useModel('useSystem');

  const labelCol = locale === 'en-US' ? { span: 3 } : { span: 2 };

  // 详情
  const { data: detail, run: getDetail } = useRequest(
    (params: API.getSettingsWifiParams) => getSettingsWifi(params),
    {
      manual: true,
    },
  );

  // 扫描信号强度
  const {
    data: ssidData,
    loading,
    run,
  } = useRequest(
    (params: API.getSettingsWifiScanSignalParams) => getSettingsWifiScanSignal(params),
    {
      manual: true,
      formatResult: (res) => res?.data?.filter((item) => item && item[0] && item[1]),
    },
  );

  const handleOnFinish = async (values: UpdateFormParams) => {
    try {
      await postSettingsWifi(values);
      message.success(formatMessage({ id: 'message.success.update' }));
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (ifaceData && ifaceData?.length > 0) {
      if (ifaceData[0].name) {
        getDetail({ iface: ifaceData[0].name });
      }
    }
  }, [ifaceData]);

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue({
        ...detail,
        interface: detail?.interface || ifaceData?.[0].name,
        security: detail?.security || 'wpa2-psk',
      });
    }
  }, [detail]);

  return (
    <ProCard
      title={formatMessage({ id: 'system.tab.setting' }, { item: 'WIFI' })}
      className="h-full"
      headStyle={{ paddingBlock: 0 }}
      bodyStyle={
        ifaceData && ifaceData.length > 0
          ? {}
          : { display: 'flex', justifyContent: 'center', alignItems: 'center' }
      }
      ref={sizeRef}
    >
      {ifaceData && ifaceData.length > 0 ? (
        <ProForm
          formRef={formRef}
          onFinish={handleOnFinish}
          layout={size && size?.width < 1200 ? 'vertical' : 'horizontal'}
          labelCol={size && size?.width < 1200 ? {} : labelCol}
          submitter={{
            render: (props, dom) => (
              <ProForm.Item
                labelCol={labelCol}
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
                        const iface = detail?.interface || ifaceData?.[0].name;

                        if (iface) {
                          run({ iface });
                          message.success(formatMessage({ id: 'message.success.scan' }));
                        }
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
          <ProFormSelect
            name="interface"
            label={formatMessage({ id: 'system.form.title.interface' })}
            width="xl"
            allowClear={false}
            options={ifaceData?.map((iface) => ({ label: iface.name, value: iface.name }))}
            placeholder={formatMessage({ id: 'system.form.rules.interface' })}
            rules={[
              { required: true, message: formatMessage({ id: 'system.form.rules.interface' }) },
            ]}
          />
          <ProForm.Item
            name="ssid"
            label="SSID"
            rules={[{ required: true, message: formatMessage({ id: 'system.form.rules.ssid' }) }]}
          >
            <AutoComplete
              options={ssidData?.map((item) => ({
                label: (
                  <Space className="w-full justify-between">
                    <span className="max-w-[200px] truncate">{item[0]}</span>
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
            rules={[
              { required: true, message: formatMessage({ id: 'form.placeholder.password' }) },
            ]}
          />
          <ProFormSelect
            options={[
              { label: 'wpa2-psk', value: 'wpa2-psk' },
              { label: 'wpa3-psk', value: 'wpa3-psk' },
            ]}
            name="security"
            label={formatMessage({ id: 'system.form.title.security' })}
            width="xl"
            allowClear={false}
            placeholder={formatMessage({ id: 'system.form.rules.security' })}
            rules={[
              { required: true, message: formatMessage({ id: 'system.form.rules.security' }) },
            ]}
          />
        </ProForm>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={formatMessage({ id: 'system.desc.empty' })}
        />
      )}
    </ProCard>
  );
};

export default WIFIConfig;
