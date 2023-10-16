import React from 'react';

import { cn } from '@/utils/utils';
import type { DropDownProps } from 'antd';
import { Dropdown } from 'antd';

export type HeaderDropdownProps = {
  overlayClassName?: string;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => {
  return <Dropdown overlayClassName={cn('xs:w-full', cls)} {...restProps} />;
};

export default HeaderDropdown;
