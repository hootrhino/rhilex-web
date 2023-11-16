// 资源类型
export const typeEnum = {
  MONGO_SINGLE: 'MongoDB 数据库',
  MQTT: 'MQTT Broker',
  UDP_TARGET: 'UDP 数据传输',
  TCP_TRANSPORT: 'TCP 数据传输',
  TDENGINE: 'Tdengine 数据库',
};

// 传输模式
export const modeEnum = {
  RAW_STRING: '原始 ASIIC 传输',
  HEX_STRING: '十六进制字符串',
};

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

// TCP_TRANSPORT 默认配置
export const defaultTcpConfig = [
  {
    dataMode: 'RAW_STRING',
    allowPing: 'false',
    pingPacket: 'HR0001',
    port: 6005,
    host: '127.0.0.1',
    timeout: 3000,
  },
];

// TDENGINE 默认配置
export const defaultTdConfig = [
  {
    port: 6041,
    fqdn: '127.0.0.1',
    username: 'root',
    password: 'taosdata',
    dbName: 'RULEX',
  },
];
