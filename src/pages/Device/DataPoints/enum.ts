import { getIntl, getLocale } from '@umijs/max';

const { formatMessage } = getIntl(getLocale());

/**
 * BACnet IP
 */
export enum ObjectType {
  AI = 'AI',
  // AO = 'AO',
  // AV = 'AV',
  // BI = 'BI',
  // BO = 'BO',
  // BV = 'BV',
  // MI = 'MI',
  // MO = 'MO',
  // MV = 'MV',
}

export const ObjectTypeOption = {
  [ObjectType.AI]: formatMessage({ id: 'device.bacnet.objectType.ai' }), // AI 模拟输入
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
 * MBUS
 */
export enum MBusDeviceType {
  HEAT_METER = 'HEAT_METER', // 热量表，用于计量热量消耗
  WATER_METER = 'WATER_METER', // 水表，用于计量水的消耗量
  GAS_METER = 'GAS_METER', // 燃气表，用于计量燃气的消耗量
  ELECTRIC_METER = 'ELECTRIC_METER', // 电表，用于计量电能的消耗
  TRANSPARENT = 'TRANSPARENT', // 透传设备，不具备逻辑处理能力
  PROTOCOL_CONVERTER = 'PROTOCOL_CONVERTER', // 协议转换器，具备较强的逻辑处理能力，可主动采集和转换数据
}

export const mBusDeviceTypeOptions = {
  [MBusDeviceType.HEAT_METER]: formatMessage({ id: 'device.mbus.type.heatMeter' }),
  [MBusDeviceType.WATER_METER]: formatMessage({ id: 'device.mbus.type.waterMeter' }),
  [MBusDeviceType.GAS_METER]: formatMessage({ id: 'device.mbus.type.gasMeter' }),
  [MBusDeviceType.ELECTRIC_METER]: formatMessage({ id: 'device.mbus.type.elecMeter' }),
  [MBusDeviceType.TRANSPARENT]: formatMessage({ id: 'device.mbus.type.transparent' }),
  [MBusDeviceType.PROTOCOL_CONVERTER]: formatMessage({ id: 'device.mbus.type.protocol' }),
};

/**
 * Modbus
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

export enum DataType {
  INT16 = 'INT16',
  INT32 = 'INT32',
  FLOAT32 = 'FLOAT32',
  UINT16 = 'UINT16',
  UINT32 = 'UINT32',
  UFLOAT32 = 'UFLOAT32',
  RAW = 'RAW',
  BYTE = 'BYTE',
  UTF8 = 'UTF8',
}

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

/**
 * PLC
 */
export const plcDataTypeOptions = [
  {
    value: 'BYTE',
    label: `Byte（1 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte1Options,
  },
  {
    value: 'I',
    label: `I（1 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte1Options,
  },
  {
    value: 'Q',
    label: `Q（1 ${formatMessage({ id: 'device.unit.byte' })}）`,
    children: byte1Options,
  },
  ...baseOptions,
];

/**
 * SZY2062016Master
 */
export enum MeterType {
  FCCommand = '0',
  FCRainfall = '1',
  FCWaterLevel = '2',
  FCFlowRate = '3',
  FCFlowSpeed = '4',
  FCGatePosition = '5',
  FCPower = '6',
  FCAirPressure = '7',
  FCWindSpeed = '8',
  FCWaterTemperature = '9',
  FCWaterQuality = '10',
  FCSoilMoisture = '11',
  FCEvaporation = '12',
  FCAlarmStatus = '13',
  FCComprehensive = '14',
  FCWaterPressure = '15',
}

export const meterTypeOptions = {
  [MeterType.FCCommand]: formatMessage({ id: 'device.meterType.command' }),
  [MeterType.FCRainfall]: formatMessage({ id: 'device.meterType.rainfall' }),
  [MeterType.FCWaterLevel]: formatMessage({ id: 'device.meterType.waterLevel' }),
  [MeterType.FCFlowRate]: formatMessage({ id: 'device.meterType.flowRate' }),
  [MeterType.FCFlowSpeed]: formatMessage({ id: 'device.meterType.flowSpeed' }),
  [MeterType.FCGatePosition]: formatMessage({ id: 'device.meterType.gatePosition' }),
  [MeterType.FCPower]: formatMessage({ id: 'device.meterType.power' }),
  [MeterType.FCAirPressure]: formatMessage({ id: 'device.meterType.airPressure' }),
  [MeterType.FCWindSpeed]: formatMessage({ id: 'device.meterType.windSpeed' }),
  [MeterType.FCWaterTemperature]: formatMessage({ id: 'device.meterType.waterTemp' }),
  [MeterType.FCWaterQuality]: formatMessage({ id: 'device.meterType.waterQuality' }),
  [MeterType.FCSoilMoisture]: formatMessage({ id: 'device.meterType.soilMoisture' }),
  [MeterType.FCEvaporation]: formatMessage({ id: 'device.meterType.evaporation' }),
  [MeterType.FCAlarmStatus]: formatMessage({ id: 'device.meterType.alarmStatus' }),
  [MeterType.FCComprehensive]: formatMessage({ id: 'device.meterType.comprehensive' }),
  [MeterType.FCWaterPressure]: formatMessage({ id: 'device.meterType.waterPressure' }),
};
