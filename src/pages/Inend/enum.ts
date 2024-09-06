import { getIntl, getLocale } from '@umijs/max';

/**
 * 南向资源类型
 */

export enum InendType {
  COAP = 'CoAP',
  UDP_SERVER = 'UDP_SERVER',
  TCP_SERVER = 'TCP_SERVER',
  HTTP = 'HTTP',
  GRPC = 'GRPC',
  GENERIC_MQTT_SERVER = 'GENERIC_MQTT_SERVER',
  INTERNAL_EVENT = 'INTERNAL_EVENT',
  COMTC_EVENT_FORWARDER = 'COMTC_EVENT_FORWARDER',
}

const intl = getIntl(getLocale());

export const inendTypeOption = {
  [InendType.COAP]: intl.formatMessage({ id: 'inend.type.serve' }, { type: 'CoAP Server' }),
  [InendType.UDP_SERVER]: intl.formatMessage({ id: 'inend.type.serve' }, { type: 'UDP Server' }),
  [InendType.TCP_SERVER]: intl.formatMessage({ id: 'inend.type.serve' }, { type: 'TCP Server' }),
  [InendType.HTTP]: intl.formatMessage({ id: 'inend.type.serve' }, { type: 'HTTP Server' }),
  [InendType.GRPC]: intl.formatMessage({ id: 'inend.type.serve' }, { type: 'GRPC Server' }),
  [InendType.GENERIC_MQTT_SERVER]: intl.formatMessage(
    { id: 'inend.type.serve' },
    { type: 'MQTT Broker' },
  ),
  [InendType.INTERNAL_EVENT]: intl.formatMessage({ id: 'inend.type.event' }, { type: 'RHILEX' }),
  [InendType.COMTC_EVENT_FORWARDER]: intl.formatMessage({ id: 'inend.type.comtc' }),
};

/**
 * 模式
 */
export enum Mode {
  GW = 'GW',
  DC = 'DC',
}
export const modeOption = {
  [Mode.GW]: intl.formatMessage({ id: 'inend.mode.gw' }),
  [Mode.DC]: intl.formatMessage({ id: 'inend.mode.dc' }),
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
  [EventType.ALL]: intl.formatMessage({ id: 'inend.event.all' }),
  [EventType.SOURCE]: intl.formatMessage({ id: 'inend.event.source' }),
  [EventType.DEVICE]: intl.formatMessage({ id: 'inend.event.device' }),
  [EventType.TARGET]: intl.formatMessage({ id: 'inend.event.target' }),
  [EventType.SYSTEM]: intl.formatMessage({ id: 'inend.event.system' }),
  [EventType.HARDWARE]: intl.formatMessage({ id: 'inend.event.hardware' }),
};
