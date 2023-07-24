import { cn } from '@/utils/utils';

import { Stencil } from '@antv/x6-plugin-stencil';

import { Graph } from '@antv/x6';

import '../index.less';

import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { isNil } from 'lodash';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { baseNodes } from '../Shapes/Nodes';

const NodePanel = forwardRef((props, ref) => {
  const stencilRef = useRef<any>(null);
  const [collapse, setCollapse] = useState<boolean>(true);

  const initiStencil = () => {
    const graph = (ref as any).current;

    const stencil = new Stencil({
      title: '组件列表',
      target: graph,
      stencilGraphWidth: 220,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1;
      },
      collapsable: true,
      placeholder: '搜索组件',
      groups: [
        {
          title: '基础节点',
          name: 'base-node',
          graphHeight: 250,
        },
        {
          title: '多媒体组件',
          name: 'media-component',
          graphHeight: 250,
          layoutOptions: {
            rowHeight: 70,
          },
        },
      ],
      layoutOptions: {
        columns: 4,
        columnWidth: 55,
        rowHeight: 40,
        resizeToFit: true,
      },
    });

    // 注册节点
    baseNodes?.forEach((node: { name: string; config: any }) =>
      Graph.registerNode(node.name, node.config, true),
    );

    // 创建基础节点
    const createBaseNode = baseNodes?.map((node) => graph.createNode({ shape: node.name }));

    // 创建多媒体组件
    // TODO 静态文本（Label）、变量（动态）、视频（播放器）、告警（表格）、天气、图片、轮播图

    stencil.load([...createBaseNode], 'base-node');
    stencil.load([], 'media-component');

    stencilRef.current?.appendChild(stencil.container);
  };

  useEffect(() => {
    if (!isNil((ref as any).current)) {
      initiStencil();
    }
  }, [(ref as any).current]);

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
      <div id="nodePanel" ref={stencilRef} />
    </div>
  );
});

export default NodePanel;
