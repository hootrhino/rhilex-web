import { history } from '@umijs/max';

import type { CurrentUser } from '@/pages/User/Login';
import { getMenuMain } from '@/services/rhilex/caozuocaidan';
import { getUsersDetail } from '@/services/rhilex/yonghuguanli';
import { LOGIN_PATH } from '@/utils/constant';
import { VersionType } from '@/utils/enum';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import defaultSettings from '../../config/defaultSettings';

type MenuItem = {
  key: string;
  access: boolean;
  [key: string]: any;
};

type UserInfo = {
  endAuthorize?: number;
  type?: string;
  username?: string;
  [key: string]: any;
};

async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: Omit<CurrentUser, 'agreement' | 'password'>;
  accessMenu?: MenuItem[];
  endAuthorize?: number;
  type?: VersionType;
}> {
  const isLogin = localStorage.getItem('accessToken');

  if (history.location.pathname !== LOGIN_PATH && isLogin) {
    let userInfo: UserInfo = {};

    // 获取菜单权限
    const { data: menuData } = await getMenuMain();

    // 获取用户信息
    await getUsersDetail()
      .then((values) => {
        userInfo = { ...values.data };
      })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
      });

    return {
      currentUser: { username: userInfo?.username || 'rhilex' },
      settings: defaultSettings as Partial<LayoutSettings>,
      accessMenu: menuData,
      endAuthorize: userInfo.endAuthorize,
      type: userInfo.type as VersionType,
    };
  }

  return {
    settings: defaultSettings as Partial<LayoutSettings>,
    accessMenu: [],
  };
}

export default getInitialState;
