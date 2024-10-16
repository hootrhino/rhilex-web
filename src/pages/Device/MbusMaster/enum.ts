import { getIntl, getLocale } from '@umijs/max';

const { formatMessage } = getIntl(getLocale());

/**
 * 设备类型 - type
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
