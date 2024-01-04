// 设备类型
export const typeEnum = {
  GENERIC_PROTOCOL: '通用时间片中断协议串口类设备',
  GENERIC_MODBUS: '通用 Modbus Slaver 设备',
  GENERIC_AIS_RECEIVER: '通用船舶 AIS 报文解析网关',
  SIEMENS_PLC: '西门子 S7 系列 PLC 设备',
  GENERIC_HTTP_DEVICE: '通用 HTTP 协议类设备',
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

// TCP 配置
export const defaultHostConfig = [
  {
    port: 3399,
    host: '127.0.0.1',
    timeout: 3000,
  },
];

export const defaultConfig = {
  GENERIC_PROTOCOL: {
    commonConfig: [
      {
        retryTime: 5,
        mode: 'UART',
      },
    ],
    hostConfig: defaultHostConfig,
  },
  GENERIC_MODBUS: {
    commonConfig: [
      {
        autoRequest: 'false',
        mode: 'UART',
      },
    ],
    hostConfig: defaultHostConfig,
  },
  GENERIC_AIS_RECEIVER: {
    commonConfig: [
      {
        parseAis: 'false',
        gwsn: 'HR0001',
        mode: 'UART',
      },
    ],
    hostConfig: [
      {
        port: 6005,
        host: '0.0.0.0',
        timeout: 3000,
      },
    ],
  },
  SIEMENS_PLC: {
    commonConfig: [
      {
        autoRequest: 'false',
        host: '127.0.0.1:102',
        model: 'S71200',
        rack: 0,
        slot: 1,
        timeout: 3000,
        idleTimeout: 5000,
      },
    ],
  },
  GENERIC_HTTP_DEVICE: {
    commonConfig: [
      {
        autoRequest: 'false',
        timeout: 3000,
        frequency: 1000,
      },
    ],
    httpConfig: [
      {
        url: 'http://127.0.0.1:8080',
      },
    ],
  },
};

// 根据 PLC 型号改变 rack&slot 默认值
export const defaultModelConfig = {
  S7200: {
    slot: 2,
  },
  S7300: {
    slot: 2,
  },
  S7400: {
    slot: 2,
  },
  S71200: {
    slot: 1,
  },
  S71500: {
    slot: 1,
  },
};

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
