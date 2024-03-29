// 设备类型
export const typeEnum = {
  GENERIC_PROTOCOL: '通用时间片中断串口采集网关',
  GENERIC_MODBUS: '通用 modbus 采集网关',
  GENERIC_AIS_RECEIVER: '通用船载 AIS 数据解析网关',
  SIEMENS_PLC: '通用西门子 S7 系列 PLC 采集网关',
  GENERIC_HTTP_DEVICE: '通用 HTTP 协议数据采集网关',
  GENERIC_CAMERA: '通用摄像机流处理网关',
};

// 模式
export const modeEnum = {
  UART: 'UART',
  TCP: 'TCP',
};

// Modbus 功能
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

// 块类型
export const blockTypeEnum = {
  MB: 'MB',
  DB: 'DB',
  FB: 'FB',
};

// PLC Model
export const plcModelEnum = {
  S7200: '西门子 S7-200 系列 PLC',
  S7300: '西门子 S7-300 系列 PLC',
  S7400: '西门子 S7-400 系列 PLC',
  S71200: '西门子 S7-1200 系列 PLC',
  S71500: '西门子 S7-1500 系列 PLC',
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

// 视频输入模式
export const inputModeEnum = {
  REMOTE_STREAM_RTSP: '远程RTSP流地址',
  LOCAL_CAMERA: '本地相机设备',
};

// 视频输出模式
export enum OutputModeEnum {
  // LOCAL_H264_STREAM_SERVER = '本地 FLV 流服务器',
  LOCAL_JPEG_STREAM_SERVER = '本地 Jpeg 流服务器',
  REMOTE_STREAM_SERVER = '远程流媒体服务器',
}

// 视频输出编码
export const outputEncodeEnum = {
  H264_STREAM: 'H264 编码',
  JPEG_STREAM: 'JPEG 编码',
};

// 是否解析 AIS 报文
// export const parseAisEnum = {
//   true: {
//     text: '解析',
//     color: 'processing',
//   },
//   false: {
//     text: '不解析',
//     color: 'default',
//   },
// };

/** SNMP */
// 协议分隔符
// export const separatorEnum = {
//   LF: 'LF',
//   CRLF: 'CRLF',
// };

// 安全模式
// export const securityModelEnum = new Map([
//   [0, '不认证'],
//   [3, 'V3 认证'],
// ]);

// 消息选项
// export const snmpV3MsgFlagsEnum = new Map([
//   [0, 'NoAuthNoPriv'],
//   [1, 'AuthNoPriv'],
//   [2, 'AuthPriv'],
//   [3, 'Reportable'],
// ]);

// SNMP 认证协议
// export const snmpV3AuthProtocolEnum = new Map([
//   [1, 'NoAuth'],
//   [2, 'MD5'],
//   [3, 'SHA'],
//   [4, 'SHA224'],
//   [5, 'SHA256'],
//   [6, 'SHA384'],
//   [7, 'SHA512'],
// ]);

// 私有认证协议
// export const privacyProtocolEnum = new Map([
//   [1, 'NoPriv'],
//   [2, 'DES'],
//   [3, 'AES'],
//   [4, 'AES192'],
//   [5, 'AES256'],
//   [6, 'AES192C'],
//   [7, 'AES256C'],
// ]);
