import {
  BoldOutlined,
  CompressOutlined,
  DownOutlined,
  FullscreenOutlined,
  GatewayOutlined,
  GroupOutlined,
  ItalicOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UndoOutlined,
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

import './index.less';

const extraConfig = [
  {
    name: 'zoomIn',
    tooltip: '放大',
    icon: <ZoomInOutlined />,
  },
  {
    name: 'zoomOut',
    tooltip: '缩小',
    icon: <ZoomOutOutlined />,
  },
  {
    name: 'scaleToFit',
    tooltip: '缩放到适应屏幕',
    icon: <CompressOutlined />,
  },
  {
    name: 'fullScreen',
    tooltip: '全屏',
    icon: <FullscreenOutlined />,
  },
];

const ToolBar = () => {
  // TODO
  const handleToolbarClick = (name: string, value?: any) => {
    console.log(name, value);
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
    <div className="w-full h-[40px] bg-[#292f33] ">
      <Toolbar
        onClick={handleToolbarClick}
        hoverEffect={true}
        size="big"
        extra={
          <Space>
            <Button size="small" key="preview">
              预览
            </Button>
            <Button size="small" key="save">
              保存
            </Button>
            <Button size="small" key="publish">
              发布
            </Button>
            <Dropdown menu={menuProps}>
              <Button size="small">
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
          <Toolbar.Item name="frontNode" tooltip="置前" icon={<VerticalAlignTopOutlined />} />
          <Toolbar.Item name="backNode" tooltip="置后" icon={<VerticalAlignBottomOutlined />} />
          <Toolbar.Item name="multiSelect" tooltip="开启框选" icon={<GatewayOutlined />} />
          <Toolbar.Item name="group" tooltip="新建群组" icon={<GroupOutlined />} />
        </Toolbar.Group>
        <Toolbar.Group>
          {extraConfig?.map((item) => (
            <Toolbar.Item {...item} key={item.name} />
          ))}
        </Toolbar.Group>

        <Toolbar.Group>
          <Toolbar.Item name="undo" tooltip="撤销" icon={<UndoOutlined />} />
          <Toolbar.Item name="redo" tooltip="恢复" icon={<RedoOutlined />} />
        </Toolbar.Group>
        <Toolbar.Group>
          <Toolbar.Item name="bold" tooltip="粗体" icon={<BoldOutlined />} />
          <Toolbar.Item name="italic" tooltip="斜体" icon={<ItalicOutlined />} />
          <Toolbar.Item name="strikethrough" tooltip="删除线" icon={<StrikethroughOutlined />} />
          <Toolbar.Item name="underline" tooltip="下划线" icon={<UnderlineOutlined />} />
        </Toolbar.Group>
      </Toolbar>
    </div>
  );
};

export default ToolBar;
