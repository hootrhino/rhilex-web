import { cn } from '@/utils/utils';

import { Stencil } from '@antv/x6-plugin-stencil';

import { Graph } from '@antv/x6';

import '../index.less';

import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { register } from '@antv/x6-react-shape';
import { isNil } from 'lodash';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { imageNodes } from '../Shapes/ImageNodes';
import { baseNodes } from '../Shapes/Nodes';
import { reactNodes } from '../Shapes/ReactNodes';

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
        {
          title: '图表',
          name: 'chart',
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
      getDragNode: (node) => {
        if (node.shape === 'carousel-image') {
          return graph.createNode({
            shape: 'carousel-react-node',
          });
        } else if (node.shape === 'custom-image') {
          return graph.createNode({
            shape: 'image-react-node',
          });
        } else if (node.shape === 'text-image') {
          return graph.createNode({
            shape: 'text-react-node',
          });
        } else if (node.shape === 'video-image') {
          return graph.createNode({
            shape: 'video-react-node',
          });
        } else if (node.shape === 'table-image') {
          return graph.createNode({
            shape: 'table-react-node',
          });
        } else {
          return node.clone();
        }
      },
      getDropNode: (node) => {
        const { width, height } = node.size();

        return node.clone().size(width * 2, height * 2);
      },
    });

    // 注册基础节点
    baseNodes?.forEach((node: { name: string; config: any }) =>
      Graph.registerNode(node.name, node.config, true),
    );

    // 注册图片节点
    imageNodes?.forEach((node: { name: string; config: any }) =>
      Graph.registerNode(node.name, node.config, true),
    );
    // 注册React节点
    reactNodes?.forEach((node) => register(node));

    // 创建基础节点
    const createBaseNode = baseNodes?.map((node) => graph?.createNode({ shape: node.name }));

    // 创建图片节点
    const createImageNode = imageNodes?.map((node) => graph?.createNode({ shape: node.name }));

    stencil.load([...createBaseNode], 'base-node');
    stencil.load([...createImageNode], 'media-component');
    stencil.load([], 'chart');

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
