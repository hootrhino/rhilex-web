import { GoBackModal } from '@/components/ProPageContainer';
import RightContent from '@/components/RightContent';
import { ProductMenuAccess } from '@/models/useSystem';
import { LOGIN_PATH } from '@/utils/constant';
import { Product } from '@/utils/enum';
import { IconFont } from '@/utils/utils';
import { DefaultFooter } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import { MacScrollbar } from 'mac-scrollbar';
import 'mac-scrollbar/dist/mac-scrollbar.css';

const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    siderWidth: 208,
    rightContentRender: () => <RightContent />,
    onPageChange: () => {
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser) {
        history.push(LOGIN_PATH);
      }
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
        copyright={`2023-${new Date().getFullYear()} RHILEX Team. All rights reserved.`}
      />
    ),
    menuHeaderRender: undefined,
    menuDataRender: (menuData) => {
      const filterData = menuData.filter((item) =>
        initialState?.product && Product[initialState?.product]
          ? ProductMenuAccess[initialState?.product].includes(item?.key)
          : ['dashboard'].includes(item?.key || ''),
      );

      return filterData.map((item) =>
        item?.icon ? item : { ...item, icon: <IconFont type={item.icon as string} /> },
      );
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
    ...initialState?.settings,
  };
};

export default layout;
