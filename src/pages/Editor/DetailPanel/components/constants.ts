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

// 背景图片重复方式
export const REPEAT_OPTION = [
  {
    label: '不重复',
    value: 'no-repeat',
  },
  {
    label: '重复',
    value: 'repeat',
  },
  {
    label: '水平重复',
    value: 'repeat-x',
  },
  {
    label: '垂直重复',
    value: 'repeat-y',
  },
  {
    label: '平铺',
    value: 'round',
  },
  {
    label: '间隔',
    value: 'space',
  },
  {
    label: '水平翻转',
    value: 'flipX',
  },
  {
    label: '垂直翻转',
    value: 'flipY',
  },
  {
    label: '水平垂直翻转',
    value: 'flipXY',
  },
  // {
  //   label: '水印',
  //   value: 'watermark',
  // },
];

// 背景图片位置
export const POSITION_OPTION = [
  {
    label: '居中',
    value: 'center',
  },
  {
    label: '左对齐',
    value: 'left',
  },
  {
    label: '右对齐',
    value: 'right',
  },
  {
    label: '顶部对齐',
    value: 'top',
  },
  {
    label: '底部对齐',
    value: 'bottom',
  },
];

// 背景图片尺寸
export const SIZE_OPTION = [
  {
    label: '自适应',
    value: 'auto auto',
  },
  {
    label: 'cover',
    value: 'cover',
  },
  {
    label: 'contain',
    value: 'contain',
  },
  {
    label: '拉伸至全屏',
    value: '100% 100%',
  },
];
