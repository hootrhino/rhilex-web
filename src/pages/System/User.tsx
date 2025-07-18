import { message, modal } from '@/components/PopupHack';
import { putUsersUpdate } from '@/services/rhilex/yonghuguanli';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { useSize } from 'ahooks';
import { Button, Space } from 'antd';
import { useRef } from 'react';

type UpdateParams = {
  username: string;
  password1: string; // 旧密码
  password2: string; // 新密码
};

const UserConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const sizeRef = useRef(null);
  const size = useSize(sizeRef);
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

  return (
    <ProCard
      title={formatMessage({ id: 'system.tab.user' })}
      headStyle={{ paddingBlock: 0 }}
      ref={sizeRef}
    >
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout={size && size?.width < 1000 ? 'vertical' : 'horizontal'}
        labelCol={size && size?.width < 1000 ? {} : { span: 2 }}
        submitter={{
          render: ({ reset, submit }) => (
            <ProForm.Item
              labelCol={{ span: 2 }}
              label={<div className="invisible">action</div>}
              colon={false}
            >
              <div className="max-w-[552px] flex justify-end">
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
              </div>
            </ProForm.Item>
          ),
        }}
        initialValues={{ username: initialState?.currentUser?.username }}
      >
        <ProFormText
          name="username"
          label={formatMessage({ id: 'form.title.username' })}
          placeholder={formatMessage({ id: 'form.placeholder.username' })}
          width="xl"
          rules={[{ required: true, message: formatMessage({ id: 'form.placeholder.username' }) }]}
        />
        <ProFormText.Password
          name="password1"
          label={formatMessage({ id: 'form.title.password.old' })}
          placeholder={formatMessage({ id: 'form.placeholder.password' })}
          width="xl"
          allowClear
          rules={[{ required: true, message: formatMessage({ id: 'form.placeholder.password' }) }]}
        />
        <ProFormText.Password
          name="password2"
          label={formatMessage({ id: 'form.title.password.new' })}
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
