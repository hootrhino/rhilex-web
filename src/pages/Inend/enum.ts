import { getIntl, getLocale } from '@umijs/max';

/**
 * 南向资源类型
 */
export enum InendType {
  COAP = 'CoAP',
  GENERIC_IOT_HUB = 'GENERIC_IOT_HUB',
  RULEX_UDP = 'RULEX_UDP',
  HTTP = 'HTTP',
  NATS_SERVER = 'NATS_SERVER',
  GRPC = 'GRPC',
  GENERIC_MQTT = 'GENERIC_MQTT',
  GENERIC_MQTT_SERVER = 'GENERIC_MQTT_SERVER',
  INTERNAL_EVENT = 'INTERNAL_EVENT',
  COMTC_EVENT_FORWARDER = 'COMTC_EVENT_FORWARDER',
}

const intl = getIntl(getLocale());

export const inendTypeOption = {
  [InendType.COAP]: intl.formatMessage({ id: 'inend.type.serve' }, { type: 'CoAP Server' }),
  [InendType.GENERIC_IOT_HUB]: intl.formatMessage({ id: 'inend.type.topic' }, { type: 'IoTHub' }),
  [InendType.RULEX_UDP]: intl.formatMessage({ id: 'inend.type.serve' }, { type: 'UDP Server' }),
  [InendType.HTTP]: intl.formatMessage({ id: 'inend.type.serve' }, { type: 'HTTP Server' }),
  [InendType.NATS_SERVER]: intl.formatMessage(
    { id: 'inend.type.subject' },
    { type: 'NATS Client' },
  ),
  [InendType.GRPC]: intl.formatMessage({ id: 'inend.type.serve' }, { type: 'GRPC Server' }),
  [InendType.GENERIC_MQTT]: intl.formatMessage({ id: 'inend.type.topic' }, { type: 'MQTT' }),
  [InendType.GENERIC_MQTT_SERVER]: intl.formatMessage({ id: 'inend.type.mqtt' }),
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

/**
 * 数据质量
 */
export enum QoSLevel {
  LEVEL0 = 0,
  LEVEL1 = 1,
  LEVEL2 = 2,
}

export const qosOption = [
  {
    label: intl.formatMessage({ id: 'inend.qos.level0' }),
    value: QoSLevel.LEVEL0,
  },
  {
    label: intl.formatMessage({ id: 'inend.qos.level1' }),
    value: QoSLevel.LEVEL1,
  },
  {
    label: intl.formatMessage({ id: 'inend.qos.level2' }),
    value: QoSLevel.LEVEL2,
  },
];
