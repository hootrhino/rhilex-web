import { message, modal } from '@/components/PopupHack';
import { putUsersUpdate } from '@/services/rulex/yonghuguanli';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
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
  const { formatMessage } = useIntl();

  const handleOnFinish = async (values: UpdateParams) => {
    try {
      await putUsersUpdate(values);
      logout();
      message.success(formatMessage({ id: 'message.success.update' }));
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
    <ProCard title={formatMessage({ id: 'system.tab.user' })}>
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        submitter={{
          render: ({ reset, submit }) => (
            <ProForm.Item wrapperCol={{ offset: 9 }}>
              <Space>
                <Button onClick={reset}>{formatMessage({ id: 'button.reset' })}</Button>
                <Button
                  type="primary"
                  onClick={() =>
                    modal.confirm({
                      title: formatMessage({ id: 'system.modal.content.user' }),
                      onOk: submit,
                      okText: formatMessage({ id: 'button.ok' }),
                      cancelText: formatMessage({ id: 'button.cancel' }),
                    })
                  }
                >
                  {formatMessage({ id: 'button.submit' })}
                </Button>
              </Space>
            </ProForm.Item>
          ),
        }}
      >
        <ProFormText
          name="username"
          label={formatMessage({ id: 'form.title.username' })}
          placeholder={formatMessage({ id: 'form.placeholder.username' })}
          width="xl"
          rules={[{ required: true, message: formatMessage({ id: 'form.placeholder.username' }) }]}
        />
        <ProFormText.Password
          name="password"
          label={formatMessage({ id: 'form.title.password' })}
          placeholder={formatMessage({ id: 'form.placeholder.password' })}
          width="xl"
          allowClear
          rules={[{ required: true, message: formatMessage({ id: 'form.placeholder.password' }) }]}
        />
      </ProForm>
    </ProCard>
  );
};

export default UserConfig;
