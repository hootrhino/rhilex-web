import { cn, IconFont } from '@/utils/utils';

// import { Stencil } from '@antv/x6-plugin-stencil';

// import { Graph } from '@antv/x6';

import './index.less';

import {
  CloseOutlined,
  QuestionCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from '@ant-design/icons';
// import { register } from '@antv/x6-react-shape';
import { useModel } from '@umijs/max';
import { Space, Tooltip } from 'antd';

import { forwardRef, useState } from 'react';
import Layers from './Layers';
import ComponentLibrary from './ComponentLibrary';
import { panelItems } from './constant';
// import { imageNodes } from '../Shapes/ImageNodes';
// import { baseNodes } from '../Shapes/Nodes';
// import { reactNodes } from '../Shapes/ReactNodes';

const LeftPanel = forwardRef((props, ref) => {
  // const stencilRef = useRef<any>(null);
  const { collapseLeftPanel: collapse, setCollapseLeftPanel: setCollapse } = useModel('useEditor');
  const [activeItem, setActiveItem] = useState<string>('layers');

  const handleOnCloseRightPanel = () => {
    setCollapse(true);
    setActiveItem('');
  };

  // const initiStencil = () => {
  //   const graph = (ref as any).current;

  //   const stencil = new Stencil({
  //     title: '组件列表',
  //     target: graph,
  //     stencilGraphWidth: 220,
  //     search(cell, keyword) {
  //       return cell.shape.indexOf(keyword) !== -1;
  //     },
  //     collapsable: true,
  //     placeholder: '搜索组件',
  //     groups: [
  //       {
  //         title: '基础节点',
  //         name: 'base-node',
  //         graphHeight: 250,
  //       },
  //       {
  //         title: '多媒体组件',
  //         name: 'media-component',
  //         graphHeight: 250,
  //         layoutOptions: {
  //           rowHeight: 70,
  //         },
  //       },
  //       {
  //         title: '图表',
  //         name: 'chart',
  //         graphHeight: 250,
  //         layoutOptions: {
  //           rowHeight: 70,
  //         },
  //       },
  //     ],
  //     layoutOptions: {
  //       columns: 4,
  //       columnWidth: 55,
  //       rowHeight: 40,
  //       resizeToFit: true,
  //     },
  //     getDragNode: (node) => {
  //       if (node.shape === 'carousel-image') {
  //         return graph.createNode({
  //           shape: 'carousel-react-node',
  //         });
  //       } else if (node.shape === 'custom-image') {
  //         return graph.createNode({
  //           shape: 'image-react-node',
  //         });
  //       } else if (node.shape === 'text-image') {
  //         return graph.createNode({
  //           shape: 'text-react-node',
  //         });
  //       } else if (node.shape === 'video-image') {
  //         return graph.createNode({
  //           shape: 'video-react-node',
  //         });
  //       } else if (node.shape === 'table-image') {
  //         return graph.createNode({
  //           shape: 'table-react-node',
  //         });
  //       } else {
  //         return node.clone();
  //       }
  //     },
  //     getDropNode: (node) => {
  //       const { width, height } = node.size();

  //       return node.clone().size(width * 2, height * 2);
  //     },
  //   });

  //   // 注册基础节点
  //   baseNodes?.forEach((node: { name: string; config: any }) =>
  //     Graph.registerNode(node.name, node.config, true),
  //   );

  //   // 注册图片节点
  //   imageNodes?.forEach((node: { name: string; config: any }) =>
  //     Graph.registerNode(node.name, node.config, true),
  //   );
  //   // 注册React节点
  //   reactNodes?.forEach((node) => register(node));

  //   // 创建基础节点
  //   const createBaseNode = baseNodes?.map((node) => graph?.createNode({ shape: node.name }));

  //   // 创建图片节点
  //   const createImageNode = imageNodes?.map((node) => graph?.createNode({ shape: node.name }));

  //   stencil.load([...createBaseNode], 'base-node');
  //   stencil.load([...createImageNode], 'media-component');
  //   stencil.load([], 'chart');

  //   stencilRef.current?.appendChild(stencil.container);
  // };

  const getDetailTitle = () => {
    const currentPanelItem = panelItems?.find((item) => item?.key === activeItem);

    return currentPanelItem?.name || '帮助';
  };

  // useEffect(() => {
  //   if (!isNil((ref as any).current)) {
  //     initiStencil();
  //   }
  // }, [(ref as any).current]);

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
          'fixed bg-[#1a1a1a] w-[300px] left-[64px] bottom-0 block overflow-hidden',
          collapse ? 'hidden' : 'block',
        )}
      >
        <div
          className={cn(
            'left-panel-detail-header',
            'flex items-center justify-between h-[56px] px-[16px] overflow-hidden text-[#dbdbdb] text-[12px]',
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
            'flex items-center flex-col text-[#dbdbdb] text-[12px] h-[calc(100%-56px)]',
          )}
        >
          {activeItem === 'layers' && <Layers />}
          {activeItem === 'components' && <ComponentLibrary  />}
        </div>
      </div>
    </>
  );
});

export default LeftPanel;
