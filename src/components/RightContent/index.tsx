import { useModel } from '@umijs/max';
import Avatar from './AvatarDropdown';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  return <Avatar />;
};
export default GlobalHeaderRight;
