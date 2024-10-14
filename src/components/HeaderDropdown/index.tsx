import React from 'react';

import { VersionType } from '@/utils/enum';
import { cn, IconFont } from '@/utils/utils';
import {
  ExclamationCircleOutlined,
  LogoutOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history, useIntl, useModel } from '@umijs/max';
import type { PopoverProps } from 'antd';
import { App, Avatar, Divider, Flex, Popover, Space, Tag } from 'antd';
import dayjs from 'dayjs';

const HeaderDropdown: React.FC<PopoverProps> = (props) => {
  const { modal } = App.useApp();
  const { formatMessage } = useIntl();
  const { logout } = useModel('useUser');
  const { isFreeTrial } = useModel('useCommon');
  const { setActiveKey } = useModel('useSystem');
  const { initialState } = useModel('@@initialState');
  const { currentUser, endAuthorize, type } = initialState || {};

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
                {type && Object.keys(VersionType).includes(type) && (
                  <Tag color={isFreeTrial ? '#fdc830' : '#292f33'}>
                    {formatMessage({
                      id: isFreeTrial
                        ? 'component.rightContent.version.free'
                        : 'component.rightContent.version.enterprise',
                    })}
                  </Tag>
                )}
              </Space>
              <div className="text-[12px] text-[#1f212680] mt-[6px]">
                {formatMessage(
                  { id: `component.rightContent.${isFreeTrial ? 'free' : 'enterprise'}.time` },
                  { time: dayjs(endAuthorize).format('YYYY-MM-DD HH:mm:ss') },
                )}
              </div>
            </div>
          </Flex>
          {isFreeTrial ? (
            <div
              className="rounded-[8px] mb-[10px] mx-[14px]"
              style={{ border: '1px solid rgba(5,5,5,0.06)' }}
            >
              <div className="gradient-grey-bg text-[#52565e] p-[12px] rounded-t-[8px]">
                <div className="text-[22px]">
                  {formatMessage({ id: 'component.rightContent.version.enterprise' })}
                </div>
                <div className="text-[12px] text-[rgba(5,5,5,0.5)]">
                  {formatMessage({ id: 'component.rightContent.status' })}
                </div>
              </div>
              <div className="mx-[14px] mt-[10px] mb-[20px]">
                <div className="text-[rgba(5,5,5,0.7)] text-[12px]">
                  {formatMessage({ id: 'component.rightContent.enterprise.desc' })}
                </div>
                <Flex align="center" justify="center" gap={16} className="my-[16px]">
                  <Flex vertical align="center" gap={4}>
                    <Avatar className="bg-[#ffebb8] text-[#693f16] font-semibold" gap={5}>
                      10+
                    </Avatar>
                    <span className="text-[12px] text-[#D49753]">
                      {formatMessage({ id: 'component.rightContent.feature.protocol' })}
                    </span>
                  </Flex>
                  <Flex vertical align="center" gap={4}>
                    <Avatar
                      className="bg-[#ffebb8]"
                      icon={<IconFont type="icon-customize-free" />}
                    />
                    <span className="text-[12px] text-[#D49753]">
                      {formatMessage({ id: 'component.rightContent.feature.custom' })}
                    </span>
                  </Flex>
                  <Flex vertical align="center" gap={4}>
                    <Avatar
                      className="bg-[#ffebb8]"
                      icon={<IconFont type="icon-advanced-free" />}
                    />
                    <span className="text-[12px] text-[#D49753]">
                      {formatMessage({ id: 'component.rightContent.feature.moreAdvance' })}
                    </span>
                  </Flex>
                </Flex>
                <a
                  className="gradient-gold-bg block rounded-[2px] text-center py-[8px] px-[10px] text-[#693f16] cursor-pointer hover:text-[#693f16]"
                  href="https://www.hootrhino.com/pricing"
                  target="_blank"
                  rel="noreferrer"
                >
                  {formatMessage({ id: 'component.rightContent.button.upgrade' })}
                </a>
              </div>
            </div>
          ) : (
            <div className="mx-[14px]">
              <Divider plain>
                您当前正在享受<b className="gradient-text mx-[4px]">企业版</b>特权
              </Divider>
              <Flex
                align="center"
                justify="center"
                gap={16}
                className="mt-[16px] mb-[20px] mx-[14px]"
              >
                <Flex vertical align="center" gap={4}>
                  <Avatar className="bg-[#292f33] text-[#D49753] font-semibold" gap={5}>
                    10+
                  </Avatar>
                  <span className="text-[10px] text-[#999]">
                    {formatMessage({ id: 'component.rightContent.feature.protocol' })}
                  </span>
                </Flex>
                <Flex vertical align="center" gap={4}>
                  <Avatar className="bg-[#292f33]" icon={<IconFont type="icon-customize" />} />
                  <span className="text-[10px] text-[#999]">
                    {formatMessage({ id: 'component.rightContent.feature.custom' })}
                  </span>
                </Flex>
                <Flex vertical align="center" gap={4}>
                  <Avatar className="bg-[#292f33]" icon={<IconFont type="icon-advanced" />} />
                  <span className="text-[10px] text-[#999]">
                    {formatMessage({ id: 'component.rightContent.feature.moreAdvance' })}
                  </span>
                </Flex>
              </Flex>
            </div>
          )}
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
              <span>{formatMessage({ id: 'component.rightContent.button.account' })}</span>
              <RightOutlined />
            </Flex>
          </div>
          <Flex
            align="center"
            justify="space-between"
            className="p-[10px] bg-[rgba(31,35,41,0.08)] cursor-pointer"
            onClick={loginOut}
          >
            <div>{formatMessage({ id: 'component.rightContent.button.logout' })}</div>
            <LogoutOutlined />
          </Flex>
        </div>
      }
      {...props}
    >
      <Flex align="center" className="h-[56px] ml-auto px-[12px] cursor-pointer rounded-[2px]">
        <Flex
          align="center"
          className={cn('h-[40px]', isFreeTrial ? 'gradient-border rounded-[2px] px-[12px]' : '')}
        >
          <Avatar
            size="small"
            className="text-[#fff] bg-[#e0eafc] mr-[8px] align-top md:m-0"
            src={undefined}
            icon={<UserOutlined />}
            alt="avatar"
          />
          {isFreeTrial && (
            <Space size={4} className="gradient-text">
              <IconFont type="icon-pro" />
              <span className="text-[12px]">
                {formatMessage({ id: 'component.rightContent.slogan' })}
              </span>
            </Space>
          )}
        </Flex>
      </Flex>
    </Popover>
  );
};

export default HeaderDropdown;
