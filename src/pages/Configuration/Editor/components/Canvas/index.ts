import type { CanvasProps } from '@ant-design/flowchart';

export const defaultCanvasProps: CanvasProps = {
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
