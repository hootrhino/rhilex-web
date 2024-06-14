import { postLogout } from '@/services/rulex/yonghuguanli';
import { LOGIN_PATH } from '@/utils/constant';
import { history, useModel, useRequest } from '@umijs/max';

const useUser = () => {
  const { setInitialState } = useModel('@@initialState');
  const { setResourceData } = useModel('useSystem');

  // 退出登录
  const { run: logout } = useRequest(() => postLogout(), {
    manual: true,
    onSuccess: () => {
      setInitialState({ currentUser: undefined, settings: {}, product: '' });
      localStorage.setItem('accessToken', '');
      localStorage.setItem('secret', '');
      history.push(LOGIN_PATH);
      setResourceData([
        { time: new Date(), value: 0, category: 'memory' },
        { time: new Date(), value: 0, category: 'disk' },
        { time: new Date(), value: 0, category: 'cpu' },
      ]);
      // const { search, pathname } = window.location;
      // const urlParams = new URL(window.location.href).searchParams;
      /** 此方法会跳转到 redirect 参数所在的位置 */
      // const redirect = urlParams.get('redirect');
      // Note: There may be security issues, please note
      // if (window.location.pathname !== '/user/login' && !redirect) {
      //   history.replace({
      //     pathname: '/user/login',
      //     search: stringify({
      //       redirect: pathname + search,
      //     }),
      //   });
      // }
    },
  });

  return {
    logout,
  };
};

export default useUser;
