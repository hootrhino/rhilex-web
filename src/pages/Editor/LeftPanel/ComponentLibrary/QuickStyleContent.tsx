import { cn } from '@/utils/utils';
import { useModel } from '@umijs/max';
import { useHover } from 'ahooks';
import { useRef } from 'react';
import DisabledIcon from './DisabledIcon';

type QuickStyleProps = {
  addNode: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, isDrag: boolean) => void;
}

const QuickStyle = ({addNode}: QuickStyleProps) => {
  const { quickStyleConfig, leftQuickStyle, setQuickStyleConfig } = useModel('useEditor');
  const boxRef = useRef(null);
  // const dndItemRef = useRef(null);

  // useLongPress(
  //   (e) => {
  //     addNode(e as any, true);
  //   },
  //   dndItemRef,
  //   {
  //     onClick: (e) => {
  //       console.log(e);
  //       addNode(e as any, false);
  //     },
  //   },
  // );

  useHover(boxRef, {
    onChange(isHovering) {
      if (!isHovering) {
        setQuickStyleConfig({ open: false, title: '' });
      }
    },
  });

  return (
    quickStyleConfig.open && (
      <div
        ref={boxRef}
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
             // ref={dndItemRef}
              key={item.key}
              className="relative w-[166px] h-[93px] bg-[#242424] my-[12px] mr-[8px] ml-[12px] rounded-[4px] hover:bg-[#363636]"
              onClick={e => addNode(e, false)}
            >
              <img src={item.value} className="w-full h-full object-contain cursor-pointer" id={item.key} />
              <DisabledIcon show={item?.disabled} />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default QuickStyle;
