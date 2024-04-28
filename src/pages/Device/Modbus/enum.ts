import { baseOptions } from '../Plc/enum';

// 不转换-字节序
const orderRawOption = [
  {
    value: 'DCBA',
    label: 'DCBA',
  },
];

// 1个字节-字节序
const byte1Options = [
  {
    value: 'A',
    label: 'A',
  },
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
  {
    value: 'UTF8',
    label: 'UTF8（1-256字节）',
    children: [
      {
        value: 'BIG_ENDIAN',
        label: '大端',
      },
      {
        value: 'LITTLE_ENDIAN',
        label: '小端',
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
