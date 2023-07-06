import type { CanvasProps, ScaleToolbarPanelProps, ToolbarPanelProps } from '@ant-design/flowchart';

// 缩放控件
export const SCALE_TOOLBAR_PANEL: ScaleToolbarPanelProps = {
  layout: 'horizontal',
  position: {
    right: 0,
    top: -40,
  },
  style: {
    width: 150,
    height: 39,
    left: 'auto',
    background: 'transparent',
  },
};

// Toolbar
export const TOOLBAR_PANEL: ToolbarPanelProps = {
  position: {
    top: 0,
    left: 0,
    right: 0,
  },
};

// 画布
export const CANVAS: CanvasProps = {
  // 主画布
  position: {
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
  },
  config: {
    // 网格线配置
    rotating: true,
    background: {
      color: '#F5F5F5',
    },
    panning: true,
    mousewheel: true,
    grid: {
      visible: true,
      type: 'doubleMesh',
      args: [
        {
          color: '#eee', // 主网格线颜色
          thickness: 1, // 主网格线宽度
        },
        {
          color: '#ddd', // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 4, // 主次网格线间隔
        },
      ],
    },
  },
};
