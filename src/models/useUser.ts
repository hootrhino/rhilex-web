import { postUsersLogout } from '@/services/rulex/yonghuguanli';
import { LOGIN_PATH } from '@/utils/constant';
import { history, useModel, useRequest } from '@umijs/max';

const useUser = () => {
  const { setInitialState } = useModel('@@initialState');
  const { setResourceData, cancel } = useModel('useSystem');

  // 退出登录
  const { run: logout } = useRequest(() => postUsersLogout(), {
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
      cancel();
    },
  });

  return {
    logout,
  };
};

export default useUser;
