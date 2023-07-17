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
import type { Dom } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { isNil } from 'lodash';
import { forwardRef, useState } from 'react';

import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/toolbar/style/index.css';
import './index.less';

const ToolBar = forwardRef<any, any>(({ handleFullScreen }, ref) => {
  const { selectedNode } = useModel('useEditor');
  // 判断是否全屏
  const [isFullScreen, setFullScreen] = useState<boolean>(false);
  // 判断是否存在群组
  const [disableGroup, setDisableGroup] = useState<boolean>(false);
  // 禁止置前或置后操作
  const disableFrontorBack =
    selectedNode === undefined || (selectedNode && selectedNode?.length > 1);

  // 群组&解组
  const handleGroup = () => {
    let ctrlPressed = false;
    const embedPadding = 20;

    const pos = selectedNode?.length > 0 && ref.current?.getCellsBBox(selectedNode);

    const parent = ref.current.addNode({
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
      setDisableGroup(true);

      selectedNode?.forEach((item) => {
        parent.addChild(item);
        item?.setZIndex(10);
      });

      ref.current.on('node:embedding', ({ e }: { e: Dom.MouseMoveEvent }) => {
        ctrlPressed = e.metaKey || e.ctrlKey;
      });

      ref.current.on('node:embedded', () => {
        ctrlPressed = false;
      });

      ref.current.on('node:change:size', ({ node, options }) => {
        if (options.skipParentHandler) {
          return;
        }

        const children = node.getChildren();
        if (children && children?.length) {
          node.prop('originSize', node.getSize());
        }
      });

      ref.current.on('node:change:position', ({ node, options }) => {
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
            children.forEach((child) => {
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
      const selectedCells = ref.current?.getSelectedCells(); // 获取当前选中的节点
      const children = selectedCells?.[0].getChildren();

      ref.current?.removeCells(selectedCells);

      ref.current?.resetCells(children);

      setDisableGroup(false);
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
        break;
      case 'unGroup':
        handleGroup();
        break;
      default:
        break;
    }
  };

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
            disabled={!disableGroup}
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
