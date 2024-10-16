import { getIntl, getLocale } from '@umijs/max';

/**
 * 北向资源类型
 */
const { formatMessage } = getIntl(getLocale());

export enum OutendType {
  MQTT = 'MQTT',
  UDP_TARGET = 'UDP_TARGET',
  TCP_TRANSPORT = 'TCP_TRANSPORT',
  HTTP = 'HTTP',
  RHILEX_GRPC_TARGET = 'RHILEX_GRPC_TARGET',
  MONGO_SINGLE = 'MONGO_SINGLE',
  GREPTIME_DATABASE = 'GREPTIME_DATABASE',
  TDENGINE = 'TDENGINE',
  GENERIC_UART_TARGET = 'GENERIC_UART_TARGET',
  SEMTECH_UDP_FORWARDER = 'SEMTECH_UDP_FORWARDER',
  ITHINGS_IOT = 'ITHINGS_IOT',
}
export const outendTypeOption = {
  [OutendType.MQTT]: formatMessage({ id: 'outend.type.push' }, { type: ' MQTT Broker' }),
  [OutendType.UDP_TARGET]: formatMessage({ id: 'outend.type.push' }, { type: ' UDP Server' }),
  [OutendType.TCP_TRANSPORT]: formatMessage({ id: 'outend.type.push' }, { type: ' TCP Server' }),
  [OutendType.HTTP]: formatMessage({ id: 'outend.type.push' }, { type: ' HTTP Server' }),
  [OutendType.RHILEX_GRPC_TARGET]: formatMessage(
    { id: 'outend.type.push' },
    { type: ' GRPC Server' },
  ),
  [OutendType.ITHINGS_IOT]: formatMessage({ id: 'outend.type.push' }, { type: ' iThings' }),
  [OutendType.MONGO_SINGLE]: formatMessage({ id: 'outend.type.push' }, { type: ' MongoDB' }),
  [OutendType.GREPTIME_DATABASE]: formatMessage(
    { id: 'outend.type.push' },
    { type: ' GreptimeDB' },
  ),
  [OutendType.TDENGINE]: formatMessage({ id: 'outend.type.push' }, { type: ' TDengine' }),
  [OutendType.GENERIC_UART_TARGET]: formatMessage(
    { id: 'outend.type.push' },
    { type: formatMessage({ id: 'outend.table.title.uart' }) },
  ),
  [OutendType.SEMTECH_UDP_FORWARDER]: formatMessage(
    { id: 'outend.type.push' },
    { type: ' Semtech UDP Forwarder' },
  ),
};
export const dataToType = {
  [OutendType.MQTT]: 'Mqtt',
  [OutendType.UDP_TARGET]: 'Udp',
  [OutendType.TCP_TRANSPORT]: 'Tcp',
  [OutendType.HTTP]: 'Http',
  [OutendType.MONGO_SINGLE]: 'MongoDB',
  [OutendType.GREPTIME_DATABASE]: 'GreptimeDB',
  [OutendType.TDENGINE]: 'TDengine',
  [OutendType.GENERIC_UART_TARGET]: 'Uart',
  [OutendType.SEMTECH_UDP_FORWARDER]: 'Semtech',
  [OutendType.RHILEX_GRPC_TARGET]: 'Grpc',
};

/**
 * 传输模式
 */
export enum DataMode {
  RAW_STRING = 'RAW_STRING',
  HEX_STRING = 'HEX_STRING',
}
export const dataModeOption = {
  [DataMode.RAW_STRING]: formatMessage({ id: 'outend.mode.raw' }),
  [DataMode.HEX_STRING]: formatMessage({ id: 'outend.mode.hex' }),
};
