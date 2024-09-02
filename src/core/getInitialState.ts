import { history } from '@umijs/max';

import { CurrentUser } from '@/pages/User/Login';
// import { getOsSystem } from '@/services/rhilex/xitongshuju';
import { LOGIN_PATH } from '@/utils/constant';
import { Product } from '@/utils/enum';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import defaultSettings from '../../config/defaultSettings';

async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: CurrentUser;
  product?: Product | string;
}> {
  // 获取产品
  //  const { data } = await getOsSystem();
  if (history.location.pathname !== LOGIN_PATH) {
    return {
      currentUser: { username: 'rhilex', password: '12345678' },
      settings: defaultSettings as Partial<LayoutSettings>,
      product: Product.COMMON,
    };
  }

  return {
    settings: {},
  };
}

export default getInitialState;
