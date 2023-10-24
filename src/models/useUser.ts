import { postLogout } from '@/services/rulex/yonghuguanli';
import { history, useModel, useRequest } from '@umijs/max';
import { stringify } from 'querystring';

const useUser = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  // 退出登录
  const { run: logout } = useRequest(() => postLogout(), {
    manual: true,
    onSuccess: () => {
      setInitialState({ ...initialState, currentUser: undefined });
      localStorage.setItem('accessToken', '');
      const { search, pathname } = window.location;
      const urlParams = new URL(window.location.href).searchParams;
      /** 此方法会跳转到 redirect 参数所在的位置 */
      const redirect = urlParams.get('redirect');
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: pathname + search,
          }),
        });
      }
    },
  });

  return {
    logout,
  };
};

export default useUser;
