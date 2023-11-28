import { cn } from '@/utils/utils';
import { useModel } from '@umijs/max';

type QuickStyleProps = {
  show: boolean;
};

const QuickStyle = ({ show }: QuickStyleProps) => {
  const { quickStyleConfig, activeNodeQuickStyle, setQuickStyleConfig } = useModel('useEditor');

  return (
    show && (
      <div
        className={cn(
          'absolute top-[60px] left-[362px] z-[98] w-[190px] h-[calc(100%-60px)] pr-[1px] overflow-hidden bg-panelBg',
          'editor-shadow-outer-r',
          'editor-box-shadow-1',
          'editor-divider-l',
        )}
        onMouseLeave={() => {
          setQuickStyleConfig!({ open: false, title: '' });
        }}
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
          {activeNodeQuickStyle?.map((item) => (
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
