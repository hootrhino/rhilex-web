import { message } from '@/components/PopupHack';
import { postLogin } from '@/services/rulex/yonghuguanli';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, useModel } from '@umijs/max';
import { Alert } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { history } from 'umi';
import Settings from '../../../../config/defaultSettings';

export type CurrentUser = {
  username: string;
  password: string;
};

type LoginResult = {
  code: number;
  msg: string;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return <Alert className="mb-6" message={content} type="error" showIcon />;
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<LoginResult>();
  const { setInitialState } = useModel('@@initialState');
  const { run: getOsSystem } = useModel('useSystem');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  // const fetchUserInfo = async () => {
  //   const userInfo = await initialState?.fetchUserInfo?.();
  //   if (userInfo) {
  //     flushSync(() => {
  //       setInitialState((s) => ({
  //         ...s,
  //         currentUser: userInfo,
  //       }));
  //     });
  //   }
  // };

  const handleSubmit = async (values: CurrentUser) => {
    try {
      // 登录
      const { code, msg } = await postLogin(values);

      if (code === 200) {
        message.success('登录成功！');
        // await fetchUserInfo();
        flushSync(() => {
          setInitialState((s) => ({
            ...s,
            currentUser: values,
          }));
        });
        // 请求 Dashboard
        getOsSystem();
        const urlParams = new URL(window.location.href).searchParams;

        history.push(urlParams.get('redirect') || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState({ code, msg });
      return true;
    } catch (error) {
      // message.error('登录失败，请重试！');
      return false;
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>登录页 - {Settings.title}</title>
      </Helmet>
      <div className="flex-1 py-32">
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/favicon.png" />}
          title="Rhino EEKit"
          subTitle="轻量级边缘计算网关"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={handleSubmit}
        >
          {userLoginState && userLoginState?.code !== 200 && (
            <LoginMessage content={'账户或密码错误，请检查'} />
          )}
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            />
          </>

          <div className="mb-6">
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              className="float-right"
              href="https://hootrhino.github.io/"
              target="_blank"
              rel="noreferrer"
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
