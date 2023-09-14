import { cn } from '@/utils/utils';
import { Graph } from '@antv/x6';
import { useModel } from '@umijs/max';
import isNil from 'lodash/isNil';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import CanvasSetting from './CanvasSetting';
import './index.less';
import NodeSetting from './NodeSetting';

export type DetailFormType = 'node' | 'canvas';

const RightPanel = forwardRef((props, ref) => {
  const nodeRef = useRef(null);
  const { collapseRightPanel, setCollapseRightPanel } = useModel('useEditor');
  const [type, setFormType] = useState<DetailFormType>('canvas');

  const handleOnChangeType = (graph: Graph) => {
    graph.on('node:click', ({}) => {
      setFormType('node');
    });

    graph.on('blank:click', () => {
      setFormType('canvas');
    });
  };

  useEffect(() => {
    const graph = (ref as any)?.current;

    if (!isNil(graph)) {
      handleOnChangeType(graph);
    }
  }, [(ref as any)?.current]);

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
      <div className={cn('right-panel', 'fixed right-0 bottom-0  bg-[#1A1A1A]')} ref={nodeRef}>
        {type === 'canvas' ? <CanvasSetting /> : <NodeSetting />}
      </div>
    </CSSTransition>
  );
});

export default RightPanel;
