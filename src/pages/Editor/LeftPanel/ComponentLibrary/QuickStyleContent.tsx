import { cn } from '@/utils/utils';
import { useModel } from '@umijs/max';
import { useHover } from 'ahooks';
import { useRef } from 'react';

const QuickStyle = () => {
  const { quickStyleConfig, leftQuickStyle, setQuickStyleConfig } = useModel('useEditor');
  const ref = useRef(null);

  useHover(ref, {
    onChange(isHovering) {
      if (!isHovering) {
        setQuickStyleConfig({ open: false, title: '' });
      }
    },
  });

  return (
    quickStyleConfig.open && (
      <div
        ref={ref}
        className={cn(
          'fixed top-[60px] left-[362px] z-[98] w-[190px] h-[calc(100%-60px)] pr-[1px] overflow-hidden bg-panelBg',
          'editor-shadow-outer-r',
          'editor-box-shadow-1',
          'editor-divider-l',
        )}
      >
        <div
          className={cn(
            'editor-divider-b',
            'flex items-center justify-between h-[56px] px-[16px] text-baseColor text-base',
          )}
        >
          {quickStyleConfig.title}快速样式
        </div>
        <div
          className={cn(
            'h-[calc(100%-60px)] overflow-y-auto overflow-x-hidden',
            'editor-scrollbar',
          )}
        >
          {leftQuickStyle?.map((item) => (
            <div
              key={item.key}
              className="w-[166px] h-[93px] bg-[#242424] my-[12px] mr-[8px] ml-[12px] rounded-[4px] hover:bg-[#363636]"
            >
              <img src={item.value} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default QuickStyle;
