/**
 * 设备类型枚举
 */
export enum DeviceType {
  GENERIC_PROTOCOL = 'GENERIC_PROTOCOL',
  GENERIC_MODBUS = 'GENERIC_MODBUS',
  GENERIC_AIS_RECEIVER = 'GENERIC_AIS_RECEIVER',
  SIEMENS_PLC = 'SIEMENS_PLC',
  GENERIC_HTTP_DEVICE = 'GENERIC_HTTP_DEVICE',
  GENERIC_CAMERA = 'GENERIC_CAMERA',
  SHELLY_GEN1_PROXY_SERVER = 'SHELLY_GEN1_PROXY_SERVER',
  GENERIC_SNMP = 'GENERIC_SNMP',
}

export const deviceTypeOptions = {
  [DeviceType.GENERIC_PROTOCOL]: '通用时间片中断串口采集网关',
  [DeviceType.GENERIC_MODBUS]: '通用 Modbus 采集网关',
  [DeviceType.GENERIC_SNMP]: '通用 SNMP 协议采集网关',
  [DeviceType.GENERIC_AIS_RECEIVER]: '通用船载 AIS 数据解析网关',
  [DeviceType.SIEMENS_PLC]: '通用西门子 S7 系列 PLC 采集网关',
  [DeviceType.GENERIC_HTTP_DEVICE]: '通用 HTTP 协议数据采集网关',
  [DeviceType.GENERIC_CAMERA]: '通用摄像机流处理网关',
  [DeviceType.SHELLY_GEN1_PROXY_SERVER]: 'Shelly 智能家居管理网关',
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
  [1, '01 读线圈状态'],
  [2, '02 读离散输入状态'],
  [3, '03 读保持寄存器'],
  [4, '04 读输入寄存器'],
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
  [PLCModel.S7200]: '西门子 S7-200 系列 PLC',
  [PLCModel.S7300]: '西门子 S7-300 系列 PLC',
  [PLCModel.S7400]: '西门子 S7-400 系列 PLC',
  [PLCModel.S71200]: '西门子 S7-1200 系列 PLC',
  [PLCModel.S71500]: '西门子 S7-1500 系列 PLC',
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
  [InputMode.REMOTE_STREAM_RTSP]: '远程RTSP流地址',
  [InputMode.LOCAL_CAMERA]: '本地相机设备',
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
  [OutputMode.LOCAL_JPEG_STREAM_SERVER]: '本地 Jpeg 流服务器',
  [OutputMode.REMOTE_STREAM_SERVER]: '远程流媒体服务器',
};

/**
 * 视频输出编码
 */
export enum OutputEncode {
  H264_STREAM = 'H264_STREAM',
  JPEG_STREAM = 'JPEG_STREAM',
}

export const OutputEncodeOption = {
  [OutputEncode.H264_STREAM]: 'H264 编码',
  [OutputEncode.JPEG_STREAM]: 'JPEG 编码',
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
