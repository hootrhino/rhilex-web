import { cn } from '@/utils/utils';

import { Stencil } from '@antv/x6-plugin-stencil';

import { Graph } from '@antv/x6';

import './index.less';

import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { ports } from './ports';

const NodePanel = forwardRef((props, ref) => {
  const stencilRef = useRef<any>(null);
  const [collapse, setCollapse] = useState<boolean>(true);

  // 注册&创建节点
  const handleOnNode = () => {
    const graph = ref.current;

    Graph.registerNode(
      'custom-rect',
      {
        inherit: 'rect',
        width: 66,
        height: 36,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: '#5F95FF',
            fill: '#EFF4FF',
          },
          text: {
            fontSize: 12,
            fill: '#262626',
          },
        },
        ports: { ...ports },
      },
      true,
    );

    Graph.registerNode(
      'custom-polygon',
      {
        inherit: 'polygon',
        width: 66,
        height: 36,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: '#5F95FF',
            fill: '#EFF4FF',
          },
          text: {
            fontSize: 12,
            fill: '#262626',
          },
        },
        ports: {
          ...ports,
          items: [
            {
              group: 'top',
            },
            {
              group: 'bottom',
            },
          ],
        },
      },
      true,
    );

    Graph.registerNode(
      'custom-circle',
      {
        inherit: 'circle',
        width: 45,
        height: 45,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: '#5F95FF',
            fill: '#EFF4FF',
          },
          text: {
            fontSize: 12,
            fill: '#262626',
          },
        },
        ports: { ...ports },
      },
      true,
    );

    Graph.registerNode(
      'custom-image',
      {
        inherit: 'rect',
        width: 52,
        height: 52,
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'image',
          },
          {
            tagName: 'text',
            selector: 'label',
          },
        ],
        attrs: {
          body: {
            stroke: '#5F95FF',
            fill: '#5F95FF',
          },
          image: {
            width: 26,
            height: 26,
            refX: 13,
            refY: 16,
          },
          label: {
            refX: 3,
            refY: 2,
            textAnchor: 'left',
            textVerticalAnchor: 'top',
            fontSize: 12,
            fill: '#fff',
          },
        },
        ports: { ...ports },
      },
      true,
    );

    const r1 = graph.createNode({
      shape: 'custom-rect',
      label: '开始',
      attrs: {
        body: {
          rx: 20,
          ry: 26,
        },
      },
    });
    const r2 = graph.createNode({
      shape: 'custom-rect',
      label: '过程',
    });
    const r3 = graph.createNode({
      shape: 'custom-rect',
      attrs: {
        body: {
          rx: 6,
          ry: 6,
        },
      },
      label: '可选过程',
    });
    const r4 = graph.createNode({
      shape: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '0,10 10,0 20,10 10,20',
        },
      },
      label: '决策',
    });
    const r5 = graph.createNode({
      shape: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '10,0 40,0 30,20 0,20',
        },
      },
      label: '数据',
    });
    const r6 = graph.createNode({
      shape: 'custom-circle',
      label: '连接',
    });

    const imageShapes = [
      {
        label: 'Client',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg',
      },
      {
        label: 'Http',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg',
      },
      {
        label: 'Api',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg',
      },
      {
        label: 'Sql',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg',
      },
      {
        label: 'Clound',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg',
      },
      {
        label: 'Mq',
        image: 'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg',
      },
    ];
    const imageNodes = imageShapes.map((item) =>
      graph.createNode({
        shape: 'custom-image',
        label: item.label,
        attrs: {
          image: {
            'xlink:href': item.image,
          },
        },
      }),
    );

    return { r1, r2, r3, r4, r5, r6, imageNodes };
  };

  const initiStencil = () => {
    const graph = ref.current;

    const stencil = new Stencil({
      title: '组件列表',
      target: graph,
      // stencilGraphWidth: 200,
      // stencilGraphHeight: 180,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1;
      },
      collapsable: true,
      placeholder: '搜索组件',
      groups: [
        {
          title: '基础节点',
          name: 'group1',
          graphHeight: 250,
        },
        {
          title: '基础线条',
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

    const { r1, r2, r3, r4, r5, r6, imageNodes } = handleOnNode();

    stencil.load([r1, r2, r3, r4, r5, r6], 'group1');
    stencil.load(imageNodes, 'group2');

    stencilRef.current?.appendChild(stencil.container);
  };

  useEffect(() => {
    initiStencil();
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
