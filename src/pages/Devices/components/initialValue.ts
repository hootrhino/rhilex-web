// 通用配置
export const defaultCommonConfig = [
  {
    frequency: 3000,
    retryTime: 5,
    autoRequest: 'false',
    parseAis: 'false',
    gwsn: 'HR0001',
    mode: 'UART',
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

export const defaultValue = (activeGroupKey: string) => {
  return {
    type: 'GENERIC_PROTOCOL',
    gid: activeGroupKey,
    name: '',
    config: {
      commonConfig: defaultCommonConfig,
      hostConfig: defaultHostConfig,
      registers: defaultRegistersConfig,
    },
  };
};
