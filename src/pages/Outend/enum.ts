import { getIntl, getLocale } from '@umijs/max';

/**
 * 北向资源类型
 */
const intl = getIntl(getLocale());

export enum OutendType {
  MONGO_SINGLE = 'MONGO_SINGLE',
  MQTT = 'MQTT',
  UDP_TARGET = 'UDP_TARGET',
  TCP_TRANSPORT = 'TCP_TRANSPORT',
  TDENGINE = 'TDENGINE',
  HTTP = 'HTTP',
  GENERIC_UART_TARGET = 'GENERIC_UART_TARGET',
}
export const outendTypeOption = {
  [OutendType.MONGO_SINGLE]: intl.formatMessage(
    { id: 'outend.type.database' },
    { type: 'MongoDB' },
  ),
  [OutendType.MQTT]: 'MQTT Broker',
  [OutendType.UDP_TARGET]: intl.formatMessage({ id: 'outend.type.tranport' }, { type: 'UDP' }),
  [OutendType.TCP_TRANSPORT]: intl.formatMessage({ id: 'outend.type.tranport' }, { type: 'TCP' }),
  [OutendType.TDENGINE]: intl.formatMessage({ id: 'outend.type.database' }, { type: 'Tdengine' }),
  [OutendType.HTTP]: intl.formatMessage({ id: 'outend.type.push' }, { type: 'HTTP' }),
  [OutendType.GENERIC_UART_TARGET]: intl.formatMessage({ id: 'outend.type.uart' }),
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
