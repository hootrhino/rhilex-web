// 资源类型
export const typeEnum = {
  COAP: 'COAP 协议支持',
  GENERIC_IOT_HUB: 'IoTHUB 平台支持',
  RULEX_UDP: 'UUDP 协议支持',
  HTTP: 'HTTP 协议支持',
  NATS_SERVER: 'Nats 中间件支持',
  GRPC: 'GRPC 协议支持',
  INTERNAL_EVENT: '内部事件源',
};

// 模式
export const modeEnum = {
  GW: '网关',
  DC: '直连',
};

// 事件类型
export const eventEnum = {
  ALL: '全部事件',
  SOURCE: '南向事件',
  DEVICE: '设备事件',
  TARGET: '北向事件',
  SYSTEM: '系统事件',
  HARDWARE: '硬件事件',
};
