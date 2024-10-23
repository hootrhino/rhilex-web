import { EventType, InendType } from '../enum';

const DEFAULT_HOST = '127.0.0.1';

export const defaultConfig = {
  [InendType.COAP_SERVER]: {
    port: 2582,
    host: DEFAULT_HOST,
  },
  [InendType.UDP_SERVER]: {
    port: 2583,
    host: DEFAULT_HOST,
  },
  [InendType.TCP_SERVER]: {
    port: 2583,
    host: DEFAULT_HOST,
  },
  [InendType.HTTP_SERVER]: {
    port: 2584,
    host: DEFAULT_HOST,
  },
  [InendType.GRPC_SERVER]: {
    port: 2585,
    host: DEFAULT_HOST,
  },
  [InendType.INTERNAL_EVENT]: {
    type: EventType.ALL,
  },
  [InendType.GENERIC_MQTT_SERVER]: {
    serverName: 'rhilex-mqtt-server',
    anonymous: true,
    host: DEFAULT_HOST,
    port: 1883,
  },
  [InendType.CUSTOM_PROTOCOL_SERVER]: {
    host: DEFAULT_HOST,
    port: 7901,
    timeout: 3000,
    maxDataLength: 1024,
    protocolExpr: 'type:16:int:BE;length:16:int:BE;',
  },
};
