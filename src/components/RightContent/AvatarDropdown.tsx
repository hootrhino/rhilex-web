import { postLogout } from '@/services/rulex/yonghuguanli';
import { cn } from '@/utils/utils';
import {
  ExclamationCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { App, Avatar, Spin } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const { modal } = App.useApp();
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要退出登录吗?',
      onOk() {
        if (initialState) {
          postLogout()
            .then(() => {
              setInitialState({ ...initialState, currentUser: undefined });
              localStorage.setItem('accessToken', '');
              const { search, pathname } = window.location;
              const urlParams = new URL(window.location.href).searchParams;
              /** 此方法会跳转到 redirect 参数所在的位置 */
              const redirect = urlParams.get('redirect');
              // Note: There may be security issues, please note
              if (window.location.pathname !== '/user/login' && !redirect) {
                history.replace({
                  pathname: '/user/login',
                  search: stringify({
                    redirect: pathname + search,
                  }),
                });
              }
            })
            .catch(() => {});
        }
      },
    });
    await postLogout();
  };

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        loginOut();
      }
      if (key === 'user') {
        // TODO 用户设置
      }
    },
    [loginOut],
  );

  if (!initialState || !currentUser || !currentUser.username) {
    // loading
    return (
      <span className="flex items-center h-[56px] ml-auto px-[8px] cursor-pointer rounded-[2px] hover:bg-gray-900/6">
        <Spin size="small" className="mx-[8px]" />
      </span>
    );
  }

  const menuItems = [
    {
      key: 'user',
      icon: <SettingOutlined />,
      label: '个人设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
      overlayStyle={{
        width: 120,
      }}
    >
      <span className="flex items-center h-[56px] ml-auto px-[8px] cursor-pointer rounded-[2px] hover:bg-gray-900/6">
        <Avatar
          size="small"
          className="mr-[8px] text-[#1e1e1e] align-top bg-[#fff] bg-opacity-95 md:m-0"
          src={undefined}
          icon={<UserOutlined />}
          alt="avatar"
        />
        <span
          className={cn(
            'text-[16px] text-[#fff] h-[56px] overflow-hidden leading-[56px] whitespace-nowrap text-ellipsis md:hidden',
            'anticon',
          )}
        >
          {currentUser?.username}
        </span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
