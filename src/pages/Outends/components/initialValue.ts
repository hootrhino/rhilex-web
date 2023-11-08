// MONGO_SINGLE 默认配置
export const defaultMongoConfig = [
  {
    mongoUrl: 'mongodb://root:root@127.0.0.1:27017/?connect=direct',
    database: 'rulexdb',
    collection: 'rulex',
  },
];

// MQTT 默认配置
export const defaultMqttConfig = (randomNumber: number) => [
  {
    port: 1883,
    host: '127.0.0.1',
    clientId: `eekit${randomNumber}`,
    pubTopic: `eekit${randomNumber}`,
  },
];

// UDP_TARGET 默认配置
export const defaultUdpConfig = [
  {
    port: 2599,
    host: '127.0.0.1',
    timeout: 3000,
  },
];
