import { history } from '@umijs/max';

import { CurrentUser } from '@/pages/User/Login';
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

async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: Omit<CurrentUser, 'agreement' | 'password'>;
  accessMenu?: MenuItem[];
  endAuthorize?: number;
  type?: VersionType;
}> {
  const isLogin = localStorage.getItem('accessToken');

  if (history.location.pathname !== LOGIN_PATH && isLogin) {
    // 获取菜单权限
    const { data: menuData } = await getMenuMain();

    // 获取用户信息
    const { data: usedrInfo } = await getUsersDetail();

    return {
      currentUser: { username: usedrInfo.username },
      settings: defaultSettings as Partial<LayoutSettings>,
      accessMenu: menuData,
      endAuthorize: usedrInfo.endAuthorize,
      type: usedrInfo.type as VersionType,
    };
  }

  return {
    settings: defaultSettings as Partial<LayoutSettings>,
    accessMenu: [],
  };
}

export default getInitialState;
