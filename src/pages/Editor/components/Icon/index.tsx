import { cn, IconFont } from '@/utils/utils';
import type { IconFontProps } from '@ant-design/icons/lib/components/IconFont';
import { useEffect, useState } from 'react';

import './index.less';

type IconProps = React.HTMLAttributes<HTMLDivElement> &
  IconFontProps & {
    selected?: boolean;
  };

const Icon = ({ className, type, selected, ...props }: IconProps) => {
  const [iconType, setType] = useState<string>(type);

  const handleOnMouseOver = () => {
    if (props?.disabled) {
      setType(`${type}-disabled`);
    } else {
      setType(`${type}-active`);
    }
  };

  const handleOnMouseOut = () => {
    if (props?.disabled) {
      setType(`${type}-disabled`);
    } else {
      setType(type);
    }
  };

  useEffect(() => {
    if (selected) {
      setType(`${type}-active`);
    } else if (props?.disabled) {
      setType(`${type}-disabled`);
    } else {
      setType(type);
    }
  }, [selected, props?.disabled]);

  return (
    <>
      {selected ? (
        <IconFont
          type={`icon-${iconType}`}
          className={cn(className, 'cursor-pointer')}
          {...props}
        />
      ) : (
        <IconFont
          type={`icon-${iconType}`}
          className={cn(className, props?.disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
          onMouseOver={handleOnMouseOver}
          onMouseOut={handleOnMouseOut}
          {...props}
        />
      )}
    </>
  );
};

export default Icon;
