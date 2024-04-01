/**
 * 北向资源类型
 */
export enum OutendsType {
  MONGO_SINGLE = 'MONGO_SINGLE',
  MQTT = 'MQTT',
  UDP_TARGET = 'UDP_TARGET',
  TCP_TRANSPORT = 'TCP_TRANSPORT',
  TDENGINE = 'TDENGINE',
  HTTP = 'HTTP',
}
export const outendsTypeOption = {
  [OutendsType.MONGO_SINGLE]: 'MongoDB 数据库',
  [OutendsType.MQTT]: 'MQTT Broker',
  [OutendsType.UDP_TARGET]: 'UDP 数据传输',
  [OutendsType.TCP_TRANSPORT]: 'TCP 数据传输',
  [OutendsType.TDENGINE]: 'Tdengine 数据库',
  [OutendsType.HTTP]: 'HTTP 数据推送',
};

/**
 * 传输模式
 */
export enum DataMode {
  RAW_STRING = 'RAW_STRING',
  HEX_STRING = 'HEX_STRING',
}
export const dataModeOption = {
  [DataMode.RAW_STRING]: '原始 ASIIC 传输',
  [DataMode.HEX_STRING]: '十六进制字符串',
};
