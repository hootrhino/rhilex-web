// 资源类型
export const typeEnum = {
  MONGO_SINGLE: 'MongoDB 数据库',
  MQTT: 'MQTT Broker',
  UDP_TARGET: 'UDP 数据传输',
  TCP_TRANSPORT: 'TCP 数据传输',
  TDENGINE: 'Tdengine 数据库',
  HTTP: 'HTTP 数据推送',
};

// 传输模式
export const modeEnum = {
  RAW_STRING: '原始 ASIIC 传输',
  HEX_STRING: '十六进制字符串',
};

// 开启心跳
export const allowPingEnum = {
  true: '开启',
  false: '关闭',
};

export const defaultConfig = {
  MQTT: [
    {
      port: 1883,
      host: '127.0.0.1',
    },
  ],
  MONGO_SINGLE: [
    {
      mongoUrl: 'mongodb://root:root@127.0.0.1:27017/?connect=direct',
      database: 'rulexdb',
      collection: 'rulex',
    },
  ],
  UDP_TARGET: [
    {
      port: 2599,
      host: '127.0.0.1',
      timeout: 3000,
    },
  ],
  TCP_TRANSPORT: [
    {
      dataMode: 'RAW_STRING',
      allowPing: 'false',
      pingPacket: 'HR0001',
      port: 6005,
      host: '127.0.0.1',
      timeout: 3000,
    },
  ],
  TDENGINE: [
    {
      port: 6041,
      fqdn: '127.0.0.1',
      username: 'root',
      password: 'taosdata',
      dbName: 'RULEX',
    },
  ],
  HTTP: [
    {
      url: 'http://127.0.0.1:8080',
      headers: [{ k: '', v: '' }],
    },
  ],
};
