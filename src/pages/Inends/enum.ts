/**
 * 南向资源类型
 */
export enum InendsType {
  COAP = 'COAP',
  GENERIC_IOT_HUB = 'GENERIC_IOT_HUB',
  RULEX_UDP = 'RULEX_UDP',
  HTTP = 'HTTP',
  NATS_SERVER = 'NATS_SERVER',
  GRPC = 'GRPC',
  GENERIC_MQTT = 'GENERIC_MQTT',
  INTERNAL_EVENT = 'INTERNAL_EVENT',
}
export const inendsTypeOption = {
  [InendsType.COAP]: '作为通用 COAP Server 提供接入服务',
  [InendsType.GENERIC_IOT_HUB]: '作为通用 IoTHub 客户端订阅 Topic 接入',
  [InendsType.RULEX_UDP]: '作为通用 UDP Server 提供接入服务',
  [InendsType.HTTP]: '作为通用 HTTP Server 提供接入服务',
  [InendsType.NATS_SERVER]: '作为通用 NATS Client 订阅 Subject 接入',
  [InendsType.GRPC]: '作为通用 GRPC Server 提供接入服务',
  [InendsType.GENERIC_MQTT]: '作为通用 MQTT客户端订阅 Topic 接入',
  [InendsType.INTERNAL_EVENT]: 'RHILEX 内部事件源',
};

/**
 * 模式
 */
export enum Mode {
  GW = 'GW',
  DC = 'DC',
}
export const modeOption = {
  [Mode.GW]: '网关',
  [Mode.DC]: '直连',
};

/**
 * 事件类型
 */
export enum EventType {
  ALL = 'ALL',
  SOURCE = 'SOURCE',
  DEVICE = 'DEVICE',
  TARGET = 'TARGET',
  SYSTEM = 'SYSTEM',
  HARDWARE = 'HARDWARE',
}
export const eventTypeOption = {
  [EventType.ALL]: '全部事件',
  [EventType.SOURCE]: '南向事件',
  [EventType.DEVICE]: '设备事件',
  [EventType.TARGET]: '北向事件',
  [EventType.SYSTEM]: '系统事件',
  [EventType.HARDWARE]: '硬件事件',
};

/**
 * 数据质量
 */

export const qosEnum = {
  0: '0',
  1: '1',
  2: '2',
};
