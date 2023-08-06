import {
  CompressOutlined,
  EyeInvisibleOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  GroupOutlined,
  OneToOneOutlined,
  RedoOutlined,
  UndoOutlined,
  UngroupOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import type { Cell, Dom } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { Button, Space, Tooltip } from 'antd';
import { isNil } from 'lodash';
import { forwardRef, useEffect, useState } from 'react';

import { cn, IconFont } from '@/utils/utils';
import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/toolbar/style/index.css';
import Ruler from '@scena/ruler';
import type { FullScreenHandle } from 'react-full-screen';

import { useModel } from '@umijs/max';
import './index.less';

type ToolBarProps = {
  handleFullScreen: FullScreenHandle;
};

const ToolBar = forwardRef<ToolBarProps, any>(({ handleFullScreen }, ref) => {
  const { collapseLeftPanel, collapseRightPanel, setCollapseRightPanel } = useModel('useEditor');

  // 已选择节点
  const [selectedNode, setSelectedNode] = useState<Cell[] | undefined>(undefined);

  // 是否全屏
  const [isFullScreen, setFullScreen] = useState<boolean>(false);
  // 是否禁止操作群组
  const [disableGroup, setDisableGroup] = useState<boolean>(true);
  // 是否禁止操作解组
  const [disableUnGroup, setDisableUnGroup] = useState<boolean>(true);
  // 禁止置前或置后操作
  const disableFrontorBack =
    selectedNode === undefined || (selectedNode && selectedNode?.length > 1);

  // 群组&解组
  const handleGroup = () => {
    const graph = (ref as any).current;

    let ctrlPressed = false;
    const embedPadding = 20;

    const pos = selectedNode && selectedNode?.length > 0 && graph?.getCellsBBox(selectedNode);

    const parent = graph.addNode({
      shape: 'rect',
      x: pos?.x - pos?.width / 2,
      y: pos?.y - pos?.height / 2,
      width: pos?.width * 2,
      height: pos?.height * 2,
      zIndex: 1,
      attrs: {
        body: {
          fill: '#fffbe6',
          stroke: '#ffe7ba',
        },
        label: {
          fontSize: 12,
        },
      },
    });

    if (!disableGroup) {
      selectedNode?.forEach((item) => {
        parent.addChild(item);
        item?.setZIndex(10);
      });

      graph.on('node:embedding', ({ e }: { e: Dom.MouseMoveEvent }) => {
        ctrlPressed = e.metaKey || e.ctrlKey;
      });

      graph.on('node:embedded', () => {
        ctrlPressed = false;
      });

      graph.on('node:change:size', ({ node, options }: any) => {
        if (options.skipParentHandler) {
          return;
        }

        const children = node.getChildren();
        if (children && children?.length) {
          node.prop('originSize', node.getSize());
        }
      });

      graph.on('node:change:position', ({ node, options }: any) => {
        if (options.skipParentHandler || ctrlPressed) {
          return;
        }

        const children = node.getChildren();
        if (children && children?.length) {
          node.prop('originPosition', node.getPosition());
        }

        if (parent && parent.isNode()) {
          let originSize = parent.prop('originSize');
          if (isNil(originSize)) {
            originSize = parent.getSize();
            parent.prop('originSize', originSize);
          }

          let originPosition = parent.prop('originPosition');

          if (isNil(originPosition)) {
            originPosition = parent.getPosition();
            parent.prop('originPosition', originPosition);
          }

          let x = originPosition.x;
          let y = originPosition.y;
          let cornerX = originPosition.x + originSize.width;
          let cornerY = originPosition.y + originSize.height;
          let hasChange = false;

          const children = parent.getChildren();

          if (children) {
            children?.forEach((child: any) => {
              const bbox = child.getBBox().inflate(embedPadding);
              const corner = bbox.getCorner();

              if (bbox.x < x) {
                x = bbox.x;
                hasChange = true;
              }

              if (bbox.y < y) {
                y = bbox.y;
                hasChange = true;
              }

              if (corner.x > cornerX) {
                cornerX = corner.x;
                hasChange = true;
              }

              if (corner.y > cornerY) {
                cornerY = corner.y;
                hasChange = true;
              }
            });
          }

          if (hasChange) {
            parent.prop(
              {
                position: { x, y },
                size: { width: cornerX - x, height: cornerY - y },
              },
              { skipParentHandler: true },
            );
          }
        }
      });
    } else {
      // 解组
      const children = selectedNode?.[0].getChildren();

      if (!disableUnGroup) {
        graph?.removeCells(selectedNode);
        graph?.resetCells(children);
      }
    }
  };

  const handleToolbarClick = (name: string) => {
    const graph = (ref as any).current;

    switch (name) {
      case 'undo':
        graph.undo();
        break;
      case 'redo':
        graph.redo();
        break;
      case 'zoomIn':
        graph.zoom(0.1);
        break;
      case 'zoomOut':
        graph.zoom(-0.1);
        break;
      case 'scaleToOne':
        graph.zoomTo(1);
        break;
      case 'scaleToFit':
        graph.zoomToFit();
        break;
      case 'fullScreen':
        handleFullScreen.enter();
        setFullScreen(true);
        break;
      case 'exitFullScreen':
        handleFullScreen.exit();
        setFullScreen(false);
        break;
      case 'frontNode':
        if (selectedNode !== undefined) {
          selectedNode?.[0].toFront();
        }
        break;
      case 'backNode':
        if (selectedNode !== undefined) {
          selectedNode?.[0].toBack();
        }
        break;
      case 'group':
        handleGroup();
        setDisableGroup(true);
        break;
      case 'unGroup':
        handleGroup();
        setDisableGroup(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (selectedNode && selectedNode?.length > 0) {
      const group = selectedNode?.filter((item) => item.hasParent() || item.getChildCount() > 0);
      const children = selectedNode?.filter((item) => item.getChildCount() > 0);

      setDisableGroup(group?.length > 0 ? true : false);
      setDisableUnGroup(children?.length > 0 ? false : true);
    } else {
      setDisableGroup(true);
      setDisableUnGroup(true);
    }
  }, [selectedNode]);

  useEffect(() => {
    const graph = (ref as any).current;

    if (!isNil(graph)) {
      graph.on('selection:changed', ({ selected }: any) => {
        if (selected.length > 0 && selected[0].isNode()) {
          const n = selected?.filter((item: any) => item.isNode());
          setSelectedNode(n);
        } else {
          setSelectedNode(undefined);
        }
      });
    }
  }, [(ref as any).current]);

  useEffect(() => {
    const container = document.getElementById('ruler-horizontal')!;

    new Ruler(container, {
      type: 'horizontal',
      height: 20,
      unit: 200,
      font: '8px',
      longLineSize: 5,
      shortLineSize: 5,
      mainLineSize: '60%',
      backgroundColor: '#292929',
      textColor: '#464646',
      lineColor: '#787878',
      textOffset: [0, 10],
      range: [-4000, 4800],
      useResizeObserver: true,
      markColor: '#FA832E',
      marks: [0, 1920],
      defaultScrollPos: -700,
      zoom: 0.5,
      selectedRanges: [[0, 1920]],
      selectedBackgroundColor: '#27303F',
      selectedRangesTextColor: '#3A73E1',
    });

    // return () => {
    //   horizontalRuler?.destroy();
    // }
  }, []);

  return (
    <div className={cn('toolbar-container', 'w-full h-[60px] bg-[#1f1f1f] fixed top-0 z-[99]')}>
      <Toolbar
        onClick={handleToolbarClick}
        hoverEffect={true}
        size="big"
        extra={
          <Space>
            <Tooltip title="关闭右侧面板" color="#1F6AFF">
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
          <div className="text-white w-[120px] truncate">大屏名称大屏名称大屏名称大屏名称</div>
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
          <Toolbar.Item name="undo" tooltip="撤销" icon={<UndoOutlined />} />
          <Toolbar.Item name="redo" tooltip="重做" icon={<RedoOutlined />} />
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
      </Toolbar>
      <div
        className={cn(
          'canvas-ruler-horizontal',
          'absolute top-[60px] w-full left-[84px]',
          // collapseLeftPanel ? 'left-[84px]' : 'left-[326px]',
        )}
      >
        <div id="ruler-horizontal" className="w-full" />
      </div>
      <div
        className={cn(
          'flex justify-center items-center absolute w-[20px] h-[20px] bg-[#292929]',
          collapseLeftPanel ? 'left-[64px]' : 'left-[306px]',
        )}
      >
        <EyeInvisibleOutlined style={{ color: '#adadad' }} />
      </div>
    </div>
  );
});

export default ToolBar;
