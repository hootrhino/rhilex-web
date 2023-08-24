import chartsImg from './Images';
const { interval, bar, line, area, pie, point, radar, other } = chartsImg;

export const tabList = [
  {
    key: 'charts',
    icon: 'icon-charts',
    name: '图表',
  },
  {
    key: 'map',
    icon: 'icon-map',
    name: '地图',
  },
  {
    key: 'text',
    icon: 'icon-text',
    name: '信息',
  },
  {
    key: 'table',
    icon: 'icon-table',
    name: '表格',
  },
  {
    key: 'widget',
    icon: 'icon-widget',
    name: '控件',
  },
  {
    key: 'multimedia',
    icon: 'icon-multimedia',
    name: '媒体',
  },
  {
    key: 'other',
    icon: 'icon-other',
    name: '其他',
  },
];

export const chartsTypeList = [
  { key: 'all', value: '全部' },
  { key: 'interval', value: '柱状图' },
  { key: 'bar', value: '条形图' },
  { key: 'line', value: '折线图' },
  { key: 'area', value: '区域图' },
  { key: 'pie', value: '饼环图' },
  { key: 'point', value: '散点图' },
  { key: 'radar', value: '雷达图' },
  // { key: 'relation', value: '关系图' },
  { key: 'other', value: '其他' },
];

export const chartsList = [
  {
    group: 'all',
    children: [],
  },
  {
    group: 'other',
    children: [
      {
        key: 'other1',
        title: '水波图',
        image: other.other1,
      },
      {
        key: 'other2',
        title: '旭日图',
        image: other.other2,
      },
      {
        key: 'other3',
        title: '漏斗图',
        image: other.other3,
      },
      {
        key: 'other4',
        title: '热力图',
        image: other.other4,
      },
      {
        key: 'other5',
        title: '子弹图',
        image: other.other5,
      },
    ],
  },
  {
    group: 'interval',
    children: [
      {
        key: 'interval1',
        title: '区间柱状图',
        image: interval.interval1,
      },
      {
        key: 'interval2',
        title: '柱状图',
        image: interval.interval2,
      },
      {
        key: 'interval3',
        title: '瀑布图',
        image: interval.interval3,
      },
      {
        key: 'radial1',
        title: '玉钰图',
        image: interval.interval4,
      },
    ],
  },
  {
    group: 'bar',
    children: [
      {
        key: 'bar1',
        title: '百分比条形图',
        image: bar.bar1,
      },
    ],
  },
  {
    group: 'line',
    children: [
      {
        key: 'line1',
        title: '折线图',
        image: line.line1,
      },
    ],
  },
  {
    group: 'area',
    children: [
      {
        key: 'area1',
        title: '区域图',
        image: area.area1,
      },
    ],
  },
  {
    group: 'pie',
    children: [
      {
        key: 'pie1',
        title: '饼图',
        image: pie.pie1,
      },
      {
        key: 'pie2',
        title: '进度环图',
        image: pie.pie2,
      },
      {
        key: 'pie3',
        title: '分类玫瑰图',
        image: pie.pie3,
      },
    ],
  },
  {
    group: 'point',
    children: [
      {
        key: 'point1',
        title: '基本散点图',
        image: point.point1,
      },
      {
        key: 'point2',
        title: '气泡图',
        image: point.point2,
      },
    ],
  },
  {
    group: 'radar',
    children: [
      {
        key: 'radar1',
        title: '雷达图',
        image: radar.radar1,
      },
    ],
  },
  {
    group: 'relation',
    children: [],
  },
  {
    group: 'other',
    children: [],
  },
];

export const panelItems = [
  { name: '图层', icon: 'icon-layers', key: 'layers' },
  { name: '组件库', icon: 'icon-components', key: 'components' },
  { name: '设计库', icon: 'icon-folder-star', key: 'material' },
];
