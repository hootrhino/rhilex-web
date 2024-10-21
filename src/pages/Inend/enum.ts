import { getIntl, getLocale } from '@umijs/max';

/**
 * 南向资源类型
 */

export enum InendType {
  COAP_SERVER = 'COAP_SERVER',
  UDP_SERVER = 'UDP_SERVER',
  TCP_SERVER = 'TCP_SERVER',
  HTTP_SERVER = 'HTTP_SERVER',
  GRPC_SERVER = 'GRPC_SERVER',
  GENERIC_MQTT_SERVER = 'GENERIC_MQTT_SERVER',
  INTERNAL_EVENT = 'INTERNAL_EVENT',
  COMTC_EVENT_FORWARDER = 'COMTC_EVENT_FORWARDER',
}

const { formatMessage } = getIntl(getLocale());

export const inendTypeOption = {
  [InendType.COAP_SERVER]: formatMessage({ id: 'inend.type.serve' }, { type: 'CoAP Server' }),
  [InendType.UDP_SERVER]: formatMessage({ id: 'inend.type.serve' }, { type: 'UDP Server' }),
  [InendType.TCP_SERVER]: formatMessage({ id: 'inend.type.serve' }, { type: 'TCP Server' }),
  [InendType.HTTP_SERVER]: formatMessage({ id: 'inend.type.serve' }, { type: 'HTTP Server' }),
  [InendType.GRPC_SERVER]: formatMessage({ id: 'inend.type.serve' }, { type: 'GRPC Server' }),
  [InendType.GENERIC_MQTT_SERVER]: formatMessage(
    { id: 'inend.type.serve' },
    { type: 'MQTT Broker' },
  ),
  [InendType.INTERNAL_EVENT]: formatMessage({ id: 'inend.type.event' }, { type: 'RHILEX' }),
  [InendType.COMTC_EVENT_FORWARDER]: formatMessage({ id: 'inend.type.comtc' }),
};

/**
 * 模式
 */
export enum Mode {
  GW = 'GW',
  DC = 'DC',
}
export const modeOption = {
  [Mode.GW]: formatMessage({ id: 'inend.mode.gw' }),
  [Mode.DC]: formatMessage({ id: 'inend.mode.dc' }),
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
  [EventType.ALL]: formatMessage({ id: 'inend.event.all' }),
  [EventType.SOURCE]: formatMessage({ id: 'inend.event.source' }),
  [EventType.DEVICE]: formatMessage({ id: 'inend.event.device' }),
  [EventType.TARGET]: formatMessage({ id: 'inend.event.target' }),
  [EventType.SYSTEM]: formatMessage({ id: 'inend.event.system' }),
  [EventType.HARDWARE]: formatMessage({ id: 'inend.event.hardware' }),
};
