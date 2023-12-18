export const typeEnum = {
  COAP: 'COAP 协议支持',
  GENERIC_IOT_HUB: 'IoTHUB 平台支持',
  RULEX_UDP: 'UUDP 协议支持',
  HTTP: 'HTTP 协议支持',
  NATS_SERVER: 'Nats 中间件支持',
  GRPC: 'GRPC 协议支持',
  INTERNAL_EVENT: '内部事件源',
};

export const modeEnum = {
  GW: '网关',
  DC: '直连',
};

export const eventEnum = {
  ALL: '全部事件',
  SOURCE: '南向事件',
  DEVICE: '设备事件',
  TARGET: '北向事件',
  SYSTEM: '系统事件',
  HARDWARE: '硬件事件',
};

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

// INTERNAL_EVENT 默认配置
export const defaultEventConfig = [
  {
    type: 'ALL',
  },
];
