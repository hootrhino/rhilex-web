import { IconFont } from '@/utils/utils';
import {
  ExclamationCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history, useIntl, useModel } from '@umijs/max';
import { App, Avatar, Spin } from 'antd';
import type { MenuInfo } from 'rc-menu/es/interface';
import React, { useCallback } from 'react';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { setActiveKey } = useModel('useSystem');
  const { logout } = useModel('useUser');
  const { initialState } = useModel('@@initialState');
  const { formatMessage } = useIntl();
  const { currentUser } = initialState || {};

  const { modal } = App.useApp();
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    modal.confirm({
      title: formatMessage({ id: 'modal.content.logout' }),
      icon: <ExclamationCircleOutlined />,
      onOk: logout,
      okText: formatMessage({ id: 'button.ok' }),
      cancelText: formatMessage({ id: 'button.cancel' }),
    });
  };

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        loginOut();
      }
      if (key === 'user') {
        history.push('/system');
        setActiveKey('user');
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
      label: formatMessage({ id: 'component.button.user' }),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: formatMessage({ id: 'component.button.logout' }),
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
        width: 150,
      }}
    >
      <div className="flex items-center h-[56px] ml-auto px-[12px] cursor-pointer rounded-[2px] hover:bg-[#32393F]">
        <div className="flex items-center h-[40px] px-[12px] gradient-border rounded-[2px]">
          <Avatar
            size="small"
            className="text-[#fff] bg-[#e0eafc] mr-[8px] align-top md:m-0"
            src={undefined}
            icon={<UserOutlined />}
            alt="avatar"
          />

          {/* <span
            className={cn(
              'text-[16px] text-[#fff] h-[56px] overflow-hidden leading-[56px] whitespace-nowrap text-ellipsis md:hidden',
              'anticon',
            )}
          >
            {currentUser?.username}
          </span>
          */}
          <div className="text-[12px] gradient-text">
            <IconFont type="icon-pro" className="pr-[6px]" />
            升级企业版，解锁专业效能
          </div>
        </div>
      </div>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
