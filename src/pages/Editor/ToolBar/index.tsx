import { forwardRef } from 'react';

import { cn, IconFont } from '@/utils/utils';
import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/toolbar/style/index.css';

import type { FullScreenHandle } from 'react-full-screen';

import { useModel } from '@umijs/max';
import Tooltip from '../components/Tooltip';
import './index.less';

type ToolBarProps = {
  handleFullScreen: FullScreenHandle;
};

const ToolBar = forwardRef<ToolBarProps, any>(({ handleFullScreen }, ref) => {
  const { collapseRightPanel, setCollapseRightPanel } = useModel('useEditor');
  // const [canUndo, setCanUndo] = useState<boolean>(true);
  // const [canRedo, setCanRedo] = useState<boolean>(true);

  // // 已选择节点
  // const [selectedNode, setSelectedNode] = useState<Cell[] | undefined>(undefined);

  // // 是否全屏
  // const [isFullScreen, setFullScreen] = useState<boolean>(false);
  // // 是否禁止操作群组
  // const [disableGroup, setDisableGroup] = useState<boolean>(true);
  // // 是否禁止操作解组
  // const [disableUnGroup, setDisableUnGroup] = useState<boolean>(true);
  // // 禁止置前或置后操作
  // const disableFrontorBack =
  //   selectedNode === undefined || (selectedNode && selectedNode?.length > 1);

  // // 群组&解组
  // const handleGroup = () => {
  //   const graph = (ref as any).current;

  //   let ctrlPressed = false;
  //   const embedPadding = 20;

  //   const pos = selectedNode && selectedNode?.length > 0 && graph?.getCellsBBox(selectedNode);

  //   const parent = graph.addNode({
  //     shape: 'rect',
  //     x: pos?.x - pos?.width / 2,
  //     y: pos?.y - pos?.height / 2,
  //     width: pos?.width * 2,
  //     height: pos?.height * 2,
  //     zIndex: 1,
  //     attrs: {
  //       body: {
  //         fill: '#fffbe6',
  //         stroke: '#ffe7ba',
  //       },
  //       label: {
  //         fontSize: 12,
  //       },
  //     },
  //   });

  //   if (!disableGroup) {
  //     selectedNode?.forEach((item) => {
  //       parent.addChild(item);
  //       item?.setZIndex(10);
  //     });

  //     graph.on('node:embedding', ({ e }: { e: Dom.MouseMoveEvent }) => {
  //       ctrlPressed = e.metaKey || e.ctrlKey;
  //     });

  //     graph.on('node:embedded', () => {
  //       ctrlPressed = false;
  //     });

  //     graph.on('node:change:size', ({ node, options }: any) => {
  //       if (options.skipParentHandler) {
  //         return;
  //       }

  //       const children = node.getChildren();
  //       if (children && children?.length) {
  //         node.prop('originSize', node.getSize());
  //       }
  //     });

  //     graph.on('node:change:position', ({ node, options }: any) => {
  //       if (options.skipParentHandler || ctrlPressed) {
  //         return;
  //       }

  //       const children = node.getChildren();
  //       if (children && children?.length) {
  //         node.prop('originPosition', node.getPosition());
  //       }

  //       if (parent && parent.isNode()) {
  //         let originSize = parent.prop('originSize');
  //         if (isNil(originSize)) {
  //           originSize = parent.getSize();
  //           parent.prop('originSize', originSize);
  //         }

  //         let originPosition = parent.prop('originPosition');

  //         if (isNil(originPosition)) {
  //           originPosition = parent.getPosition();
  //           parent.prop('originPosition', originPosition);
  //         }

  //         let x = originPosition.x;
  //         let y = originPosition.y;
  //         let cornerX = originPosition.x + originSize.width;
  //         let cornerY = originPosition.y + originSize.height;
  //         let hasChange = false;

  //         const children = parent.getChildren();

  //         if (children) {
  //           children?.forEach((child: any) => {
  //             const bbox = child.getBBox().inflate(embedPadding);
  //             const corner = bbox.getCorner();

  //             if (bbox.x < x) {
  //               x = bbox.x;
  //               hasChange = true;
  //             }

  //             if (bbox.y < y) {
  //               y = bbox.y;
  //               hasChange = true;
  //             }

  //             if (corner.x > cornerX) {
  //               cornerX = corner.x;
  //               hasChange = true;
  //             }

  //             if (corner.y > cornerY) {
  //               cornerY = corner.y;
  //               hasChange = true;
  //             }
  //           });
  //         }

  //         if (hasChange) {
  //           parent.prop(
  //             {
  //               position: { x, y },
  //               size: { width: cornerX - x, height: cornerY - y },
  //             },
  //             { skipParentHandler: true },
  //           );
  //         }
  //       }
  //     });
  //   } else {
  //     // 解组
  //     const children = selectedNode?.[0].getChildren();

  //     if (!disableUnGroup) {
  //       graph?.removeCells(selectedNode);
  //       graph?.resetCells(children);
  //     }
  //   }
  // };

  // const handleToolbarClick = (name: string) => {
  //   const graph = (ref as any).current;

  //   setCanRedo(!graph.canRedo());
  //   setCanUndo(!graph.canUndo());
  //   switch (name) {
  //     case 'undo':
  //       graph.undo();
  //       break;
  //     case 'redo':
  //       graph.redo();
  //       break;
  //     case 'zoomIn':
  //       graph.zoom(0.1);
  //       break;
  //     case 'zoomOut':
  //       graph.zoom(-0.1);
  //       break;
  //     case 'scaleToOne':
  //       graph.zoomTo(1);
  //       break;
  //     case 'scaleToFit':
  //       graph.zoomToFit();
  //       break;
  //     case 'fullScreen':
  //       handleFullScreen.enter();
  //       setFullScreen(true);
  //       break;
  //     case 'exitFullScreen':
  //       handleFullScreen.exit();
  //       setFullScreen(false);
  //       break;
  //     case 'frontNode':
  //       if (selectedNode !== undefined) {
  //         selectedNode?.[0].toFront();
  //       }
  //       break;
  //     case 'backNode':
  //       if (selectedNode !== undefined) {
  //         selectedNode?.[0].toBack();
  //       }
  //       break;
  //     case 'group':
  //       handleGroup();
  //       setDisableGroup(true);
  //       break;
  //     case 'unGroup':
  //       handleGroup();
  //       setDisableGroup(true);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // useEffect(() => {
  //   if (selectedNode && selectedNode?.length > 0) {
  //     const group = selectedNode?.filter((item) => item.hasParent() || item.getChildCount() > 0);
  //     const children = selectedNode?.filter((item) => item.getChildCount() > 0);

  //     setDisableGroup(group?.length > 0 ? true : false);
  //     setDisableUnGroup(children?.length > 0 ? false : true);
  //   } else {
  //     setDisableGroup(true);
  //     setDisableUnGroup(true);
  //   }
  // }, [selectedNode]);

  // useEffect(() => {
  //   const graph = (ref as any).current;

  //   if (!isNil(graph)) {
  //     graph.on('selection:changed', ({ selected }: any) => {
  //       if (selected.length > 0 && selected[0].isNode()) {
  //         const n = selected?.filter((item: any) => item.isNode());
  //         setSelectedNode(n);
  //       } else {
  //         setSelectedNode(undefined);
  //       }
  //     });
  //     setCanRedo(!graph.canRedo());
  //     setCanUndo(!graph.canUndo());
  //   }
  // }, [(ref as any).current]);

  return (
    <div
      className={cn(
        'toolbar-container',
        'editor-shadow-outer-b',
        'editor-box-shadow-3',
        'w-full h-[60px] bg-[#1f1f1f] fixed top-0 z-[99] pb-[1px]',
      )}
    >
      <div className="w-full h-full px-[24px] flex">
        <div className="h-full flex-1">
          <div className="h-full flex items-center mr-[20px]">
            <img alt="logo" src="/logo.png" className="h-[28px] w-[45px]" />
            <div className="ml-[12px] flex flex-col">
              <div className="text-[#fff] truncate max-w-[140px] cursor-pointer hover:underline">
                大屏名称大屏名称大屏名称大屏名称
              </div>
              <div className="text-[#7a7a7a] text-base truncate max-w-[160px]">
                <span className="cursor-pointer hover:underline">默认工作空间</span> /{' '}
                <span className="cursor-pointer hover:underline">
                  测试分组测试分组测试分组测试分组测试分组
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full flex-1">
          <div className="flex justify-end items-center h-full">
            <Tooltip title="刷新画布">
              <div
                className="flex justify-center items-center bg-[#474747] w-[24px] h-[24px] ml-[12px] rounded-[4px] cursor-pointer hover:bg-[#565656]"
                onClick={() => {
                  // TODO 刷新画布
                }}
              >
                <IconFont type="icon-reload-active" />
              </div>
            </Tooltip>
            <Tooltip title="关闭右侧面板">
              <div
                className="flex justify-center items-center bg-[#474747] w-[24px] h-[24px] mx-[12px] rounded-[4px] cursor-pointer hover:bg-[#565656]"
                onClick={() => setCollapseRightPanel(!collapseRightPanel)}
              >
                <IconFont
                  type={collapseRightPanel ? 'icon-right-panel-active' : 'icon-right-panel'}
                />
              </div>
            </Tooltip>
            <Tooltip title="生成快照">
              <div
                className="flex justify-center items-center bg-[#474747] w-[66px] h-[24px] mr-[12px] rounded-[4px] cursor-pointer hover:bg-[#565656]"
                onClick={() => {
                  // TODO 生成快照
                }}
              >
                <IconFont type="icon-snapshot" className="text-[14px]" />
                <span className="pl-[5px] text-base text-[#dbdbdb]">快照</span>
              </div>
            </Tooltip>
            <div
              className="flex justify-center items-center bg-[#474747] w-[66px] h-[24px] mr-[12px] rounded-[4px] cursor-pointer hover:bg-[#565656]"
              onClick={() => {
                // TODO 预览
              }}
            >
              <IconFont type="icon-preview" className="text-[14px]" />
              <span className="pl-[5px] text-base text-[#dbdbdb]">预览</span>
            </div>
            <div
              className="flex justify-center items-center bg-[#1F6AFF] w-[66px] h-[24px] rounded-[4px] cursor-pointer hover:bg-[#4281ff]"
              onClick={() => {
                // TODO 发布
              }}
            >
              <IconFont type="icon-publish" className="text-[14px]" />
              <span className="pl-[5px] text-base text-[#fff]">发布</span>
            </div>
          </div>
        </div>
      </div>

      {/* <Toolbar
        onClick={handleToolbarClick}
        hoverEffect={true}
        size="big"
        extra={
          <Space>
            <Tooltip title="关闭右侧面板">
              <Button
                size="small"
                key="control-right-panel"
                icon={<IconFont type="icon-right-panel" />}
                className="bg-[#474747] border-none text-[#dbdbdb]"
                onClick={() => setCollapseRightPanel(!collapseRightPanel)}
              />
            </Tooltip>
            <Button
              size="small"
              key="preview"
              icon={<IconFont type="icon-preview" />}
              className="bg-[#474747] border-none text-[#dbdbdb]"
            >
              预览
            </Button>
            <Button
              type="primary"
              size="small"
              key="publish"
              icon={<IconFont type="icon-publish" />}
              className="border-none"
            >
              发布
            </Button>
          </Space>
        }
        className="flex items-center h-full px-[10px]"
      >
        <Space className="mr-[50px]">
          <img alt="logo" src="/logo.png" className="h-[28px] w-[45px]" />
          <div className="text-[#fff] w-[120px] truncate">大屏名称大屏名称大屏名称大屏名称</div>
        </Space>
        <Toolbar.Group>
          <Toolbar.Item
            name="frontNode"
            tooltip="置前"
            icon={<VerticalAlignTopOutlined />}
            disabled={disableFrontorBack}
          />
          <Toolbar.Item
            name="backNode"
            tooltip="置后"
            icon={<VerticalAlignBottomOutlined />}
            disabled={disableFrontorBack}
          />
          <Toolbar.Item
            name="group"
            tooltip="新建群组"
            icon={<GroupOutlined />}
            disabled={disableGroup}
          />
          <Toolbar.Item
            name="unGroup"
            tooltip="取消群组"
            icon={<UngroupOutlined />}
            disabled={disableUnGroup}
          />
        </Toolbar.Group>
        <Toolbar.Group>
          <Toolbar.Item name="undo" tooltip="撤销" icon={<UndoOutlined />} disabled={canUndo} />
          <Toolbar.Item name="redo" tooltip="重做" icon={<RedoOutlined />} disabled={canRedo} />
        </Toolbar.Group>
        <Toolbar.Group>
          <Toolbar.Item name="zoomIn" tooltip="放大" icon={<ZoomInOutlined />} />
          <Toolbar.Item name="zoomOut" tooltip="缩小" icon={<ZoomOutOutlined />} />
          <Toolbar.Item name="scaleToOne" tooltip="缩放到1:1" icon={<OneToOneOutlined />} />
          <Toolbar.Item name="scaleToFit" tooltip="缩放到适应屏幕" icon={<CompressOutlined />} />
          <Toolbar.Item
            name={isFullScreen ? 'exitFullScreen' : 'fullScreen'}
            tooltip={isFullScreen ? '退出全屏' : '全屏'}
            icon={isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          />
        </Toolbar.Group>
      </Toolbar> */}
    </div>
  );
});

export default ToolBar;
