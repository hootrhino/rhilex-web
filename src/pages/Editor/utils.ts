import type { Graph } from '@antv/x6';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { History } from '@antv/x6-plugin-history';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Transform } from '@antv/x6-plugin-transform';
import inRange from 'lodash/inRange';
import { chartsList } from './LeftPanel/constant';

// 组件 title
export const NODE_TITLE = {
  other1: '水波图',
  other2: '旭日图',
  other3: '漏斗图',
  other4: '热力图',
  other5: '子弹图',
  interval1: '区间柱状图',
  interval2: '柱状图',
  interval3: '瀑布图',
  interval4: '玉钰图',
  bar1: '百分比条形图',
  line1: '折线图',
  area1: '区域图',
  pie1: '饼图',
  pie2: '进度环图',
  point1: '基本散点图',
  point2: '气泡图',
  radar1: '雷达图',
  map1: '基础平面地图',
  text1: '词云',
  text2: '跑马灯',
  text3: '通用标题',
  text4: '倒计时',
  text5: '多行文本',
  text6: '时间器',
  table1: '进度条表格',
  table2: '轮播列表',
  widget1: '开关',
  widget2: 'iframe',
  media1: '单张图片',
  media2: '视频',
  media3: '轮播图',
  media4: '装饰线条',
  media5: '箭头描绘',
  media6: '基础图形',
};

export type GuideConfigType = {
  horizontalUnit: number;
  horizontalZoom: number;
  canvasSize: number;
};

// 获取节点名称
export const getNodeTitle = (shape: string) => {
  return NODE_TITLE[shape];
};

// 使用插件
export const handleOnPlugins = (graph: Graph) => {
  graph
    .use(
      new Snapline({
        enabled: true,
      }),
    )
    .use(
      new Transform({
        resizing: true,
        rotating: true,
      }),
    )
    .use(
      new Selection({
        enabled: true,
        rubberband: true,
        showNodeSelectionBox: true,
        pointerEvents: 'none',
        // modifiers: ['alt']
      }),
    )
    .use(
      new Keyboard({
        enabled: true,
      }),
    )
    .use(
      new Clipboard({
        enabled: true,
      }),
    )
    .use(
      new History({
        enabled: true,
      }),
    );
};

// 使用快捷键
export const handleOnBindKey = (
  graph: Graph,
  updateRemoveModalConfig: (value: RemoveModalConfig) => void,
) => {
  // 复制
  graph.bindKey(['meta+c', 'ctrl+c'], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells);
    }
    return false;
  });

  // 剪切
  graph.bindKey(['meta+x', 'ctrl+x'], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.cut(cells);
    }
    return false;
  });

  // 粘贴
  graph.bindKey(['meta+v', 'ctrl+v'], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
    return false;
  });

  // 撤销
  graph.bindKey(['meta+z', 'ctrl+z'], () => {
    if (graph.canUndo()) {
      graph.undo();
    }
    return false;
  });

  // 重做
  graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
    if (graph.canRedo()) {
      graph.redo();
    }
    return false;
  });

  // 全选
  graph.bindKey(['meta+shift+a', 'ctrl+shift+a'], () => {
    const nodes = graph.getNodes();
    if (nodes) {
      graph.select(nodes);
    }
  });

  // 删除
  graph.bindKey('backspace', () => {
    const cells = graph.getSelectedCells();

    if (cells.length) {
      const selectedShape = cells?.map((cell) => getNodeTitle(cell?.shape));

      updateRemoveModalConfig({ open: true, content: selectedShape.join('、') });
    }
  });
};

// 更新标尺 zoom&unit
export const getGuideConfig = ({ horizontalUnit, horizontalZoom, canvasSize }: GuideConfigType) => {
  let unit = horizontalUnit;
  let guideZoom = horizontalZoom;

  if (inRange(canvasSize, 0, 35)) {
    unit = 300;
    guideZoom = 0.3;
  } else if (inRange(canvasSize, 35, 55)) {
    unit = 200;
    guideZoom = 0.35;
  } else if (inRange(canvasSize, 55, 100)) {
    unit = 100;
    guideZoom = 0.55;
  } else if (inRange(canvasSize, 100, 125)) {
    unit = 80;
    guideZoom = 1;
  } else if (inRange(canvasSize, 125, 170)) {
    unit = 60;
    guideZoom = 1.25;
  } else {
    unit = 40;
    guideZoom = 1.5;
  }

  return { unit, guideZoom };
};

// 获取组件快速样式
export const getQuickStyle = (activeKey: string) => {
  let activeQuickStyle;

  const activeGroup = chartsList.find(chart => activeKey.includes(chart.group));

  if (activeGroup?.children && activeGroup?.children?.length > 0) {
    const activeItem = activeGroup.children.find(item => item.key === activeKey);
    activeQuickStyle = activeItem?.children;
  }

  return activeQuickStyle;
};
