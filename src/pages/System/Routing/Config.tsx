import { getSoftRouterDhcp, postSoftRouterDhcp } from '@/services/rulex/luyoupeizhi';
import { FormItemType } from '@/utils/enum';
import { validateFormItem } from '@/utils/utils';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { useSize } from 'ahooks';
import { Space } from 'antd';
import { Rule } from 'antd/es/form';
import { useEffect, useRef } from 'react';

type DHCPUpdateParams = {
  iface: string;
  ip: string;
  network: string;
  netmask: string;
  ip_pool_begin: string;
  ip_pool_end: string;
  iface_from: string;
  iface_to: string;
};

const initialValue = {
  iface_from: 'eth1',
  iface_to: '4G(usb1)',
  netmask: '255.255.255.0',
  ip: '192.168.64.100',
  ip_pool_begin: '192.168.64.100',
  ip_pool_end: '192.168.64.130',
};

const DHCPConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const sizeRef = useRef(null);
  const size = useSize(sizeRef);

  // 获取详情
  const { data: detail } = useRequest(() => getSoftRouterDhcp());

  // 更新
  const handleOnFinish = async (values: DHCPUpdateParams) => {
    try {
      const params = {
        ...values,
        iface: 'eth1',
        gateway: '192.168.64.100',
      };
      await postSoftRouterDhcp(params);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue({ ...detail });
    } else {
      formRef.current?.setFieldsValue(initialValue);
    }
  }, [detail]);

  return (
    <div ref={sizeRef}>
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout={size && size.width < 1000 ? 'vertical' : 'horizontal'}
        labelCol={size && size.width < 1000 ? {} : { span: 3 }}
        submitter={{
          render: (props, dom) => (
            <ProForm.Item
              labelCol={{ span: 3 }}
              label={<div className="invisible">action</div>}
              colon={false}
            >
              <div className="max-w-[552px] flex justify-end">
                <Space>{dom}</Space>
              </div>
            </ProForm.Item>
          ),
        }}
      >
        <ProFormText
          label={formatMessage({ id: 'system.form.title.netmask' })}
          name="netmask"
          rules={[
            { required: true, message: formatMessage({ id: 'system.form.rules.netmask' }) },
            {
              validator: (_rule: Rule, value: string) =>
                validateFormItem(value, FormItemType.NETMASK),
            },
          ]}
          width="xl"
        />

        <ProFormText
          label={formatMessage({ id: 'system.form.title.ip' })}
          name="ip"
          width="xl"
          placeholder={formatMessage({ id: 'system.form.rules.ip' })}
          rules={[
            { required: true, message: formatMessage({ id: 'system.form.rules.ip' }) },
            { validator: (_rule: Rule, value: string) => validateFormItem(value, FormItemType.IP) },
          ]}
        />
        <ProForm.Item
          label={formatMessage({ id: 'system.form.title.ipPoolRange' })}
          required
          className="mb-0"
        >
          <Space.Compact>
            <ProFormText
              name="ip_pool_begin"
              fieldProps={{ style: { width: 260 } }}
              rules={[
                { required: true, message: formatMessage({ id: 'system.form.rules.ipPoolBegin' }) },
                {
                  validator: (_rule: Rule, value: string) =>
                    validateFormItem(value, FormItemType.IP),
                },
              ]}
            />
            <div className="h-[32px] leading-[32px] mx-[12px]">~</div>
            <ProFormText
              name="ip_pool_end"
              fieldProps={{ style: { width: 260 } }}
              rules={[
                { required: true, message: formatMessage({ id: 'system.form.rules.ipPoolEnd' }) },
                {
                  validator: (_rule: Rule, value: string) =>
                    validateFormItem(value, FormItemType.IP),
                },
              ]}
            />
          </Space.Compact>
        </ProForm.Item>
        <ProFormSelect
          label={formatMessage({ id: 'system.form.title.ifaceFrom' })}
          name="iface_from"
          options={[{ label: 'eth1', value: 'eth1' }]}
          placeholder={formatMessage({ id: 'system.form.rules.ifaceFrom' })}
          width="xl"
          allowClear={false}
          rules={[
            { required: true, message: formatMessage({ id: 'system.form.rules.ifaceFrom' }) },
          ]}
        />
        <ProFormSelect
          label={formatMessage({ id: 'system.form.title.ifaceTo' })}
          name="iface_to"
          options={[{ label: '4G(usb1)', value: '4G(usb1)' }]}
          placeholder={formatMessage({ id: 'system.form.rules.ifaceTo' })}
          width="xl"
          allowClear={false}
          rules={[{ required: true, message: formatMessage({ id: 'system.form.rules.ifaceTo' }) }]}
        />
      </ProForm>
    </div>
  );
};

export default DHCPConfig;
