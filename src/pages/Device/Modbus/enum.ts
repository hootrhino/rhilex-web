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

export enum ModbusSheetType {
  DETAIL = 'detail',
  LIST = 'list',
}
