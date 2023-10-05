import { IconFont, cn } from '@/utils/utils';
import type { IconFontProps } from '@ant-design/icons/lib/components/IconFont';
import { useState } from 'react';

type IconProps = React.HTMLAttributes<HTMLDivElement> & IconFontProps;

const Icon = ({ className, type, ...props }: IconProps) => {
  const [iconType, setType] = useState<string>(`icon-${type}`);

  return (
    <IconFont

      type={iconType}
      className={cn('cursor-pointer', className)}
      // onMouseEnter={() => setType(`icon-${iconName}-active`)}
      // onMouseLeave={() => setType(`icon-${iconName}`)}
      onMouseOver={() => setType(`icon-${type}-active`)}
      onMouseOut={() => setType(`icon-${type}`)}
      {...props}
    />
  );
};

export default Icon;
