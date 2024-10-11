import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

/**
 * 设备类型枚举
 */
export enum DeviceType {
  GENERIC_UART_PROTOCOL = 'GENERIC_UART_PROTOCOL',
  GENERIC_UART_RW = 'GENERIC_UART_RW',
  GENERIC_MODBUS_MASTER = 'GENERIC_MODBUS_MASTER',
  GENERIC_MODBUS_SLAVER = 'GENERIC_MODBUS_SLAVER',
  GENERIC_BACNET_IP = 'GENERIC_BACNET_IP',
  BACNET_ROUTER_GW = 'BACNET_ROUTER_GW',
  GENERIC_SNMP = 'GENERIC_SNMP',
  GENERIC_MBUS_MASTER = 'GENERIC_MBUS_MASTER',
  GENERIC_HTTP_DEVICE = 'GENERIC_HTTP_DEVICE',
  SIEMENS_PLC = 'SIEMENS_PLC',
  TENCENT_IOTHUB_GATEWAY = 'TENCENT_IOTHUB_GATEWAY',
  ITHINGS_IOTHUB_GATEWAY = 'ITHINGS_IOTHUB_GATEWAY',
}

export const deviceTypeOptions = {
  [DeviceType.GENERIC_UART_PROTOCOL]: intl.formatMessage({ id: 'device.type.uart' }),
  [DeviceType.GENERIC_UART_RW]: intl.formatMessage({ id: 'device.type.uartRW' }),
  [DeviceType.GENERIC_MODBUS_MASTER]: intl.formatMessage({ id: 'device.type.modbus.master' }),
  [DeviceType.GENERIC_MODBUS_SLAVER]: intl.formatMessage({ id: 'device.type.modbus.slaver' }),
  [DeviceType.GENERIC_BACNET_IP]: intl.formatMessage({ id: 'device.type.bacnet.ip' }),
  [DeviceType.BACNET_ROUTER_GW]: intl.formatMessage({ id: 'device.type.bacnet.router' }),
  [DeviceType.GENERIC_SNMP]: intl.formatMessage({ id: 'device.type.snmp' }),
  // TODO 暂无需求，先隐藏 [DeviceType.GENERIC_MBUS_MASTER]: intl.formatMessage({ id: 'device.type.mbus' }),
  [DeviceType.GENERIC_HTTP_DEVICE]: intl.formatMessage({ id: 'device.type.http' }),
  [DeviceType.SIEMENS_PLC]: intl.formatMessage({ id: 'device.type.plc' }),
  [DeviceType.TENCENT_IOTHUB_GATEWAY]: intl.formatMessage({ id: 'device.type.tencent' }),
  [DeviceType.ITHINGS_IOTHUB_GATEWAY]: intl.formatMessage({ id: 'device.type.ithings' }),
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
  [1, intl.formatMessage({ id: 'device.modbus.func1' })],
  [2, intl.formatMessage({ id: 'device.modbus.func2' })],
  [3, intl.formatMessage({ id: 'device.modbus.func3' })],
  [4, intl.formatMessage({ id: 'device.modbus.func4' })],
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
  [PLCModel.S7200]: intl.formatMessage({ id: 'device.plc.model' }, { model: 'S7-200' }),
  [PLCModel.S7300]: intl.formatMessage({ id: 'device.plc.model' }, { model: 'S7-300' }),
  [PLCModel.S7400]: intl.formatMessage({ id: 'device.plc.model' }, { model: 'S7-400' }),
  [PLCModel.S71200]: intl.formatMessage({ id: 'device.plc.model' }, { model: 'S7-1200' }),
  [PLCModel.S71500]: intl.formatMessage({ id: 'device.plc.model' }, { model: 'S7-1500' }),
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
  [BacnetMode.BROADCAST]: intl.formatMessage({ id: 'device.form.title.mode.broadcast' }),
};

/**
 * TENCENT_IOTHUB_GATEWAY
 */
export enum TencentMode {
  GATEWAY = 'GATEWAY',
  DEVICE = 'DEVICE',
}

/**
 * GENERIC_UART_RW
 */
export enum ReadFormat {
  RAW = 'RAW',
  HEX = 'HEX',
  UTF8 = 'UTF8',
}

export const ReadFormatOption = {
  [ReadFormat.RAW]: intl.formatMessage({ id: 'device.readFormat.raw' }),
  [ReadFormat.HEX]: intl.formatMessage({ id: 'device.readFormat.hex' }),
  [ReadFormat.UTF8]: intl.formatMessage({ id: 'device.readFormat.utf8' }),
};

/**
 * UART
 */
// 波特率
export const baudRateEnum = new Map([
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
  E: intl.formatMessage({ id: 'options.parity.e' }),
  O: intl.formatMessage({ id: 'options.parity.o' }),
  N: intl.formatMessage({ id: 'options.parity.n' }),
};

// 停止位
export const stopBitsEnum = new Map([
  [1, '1'],
  [2, '2'],
]);
