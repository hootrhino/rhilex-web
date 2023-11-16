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

// AIS 默认配置
export const defaultAisConfig = {
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
};

// MODBUS 默认配置
export const defaultModbusConfig = {
  commonConfig: [
    {
      frequency: 3000,
      autoRequest: 'false',
      mode: 'UART',
    },
  ],
  hostConfig: defaultHostConfig,
  registers: defaultRegistersConfig,
};

// PROTOCOL 默认配置
export const defaultProtocolConfig = {
  commonConfig: [
    {
      retryTime: 5,
      mode: 'UART',
    },
  ],
  hostConfig: defaultHostConfig,
};
