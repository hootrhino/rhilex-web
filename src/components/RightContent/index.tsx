import { GithubOutlined } from '@ant-design/icons';
import React from 'react';
import Avatar from './AvatarDropdown';
import { Space } from 'antd';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  return (
    <Space align="center">
      <a
        href="https://github.com/hootrhino/rulex"
        style={{ color: 'rgb(156 163 175)', fontSize: 24 }}
        target="_blank"
        rel="noreferrer"
      >
        <GithubOutlined />
      </a>
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
