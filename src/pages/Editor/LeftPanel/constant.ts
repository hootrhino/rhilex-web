import chartsImg from '../Images';
const {
  interval,
  bar,
  line,
  area,
  pie,
  point,
  radar,
  other,
  map,
  text,
  table,
  widget,
  media,
  template,
} = chartsImg;

// 设计库
export const MaterialTabList = [
  {
    key: 'temp',
    icon: 'icon-temp',
    name: '大屏模板',
  },
  {
    key: 'map',
    icon: 'icon-map',
    name: '地图',
  },
  {
    key: 'dataPanel',
    icon: 'icon-data-panel',
    name: '数据面板',
  },
  {
    key: 'title',
    icon: 'icon-title',
    name: '标题',
  },
  {
    key: 'norm',
    icon: 'icon-norm',
    name: '设计规范',
  },
  {
    key: 'sucai',
    icon: 'icon-sucai',
    name: '素材',
  },
];

export const MaterialData = [
  {
    ...template.template1,
    key: 'temp1',
    disabled: true,
  },
  {
    ...template.template2,
    key: 'temp2',
    disabled: true,
  },
  {
    ...template.template3,
    key: 'temp3',
    disabled: true,
  },
  {
    ...template.template4,
    key: 'temp4',
    disabled: true,
  },
  {
    ...template.template5,
    key: 'temp5',
    disabled: true,
  },
  {
    ...template.template6,
    key: 'temp6',
    disabled: true,
  },
  {
    ...template.template7,
    key: 'temp7',
    disabled: true,
  },
];

// 组件库
export const ComponentTabList = [
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
        ...other.other1,
        key: 'other1',
        title: '水波图',
        hasQuickStyle: true,
      },
      {
        ...other.other2,
        key: 'other2',
        title: '旭日图',
        hasQuickStyle: true,
      },
      {
        ...other.other3,
        key: 'other3',
        title: '漏斗图',
        disabled: true,
        hasQuickStyle: false,
      },
      {
        ...other.other4,
        key: 'other4',
        title: '热力图',
        hasQuickStyle: true,
      },
      {
        ...other.other5,
        key: 'other5',
        title: '子弹图',
        hasQuickStyle: true,
      },
    ],
  },
  {
    group: 'interval',
    children: [
      {
        ...interval.interval1,
        key: 'interval1',
        title: '区间柱状图',
        hasQuickStyle: true,
      },
      {
        ...interval.interval2,
        key: 'interval2',
        title: '柱状图',
        hasQuickStyle: true,
      },
      {
        ...interval.interval3,
        key: 'interval3',
        title: '瀑布图',
        hasQuickStyle: true,
      },
      {
        ...interval.interval4,
        key: 'interval4',
        title: '玉钰图',
        hasQuickStyle: true,
      },
    ],
  },
  {
    group: 'bar',
    children: [
      {
        ...bar.bar1,
        key: 'bar1',
        title: '百分比条形图',
        hasQuickStyle: true,
      },
    ],
  },
  {
    group: 'line',
    children: [
      {
        ...line.line1,
        key: 'line1',
        title: '折线图',
        hasQuickStyle: true,
      },
    ],
  },
  {
    group: 'area',
    children: [
      {
        ...area.area1,
        key: 'area1',
        title: '区域图',
        disabled: true,
        hasQuickStyle: false,
      },
    ],
  },
  {
    group: 'pie',
    children: [
      {
        ...pie.pie1,
        key: 'pie1',
        title: '饼图',
        hasQuickStyle: true,
      },
      {
        ...pie.pie2,
        key: 'pie2',
        title: '进度环图',
        hasQuickStyle: true,
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
        ...point.point1,
        key: 'point1',
        title: '基本散点图',
        hasQuickStyle: true,
      },
      {
        ...point.point2,
        key: 'point2',
        title: '气泡图',
        disabled: true,
        hasQuickStyle: false,
      },
    ],
  },
  {
    group: 'radar',
    children: [
      {
        ...radar.radar1,
        key: 'radar1',
        title: '雷达图',
        hasQuickStyle: true,
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
    ...map.map1,
    key: 'map1',
    title: '基础平面地图',
    disabled: true,
    hasQuickStyle: false,
  },
];

export const textList = [
  {
    ...text.text1,
    key: 'text1',
    title: '词云',
    hasQuickStyle: false,
  },
  {
    ...text.text2,
    key: 'text2',
    title: '跑马灯',
    hasQuickStyle: false,
  },
  {
    ...text.text3,
    key: 'text3',
    title: '通用标题',
    hasQuickStyle: false,
  },
  {
    ...text.text4,
    key: 'text4',
    title: '倒计时',
    hasQuickStyle: false,
  },
  {
    ...text.text5,
    key: 'text5',
    title: '多行文本',
    hasQuickStyle: false,
  },
  {
    ...text.text6,
    key: 'text6',
    title: '时间器',
    hasQuickStyle: false,
  },
];

export const tableList = [
  {
    ...table.table1,
    key: 'table1',
    title: '进度条表格',
    hasQuickStyle: false,
  },
  {
    ...table.table2,
    key: 'table2',
    title: '轮播列表',
    hasQuickStyle: false,
  },
];

export const widgetList = [
  {
    ...widget.widget1,
    key: 'widget1',
    title: '开关',
    disabled: true,
    hasQuickStyle: false,
  },
  {
    ...widget.widget2,
    key: 'widget2',
    title: 'iframe',
    hasQuickStyle: false,
  },
];

export const mediaList = [
  {
    ...media.media1,
    key: 'media1',
    title: '单张图片',
    hasQuickStyle: false,
  },
  {
    ...media.media2,
    key: 'media2',
    title: '视频',
    hasQuickStyle: false,
  },
  {
    ...media.media3,
    key: 'media3',
    title: '轮播图',
    hasQuickStyle: false,
  },
  {
    ...media.media4,
    key: 'media4',
    title: '装饰线条',
    hasQuickStyle: false,
  },
  {
    ...media.media5,
    key: 'media5',
    title: '箭头描绘',
    hasQuickStyle: false,
  },
  {
    ...media.media6,
    key: 'media6',
    title: '基础图形',
    hasQuickStyle: false,
  },
];

export const panelItems = [
  { name: '图层', icon: 'icon-layers', key: 'layers' },
  { name: '组件库', icon: 'icon-components', key: 'components' },
  { name: '设计库', icon: 'icon-folder-star', key: 'material' },
];
