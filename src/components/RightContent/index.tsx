import { useEmotionCss } from '@ant-design/use-emotion-css';

import { GithubOutlined } from '@ant-design/icons';
import React from 'react';
import Avatar from './AvatarDropdown';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const className = useEmotionCss(() => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      gap: 8,
      alignItems: 'center',
    };
  });

  return (
    <div className={className}>
      <a
        href="https://github.com/hootrhino/rulex"
        style={{ color: 'rgb(156 163 175)', fontSize: 24 }}
        target="_blank"
        rel="noreferrer"
      >
        <GithubOutlined />
      </a>
      <Avatar />
    </div>
  );
};
export default GlobalHeaderRight;
