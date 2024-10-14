import { postUsersLogout } from '@/services/rhilex/yonghuguanli';
import { LOGIN_PATH } from '@/utils/constant';
import { history, useModel, useRequest } from '@umijs/max';

const useUser = () => {
  const { setInitialState } = useModel('@@initialState');
  const { cancel } = useModel('useSystem');

  // 退出登录
  const { run: logout } = useRequest(() => postUsersLogout(), {
    manual: true,
    onSuccess: () => {
      setInitialState({
        currentUser: undefined,
        settings: {},
        accessMenu: [],
        endAuthorize: undefined,
        type: undefined,
      });
      localStorage.clear();
      history.push(LOGIN_PATH);
      cancel();
    },
  });

  return {
    logout,
  };
};

export default useUser;
