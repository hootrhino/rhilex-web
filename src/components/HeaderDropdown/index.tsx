import React from 'react';

import { IconFont } from '@/utils/utils';
import {
  ExclamationCircleOutlined,
  LogoutOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history, useIntl, useModel } from '@umijs/max';
import type { PopoverProps } from 'antd';
import { App, Avatar, Flex, Popover, Space, Tag } from 'antd';

const HeaderDropdown: React.FC<PopoverProps> = (props) => {
  const { modal } = App.useApp();
  const { formatMessage } = useIntl();
  const { logout } = useModel('useUser');
  const { setActiveKey } = useModel('useSystem');
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

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

  return (
    <Popover
      placement="bottomLeft"
      arrow={false}
      rootClassName="user-popover"
      content={
        <div className="w-[300px]">
          <Flex align="center" gap={12} className="pt-[24px] pb-[12px] pl-[18px]">
            <Avatar
              size="large"
              className="text-[#fff] bg-[#e0eafc] mr-[8px] align-top md:m-0"
              src={undefined}
              icon={<UserOutlined />}
              alt="avatar"
            />
            <div className="text-[16px]">
              <Space>
                {currentUser?.username}
                <Tag color="#fdc830">试用版</Tag>
              </Space>
              <div className="text-[12px] text-[#1f212680] mt-[6px]">试用将于 2024.10.20 到期</div>
            </div>
          </Flex>
          <div
            className="rounded-[8px] mb-[10px] mx-[14px]"
            style={{ border: '1px solid rgba(5,5,5,0.06)' }}
          >
            <div className="gradient-grey-bg text-[#52565e] p-[12px] rounded-t-[8px]">
              <div className="text-[22px]">企业版</div>
              <div className="text-[12px] text-[rgba(5,5,5,0.5)]">尚未升级</div>
            </div>
            <div className="mx-[14px] mt-[10px] mb-[20px]">
              <div className="text-[rgba(5,5,5,0.7)] text-[12px]">升级企业版，立享专业服务</div>
              <Flex align="center" justify="center" gap={16} className="my-[16px]">
                <Flex vertical align="center" gap={4}>
                  <Avatar className="bg-[#ffebb8] text-[#693f16] font-semibold" gap={5}>
                    10+
                  </Avatar>
                  <span className="text-[12px] text-[#D49753]">10+ 连接协议</span>
                </Flex>
                <Flex vertical align="center" gap={4}>
                  <Avatar className="bg-[#ffebb8]" icon={<IconFont type="icon-customize" />} />
                  <span className="text-[12px] text-[#D49753]">个性化定制</span>
                </Flex>
                <Flex vertical align="center" gap={4}>
                  <Avatar className="bg-[#ffebb8]" icon={<IconFont type="icon-advanced" />} />
                  <span className="text-[12px] text-[#D49753]">更多高级功能</span>
                </Flex>
              </Flex>
              <a
                className="gradient-gold-bg block rounded-[2px] text-center py-[8px] px-[10px] text-[#693f16] cursor-pointer hover:text-[#693f16]"
                href="https://www.hootrhino.com/pricing"
                target="_blank"
                rel="noreferrer"
              >
                升级企业版
              </a>
            </div>
          </div>
          <div
            className="rounded-[8px] mb-[24px] mx-[14px]"
            style={{ border: '1px solid rgba(5,5,5,0.06)' }}
          >
            <Flex
              align="center"
              justify="space-between"
              className="m-[10px] cursor-pointer"
              onClick={() => {
                history.push('/system');
                setActiveKey('user');
              }}
            >
              <span>修改账户信息</span>
              <RightOutlined />
            </Flex>
          </div>
          <Flex
            align="center"
            justify="space-between"
            className="p-[10px] bg-[rgba(31,35,41,0.08)] cursor-pointer"
            onClick={loginOut}
          >
            <div>{formatMessage({ id: 'component.button.logout' })}</div>
            <LogoutOutlined />
          </Flex>
        </div>
      }
      {...props}
    >
      <Flex align="center" className="h-[56px] ml-auto px-[12px] cursor-pointer rounded-[2px]">
        <Flex align="center" className="h-[40px] px-[12px] gradient-border rounded-[2px]">
          <Avatar
            size="small"
            className="text-[#fff] bg-[#e0eafc] mr-[8px] align-top md:m-0"
            src={undefined}
            icon={<UserOutlined />}
            alt="avatar"
          />
          <Space size={4} className="gradient-text">
            <IconFont type="icon-pro" />
            <span className="text-[12px]">升级企业版，解锁专业效能</span>
          </Space>
        </Flex>
      </Flex>
    </Popover>
  );
};

export default HeaderDropdown;
