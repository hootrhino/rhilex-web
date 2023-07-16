import {
  CompressOutlined,
  DownOutlined,
  FileDoneOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  FundViewOutlined,
  GroupOutlined,
  OneToOneOutlined,
  QuestionCircleOutlined,
  RedoOutlined,
  SaveOutlined,
  UndoOutlined,
  UngroupOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Toolbar } from '@antv/x6-react-components';
import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/toolbar/style/index.css';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

import { useModel } from '@umijs/max';
import { forwardRef, useState } from 'react';
import './index.less';

const ToolBar = forwardRef<any, any>(({ handleFullScreen }, ref) => {
  const [isFullScreen, setFullScreen] = useState<boolean>(false);
  const { selectedNode } = useModel('useEditor');

  // TODO
  const handleGroup = () => {
    let ctrlPressed = false;
    const hasParent = selectedNode?.getParent();
    if (selectedNode !== undefined && hasParent === null) {
      const pos = selectedNode?.getBBox();
      const parent = ref.current.addNode({
        shape: 'rect',
        x: pos?.x - 50,
        y: pos?.y - 50,
        width: pos?.width + 100,
        height: pos?.height + 100,
        zIndex: 1,
        label: 'Parent',
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
      selectedNode?.setParent(parent);
      selectedNode?.setZIndex(10);
      ref.current.on('node:change:position', ({ node, options }) => {
        if (options.skipParentHandler || ctrlPressed) {
          return;
        }

        const children = node.getChildren();
        if (children && children.length) {
          node.prop('originPosition', node.getPosition());
        }

        const parent = node.getParent();
        if (parent && parent.isNode()) {
          let originSize = parent.prop('originSize');
          if (originSize === null) {
            originSize = parent.getSize();
            parent.prop('originSize', originSize);
          }

          let originPosition = parent.prop('originPosition');
          if (originPosition === null) {
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
            children.forEach((child) => {
              const bbox = child.getBBox().inflate(20);
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
    }
  };

  const handleToolbarClick = (name: string) => {
    const graph = ref.current;

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
          selectedNode.toFront();
        }
        break;
      case 'backNode':
        if (selectedNode !== undefined) {
          selectedNode.toBack();
        }
        break;
      case 'group':
        handleGroup();
        break;
      case 'unGroup':
        // TODO
        break;
      default:
        break;
    }
  };
  // console.log(selectedNode, selectedNode.getBBox())
  // TODO
  const handleMenuClick = () => {};

  const items: MenuProps['items'] = [
    {
      label: '说明文档',
      key: 'doc',
    },
    {
      label: '操作指引',
      key: 'guide',
    },
    {
      label: '视频教程',
      key: 'video',
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="w-full h-[40px] bg-[#292f33] fixed top-0 z-[99]">
      <Toolbar
        onClick={handleToolbarClick}
        hoverEffect={true}
        size="big"
        extra={
          <Space>
            <Button size="small" key="preview" icon={<FundViewOutlined />}>
              预览
            </Button>
            <Button size="small" key="save" icon={<SaveOutlined />}>
              保存
            </Button>
            <Button size="small" key="publish" icon={<FileDoneOutlined />}>
              发布
            </Button>
            <Dropdown menu={menuProps}>
              <Button size="small" icon={<QuestionCircleOutlined />}>
                <Space>
                  帮助
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Space>
        }
        className="flex items-center h-full px-[10px]"
      >
        <Toolbar.Group>
          <Toolbar.Item
            name="frontNode"
            tooltip="置前"
            icon={<VerticalAlignTopOutlined />}
            disabled={selectedNode === undefined}
          />
          <Toolbar.Item
            name="backNode"
            tooltip="置后"
            icon={<VerticalAlignBottomOutlined />}
            disabled={selectedNode === undefined}
          />
          <Toolbar.Item
            name="group"
            tooltip="新建群组"
            icon={<GroupOutlined />}
            disabled={selectedNode === undefined}
          />
          <Toolbar.Item
            name="unGroup"
            tooltip="取消群组"
            icon={<UngroupOutlined />}
            disabled={selectedNode !== undefined}
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
    </div>
  );
});

export default ToolBar;
