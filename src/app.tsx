import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { history,Link,RunTimeLayoutConfig } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';

import type { CurrentUser } from './pages/User/Login';

const loginPath = '/user/login';


export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: CurrentUser;
  loading?: boolean;
  // fetchUserInfo?: () => Promise<CurrentUser | undefined>;
}> {
  // const fetchUserInfo = async () => {
  //   try {
  //     const msg = await queryCurrentUser({
  //       skipErrorHandler: true,
  //     });
  //     return msg.data;
  //   } catch (error) {
  //     history.push(loginPath);
  //   }
  //   return undefined;
  // };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    // const currentUser = await fetchUserInfo();
    return {
      // fetchUserInfo,
      currentUser: {username: 'admin', password: 'admin'},
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    // fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {

  return {
    rightContentRender: () => <RightContent />,

    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
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

    menuHeaderRender: undefined,
    childrenRender: (children) => {
      return <>{children}</>;
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
