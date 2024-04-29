import loginIcon from '@/assets/loginLogo.svg';
import { message, modal } from '@/components/PopupHack';
import { postLogin } from '@/services/rulex/yonghuguanli';
import { COPYRIGHT, DEFAULT_SUBTITLE, DEFAULT_TITLE } from '@/utils/constant';
import type { ProFormInstance, Settings as LayoutSettings } from '@ant-design/pro-components';
import { DefaultFooter, LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history, useModel } from '@umijs/max';
import { Rule } from 'antd/es/form';
import type { ValidateStatus } from 'antd/es/form/FormItem';

import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

export type CurrentUser = {
  username: string;
  password: string;
};

const defaultSettings = {
  navTheme: 'light',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  splitMenus: false,
  title: '',
  // pwa: false,
  logo: '/logo.svg',
  iconfontUrl: '',
  menu: { locale: false },
  token: {
    header: {
      colorBgHeader: '#292f33',
      colorHeaderTitle: '#fff',
      colorTextMenuSelected: '#fff',
      colorTextRightActionsItem: '#dfdfdf',
      colorTextMenuActive: 'rgba(255,255,255,0.85)',
      colorBgMenuItemSelected: '#22272b',
      colorTextMenu: '#dfdfdf',
      colorTextMenuSecondary: '#dfdfdf',
    },
  },
};

const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const { product } = useModel('useSystem');
  const formRef = useRef<ProFormInstance>();
  const [validateStatus, setValidateStatus] = useState<{
    username: ValidateStatus;
    password: ValidateStatus;
  }>({ username: '', password: '' });

  const handleOnFinish = async (values: CurrentUser) => {
    try {
      const { data } = await postLogin(values);
      flushSync(() =>
        setInitialState({
          currentUser: formRef.current?.getFieldsValue(),
          product,
          settings: defaultSettings as Partial<LayoutSettings>,
        }),
      );

      history.push('/');
      message.success('登录成功');
      localStorage.setItem('accessToken', data);
    } catch (error) {
      console.error(error);
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
            formRef={formRef}
            requiredMark={false}
            contentStyle={{
              minWidth: 280,
              maxWidth: '75vw',
            }}
            title={<img alt="logo" src={loginIcon} style={{ width: 160 }} />}
            subTitle={DEFAULT_SUBTITLE}
            onFinish={handleOnFinish}
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
