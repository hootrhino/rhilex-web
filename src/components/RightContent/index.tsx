import { QuestionCircleOutlined } from '@ant-design/icons';
import { SelectLang, useModel } from '@umijs/max';

import { DOC_URL } from '@/utils/constant';
import Avatar from './AvatarDropdown';
import NoticeIcon from './NoticeIcon';

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
      <SelectLang
        style={{ padding: '0 12px', height: '100%', display: 'inline', color: '#fff' }}
        className="hover:bg-[#32393F]"
      />
      <Avatar />
    </div>
  );
};
export default GlobalHeaderRight;
