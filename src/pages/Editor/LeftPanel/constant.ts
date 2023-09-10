import chartsImg from './Images';
const { interval, bar, line, area, pie, point, radar, other, map, text, table, widget, media } =
  chartsImg;

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
    key: 'media',
    icon: 'icon-multimedia',
    name: '媒体',
  },
  // {
  //   key: 'other',
  //   icon: 'icon-other',
  //   name: '其他',
  // },
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
        disabled: true,
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
        key: 'interval4',
        title: '玉钰图',
        image: interval.interval4,
        // disabled: true
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
        disabled: true,
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
      // {
      //   key: 'pie3',
      //   title: '分类玫瑰图',
      //   image: pie.pie3,
      // },
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
        disabled: true,
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
];

export const mapList = [
  {
    key: 'map1',
    title: '基础平面地图',
    image: map.map1,
    disabled: true,
  },
];

export const textList = [
  {
    key: 'text1',
    title: '词云',
    image: text.text1,
  },
  {
    key: 'text2',
    title: '跑马灯',
    image: text.text2,
  },
  {
    key: 'text3',
    title: '通用标题',
    image: text.text3,
  },
  {
    key: 'text4',
    title: '倒计时',
    image: text.text4,
  },
  {
    key: 'text5',
    title: '多行文本',
    image: text.text5,
  },
  {
    key: 'text6',
    title: '时间器',
    image: text.text6,
  },
];

export const tableList = [
  {
    key: 'table1',
    title: '进度条表格',
    image: table.table1,
  },
  {
    key: 'table2',
    title: '轮播列表',
    image: table.table2,
  },
];

export const widgetList = [
  {
    key: 'widget1',
    title: '开关',
    image: widget.widget1,
    disabled: true,
  },
  {
    key: 'widget2',
    title: 'iframe',
    image: widget.widget2,
  },
];

export const mediaList = [
  {
    key: 'media1',
    title: '单张图片',
    image: media.media1,
  },
  {
    key: 'media2',
    title: '视频',
    image: media.media2,
  },
  {
    key: 'media3',
    title: '轮播图',
    image: media.media3,
  },
  {
    key: 'media4',
    title: '装饰线条',
    image: media.media4,
  },
  {
    key: 'media5',
    title: '箭头描绘',
    image: media.media5,
  },
  {
    key: 'media6',
    title: '基础图形',
    image: media.media6,
  },
];

export const panelItems = [
  { name: '图层', icon: 'icon-layers', key: 'layers' },
  { name: '组件库', icon: 'icon-components', key: 'components' },
  { name: '设计库', icon: 'icon-folder-star', key: 'material' },
];
