import { message } from '@/components/PopupHack';
import { get4gApn, post4gApn } from '@/services/rulex/4Gshezhi';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { useEffect, useRef } from 'react';
import Title from './TItle';

type UpdateParams = {
  senceId: number;
  ptytpe: number;
  auth: number;
  cdmapwd: number;
  apn: string;
  username: string;
  password: string;
};

const APNConfig = () => {
  const formRef = useRef<ProFormInstance>();

  const { data: detail } = useRequest(() => get4gApn());

  const handleOnFinish = async (values: UpdateParams) => {
    try {
      await post4gApn({ ...values });
      message.success('更新成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue({ ...detail });
    } else {
      formRef.current?.setFieldsValue({
        senceId: 1,
        ptytpe: 1,
        auth: 0,
        cdmapwd: 0,
      });
    }
  }, [detail]);

  return (
    <>
      <Title name='APN 配置' />
      <ProForm
        formRef={formRef}
        layout="horizontal"
        labelCol={{ span: 4 }}
        submitter={{
          render: (props, dom) => dom,
        }}
        onFinish={handleOnFinish}
      >
        <ProFormSelect
          name="senceId"
          label="场景编号"
          options={[{ label: '场景1', value: 1 }]}
          placeholder="请选择场景编号"
          width="xl"
        />
        <ProFormSelect
          name="ptytpe"
          label="协议类型"
          options={[
            { label: 'IPv4', value: 1 },
            { label: 'IPv6', value: 2 },
            { label: 'IPv4 和 IPv6', value: 3 },
          ]}
          placeholder="请选择场景编号"
          width="xl"
        />
        <ProFormText name="apn" label="APN 名称" placeholder="请输入 APN 名称" width="xl" />
        <ProFormText name="username" label="用户名" placeholder="请输入用户名" width="xl" />
        <ProFormText.Password
          name="password"
          label="密码"
          placeholder="请输入密码"
          width="xl"
          allowClear
        />
        <ProFormSelect
          name="auth"
          label="APN 鉴权"
          options={[
            { label: 'NONE', value: 0 },
            { label: 'PAP', value: 1 },
            { label: 'CHAP', value: 2 },
            { label: 'PAP 或 CHAP', value: 3 },
          ]}
          placeholder="请选择 APN 鉴权"
          width="xl"
        />
        <ProFormSelect
          name="cdmapwd"
          label="CDMA 模式是否保存"
          options={[
            { label: '不保存', value: 0 },
            { label: '保存', value: 1 },
          ]}
          tooltip="是否在 CDMA 网络下保存用户名和 密码"
          placeholder="请选择"
          width="xl"
        />
      </ProForm>
    </>
  );
};

export default APNConfig;
