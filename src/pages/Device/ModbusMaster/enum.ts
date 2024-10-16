import { getIntl, getLocale } from '@umijs/max';

const { formatMessage } = getIntl(getLocale());

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
    value: 'INT16',
    label: `Int16（2 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte2Options,
  },
  {
    value: 'INT32',
    label: `Int32（4 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte4Options,
  },
  {
    value: 'FLOAT32',
    label: `Float32（4 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte4Options,
  },
  {
    value: 'UINT16',
    label: `UInt16（2 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte2Options,
  },
  {
    value: 'UINT32',
    label: `UInt32（4 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte4Options,
  },
  {
    value: 'UFLOAT32',
    label: `UFloat32（4 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte4Options,
  },
];

// modbus 数据类型
export const modbusDataTypeOptions = [
  {
    value: 'RAW',
    label: `RAW（0-256 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: orderRawOption,
  },
  {
    value: 'BYTE',
    label: `Byte（1 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte1Options,
  },
  ...baseOptions,
  {
    value: 'UTF8',
    label: `UTF8（1-256 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: [
      {
        value: 'BIG_ENDIAN',
        label: formatMessage({ id: 'device.bigEndian' }),
      },
      {
        value: 'LITTLE_ENDIAN',
        label: formatMessage({ id: 'device.littleEndian' }),
      },
    ],
  },
];

export enum Quantity {
  UTF8 = 0,
  BYTE = 1,
  INT16 = 1,
  UINT16 = 1,
  INT32 = 2,
  UINT32 = 2,
  FLOAT32 = 2,
  UFLOAT32 = 2,
  RAW = 4,
}
