import { cn, IconFont } from '@/utils/utils';
import { useModel } from '@umijs/max';
import { useRef, useState } from 'react';
import Tooltip from '../../components/Tooltip';
import { Data } from './Item';

import { useHover } from 'ahooks';
import { getQuickStyle } from '../../utils';
import './index.less';

type QuickStyleIconProps = {
  data: Data;
};

const QuickStyleIcon = ({ data }: QuickStyleIconProps) => {
  const ref = useRef(null);
  const [iconType, setIconType] = useState<string>('icon-quick-style');
  const { setQuickStyleConfig, setLeftQuickStyle } = useModel('useEditor');

  useHover(ref, {
    onChange(isHovering) {
      if (isHovering) {
        const quickStyle = getQuickStyle(data.key);
        setLeftQuickStyle(quickStyle as any);
        setIconType('icon-quick-style-active');
        setQuickStyleConfig({ open: true, title: data.title });
      } else {
        setIconType('icon-quick-style');
      }
    },
  });

  return (
    data?.hasQuickStyle && (
      <Tooltip title="快速样式">
        <div
          ref={ref}
          className={cn(
            'quick-style-wrapper',
            'absolute top-0 right-0 flex items-center justify-center w-[28px] h-[16px] bg-[#333] rounded-[3px] hover:bg-primary',
          )}
        >
          <IconFont type={iconType} className="pl-[5px]" />
        </div>
      </Tooltip>
    )
  );
};

export default QuickStyleIcon;
