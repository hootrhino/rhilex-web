import { getSoftRouterDhcp, postSoftRouterDhcp } from '@/services/rulex/luyoupeizhi';
import { FormItemType } from '@/utils/enum';
import { validateFormItem } from '@/utils/utils';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
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
    <ProForm
      formRef={formRef}
      onFinish={handleOnFinish}
      layout="horizontal"
      labelCol={{ span: 2 }}
      submitter={{
        render: (props, dom) => dom,
      }}
    >
      <ProFormText
        label="子网掩码"
        name="netmask"
        rules={[
          { required: true, message: '请输入子网掩码' },
          {
            validator: (_rule: Rule, value: string) =>
              validateFormItem(value, FormItemType.NETMASK),
          },
        ]}
        width="xl"
      />

      <ProFormText
        label="管理地址"
        name="ip"
        width="xl"
        placeholder="请输入管理地址"
        rules={[
          { required: true, message: '请输入管理地址' },
          { validator: (_rule: Rule, value: string) => validateFormItem(value, FormItemType.IP) },
        ]}
      />
      <ProForm.Item label="IP 分配范围" required className="mb-0">
        <Space.Compact>
          <ProFormText
            name="ip_pool_begin"
            fieldProps={{ style: { width: 260 } }}
            rules={[
              { required: true, message: '请输入 DHCP 起始地址' },
              {
                validator: (_rule: Rule, value: string) => validateFormItem(value, FormItemType.IP),
              },
            ]}
          />
          <div className="h-[32px] leading-[32px] mx-[12px]">~</div>
          <ProFormText
            name="ip_pool_end"
            fieldProps={{ style: { width: 260 } }}
            rules={[
              { required: true, message: '请输入 DHCP 结束地址' },
              {
                validator: (_rule: Rule, value: string) => validateFormItem(value, FormItemType.IP),
              },
            ]}
          />
        </Space.Compact>
      </ProForm.Item>
      <ProFormSelect
        label="LAN 网卡"
        name="iface_from"
        options={[{ label: 'eth1', value: 'eth1' }]}
        placeholder="请选择 LAN 网卡"
        width="xl"
        rules={[{ required: true, message: '请选择 LAN 网卡' }]}
      />
      <ProFormSelect
        label="流量出口"
        name="iface_to"
        options={[{ label: '4G(usb1)', value: '4G(usb1)' }]}
        placeholder="请选择流量出口"
        width="xl"
        rules={[{ required: true, message: '请选择流量出口' }]}
      />
    </ProForm>
  );
};

export default DHCPConfig;
