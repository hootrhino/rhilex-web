import { message, modal } from '@/components/PopupHack';
import { putUsersUpdate } from '@/services/rulex/yonghuguanli';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Space } from 'antd';
import { useEffect, useRef } from 'react';

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
      await putUsersUpdate(values);
      logout();
      message.success('更新成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    formRef.current?.setFieldsValue({
      username: initialState?.currentUser?.username,
      password: initialState?.currentUser?.password,
    });
  }, [initialState]);

  return (
    <ProCard title="用户配置">
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        submitter={{
          render: ({ reset, submit }) => (
            <Space>
              <Button onClick={reset}>重置</Button>
              <Button
                type="primary"
                onClick={() =>
                  modal.confirm({
                    title: '确定修改用户名/密码并重新登录吗？',
                    onOk: submit,
                    okText: '确定',
                    cancelText: '取消',
                  })
                }
              >
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
    </ProCard>
  );
};

export default UserConfig;
