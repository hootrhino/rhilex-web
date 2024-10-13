import { history } from '@umijs/max';

import { CurrentUser } from '@/pages/User/Login';
import { getMenuMain } from '@/services/rhilex/caozuocaidan';
import { LOGIN_PATH } from '@/utils/constant';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import defaultSettings from '../../config/defaultSettings';

type MenuItem = {
  key: string;
  access: boolean;
  [key: string]: any;
};

async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: Omit<CurrentUser, 'agreement'>;
  accessMenu?: MenuItem[];
  endAuthorize?: number;
}> {
  if (history.location.pathname !== LOGIN_PATH) {
    const isLogin = localStorage.getItem('accessToken');
    let menuData: any[] = [];

    if (isLogin) {
      const { data } = await getMenuMain();
      menuData = data;
    }

    return {
      currentUser: { username: 'rhilex', password: '12345678' },
      settings: defaultSettings as Partial<LayoutSettings>,
      accessMenu: menuData,
    };
  }

  return {
    settings: {},
    accessMenu: [],
  };
}

export default getInitialState;
