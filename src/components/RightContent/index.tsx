import { GithubFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';

import Avatar from './AvatarDropdown';
import './index.less';
import NoticeIcon from './NoticeIcon';
import { DOC_URL } from '@/utils/constant';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  return (
    <div className="flex justify-end items-center">
      <span
        className="cursor-pointer px-[12px] transition-all duration-300 hover:bg-[#32393F]"
        onClick={() => {
          window.open(DOC_URL);
        }}
      >
        <QuestionCircleOutlined style={{ color: '#fff', fontSize: 16, verticalAlign: 'middle' }} />
      </span>
      <NoticeIcon />
      <Avatar />
      <GithubFilled
        style={{
          fontSize: 20,
          color: 'rgba(255, 255, 255, 0.95)',
        }}
        className="cursor-pointer pl-[12px] pr-[12px] h-[56px] hover:bg-[#32393F]"
        onClick={() => window.open('https://github.com/hootrhino')}
      />
    </div>
  );
};
export default GlobalHeaderRight;
