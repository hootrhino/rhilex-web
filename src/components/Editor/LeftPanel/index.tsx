import { cn, IconFont } from '@/utils/utils';

import { Stencil } from '@antv/x6-plugin-stencil';

import { Graph } from '@antv/x6';

import './index.less';

import {
  BarChartOutlined,
  CloseOutlined,
  EyeOutlined,
  LineChartOutlined,
  QuestionCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { register } from '@antv/x6-react-shape';
import { useModel } from '@umijs/max';
import { Space, Tooltip, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { isNil } from 'lodash';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { imageNodes } from '../Shapes/ImageNodes';
import { baseNodes } from '../Shapes/Nodes';
import { reactNodes } from '../Shapes/ReactNodes';

const panelItems = [
  { name: '图层', icon: 'icon-layers', key: 'layers' },
  { name: '组件库', icon: 'icon-components', key: 'components' },
  { name: '设计库', icon: 'icon-material', key: 'material' },
];

const LeftPanel = forwardRef((props, ref) => {
  const stencilRef = useRef<any>(null);
  const { collapseLeftPanel: collapse, setCollapseLeftPanel: setCollapse } = useModel('useEditor');
  const [activeItem, setActiveItem] = useState<string>('layers');
  const [activeLayer, setActiveLayer] = useState<string>('');

  const handleOnCloseRightPanel = () => {
    setCollapse(true);
    setActiveItem('');
  };

  const treeData: DataNode[] = [
    {
      title: '图表组',
      key: '0-0',
      icon: <BarChartOutlined />,
      children: [
        {
          title: (
            <div className="inline w-full">
              <span className="pr-[70px]">折线图</span>
              <Tooltip title="隐藏" color="#1F6AFF">
                <EyeOutlined className={cn(activeLayer === '0-0-0' ? 'inline' : 'hidden')} />
              </Tooltip>
            </div>
          ),
          key: '0-0-0',
          icon: <LineChartOutlined />,
        },
        {
          title: (
            <div className="inline w-full">
              <span className="pr-[70px]">柱状图</span>
              <Tooltip title="隐藏" color="#1F6AFF">
                <EyeOutlined className={cn(activeLayer === '0-0-1' ? 'inline' : 'hidden')} />
              </Tooltip>
            </div>
          ),
          key: '0-0-1',
          icon: <BarChartOutlined />,
        },
      ],
    },
  ];

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

  const getDetailTitle = () => {
    const currentPanelItem = panelItems?.find((item) => item?.key === activeItem);

    return currentPanelItem?.name || '帮助';
  };

  useEffect(() => {
    if (!isNil((ref as any).current)) {
      initiStencil();
    }
  }, [(ref as any).current]);

  return (
    <>
      <div
        className={cn(
          'left-panel-fixed',
          'flex flex-col fixed left-0 bottom-0 w-[64px] bg-[#1A1A1A] text-center overflow-hidden py-[10px] px-[4px] cursor-pointer',
        )}
      >
        <div className="h-full">
          {panelItems?.map((item) => (
            <Space
              className={cn(
                'left-panel-fixed-item',
                activeItem === item.key ? 'text-[#F7F7F7]' : 'text-[#7a7a7a]',
              )}
              direction="vertical"
              size={2}
              key={item?.key}
              onClick={() => {
                console.log(item.key, activeItem);
                if (item?.key === activeItem) {
                  handleOnCloseRightPanel();
                } else {
                  setActiveItem(item?.key);
                  setCollapse(false);
                }
              }}
            >
              <IconFont type={activeItem === item.key ? `${item?.icon}-active` : item?.icon} />
              <span className="text-[12px]">{item?.name}</span>
            </Space>
          ))}
        </div>
        <Space
          className={cn(
            'left-panel-fixed-help',
            activeItem === 'help' ? 'text-[#F7F7F7]' : 'text-[#7a7a7a]',
          )}
          direction="vertical"
          size={2}
          key="help"
          onClick={() => {
            setActiveItem('help');
            setCollapse(false);
          }}
        >
          <QuestionCircleOutlined
            style={activeItem === 'help' ? { color: '#1F6AFF' } : { color: '#ADADAD' }}
          />
          <span className="text-[12px]">帮助</span>
        </Space>
      </div>
      <div
        className={cn(
          'left-panel-detail',
          'fixed bg-[#1a1a1a] w-[242px] left-[64px] bottom-0 block overflow-hidden',
          collapse ? 'hidden' : 'block',
        )}
      >
        <div
          className={cn(
            'left-panel-detail-header',
            'flex items-center justify-between h-[56px] px-[16px] overflow-hidden text-[#dbdbdb]',
          )}
        >
          <span>{getDetailTitle()}</span>
          <div className="text-[#adadad] cursor-pointer">
            <Tooltip title="刷新" color="#1F6AFF">
              <RedoOutlined />
            </Tooltip>
            <Tooltip title="搜索" color="#1F6AFF">
              <SearchOutlined className="ml-[10px]" />
            </Tooltip>
            <CloseOutlined className="ml-[10px]" onClick={handleOnCloseRightPanel} />
          </div>
        </div>
        <div
          className={cn(
            'left-panel-detail-content',
            'flex items-center flex-col text-[#dbdbdb] text-[12px] min-h-[780px]',
          )}
        >
          <div className="w-full h-full p-[10px]">
            <Tree
              showIcon
              showLine
              blockNode
              defaultExpandAll
              treeData={treeData}
              onSelect={(selectedKeys) => {
                setActiveLayer((selectedKeys as string[])?.[0] || '');
              }}
            />
          </div>
        </div>
      </div>
    </>

    // <div
    //   className={cn(
    //     '',
    //     'w-[220px] h-full bg-[#1A1A1A] fixed top-0 left-0 transition-all duration-500 border-r-1 border-black',
    //     { 'left-0': collapse, 'left-[-220px]': !collapse },
    //   )}
    // >
    //   <div
    //     onClick={() => setCollapse(!collapse)}
    //     className={cn(
    //       'flex items-center justify-center absolute w-[24px] h-[24px] bg-[#474747] text-[#adadad] hover:bg-[#565656] text-center shadow-md top-[60px] border border-black z-[99]',
    //       {
    //         'rounded-full right-[-12px]': collapse,
    //         'rounded-tl-none rounded-br-[50%] rounded-tr-[50%] rounded-bl-none right-[-20px]':
    //           !collapse,
    //       },
    //     )}
    //   >
    //     {collapse ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
    //   </div>
    //   <div id="nodePanel" ref={stencilRef} />
    // </div>
  );
});

export default LeftPanel;
