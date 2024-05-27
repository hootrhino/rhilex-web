import { getIntl, getLocale } from '@umijs/max';

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
  [Type.STRING]: getIntl(getLocale()).formatMessage({ id: 'schemaMgt.type.string' }),
  [Type.INTEGER]: getIntl(getLocale()).formatMessage({ id: 'schemaMgt.type.int' }),
  [Type.FLOAT]: getIntl(getLocale()).formatMessage({ id: 'schemaMgt.type.float' }),
  [Type.BOOL]: getIntl(getLocale()).formatMessage({ id: 'schemaMgt.type.bool' }),
  [Type.GEO]: getIntl(getLocale()).formatMessage({ id: 'schemaMgt.type.geo' }),
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
  [RW.R]: getIntl(getLocale()).formatMessage({ id: 'schemaMgt.rw.r' }),
  [RW.RW]: getIntl(getLocale()).formatMessage({ id: 'schemaMgt.rw.rw' }),
};

// 单位
export const unitOptions = [
  { value: 'ºC', label: `ºC (${getIntl(getLocale()).formatMessage({ id: 'schemaMgt.unit.c' })})` },
  { value: 'ºF', label: `ºF (${getIntl(getLocale()).formatMessage({ id: 'schemaMgt.unit.f' })})` },
  { value: 'ºK', label: `ºK (${getIntl(getLocale()).formatMessage({ id: 'schemaMgt.unit.k' })})` },
  { value: 'm', label: `m (${getIntl(getLocale()).formatMessage({ id: 'schemaMgt.unit.m' })})` },
  { value: 's', label: `s (${getIntl(getLocale()).formatMessage({ id: 'schemaMgt.unit.s' })})` },
  {
    value: 'min',
    label: `min (${getIntl(getLocale()).formatMessage({ id: 'schemaMgt.unit.min' })})`,
  },
  { value: 'h', label: `h (${getIntl(getLocale()).formatMessage({ id: 'schemaMgt.unit.hour' })})` },
  {
    value: 'week',
    label: `week (${getIntl(getLocale()).formatMessage({ id: 'schemaMgt.unit.week' })})`,
  },
  {
    value: 'month',
    label: `month (${getIntl(getLocale()).formatMessage({ id: 'schemaMgt.unit.month' })})`,
  },
  {
    value: 'year',
    label: `year (${getIntl(getLocale()).formatMessage({ id: 'schemaMgt.unit.year' })})`,
  },
  { value: 'g', label: `g (${getIntl(getLocale()).formatMessage({ id: 'schemaMgt.unit.g' })})` },
  { value: 'kg', label: `kg (${getIntl(getLocale()).formatMessage({ id: 'schemaMgt.unit.kg' })})` },
  { value: 't', label: `t (${getIntl(getLocale()).formatMessage({ id: 'schemaMgt.unit.t' })})` },
];
