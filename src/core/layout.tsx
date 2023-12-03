import { history, Link } from '@umijs/max';

import type { RunTimeLayoutConfig } from 'umi';

import RightContent from '@/components/RightContent';
import { COPYRIGHT, LOGIN_PATH } from '@/utils/constant';
import { DefaultFooter } from '@ant-design/pro-components';

const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    siderWidth: 208,
    rightContentRender: () => <RightContent />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== LOGIN_PATH) {
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
    footerRender: () => <DefaultFooter copyright={COPYRIGHT} />,
    menuHeaderRender: undefined,
    childrenRender: (children) => {
      return <>{children}</>;
    },
    className: 'h-[100vh]',
    ...initialState?.settings,
  };
};

export default layout;
