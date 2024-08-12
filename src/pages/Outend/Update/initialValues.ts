import { DataMode, OutendType } from '../enum';

const DEFAULT_TIMEOUT = 3000;
const DEFAULT_HOST = '127.0.0.1';

export const defaultConfig = {
  [OutendType.MQTT]: {
    port: 1883,
    host: DEFAULT_HOST,
  },
  [OutendType.MONGO_SINGLE]: {
    mongoUrl: 'mongodb://root:root@127.0.0.1:27017/?connect=direct',
    database: 'rulexdb',
    collection: 'rulex',
  },
  [OutendType.UDP_TARGET]: {
    port: 2599,
    host: DEFAULT_HOST,
    timeout: DEFAULT_TIMEOUT,
    allowPing: false,
    pingPacket: 'rhilex',
  },
  [OutendType.TCP_TRANSPORT]: {
    dataMode: DataMode.RAW_STRING,
    allowPing: false,
    pingPacket: 'rhilex',
    port: 6005,
    host: DEFAULT_HOST,
    timeout: DEFAULT_TIMEOUT,
  },
  [OutendType.TDENGINE]: {
    port: 6041,
    fqdn: DEFAULT_HOST,
    username: 'root',
    password: 'taosdata',
    dbName: 'RULEX',
  },
  [OutendType.HTTP]: {
    url: 'http://127.0.0.1:8080',
    headers: [{ k: '', v: '' }],
    allowPing: false,
    pingPacket: 'rhilex',
    timeout: DEFAULT_TIMEOUT,
  },
  [OutendType.GENERIC_UART_TARGET]: {
    allowPing: false,
    pingPacket: 'rhilex',
    timeout: DEFAULT_TIMEOUT,
    dataMode: DataMode.RAW_STRING,
  },
  [OutendType.SEMTECH_UDP_FORWARDER]: {
    host: DEFAULT_HOST,
    port: 1700,
    mac: 'FFFFFFFFFFFF',
  },
};
