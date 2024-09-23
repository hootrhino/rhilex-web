import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

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
  [Type.STRING]: intl.formatMessage({ id: 'schemaMgt.type.string' }),
  [Type.INTEGER]: intl.formatMessage({ id: 'schemaMgt.type.int' }),
  [Type.FLOAT]: intl.formatMessage({ id: 'schemaMgt.type.float' }),
  [Type.BOOL]: intl.formatMessage({ id: 'schemaMgt.type.bool' }),
  [Type.GEO]: intl.formatMessage({ id: 'schemaMgt.type.geo' }),
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
  [RW.R]: intl.formatMessage({ id: 'schemaMgt.rw.r' }),
  [RW.RW]: intl.formatMessage({ id: 'schemaMgt.rw.rw' }),
};

// 单位
export const unitOptions = [
  { value: 'ºC', label: `ºC (${intl.formatMessage({ id: 'schemaMgt.unit.c' })})` },
  { value: 'ºF', label: `ºF (${intl.formatMessage({ id: 'schemaMgt.unit.f' })})` },
  { value: 'ºK', label: `ºK (${intl.formatMessage({ id: 'schemaMgt.unit.k' })})` },
  { value: 'm', label: `m (${intl.formatMessage({ id: 'schemaMgt.unit.m' })})` },
  { value: 's', label: `s (${intl.formatMessage({ id: 'schemaMgt.unit.s' })})` },
  {
    value: 'min',
    label: `min (${intl.formatMessage({ id: 'schemaMgt.unit.min' })})`,
  },
  { value: 'h', label: `h (${intl.formatMessage({ id: 'schemaMgt.unit.hour' })})` },
  {
    value: 'week',
    label: `week (${intl.formatMessage({ id: 'schemaMgt.unit.week' })})`,
  },
  {
    value: 'month',
    label: `month (${intl.formatMessage({ id: 'schemaMgt.unit.month' })})`,
  },
  {
    value: 'year',
    label: `year (${intl.formatMessage({ id: 'schemaMgt.unit.year' })})`,
  },
  { value: 'g', label: `g (${intl.formatMessage({ id: 'schemaMgt.unit.g' })})` },
  { value: 'kg', label: `kg (${intl.formatMessage({ id: 'schemaMgt.unit.kg' })})` },
  { value: 't', label: `t (${intl.formatMessage({ id: 'schemaMgt.unit.t' })})` },
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
    label: intl.formatMessage({ id: 'schemaMgt.form.title.round' }),
  },
  {
    key: 'max',
    label: intl.formatMessage({ id: 'schemaMgt.form.title.range.max' }),
  },
  {
    key: 'min',
    label: intl.formatMessage({ id: 'schemaMgt.form.title.range.min' }),
  },
  {
    key: 'latitude',
    label: intl.formatMessage({ id: 'schemaMgt.form.title.latitude' }),
  },
  {
    key: 'longitude',
    label: intl.formatMessage({ id: 'schemaMgt.form.title.longitude' }),
  },
  {
    key: 'range',
    label: intl.formatMessage({ id: 'schemaMgt.form.title.range' }),
  },
];

export const ruleFilterData = {
  [Type.STRING]: ['defaultValue', 'max'],
  [Type.INTEGER]: ['defaultValue', 'range'],
  [Type.FLOAT]: ['defaultValue', 'range', 'round'],
  [Type.BOOL]: ['defaultValue', 'trueLabel', 'falseLabel'],
  [Type.GEO]: ['defaultValue', 'latitude', 'longitude'],
};
