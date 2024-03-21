import loginIcon from '@/assets/images/loginLogo.png';
import { message } from '@/components/PopupHack';
import { postLogin } from '@/services/rulex/yonghuguanli';
import { COPYRIGHT, DEFAULT_SUBTITLE, DEFAULT_TITLE } from '@/utils/constant';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { DefaultFooter, LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Helmet, useModel } from '@umijs/max';
import { flushSync } from 'react-dom';
import { history } from 'umi';

export type CurrentUser = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { setInitialState, initialState } = useModel('@@initialState');
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
    <div className="flex flex-col h-[100vh] overflow-auto bg-[#f0f2f5] bg-no-repeat bg-cover bg-[url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')]">
      <Helmet>
        <title>登录页 - {initialState?.settings?.title || DEFAULT_TITLE}</title>
      </Helmet>
      <div className="flex-1 py-32">
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src={loginIcon} />}
          title={DEFAULT_TITLE}
          subTitle={DEFAULT_SUBTITLE}
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
              allowClear
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
      <DefaultFooter copyright={COPYRIGHT} className="bg-[#f0f2f5]" />
    </div>
  );
};

export default Login;
