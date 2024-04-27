/**
 * 北向资源类型
 */
export enum OutendType {
  MONGO_SINGLE = 'MONGO_SINGLE',
  MQTT = 'MQTT',
  UDP_TARGET = 'UDP_TARGET',
  TCP_TRANSPORT = 'TCP_TRANSPORT',
  TDENGINE = 'TDENGINE',
  HTTP = 'HTTP',
}
export const outendTypeOption = {
  [OutendType.MONGO_SINGLE]: 'MongoDB 数据库',
  [OutendType.MQTT]: 'MQTT Broker',
  [OutendType.UDP_TARGET]: 'UDP 数据传输',
  [OutendType.TCP_TRANSPORT]: 'TCP 数据传输',
  [OutendType.TDENGINE]: 'Tdengine 数据库',
  [OutendType.HTTP]: 'HTTP 数据推送',
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
