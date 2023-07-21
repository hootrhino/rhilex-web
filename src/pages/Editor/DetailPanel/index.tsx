import { cn } from '@/utils/utils';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { useEffect, useState } from 'react';
import CanvasSetting from './CanvasSetting';
import EdgeSetting from './EdgeSeting';
import NodeSetting from './NodeSeting';

type DetailType = 'node' | 'edge' | 'canvas';

const title = {
  node: '节点设置',
  edge: '边设置',
  canvas: '页面设置',
};

const DetailPanel = () => {
  const { graph } = useModel('useEditor');
  const [collapse, setCollapse] = useState<boolean>(true);
  const [type, setType] = useState<DetailType>('canvas');

  // 监听画布空白区域
  const handleOnCanvas = () => {
    graph.on('blank:click', () => {
      setType('canvas');
    });
  };

  // 监听节点
  const handleOnNode = () => {
    graph.on('node:click', () => {
      setType('node');
    });
  };

  // 监听边
  const handleOnEdge = () => {
    graph.on('edge:click', () => {
      setType('edge');
    });
  };

  useEffect(() => {
    if (graph !== undefined) {
      handleOnCanvas();
      handleOnNode();
      handleOnEdge();
    }
  }, [graph]);

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
};

export default DetailPanel;
