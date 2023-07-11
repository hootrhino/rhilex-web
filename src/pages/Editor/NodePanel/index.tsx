import { cn } from '@/utils/utils';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Stencil } from '@antv/x6-plugin-stencil';
import { forwardRef, useEffect, useRef, useState } from 'react';

import './index.less';

const commonAttrs = {
  body: {
    fill: '#fff',
    stroke: '#8f8f8f',
    strokeWidth: 1,
  },
};

const NodePanel = forwardRef((props, ref) => {
  const stencilRef = useRef<any>(null);
  const [collapse, setCollapse] = useState<boolean>(true);

  useEffect(() => {
    const graph = ref.current;
    const n1 = graph.createNode({
      shape: 'rect',
      x: 40,
      y: 40,
      width: 80,
      height: 40,
      label: 'rect',
      attrs: commonAttrs,
    });

    const n2 = graph.createNode({
      shape: 'circle',
      x: 180,
      y: 40,
      width: 40,
      height: 40,
      label: 'circle',
      attrs: commonAttrs,
    });

    const n3 = graph.createNode({
      shape: 'ellipse',
      x: 280,
      y: 40,
      width: 80,
      height: 40,
      label: 'ellipse',
      attrs: commonAttrs,
    });

    const n4 = graph.createNode({
      shape: 'path',
      x: 420,
      y: 40,
      width: 40,
      height: 40,
      // https://www.svgrepo.com/svg/13653/like
      path: 'M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z',
      attrs: commonAttrs,
      label: 'path',
    });

    const stencil = new Stencil({
      title: '组件列表',
      target: ref,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      search: true,
      collapsable: true,
      placeholder: '搜索组件',
      groups: [
        {
          title: '基础流程图',
          name: 'group1',
        },
        {
          title: '系统设计图',
          name: 'group2',
          graphHeight: 250,
          layoutOptions: {
            rowHeight: 70,
          },
        },
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 80,
        rowHeight: 55,
      },
    });
    stencil.load([n1, n2], 'group1');
    stencil.load([n3, n4], 'group2');

    stencilRef.current?.appendChild(stencil.container);
  }, []);

  return (
    <div
      className={cn(
        'w-[220px] h-full bg-white fixed top-0 left-0 transition-all duration-500 border-r-1 border-[#ccc]',
        { 'left-0': collapse, 'left-[-220px]': !collapse },
      )}
    >
      <div
        onClick={() => setCollapse(!collapse)}
        className={cn(
          'flex items-center justify-center absolute w-[24px] h-[24px] bg-white text-[#aaa] hover:text-[#2b84c0] text-center shadow-md top-[60px] border border-[#ccc] z-[99]',
          {
            'rounded-full right-[-12px]': collapse,
            'rounded-tl-none rounded-br-[50%] rounded-tr-[50%] rounded-bl-none right-[-20px]':
              !collapse,
          },
        )}
      >
        {collapse ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
      </div>
      <div ref={stencilRef} id="nodePanel" />
    </div>
  );
});

export default NodePanel;
