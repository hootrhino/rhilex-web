import { getIntl, getLocale } from '@umijs/max';
import { baseOptions } from '../Plc/enum';

const intl = getIntl(getLocale());

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
