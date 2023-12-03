import { GithubFilled } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import Avatar from './AvatarDropdown';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  return (
    <div className="flex justify-end items-center">
      <GithubFilled
        style={{
          fontSize: 24,
          color: 'rgba(255, 255, 255, 0.95)',
          height: 56,
          cursor: 'pointer',
          padding: '0 8px',
        }}
        onClick={() => {
          const w = window.open('about:blank');
          if (!w) return;
          w.location.href = 'https://github.com/hootrhino';
        }}
      />
      <Avatar />
    </div>
  );
};
export default GlobalHeaderRight;
