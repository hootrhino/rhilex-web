// GENERIC_IOT_HUB 默认配置
export const defaultIothubConfig = (randomNumber: number) => [
  {
    host: '127.0.0.1',
    port: 1883,
    mode: 'DC',
    productId: `eekit${randomNumber}`,
    deviceName: `eekit${randomNumber}`,
    clientId: `eekit${randomNumber}`,
  },
];

// COAP 默认配置
export const defaultCoapConfig = [
  {
    port: 2582,
    host: '127.0.0.1',
  },
];

// RULEX_UDP 默认配置
export const defaultUdpConfig = [
  {
    port: 2583,
    host: '127.0.0.1',
  },
];

// HTTP 默认配置
export const defaultHttpConfig = [
  {
    port: 2584,
    host: '127.0.0.1',
  },
];

// NATS_SERVER 默认配置
export const defaultNatsConfig = [
  {
    port: 4222,
    host: '127.0.0.1',
  },
];

// GRPC 默认配置
export const defaultGrpcConfig = [
  {
    port: 2585,
    host: '127.0.0.1',
  },
];
