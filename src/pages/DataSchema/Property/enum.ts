import { getIntl, getLocale } from '@umijs/max';

const { formatMessage } = getIntl(getLocale());

/**
 * 数据模型-类型枚举&option
 */
export enum Type {
  STRING = 'STRING',
  INTEGER = 'INTEGER',
  FLOAT = 'FLOAT',
  BOOL = 'BOOL',
  GEO = 'GEO',
}
export const typeOption = {
  [Type.STRING]: formatMessage({ id: 'schemaMgt.type.string' }),
  [Type.INTEGER]: formatMessage({ id: 'schemaMgt.type.int' }),
  [Type.FLOAT]: formatMessage({ id: 'schemaMgt.type.float' }),
  [Type.BOOL]: formatMessage({ id: 'schemaMgt.type.bool' }),
  [Type.GEO]: formatMessage({ id: 'schemaMgt.type.geo' }),
};

// 读写
/**
 * 数据模型-读写枚举&option
 */
export enum RW {
  R = 'R',
  RW = 'RW',
}
export const rwOption = {
  [RW.R]: formatMessage({ id: 'schemaMgt.rw.r' }),
  [RW.RW]: formatMessage({ id: 'schemaMgt.rw.rw' }),
};

// 单位
export const unitOptions = [
  { value: 'ºC', label: `ºC (${formatMessage({ id: 'schemaMgt.unit.c' })})` },
  { value: 'ºF', label: `ºF (${formatMessage({ id: 'schemaMgt.unit.f' })})` },
  { value: 'ºK', label: `ºK (${formatMessage({ id: 'schemaMgt.unit.k' })})` },
  { value: 'm', label: `m (${formatMessage({ id: 'schemaMgt.unit.m' })})` },
  { value: 's', label: `s (${formatMessage({ id: 'schemaMgt.unit.s' })})` },
  {
    value: 'min',
    label: `min (${formatMessage({ id: 'schemaMgt.unit.min' })})`,
  },
  { value: 'h', label: `h (${formatMessage({ id: 'schemaMgt.unit.hour' })})` },
  {
    value: 'week',
    label: `week (${formatMessage({ id: 'schemaMgt.unit.week' })})`,
  },
  {
    value: 'month',
    label: `month (${formatMessage({ id: 'schemaMgt.unit.month' })})`,
  },
  {
    value: 'year',
    label: `year (${formatMessage({ id: 'schemaMgt.unit.year' })})`,
  },
  { value: 'g', label: `g (${formatMessage({ id: 'schemaMgt.unit.g' })})` },
  { value: 'kg', label: `kg (${formatMessage({ id: 'schemaMgt.unit.kg' })})` },
  { value: 't', label: `t (${formatMessage({ id: 'schemaMgt.unit.t' })})` },
];

/**
 * 属性数据定义
 */
export const dataDefineItems = [
  {
    key: 'falseLabel',
    label: 'false',
  },
  {
    key: 'trueLabel',
    label: 'true',
  },
  {
    key: 'round',
    label: formatMessage({ id: 'schemaMgt.form.title.round' }),
  },
  {
    key: 'max',
    label: formatMessage({ id: 'schemaMgt.form.title.range.max' }),
  },
  {
    key: 'min',
    label: formatMessage({ id: 'schemaMgt.form.title.range.min' }),
  },
  {
    key: 'latitude',
    label: formatMessage({ id: 'schemaMgt.form.title.latitude' }),
  },
  {
    key: 'longitude',
    label: formatMessage({ id: 'schemaMgt.form.title.longitude' }),
  },
  {
    key: 'range',
    label: formatMessage({ id: 'schemaMgt.form.title.range' }),
  },
];

export const ruleFilterData = {
  [Type.STRING]: ['defaultValue', 'max'],
  [Type.INTEGER]: ['defaultValue', 'range'],
  [Type.FLOAT]: ['defaultValue', 'range', 'round'],
  [Type.BOOL]: ['defaultValue', 'trueLabel', 'falseLabel'],
  [Type.GEO]: ['defaultValue', 'latitude', 'longitude'],
};
