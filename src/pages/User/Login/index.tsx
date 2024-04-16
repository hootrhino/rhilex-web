import loginIcon from '@/assets/images/loginLogo.svg';
import { message, modal } from '@/components/PopupHack';
import { postLogin } from '@/services/rulex/yonghuguanli';
import { COPYRIGHT, DEFAULT_SUBTITLE, DEFAULT_TITLE } from '@/utils/constant';
import { DefaultFooter, LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, useModel } from '@umijs/max';
import { Rule } from 'antd/es/form';
import type { ValidateStatus } from 'antd/es/form/FormItem';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import { history } from 'umi';

export type CurrentUser = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const { run: getOsSystem } = useModel('useSystem');
  const [validateStatus, setValidateStatus] = useState<{
    username: ValidateStatus;
    password: ValidateStatus;
  }>({ username: '', password: '' });

  const handleSubmit = async (values: CurrentUser) => {
    try {
      // 登录
      const { data } = await postLogin(values);

      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: values,
        }));
      });

      message.success('登录成功！');

      localStorage.setItem('accessToken', data);
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');

      // 请求 Dashboard
      getOsSystem();

      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="flex flex-col h-[100vh] overflow-auto bg-[#f0f2f5] bg-no-repeat bg-cover bg-[url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')]">
      <Helmet>
        <title>登录页 - {DEFAULT_TITLE}</title>
      </Helmet>
      <div className="flex justify-center flex-1 py-32">
        <div className="rhilex-login-form-wrapper">
          <LoginForm
            requiredMark={false}
            contentStyle={{
              minWidth: 280,
              maxWidth: '75vw',
            }}
            title={<img alt="logo" src={loginIcon} style={{ width: 160 }} />}
            subTitle={DEFAULT_SUBTITLE}
            onFinish={handleSubmit}
          >
            <>
              <ProFormText
                name="username"
                label={<span className="opacity-70">用户名</span>}
                fieldProps={{
                  size: 'large',
                  variant: 'filled',
                }}
                hasFeedback
                validateStatus={validateStatus.username}
                placeholder="请输入用户名"
                rules={[
                  {
                    validator: (_rule: Rule, value: string) => {
                      if (value) {
                        setValidateStatus({ ...validateStatus, username: '' });
                      } else {
                        setValidateStatus({ ...validateStatus, username: 'error' });
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                label={<span className="opacity-70">密码</span>}
                fieldProps={{
                  size: 'large',
                  variant: 'filled',
                }}
                hasFeedback
                validateStatus={validateStatus.password}
                placeholder="请输入密码"
                rules={[
                  {
                    validator: (_rule: Rule, value: string) => {
                      if (value) {
                        setValidateStatus({ ...validateStatus, password: '' });
                      } else {
                        setValidateStatus({ ...validateStatus, password: 'error' });
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              />
            </>
            <a
              className="float-right mb-6"
              onClick={() => {
                modal.info({
                  title: '忘记密码？',
                  content: '如果忘记密码，请按照当前设备的手册进行重置。',
                });
              }}
            >
              忘记密码 ？
            </a>
          </LoginForm>
        </div>
      </div>
      <DefaultFooter copyright={COPYRIGHT} className="bg-[#f0f2f5]" />
    </div>
  );
};

export default Login;
