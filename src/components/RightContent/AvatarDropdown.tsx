import { useModel } from '@umijs/max';
import { Spin } from 'antd';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  if (!initialState || !currentUser || !currentUser.username) {
    // loading
    return (
      <span className="flex items-center h-[56px] ml-auto px-[8px] cursor-pointer rounded-[2px] hover:bg-gray-900/6">
        <Spin size="small" className="mx-[8px]" />
      </span>
    );
  }

  return <HeaderDropdown />;
};

export default AvatarDropdown;
