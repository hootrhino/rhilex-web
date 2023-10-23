import { getSettingsEth } from '@/services/rulex/wangluopeizhi';
import { validateGateway, validateIPv4, validateMask } from '@/utils/utils';
import { PlusCircleOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Space, Tooltip } from 'antd';
import { useRef } from 'react';

const NetworkConfig = () => {
  const formRef = useRef<ProFormInstance>();

  // TODO 详情
  const {data: detail} = useRequest(() => getSettingsEth());

  console.log(detail);

  // TODO 更新
  const handleOnFinish = async (values) => {
    try {
      console.log(values);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <div className="text-[20px] mb-[24px] font-medium">网卡配置</div>
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        initialValues={{ interface: 'eth0', address: '192.168.199.1', mask: '255.255.255.0', gateway: '192.168.199.1' }}
        submitter={{
          render: (props, dom) => <Space className="flex justify-end">{dom}</Space>,
        }}
      >
        <ProFormSelect
          options={[
            { label: 'ETH0', value: 'eth0' },
            { label: 'ETH1', value: 'eth1' },
          ]}
          name="interface"
          label="网卡选择"
          width="xl"
          placeholder="请选择网卡"
        />
        <ProFormText
          name="address"
          label="IP 地址"
          width="xl"
          placeholder="请输入 IP 地址"
          rules={[
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
          name="mask"
          label="子网掩码"
          width="xl"
          placeholder="请输入子网掩码"
          rules={[
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
          name="dnsList"
          label="DNS服务器"
          min={1}
          initialValue={[
            {
              dns: '8.8.8.8',
            },
            {
              dns: '114.114.114.1114',
            },
          ]}
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
        >
          <ProFormText name='dns' width="xl" placeholder="请输入DNS服务器" />
        </ProFormList>
        <ProFormSwitch
          name="dhcp_enabled"
          label="开启DHCP"
          checkedChildren="开启"
          unCheckedChildren="关闭"
        />
      </ProForm>
    </>
  );
};

export default NetworkConfig;
