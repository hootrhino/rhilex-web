import { Product } from '@/utils/enum';
import { pick } from '@/utils/redash';
import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

/**
 * 设备类型枚举
 */
export enum DeviceType {
  GENERIC_PROTOCOL = 'GENERIC_PROTOCOL',
  GENERIC_MODBUS = 'GENERIC_MODBUS',
  // GENERIC_AIS_RECEIVER = 'GENERIC_AIS_RECEIVER', 暂无需求，先隐藏
  SIEMENS_PLC = 'SIEMENS_PLC',
  GENERIC_HTTP_DEVICE = 'GENERIC_HTTP_DEVICE',
  GENERIC_CAMERA = 'GENERIC_CAMERA',
  SMART_HOME_CONTROLLER = 'SMART_HOME_CONTROLLER',
  GENERIC_SNMP = 'GENERIC_SNMP',
}

const baseTypeOption = {
  [DeviceType.GENERIC_PROTOCOL]: intl.formatMessage({ id: 'device.type.protocol' }),
  [DeviceType.GENERIC_MODBUS]: intl.formatMessage({ id: 'device.type.modbus' }),
  [DeviceType.GENERIC_SNMP]: intl.formatMessage({ id: 'device.type.snmp' }),
  // [DeviceType.GENERIC_AIS_RECEIVER]: '通用船载 AIS 数据解析网关', 暂无需求，先隐藏
  [DeviceType.SIEMENS_PLC]: intl.formatMessage({ id: 'device.type.plc' }),
  [DeviceType.GENERIC_HTTP_DEVICE]: intl.formatMessage({ id: 'device.type.http' }),
  [DeviceType.GENERIC_CAMERA]: intl.formatMessage({ id: 'device.type.camera' }),
  [DeviceType.SMART_HOME_CONTROLLER]: intl.formatMessage({ id: 'device.type.smartHome' }),
};

export const deviceTypeOptions = {
  [Product.COMMON]: baseTypeOption,
  [Product.EN6400]: pick(baseTypeOption, [
    DeviceType.GENERIC_MODBUS,
    DeviceType.GENERIC_SNMP,
    DeviceType.SIEMENS_PLC,
  ]),
  [Product.RASPI4B]: baseTypeOption,
  [Product.RHILEXG1]: baseTypeOption,
};

export const defaultDeviceType = {
  [Product.COMMON]: DeviceType.GENERIC_PROTOCOL,
  [Product.EN6400]: DeviceType.GENERIC_MODBUS,
  [Product.RASPI4B]: DeviceType.GENERIC_PROTOCOL,
  [Product.RHILEXG1]: DeviceType.GENERIC_PROTOCOL,
};

export const deviceAvatar = {
  [DeviceType.GENERIC_PROTOCOL]: 'PROT',
  [DeviceType.GENERIC_MODBUS]: 'MB',
  // [DeviceType.GENERIC_AIS_RECEIVER]: 'AIS', 暂无需求，先隐藏
  [DeviceType.SIEMENS_PLC]: 'PLC',
  [DeviceType.GENERIC_HTTP_DEVICE]: 'HTTP',
  [DeviceType.GENERIC_CAMERA]: 'CAM',
  [DeviceType.SMART_HOME_CONTROLLER]: 'S',
  [DeviceType.GENERIC_SNMP]: 'SNMP',
};

/**
 * 设备工作模式枚举
 */
export enum DeviceMode {
  UART = 'UART',
  TCP = 'TCP',
}

/**
 * Modbus 设备功能
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
 * 西门子设备 PLC 型号
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
 * 视频输入模式
 */
export enum InputMode {
  REMOTE_STREAM_RTSP = 'REMOTE_STREAM_RTSP',
  LOCAL_CAMERA = 'LOCAL_CAMERA',
}

export const InputModeOption = {
  [InputMode.REMOTE_STREAM_RTSP]: intl.formatMessage({ id: 'device.camera.inputMode.rtsp' }),
  [InputMode.LOCAL_CAMERA]: intl.formatMessage({ id: 'device.camera.inputMode.local' }),
};

/**
 * 视频输出模式
 */
export enum OutputMode {
  // LOCAL_H264_STREAM_SERVER = 'LOCAL_H264_STREAM_SERVER',
  LOCAL_JPEG_STREAM_SERVER = 'LOCAL_JPEG_STREAM_SERVER',
  REMOTE_STREAM_SERVER = 'REMOTE_STREAM_SERVER',
}

export const OutputModeOption = {
  // [OutputMode.LOCAL_H264_STREAM_SERVER]: '本地 FLV 流服务器',
  [OutputMode.LOCAL_JPEG_STREAM_SERVER]: intl.formatMessage({
    id: 'device.camera.outputMode.jpeg',
  }),
  [OutputMode.REMOTE_STREAM_SERVER]: intl.formatMessage({ id: 'device.camera.outputMode.stream' }),
};

/**
 * 视频输出编码
 */
export enum OutputEncode {
  H264_STREAM = 'H264_STREAM',
  JPEG_STREAM = 'JPEG_STREAM',
}

export const OutputEncodeOption = {
  [OutputEncode.H264_STREAM]: intl.formatMessage(
    { id: 'device.camera.outputEncode' },
    { type: 'H264' },
  ),
  [OutputEncode.JPEG_STREAM]: intl.formatMessage(
    { id: 'device.camera.outputEncode' },
    { type: 'JPEG' },
  ),
};

/** SNMP */
export enum Transport {
  UDP = 'udp',
  TCP = 'tcp',
}

export enum SNMPVersion {
  V1 = 1,
  V2 = 2,
  V3 = 3,
}

export const snmpVersionEnum = new Map([
  [1, '1'],
  [2, '2'],
  [3, '3'],
]);
