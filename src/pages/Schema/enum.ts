// 数据类型
export const typeEnum = {
  STRING: '字符串',
  INTEGER: '整数',
  FLOAT: '浮点数',
  BOOL: '布尔量',
  GEO: '地理坐标',
};

// 读写
export const rwEnum = {
  R: '只读',
  RW: '读写',
};

// 单位
export const unitOptions = [
  { value: 'ºC', label: 'ºC (摄氏度)' },
  { value: 'ºF', label: 'ºF (华氏度)' },
  { value: 'ºK', label: 'ºK (凯氏度)' },
  { value: 'm', label: 'm (米)' },
  { value: 's', label: 's (秒)' },
  { value: 'min', label: 'min (分钟)' },
  { value: 'h', label: 'h (小时)' },
  { value: 'week', label: 'week (周)' },
  { value: 'month', label: 'month (月)' },
  { value: 'year', label: 'year (年)' },
  { value: 'g', label: 'g (克)' },
  { value: 'kg', label: 'kg (千克)' },
  { value: 't', label: 't (吨)' },
];
