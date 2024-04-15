import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  splitMenus: false,
  title: '',
  pwa: false,
  logo: '/logo.png',
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

export default Settings;
