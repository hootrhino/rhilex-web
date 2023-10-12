// 背景缩放方式
export const ZoomTypeList = [
  {
    icon: 'icon-fit-width',
    tooltip: '等比宽度铺满可滚动',
    key: 'fitWidth',
  },
  {
    icon: 'icon-fit-height',
    tooltip: '等比高度铺满居中',
    key: 'fitHeight',
  },
  {
    icon: 'icon-bg-full-screen',
    tooltip: '全屏铺满',
    key: 'fullScreen',
  },
  {
    icon: 'icon-scroll',
    tooltip: '等比高度铺满可滚动',
    key: 'scroll',
  },
  {
    icon: 'icon-center',
    tooltip: '居中',
    key: 'center',
  },
  {
    icon: 'icon-disabled',
    tooltip: '不缩放',
    key: 'none',
  },
];

// 画布设置默认值
export const DEFAULT_CONFIG = {
  zoomType: 'fitWidth',
  thumbnail: '',
  width: 1920,
  height: 1080,
  opacity: 1,
  color: '#262626',
};
