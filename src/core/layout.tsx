import { GoBackModal } from '@/components/ProPageContainer';
import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { DefaultFooter } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import { MacScrollbar } from 'mac-scrollbar';
import 'mac-scrollbar/dist/mac-scrollbar.css';
import defaultSettings from '../../config/defaultSettings';

const layout: RunTimeLayoutConfig = ({ initialState }) => {
  const settings = initialState?.settings || defaultSettings;

  return {
    siderWidth: 208,
    rightContentRender: () => <RightContent />,
    onPageChange: (location) => {
      const activePathname = location?.pathname?.split('/')[1];
      const activeMenu = initialState?.accessMenu?.find((menu) => menu.key === activePathname);

      if (activeMenu && !activeMenu?.access) {
        history.push('/403');
      }
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser) {
      //   history.push(LOGIN_PATH);
      // }
    },
    itemRender: (route: any, _: any, routes: any, paths: any) => {
      if (!route['component']) return <span>{route.title}</span>;
      const last = routes.indexOf(route) === routes.length - 1;
      return last ? (
        <span>{route.title}</span>
      ) : (
        <Link to={`/${paths[paths.length - 1]}`}>{route.title}</Link>
      );
    },
    footerRender: () => (
      <DefaultFooter
        copyright={`2023-${new Date().getFullYear()} RHILEX Technologies Inc. All rights reserved.`}
      />
    ),
    menuHeaderRender: undefined,
    menuDataRender: (menuData) => {
      const accessData = initialState ? initialState?.accessMenu : [];
      const accessMenuData = menuData?.map((menu) => {
        const activeKey = accessData?.find((item) => item.key === menu.key);

        if (activeKey) {
          return {
            ...menu,
            hideInMenu: !activeKey?.access,
          };
        } else {
          return menu;
        }
      });

      return accessMenuData;
    },
    menuItemRender(item, defaultDom) {
      const currentPath = window.location?.pathname;
      const regex = /(?:inend|outend|app|device\/[^/]+)\/(?:new|edit)[^/]*/;

      if (
        regex.test(currentPath) ||
        currentPath.includes('/rule/new') ||
        currentPath.includes('/rule/edit')
      ) {
        return (
          <a
            onClick={() => {
              GoBackModal(item?.path || '/');
            }}
          >
            {defaultDom}
          </a>
        );
      } else {
        return <a onClick={() => history.push(item?.path || '/')}>{defaultDom}</a>;
      }
    },
    childrenRender: (children) => {
      return <MacScrollbar>{children}</MacScrollbar>;
    },
    className: 'h-[100vh] rhilex-layout',
    ...(settings as Partial<LayoutSettings>),
  };
};

export default layout;
