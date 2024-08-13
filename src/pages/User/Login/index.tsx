import loginIcon from '@/assets/loginLogo.svg';
import { message, modal } from '@/components/PopupHack';
import { getDatacenterSecret } from '@/services/rulex/shujuzhongxin';
import { postLogin } from '@/services/rulex/yonghuguanli';
import { DEFAULT_TITLE } from '@/utils/constant';
import { pick } from '@/utils/redash';
import type { ProFormInstance, Settings as LayoutSettings } from '@ant-design/pro-components';
import { DefaultFooter, LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Helmet, history, SelectLang, useIntl, useModel } from '@umijs/max';

import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import UserAgreementModal from './AgreementModal';

export type CurrentUser = {
  username: string;
  password: string;
  agreement: string[];
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
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState<boolean>(false);

  const handleOnSecret = async () => {
    const { data } = await getDatacenterSecret();
    localStorage.setItem('secret', data.secret);
  };

  const handleOnFinish = async (values: CurrentUser) => {
    console.log(values);
    try {
      const params = pick(values, ['username', 'password']);

      const { data } = await postLogin(params);
      flushSync(() =>
        setInitialState({
          currentUser: formRef.current?.getFieldsValue(),
          product,
          settings: defaultSettings as Partial<LayoutSettings>,
        }),
      );
      handleOnSecret();
      history.push('/');
      message.success(formatMessage({ id: 'message.success.login' }));
      localStorage.setItem('accessToken', data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex flex-col h-[100vh] overflow-auto bg-[#f0f2f5] bg-no-repeat bg-cover bg-[url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')]">
      <Helmet>
        <title>
          {formatMessage({ id: 'login.title' })} - {DEFAULT_TITLE}
        </title>
      </Helmet>
      <div className="flex justify-center flex-1 py-32">
        <div className="rhilex-login-form-wrapper">
          <LoginForm
            formRef={formRef}
            requiredMark={false}
            contentStyle={{
              width: 375,
              // minWidth: 280,
              maxWidth: '75vw',
              position: 'relative',
            }}
            title={<img alt="logo" src={loginIcon} style={{ width: 160 }} />}
            subTitle={
              <div className="text-[14px] text-[rgba(0, 0, 0, 0.65)] mt-[12px] mb-[40px]">
                <span className="pr-[14px]">{formatMessage({ id: 'login.slogan1' })}</span>
                <span>{formatMessage({ id: 'login.slogan2' })}</span>
              </div>
            }
            onFinish={handleOnFinish}
          >
            <>
              <ProFormText
                name="username"
                label={
                  <span className="opacity-70">{formatMessage({ id: 'form.title.username' })}</span>
                }
                fieldProps={{
                  size: 'large',
                }}
                placeholder={formatMessage({ id: 'form.placeholder.username' })}
                rules={[
                  { required: true, message: formatMessage({ id: 'form.placeholder.username' }) },
                ]}
              />
              <ProFormText.Password
                name="password"
                label={
                  <span className="opacity-70">{formatMessage({ id: 'form.title.password' })}</span>
                }
                fieldProps={{
                  size: 'large',
                }}
                placeholder={formatMessage({ id: 'form.placeholder.password' })}
                rules={[
                  { required: true, message: formatMessage({ id: 'form.placeholder.password' }) },
                ]}
              />
              <ProFormCheckbox.Group
                name="agreement"
                label=""
                options={[
                  {
                    label: (
                      <>
                        <span className="text-[rgba(0,0,0,0.7)]">
                          {formatMessage({ id: 'login.form.label.agreement' })}
                        </span>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen(true);
                          }}
                        >
                          {formatMessage({ id: 'login.form.label.agreement.user' })}
                        </a>
                      </>
                    ),
                    value: 'true',
                  },
                ]}
                rules={[
                  { required: true, message: formatMessage({ id: 'login.form.rules.agreement' }) },
                ]}
              />
            </>
            <a
              className="absolute right-0 bottom-[-30px]"
              onClick={() => {
                modal.info({
                  title: formatMessage({ id: 'modal.title.forget' }),
                  content: formatMessage({ id: 'modal.content.forget' }),
                });
              }}
            >
              {formatMessage({ id: 'button.forget' })} ？
            </a>
          </LoginForm>
        </div>
      </div>
      <DefaultFooter
        copyright={`2023-${new Date().getFullYear()} RHILEX Technologies Inc. All rights reserved.`}
        className="bg-[#f0f2f5]"
      />
      <UserAgreementModal open={open} onCancel={() => setOpen(false)} />
      <SelectLang className="absolute right-[16px] p-[12px] rounded-md bg-transparent hover:bg-[rgba(0,0,0,0.06)]" />
    </div>
  );
};

export default Login;
