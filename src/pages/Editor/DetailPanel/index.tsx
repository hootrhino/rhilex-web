import { cn } from '@/utils/utils';
import { Graph } from '@ant-design/charts';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { isNil } from 'lodash';
import { forwardRef, useEffect, useState } from 'react';
import CanvasSetting from './CanvasSetting';
import EdgeSetting from './EdgeSeting';
import NodeSetting from './NodeSeting';

type DetailFormType = 'node' | 'edge' | 'canvas';

const title = {
  node: '节点设置',
  edge: '边设置',
  canvas: '页面设置',
};

const DetailPanel = forwardRef((props, ref) => {
  const [collapse, setCollapse] = useState<boolean>(true);
  const [type, setFormType] = useState<DetailFormType>('canvas');

  const handleOnChangeType = (graph: Graph) => {
    graph.on('node:click', ({}) => {
      setFormType('node');
    });

    graph.on('edge:click', ({}) => {
      setFormType('edge');
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

  return (
    <div
      className={cn(
        'w-[300px] h-full bg-white fixed top-0 transition-all duration-500 border-l-1 border-[#ccc]',
        { 'right-0': collapse, 'right-[-300px]': !collapse },
      )}
    >
      <div
        onClick={() => setCollapse(!collapse)}
        className={cn(
          'flex items-center justify-center absolute w-[24px] h-[24px] bg-white text-[#aaa] hover:text-[#2b84c0] text-center shadow-md top-[60px] border border-[#ccc]',
          {
            'rounded-full left-[-12px]': collapse,
            'rounded-rl-none rounded-bl-[50%] rounded-tl-[50%] rounded-br-none left-[-20px]':
              !collapse,
          },
        )}
      >
        {collapse ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
      </div>
      <div className="mt-[40px] px-[5px]">
        <div className="flex items-center justify-center h-[40px] shadow-md">
          <span>{title[type]}</span>
        </div>
        {type === 'canvas' && <CanvasSetting />}
        {type === 'node' && <NodeSetting />}
        {type === 'edge' && <EdgeSetting />}
      </div>
    </div>
  );
});

export default DetailPanel;
