import { history } from 'umi';

import { CurrentUser } from '@/pages/User/Login';
import { LOGIN_PATH } from '@/utils/constant';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import defaultSettings from '../../config/defaultSettings';

async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: CurrentUser;
}> {
  if (history.location.pathname !== LOGIN_PATH) {
    return {
      currentUser: { username: 'admin', password: '123456' },

      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }

  return {
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export default getInitialState;
