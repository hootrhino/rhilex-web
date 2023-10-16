import loginBg from '@/assets/images/loginBg.png';
import { message } from '@/components/PopupHack';
import { postLogin } from '@/services/rulex/yonghuguanli';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Helmet, useModel } from '@umijs/max';
import { flushSync } from 'react-dom';
import { history } from 'umi';
import Settings from '../../../../config/defaultSettings';

export type CurrentUser = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const { run: getOsSystem } = useModel('useSystem');

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
    <div
      className="flex flex-col h-full overflow-auto"
      style={{ backgroundImage: `url(${loginBg})`, backgroundSize: '100% 100%' }}
    >
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
    </div>
  );
};

export default Login;
