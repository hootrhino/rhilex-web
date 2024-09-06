import { EventType, InendType } from '../enum';

const DEFAULT_HOST = '127.0.0.1';

export const defaultConfig = {
  [InendType.COAP]: {
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
  [InendType.HTTP]: {
    port: 2584,
    host: DEFAULT_HOST,
  },
  [InendType.GRPC]: {
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
};
