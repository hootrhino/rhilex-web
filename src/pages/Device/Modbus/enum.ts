import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

// 不转换-字节序
const orderRawOption = [
  {
    value: 'DCBA',
    label: 'DCBA',
  },
];

// 1个字节-字节序
export const byte1Options = [
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

// modbus 数据类型
export const modbusDataTypeOptions = [
  {
    value: 'RAW',
    label: `RAW（4 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: orderRawOption,
  },
  {
    value: 'BYTE',
    label: `Byte（1 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte1Options,
  },
  ...baseOptions,
  {
    value: 'UTF8',
    label: `UTF8（1-256 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: [
      {
        value: 'BIG_ENDIAN',
        label: intl.formatMessage({ id: 'device.bigEndian' }),
      },
      {
        value: 'LITTLE_ENDIAN',
        label: intl.formatMessage({ id: 'device.littleEndian' }),
      },
    ],
  },
];

export enum defaultQuantity {
  RAW = 0,
  UTF8 = 0,
  BYTE = 1,
  SHORT = 2,
  USHORT = 2,
  INT16 = 2,
  UINT16 = 2,
  INT = 4,
  UINT = 4,
  INT32 = 4,
  UINT32 = 4,
  FLOAT = 4,
  UFLOAT = 4,
  FLOAT32 = 4,
  UFLOAT32 = 4,
}
