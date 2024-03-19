import { message } from '@/components/PopupHack';
import { getSettingsEth, postSettingsEth } from '@/services/rulex/wangluopeizhi';
import { validateGateway, validateIPv4, validateMask } from '@/utils/utils';
import { PlusCircleOutlined } from '@ant-design/icons';
import type { FormListActionType, ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Tooltip } from 'antd';
import { omit } from 'lodash';
import { useRef } from 'react';
import Title from './components/Title';

type DnsListItem = {
  dns: string;
};

type BaseFormItem = {
  interface: string;
  address: string;
  netmask: string;
  gateway: string;
  dhcp_enabled: boolean;
  dnsList: DnsListItem[];
};

type UpdateParams = Omit<BaseFormItem, 'dnsList'> & {
  dns: string[];
};

const initialValue = {
  interface: 'eth0',
  address: '192.168.199.1',
  netmask: '255.255.255.0',
  gateway: '192.168.199.1',
  dnsList: [{ dns: '8.8.8.8' }, { dns: '114.114.114.114' }],
};

const NetworkConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<FormListActionType>();

  // 详情
  const { data: detail } = useRequest(() => getSettingsEth(), {
    onSuccess: (data) => {
      if (!data) {
        formRef.current?.setFieldsValue(initialValue);
      } else {
        const dnsList = data['eth0'].dns?.map((item) => ({ dns: item }));
        formRef.current?.setFieldsValue({ ...omit(data['eth0'], 'dns'), dnsList });
      }
    },
  });

  // 更新
  const handleOnFinish = async ({ dnsList, ...values }: BaseFormItem) => {
    try {
      const params = {
        ...values,
        dns: dnsList?.map((item: { dns: string }) => item.dns),
      };
      await postSettingsEth(params as UpdateParams);
      message.success('更新成功');

      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <Title name="网卡配置" />
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        onValuesChange={(changedValue) => {
          if (changedValue?.interface && detail) {
            formRef.current?.setFieldsValue({ ...detail[changedValue?.interface] });
          }
        }}
        submitter={{
          render: (props, dom) => dom,
        }}
      >
        <ProFormSelect
          options={[
            { label: 'eth0', value: 'eth0' },
            // { label: 'eth1', value: 'eth1' },
          ]}
          name="interface"
          label="网卡选择"
          width="xl"
          placeholder="请选择网卡"
          rules={[{ required: true, message: '请选择网卡' }]}
        />
        <ProFormText
          name="address"
          label="IP 地址"
          width="xl"
          placeholder="请输入 IP 地址"
          rules={[
            { required: true, message: '请输入 IP 地址' },
            () => ({
              validator(_, value) {
                if (!value) {
                  return Promise.resolve();
                } else {
                  try {
                    if (!validateIPv4(value)) {
                      return Promise.reject(new Error('IP 格式不正确，请检查'));
                    } else {
                      return Promise.resolve();
                    }
                  } catch (error) {
                    return Promise.reject(new Error('IP 格式不正确，请检查'));
                  }
                }
              },
            }),
          ]}
        />
        <ProFormText
          name="netmask"
          label="子网掩码"
          width="xl"
          placeholder="请输入子网掩码"
          rules={[
            { required: true, message: '请输入子网掩码' },
            () => ({
              validator(_, value) {
                if (!value) {
                  return Promise.resolve();
                } else {
                  try {
                    if (!validateMask(value)) {
                      return Promise.reject(new Error('子网掩码格式不正确，请检查'));
                    } else {
                      return Promise.resolve();
                    }
                  } catch (error) {
                    return Promise.reject(new Error('子网掩码格式不正确，请检查'));
                  }
                }
              },
            }),
          ]}
        />
        <ProFormText
          name="gateway"
          label="默认网关"
          width="xl"
          placeholder="请输入默认网关"
          rules={[
            { required: true, message: '请输入默认网关' },
            () => ({
              validator(_, value) {
                if (!value) {
                  return Promise.resolve();
                } else {
                  try {
                    if (!validateGateway(value)) {
                      return Promise.reject(new Error('网关格式不正确，请检查'));
                    } else {
                      return Promise.resolve();
                    }
                  } catch (error) {
                    return Promise.reject(new Error('网关格式不正确，请检查'));
                  }
                }
              },
            }),
          ]}
        />

        <ProFormList
          actionRef={actionRef}
          name="dnsList"
          label="DNS 服务器"
          min={1}
          creatorButtonProps={false}
          creatorRecord={{
            dns: '',
          }}
          actionRender={(props, action, defaultActionDom) => {
            return [
              <Tooltip key="add" title="新建一行">
                <PlusCircleOutlined onClick={() => action.add()} className="ml-[10px]" />{' '}
              </Tooltip>,
              ...defaultActionDom,
            ];
          }}
          required
        >
          <ProFormText
            name="dns"
            width="xl"
            placeholder="请输入 DNS 服务器"
            rules={[{ required: true, message: '请输入 DNS 服务器' }]}
          />
        </ProFormList>
        <ProFormSwitch
          name="dhcp_enabled"
          label="开启 DHCP"
          checkedChildren="开启"
          unCheckedChildren="关闭"
          rules={[{ required: true }]}
        />
      </ProForm>
    </>
  );
};

export default NetworkConfig;
