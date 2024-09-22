import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

/**
 * BACnetIP
 */
export enum ObjectType {
  AI = 'AI',
  AO = 'AO',
  AV = 'AV',
  BI = 'BI',
  BO = 'BO',
  BV = 'BV',
  MI = 'MI',
  MO = 'MO',
  MV = 'MV',
}

export const ObjectTypeOption = {
  [ObjectType.AI]: intl.formatMessage({ id: 'device.bacnet.objectType.ai' }), // AI 模拟输入
  // [ObjectType.AO]: 'AO 模拟输出',
  // [ObjectType.AV]: 'AV 模拟值',
  // [ObjectType.BI]: 'BI 二进制输入',
  // [ObjectType.BO]: 'BO 二进制输出',
  // [ObjectType.BV]: 'BV 二进制值',
  // [ObjectType.MI]: 'MI 多状态输入',
  // [ObjectType.MO]: 'MO 多状态输出',
  // [ObjectType.MV]: 'MV 多状态值',
};

/**
 * ModbusMaster
 */
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
    value: 'BYTE',
    label: `BYTE（1 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte1Options,
  },
  {
    value: 'INT16',
    label: `Int16（2 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte2Options,
  },
  {
    value: 'INT32',
    label: `Int32（4 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte4Options,
  },
  {
    value: 'FLOAT32',
    label: `Float32（4 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte4Options,
  },
  {
    value: 'UINT16',
    label: `UInt16（2 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte2Options,
  },
  {
    value: 'UINT32',
    label: `UInt32（4 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
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
    label: `RAW（0-256 ${intl.formatMessage({ id: 'device.unit.byte' })}）`,
    children: orderRawOption,
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

/**
 * PLC
 */
export const plcDataTypeOptions = [
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
