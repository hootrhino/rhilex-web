import { cn } from '@/utils/utils';
import { useModel } from '@umijs/max';
import { forwardRef, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import type { AddNodeProps } from '../Canvas';
import CanvasSetting from './CanvasSetting';
import './index.less';
import NodeSetting from './NodeSetting';

type RightPanelProps = AddNodeProps;

const RightPanel = forwardRef<RightPanelProps, any>(({ addNode, ...props }, ref) => {
  const nodeRef = useRef(null);
  const { collapseRightPanel, setCollapseRightPanel, detailFormType } = useModel('useEditor');

  useEffect(() => {
    setCollapseRightPanel(false);
  }, []);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={!collapseRightPanel}
      timeout={200}
      classNames="slide"
      unmountOnExit
    >
      <div
        className={cn(
          'right-panel',
          'editor-shadow-outer-l',
          'editor-box-shadow-2',
          'fixed right-0 bottom-0 bg-panelBg pl-[1px] z-[98] h-[calc(100%-60px)]',
        )}
        ref={nodeRef}
        {...props}
      >
        {detailFormType === 'canvas' ? <CanvasSetting /> : <NodeSetting addNode={addNode} />}
      </div>
    </CSSTransition>
  );
});

export default RightPanel;
