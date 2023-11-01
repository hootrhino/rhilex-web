import { message, modal } from '@/components/PopupHack';
import { postUsers } from '@/services/rulex/yonghuguanli';
import type { ProFormInstance, SubmitterProps } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Space } from 'antd';
import { useEffect, useRef } from 'react';
import Title from './TItle';

type UpdateParams = {
  username: string;
  password: string;
};

const UserConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const { initialState } = useModel('@@initialState');
  const { logout } = useModel('useUser');

  const handleOnFinish = async (values: UpdateParams) => {
    try {
      await postUsers(values);
      logout();
      message.success('更新成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleOnConfirm = (props: SubmitterProps) => {
    modal.confirm({
      title: '确定修改用户名/密码并重新登录吗？',
      onOk: props.onSubmit,
    });
  };

  useEffect(() => {
    formRef.current?.setFieldsValue({
      username: initialState?.currentUser?.username,
      password: initialState?.currentUser?.password,
    });
  }, [initialState]);

  return (
    <>
      <Title name='用户配置' />
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        submitter={{
          render: (props) => (
            <Space>
              <Button onClick={props.reset}>重置</Button>
              <Button type="primary" onClick={() => handleOnConfirm(props)}>
                提交
              </Button>
            </Space>
          ),
        }}
      >
        <ProFormText
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          width="xl"
          rules={[{ required: true, message: '请输入用户名' }]}
        />
        <ProFormText.Password
          name="password"
          label="密码"
          placeholder="请输入密码"
          width="xl"
          allowClear
          rules={[{ required: true, message: '请输入密码' }]}
        />
      </ProForm>
    </>
  );
};

export default UserConfig;
