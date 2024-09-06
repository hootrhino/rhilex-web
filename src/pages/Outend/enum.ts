import { getIntl, getLocale } from '@umijs/max';

/**
 * 北向资源类型
 */
const intl = getIntl(getLocale());

export enum OutendType {
  MQTT = 'MQTT',
  UDP_TARGET = 'UDP_TARGET',
  TCP_TRANSPORT = 'TCP_TRANSPORT',
  HTTP = 'HTTP',
  MONGO_SINGLE = 'MONGO_SINGLE',
  GREPTIME_DATABASE = 'GREPTIME_DATABASE',
  TDENGINE = 'TDENGINE',
  GENERIC_UART_TARGET = 'GENERIC_UART_TARGET',
  SEMTECH_UDP_FORWARDER = 'SEMTECH_UDP_FORWARDER',
}
export const outendTypeOption = {
  [OutendType.MQTT]: intl.formatMessage({ id: 'outend.type.push' }, { type: ' MQTT Broker' }),
  [OutendType.UDP_TARGET]: intl.formatMessage({ id: 'outend.type.push' }, { type: ' UDP Server' }),
  [OutendType.TCP_TRANSPORT]: intl.formatMessage(
    { id: 'outend.type.push' },
    { type: ' TCP Server' },
  ),
  [OutendType.HTTP]: intl.formatMessage({ id: 'outend.type.push' }, { type: ' HTTP Server' }),
  [OutendType.MONGO_SINGLE]: intl.formatMessage({ id: 'outend.type.push' }, { type: ' MongoDB' }),
  [OutendType.GREPTIME_DATABASE]: intl.formatMessage(
    { id: 'outend.type.push' },
    { type: ' GreptimeDB' },
  ),
  [OutendType.TDENGINE]: intl.formatMessage({ id: 'outend.type.push' }, { type: ' TDengine' }),
  [OutendType.GENERIC_UART_TARGET]: intl.formatMessage(
    { id: 'outend.type.push' },
    { type: intl.formatMessage({ id: 'outend.table.title.uart' }) },
  ),
  [OutendType.SEMTECH_UDP_FORWARDER]: intl.formatMessage(
    { id: 'outend.type.push' },
    { type: ' Semtech UDP Forwarder' },
  ),
};
export const dataToType = {
  [OutendType.MQTT]: 'Mqtt',
  [OutendType.UDP_TARGET]: 'Udp',
  [OutendType.TCP_TRANSPORT]: 'Tcp',
  [OutendType.HTTP]: 'Http',
  [OutendType.MONGO_SINGLE]: 'Mongo',
  [OutendType.TDENGINE]: 'TDengine',
  [OutendType.GENERIC_UART_TARGET]: 'Uart',
  [OutendType.SEMTECH_UDP_FORWARDER]: 'Semtech',
};

/**
 * 传输模式
 */
export enum DataMode {
  RAW_STRING = 'RAW_STRING',
  HEX_STRING = 'HEX_STRING',
}
export const dataModeOption = {
  [DataMode.RAW_STRING]: intl.formatMessage({ id: 'outend.mode.raw' }),
  [DataMode.HEX_STRING]: intl.formatMessage({ id: 'outend.mode.hex' }),
};
