import { cn, IconFont } from '@/utils/utils';
import { useModel } from '@umijs/max';
import { useState } from 'react';
import Tooltip from '../../components/Tooltip';
import { chartsList } from '../constant';
import { Data } from './Item';

import './index.less';

type QuickStyleIconProps = {
  show: boolean;
  data: Data;
};

const QuickStyleIcon = ({ show, data }: QuickStyleIconProps) => {
  const [iconType, setIconType] = useState<string>('icon-quick-style');
  const { setQuickStyleConfig, setQuickStyle } = useModel('useEditor');

  return (
    show && (
      <Tooltip title="快速样式">
        <div
          className={cn(
            'quick-style-wrapper',
            'absolute top-0 right-0 flex items-center justify-center w-[28px] h-[16px] bg-[#333] rounded-[3px] hover:bg-primary',
          )}
          onMouseEnter={() => {
            chartsList?.forEach((chart) => {
              if (data.key.includes(chart.group)) {
                chart.children?.forEach((child) => {
                  if (child.key === data.key) {
                    setQuickStyle(child.children);
                  }
                });
              }
            });

            setIconType('icon-quick-style-active');
            setQuickStyleConfig!({ open: true, title: data.title });
          }}
          onMouseLeave={() => {
            setIconType('icon-quick-style');
          }}
        >
          <IconFont type={iconType} className="pl-[5px]" />
        </div>
      </Tooltip>
    )
  );
};

export default QuickStyleIcon;
