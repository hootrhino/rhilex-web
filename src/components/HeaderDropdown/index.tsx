import React from 'react';

import { cn, IconFont } from '@/utils/utils';
import { RightOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import type { DropDownProps } from 'antd';
import { Avatar, Dropdown, Space, Tag, theme } from 'antd';

export type HeaderDropdownProps = {
  overlayClassName?: string;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => {
  const { token } = theme.useToken();
  const { setActiveKey } = useModel('useSystem');
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  return (
    <Dropdown
      overlayClassName={cn('xs:w-full', cls)}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          <div className="flex items-center gap-[12px] pt-[24px] pb-[12px] pl-[18px] mx-[4px]">
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
          </div>
          <div
            className="rounded-[8px] mb-[10px] mx-[10px]"
            style={{ border: '1px solid rgba(5,5,5,0.06)' }}
          >
            <div className="gradient-grey-bg text-[#52565e] p-[12px] rounded-t-[8px]">
              <div className="text-[22px]">企业版</div>
              <div className="text-[12px] text-[rgba(5,5,5,0.5)]">尚未升级</div>
            </div>
            <div className="mx-[10px] mt-[10px] mb-[20px]">
              <div className="text-[rgba(5,5,5,0.7)] text-[12px]">升级企业版，立享专业服务</div>
              <div className="flex items-center justify-center gap-[16px] my-[16px]">
                <div className="flex flex-col items-center gap-[4px]">
                  <Avatar className="bg-[#ffebb8] text-[#693f16] font-semibold" gap={5}>
                    10+
                  </Avatar>
                  <span className="text-[12px] text-[#D49753]">10+ 连接协议</span>
                </div>
                <div className="flex flex-col items-center gap-[4px]">
                  <Avatar className="bg-[#ffebb8]" icon={<IconFont type="icon-customize" />} />
                  <span className="text-[12px] text-[#D49753]">个性化定制</span>
                </div>
                <div className="flex flex-col items-center gap-[4px]">
                  <Avatar className="bg-[#ffebb8]" icon={<IconFont type="icon-advanced" />} />
                  <span className="text-[12px] text-[#D49753]">更多高级功能</span>
                </div>
              </div>
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
            className="rounded-[8px] mb-[10px] mx-[10px]"
            style={{ border: '1px solid rgba(5,5,5,0.06)' }}
          >
            <div
              className="flex items-center justify-between m-[10px] cursor-pointer"
              onClick={() => {
                history.push('/system');
                setActiveKey('user');
              }}
            >
              <span>修改账户信息</span>
              <RightOutlined />
            </div>
          </div>
          {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
        </div>
      )}
      {...restProps}
    />
  );
};

export default HeaderDropdown;
