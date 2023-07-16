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
        // TODO
        break;
      case 'unGroup':
        // TODO
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
            disabled={selectedNode === undefined}
          />
          <Toolbar.Item
            name="backNode"
            tooltip="置后"
            icon={<VerticalAlignBottomOutlined />}
            disabled={selectedNode === undefined}
          />
          <Toolbar.Item name="group" tooltip="新建群组" icon={<GroupOutlined />} />
          <Toolbar.Item name="unGroup" tooltip="取消群组" icon={<UngroupOutlined />} />
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
