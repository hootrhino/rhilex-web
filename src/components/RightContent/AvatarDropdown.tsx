import { postLogout } from '@/services/rulex/yonghuguanli';
import { cn } from '@/utils/utils';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Spin } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const Name = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  return (
    <span
      className={cn(
        'text-[16px] text-[#fff] h-[56px] overflow-hidden leading-[56px] whitespace-nowrap text-ellipsis md:hidden',
        'anticon',
      )}
    >
      {currentUser?.username}
    </span>
  );
};

const AvatarLogo = () => {
  return (
    <Avatar
      size="small"
      className="mr-[8px] text-[#1e1e1e] align-top bg-[#fff] bg-opacity-95 md:m-0"
      src={undefined}
      icon={<UserOutlined />}
      alt="avatar"
    />
  );
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await postLogout();
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
  };

  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        // return;
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className="flex items-center h-[56px] ml-auto px-[8px] cursor-pointer rounded-[2px] hover:bg-gray-900/6">
      <Spin size="small" className="mx-[8px]" />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.username) {
    return loading;
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
        <AvatarLogo />
        <Name />
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
