import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Space } from 'antd';
import { useRef } from 'react';

const UserConfig = () => {
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
      <div className="text-[20px] mb-[24px] font-medium">用户配置</div>
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        submitter={{
          render: (props, dom) => <Space className="flex justify-end">{dom}</Space>,
        }}
      >
        <ProFormText name="username" label="用户名" placeholder="请输入用户名" width="xl" />
        <ProFormText.Password name="password" label="密码" placeholder="请输入密码" width="xl" />
      </ProForm>
    </>
  );
};

export default UserConfig;
