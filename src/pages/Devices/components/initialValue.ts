// GENERIC_PROTOCOL 通用配置详情
export const defaultProtocolCommonConfig = [
  {
    retryTime: 5,
    transport: 'rawserial',
  },
];

// TCP 配置
export const defaultHostConfig = [
  {
    port: 3399,
    host: '127.0.0.1',
    timeout: 3000,
  },
];

// GENERIC_MODBUS 通用配置
export const defaultModbusConfig = [
  {
    frequency: 3000,
    timeout: 3000,
    autoRequest: 'false',
    mode: 'RTU',
  },
];

// GENERIC_MODBUS TCP 配置
export const defaultTcpConfig = [
  {
    port: 502,
    host: '127.0.0.1',
  },
];

// 寄存器配置
export const defaultRegistersConfig = [
  {
    weight: 1,
    initValue: 0,
    slaverId: 1,
    address: 0,
    quantity: 1,
    function: 3,
  },
];

// GENERIC_AIS 配置
export const defaultAisConfig = {
  host: '127.0.0.1',
  port: 6005,
};

export const defaultValue = (activeGroupKey: string) => {
  return {
    type: 'GENERIC_PROTOCOL',
    gid: activeGroupKey,
    config: {
      commonConfig: defaultProtocolCommonConfig,
    },
  };
};
