// import { GithubOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import Avatar from './AvatarDropdown';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  return (
    <Space align="center" direction="horizontal">
      {/* <a
        href="https://github.com/hootrhino/rulex"
        className="text-white text-[24px] hover:text-gray-300"
        target="_blank"
        rel="noreferrer"
      >
        <GithubOutlined size={24} />
      </a> */}
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
