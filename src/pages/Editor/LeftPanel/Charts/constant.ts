import chartsImg from '../Images';
const { interval, bar } = chartsImg;

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
  { key: 'scatterplot', value: '散点图' },
  { key: 'radar', value: '雷达图' },
  { key: 'relation', value: '关系图' },
  { key: 'other', value: '其他' },
];

export const chartsList = [
  {
    group: 'all',
    children: [],
  },
  {
    group: 'other',
    children: [],
  },
  {
    group: 'interval',
    children: [
      {
        key: 'interval1',
        title: '柱状图1',
        image: interval.interval1,
      },
      {
        key: 'interval2',
        title: '柱状图2',
        image: interval.interval2,
      },
      {
        key: 'interval3',
        title: '柱状图3',
        image: interval.interval3,
      },
    ],
  },
  {
    group: 'bar',
    children: [
      {
        key: 'bar1',
        title: '条形图1',
        image: bar.bar1,
      },
      {
        key: 'bar2',
        title: '条形图2',
        image: bar.bar2,
      },
    ],
  },
];
