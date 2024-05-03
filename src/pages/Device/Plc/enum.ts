import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

// 1个字节-字节序
const byte1Options = [
  {
    value: 'A',
    label: 'A',
  },
];

// 2个字节-字节序
const byte2Options = [
  {
    value: 'AB',
    label: 'AB',
  },
  {
    value: 'BA',
    label: 'BA',
  },
];

// 4个字节-字节序
const byte4Options = [
  {
    value: 'ABCD',
    label: 'ABCD',
  },
  {
    value: 'DCBA',
    label: 'DCBA',
  },
  {
    value: 'CDAB',
    label: 'CDAB',
  },
];

// 基本数据类型
export const baseOptions = [
  {
    value: 'SHORT',
    label: `Short（2 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte2Options,
  },
  {
    value: 'INT16',
    label: `Int16（2 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte2Options,
  },
  {
    value: 'INT',
    label: `Int（4 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte4Options,
  },
  {
    value: 'INT32',
    label: `Int32（4 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte4Options,
  },
  {
    value: 'FLOAT',
    label: `Float（4 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte4Options,
  },
  {
    value: 'FLOAT32',
    label: `Float32（4 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte4Options,
  },
  {
    value: 'USHORT',
    label: `UShort（2 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte2Options,
  },
  {
    value: 'UINT16',
    label: `UInt16（2 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte2Options,
  },
  {
    value: 'UINT',
    label: `UInt（4 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte4Options,
  },
  {
    value: 'UINT32',
    label: `UInt32（4 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte4Options,
  },
  {
    value: 'UFLOAT',
    label: `UFloat（4 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte4Options,
  },
  {
    value: 'UFLOAT32',
    label: `UFloat32（4 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte4Options,
  },
];

// 基本数据类型
export const plcDataTypeOptions = [
  {
    value: 'BYTE',
    label: `Byte（1 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte1Options,
  },
  {
    value: 'I',
    label: `I（1 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte1Options,
  },
  {
    value: 'Q',
    label: `Q（1 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte1Options,
  },
  ...baseOptions,
];
