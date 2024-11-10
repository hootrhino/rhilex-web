import { getIntl, getLocale } from '@umijs/max';

const { formatMessage } = getIntl(getLocale());

/**
 * 设备类型枚举
 */
// TODO 免费版本开放 GENERIC_UART_RW、GENERIC_MODBUS_MASTER、GENERIC_MODBUS_SLAVER
export enum DeviceType {
  GENERIC_UART_RW = 'GENERIC_UART_RW',
  GENERIC_USER_PROTOCOL = 'GENERIC_USER_PROTOCOL',
  GENERIC_MODBUS_MASTER = 'GENERIC_MODBUS_MASTER',
  GENERIC_MODBUS_SLAVER = 'GENERIC_MODBUS_SLAVER',
  GENERIC_BACNET_IP = 'GENERIC_BACNET_IP',
  BACNET_ROUTER_GW = 'BACNET_ROUTER_GW',
  GENERIC_SNMP = 'GENERIC_SNMP',
  GENERIC_MBUS_EN13433_MASTER = 'GENERIC_MBUS_EN13433_MASTER',
  GENERIC_HTTP_DEVICE = 'GENERIC_HTTP_DEVICE',
  SIEMENS_PLC = 'SIEMENS_PLC',
  DLT6452007_MASTER = 'DLT6452007_MASTER',
  CJT1882004_MASTER = 'CJT1882004_MASTER',
  SZY2062016_MASTER = 'SZY2062016_MASTER',
}

export const deviceTypeOptions = {
  [DeviceType.GENERIC_UART_RW]: formatMessage({ id: 'device.type.uartRW' }),
  [DeviceType.GENERIC_MODBUS_MASTER]: formatMessage({ id: 'device.type.modbus.master' }),
  [DeviceType.GENERIC_MODBUS_SLAVER]: formatMessage({ id: 'device.type.modbus.slaver' }),
  [DeviceType.GENERIC_BACNET_IP]: formatMessage({ id: 'device.type.bacnet.ip' }),
  [DeviceType.BACNET_ROUTER_GW]: formatMessage({ id: 'device.type.bacnet.router' }),
  [DeviceType.GENERIC_USER_PROTOCOL]: formatMessage({ id: 'device.type.user' }),
  [DeviceType.GENERIC_SNMP]: formatMessage({ id: 'device.type.common' }, { type: 'SNMP' }),
  [DeviceType.GENERIC_HTTP_DEVICE]: formatMessage({ id: 'device.type.common' }, { type: 'HTTP' }),
  [DeviceType.GENERIC_MBUS_EN13433_MASTER]: formatMessage(
    { id: 'device.type.common' },
    { type: 'Mbus-EN1434-3' },
  ),
  [DeviceType.SIEMENS_PLC]: formatMessage({ id: 'device.type.plc' }),
  [DeviceType.DLT6452007_MASTER]: formatMessage(
    { id: 'device.type.national' },
    { protocol: 'DL/T645-2007' },
  ),
  [DeviceType.CJT1882004_MASTER]: formatMessage(
    { id: 'device.type.national' },
    { protocol: 'CJ/T188-2004' },
  ),
  [DeviceType.SZY2062016_MASTER]: formatMessage(
    { id: 'device.type.national' },
    { protocol: 'SZY206-2016' },
  ),
};

/**
 * 设备工作模式枚举
 */
export enum DeviceMode {
  UART = 'UART',
  TCP = 'TCP',
}

/**
 * GENERIC_MODBUS_MASTER & GENERIC_MODBUS_SLAVER
 */
export const funcEnum = new Map([
  [1, formatMessage({ id: 'device.modbus.func1' })],
  [2, formatMessage({ id: 'device.modbus.func2' })],
  [3, formatMessage({ id: 'device.modbus.func3' })],
  [4, formatMessage({ id: 'device.modbus.func4' })],
  // [5, '05 写单个线圈'],
  // [6, '06 写单个保持寄存器'],
  // [15, '15 写多个线圈'],
  // [16, '16 写多个保持寄存器'],
]);

/**
 * SIEMENS_PLC
 */
export enum PLCModel {
  S7200 = 'S7200',
  S7300 = 'S7300',
  S7400 = 'S7400',
  S71200 = 'S71200',
  S71500 = 'S71500',
}

export const plcModelOptions = {
  [PLCModel.S7200]: formatMessage({ id: 'device.plc.model' }, { model: 'S7-200' }),
  [PLCModel.S7300]: formatMessage({ id: 'device.plc.model' }, { model: 'S7-300' }),
  [PLCModel.S7400]: formatMessage({ id: 'device.plc.model' }, { model: 'S7-400' }),
  [PLCModel.S71200]: formatMessage({ id: 'device.plc.model' }, { model: 'S7-1200' }),
  [PLCModel.S71500]: formatMessage({ id: 'device.plc.model' }, { model: 'S7-1500' }),
};

// 机架号 rack
export const rackEnum = new Map([
  [0, '0'],
  [1, '1'],
  [2, '2'],
  [3, '3'],
  [4, '4'],
]);

// 插槽号 slot
export const slotEnum = new Map([
  [0, '0'],
  [1, '1'],
  [2, '2'],
  [3, '3'],
  [4, '4'],
  [5, '5'],
  [6, '6'],
  [7, '7'],
  [8, '8'],
  [9, '9'],
  [10, '10'],
  [11, '11'],
]);

/**
 * GENERIC_SNMP
 */
export enum Transport {
  UDP = 'udp',
  TCP = 'tcp',
}

export const TransportOption = {
  [Transport.UDP]: 'UDP',
  [Transport.TCP]: 'TCP',
};

export enum SNMPVersion {
  V1 = 1,
  V2 = 2,
  V3 = 3,
}

export const SNMPVersionOption = new Map([
  [SNMPVersion.V1, 'V1'],
  [SNMPVersion.V2, 'V2'],
  [SNMPVersion.V3, 'V3'],
]);

/**
 * GENERIC_BACNET_IP
 */
export enum BacnetMode {
  BROADCAST = 'BROADCAST',
}

export const BacnetModeOption = {
  [BacnetMode.BROADCAST]: formatMessage({ id: 'device.form.title.mode.broadcast' }),
};

/**
 * GENERIC_UART_RW
 */
export enum ReadFormat {
  RAW = 'RAW',
  HEX = 'HEX',
  UTF8 = 'UTF8',
}

export const ReadFormatOption = {
  [ReadFormat.RAW]: formatMessage({ id: 'device.readFormat.raw' }),
  [ReadFormat.HEX]: formatMessage({ id: 'device.readFormat.hex' }),
  [ReadFormat.UTF8]: formatMessage({ id: 'device.readFormat.utf8' }),
};

/**
 * UART
 */
// 波特率
export const baudRateEnum = new Map([
  [2400, '2400'],
  [4800, '4800'],
  [9600, '9600'],
  [19200, '19200'],
  [38400, '38400'],
  [57600, '57600'],
  [115200, '115200'],
  [230400, '230400'],
  [460800, '460800'],
  [500000, '500000'],
  [576000, '576000'],
  [921600, '921600'],
  [1000000, '1000000'],
  [1152000, '1152000'],
  [1500000, '1500000'],
  [2000000, '2000000'],
  [2500000, '2500000'],
  [3000000, '3000000'],
  [3500000, '3500000'],
  [4000000, '4000000'],
]);

// 数据位
export const dataBitsEnum = new Map([
  [1, '1'],
  [2, '2'],
  [3, '3'],
  [4, '4'],
  [5, '5'],
  [6, '6'],
  [7, '7'],
  [8, '8'],
]);

// 奇偶校验
export const parityEnum = {
  E: formatMessage({ id: 'options.parity.e' }),
  O: formatMessage({ id: 'options.parity.o' }),
  N: formatMessage({ id: 'options.parity.n' }),
};

// 停止位
export const stopBitsEnum = new Map([
  [1, '1'],
  [2, '2'],
]);
