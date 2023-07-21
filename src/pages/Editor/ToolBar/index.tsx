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
import type { Cell, Dom } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { isNil } from 'lodash';
import { useEffect, useState } from 'react';

import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/toolbar/style/index.css';
import '../index.less';

const ToolBar = ({ handleFullScreen }: any) => {
  const { graph } = useModel('useEditor');

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
    if (graph !== undefined) {
      graph.on('selection:changed', ({ selected }: any) => {
        if (selected.length > 0 && selected[0].isNode()) {
          const n = selected?.filter((item: any) => item.isNode());
          setSelectedNode(n);
        } else {
          setSelectedNode(undefined);
        }
      });
    }
  }, [graph]);

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
    </div>
  );
};

export default ToolBar;
