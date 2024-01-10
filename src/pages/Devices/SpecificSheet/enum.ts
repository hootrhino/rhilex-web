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

// 不转换-字节序
const orderRawOption = [
  {
    value: 'DCBA',
    label: 'DCBA',
  },
];

// 基本数据类型
export const baseOptions = [
  {
    value: 'SHORT',
    label: 'Short（2字节）',
    children: byte2Options,
  },
  {
    value: 'INT',
    label: 'Int（4字节）',
    children: byte4Options,
  },
  {
    value: 'FLOAT',
    label: 'Float（4字节）',
    children: byte4Options,
  },
  {
    value: 'USHORT',
    label: 'UShort（2字节）',
    children: byte2Options,
  },
  {
    value: 'UINT',
    label: 'UInt（4字节）',
    children: byte4Options,
  },
  {
    value: 'UFLOAT',
    label: 'UFloat（4字节）',
    children: byte4Options,
  },
];

// 基本数据类型
export const plcDataTypeOptions = [
  {
    value: 'BYTE',
    label: 'Byte（1字节）',
    children: byte1Options,
  },
  {
    value: 'I',
    label: 'I（1字节）',
    children: byte1Options,
  },
  {
    value: 'Q',
    label: 'Q（1字节）',
    children: byte1Options,
  },
  ...baseOptions,
];

// modbus 数据类型
export const modbusDataTypeOptions = [
  {
    value: 'RAW',
    label: 'RAW（4字节）',
    children: orderRawOption,
  },
  {
    value: 'BYTE',
    label: 'Byte（1字节）',
    children: byte1Options,
  },
  ...baseOptions,
];
