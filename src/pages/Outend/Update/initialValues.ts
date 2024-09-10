import { DEFAULT_TITLE } from '@/utils/constant';
import { DataMode, OutendType } from '../enum';

const DEFAULT_TIMEOUT = 3000;
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_ENABLE_OFFLINE_CACHE = 'false';
const DEFAULT_ALLOWPING = 'false';
const DEFAULT_VALUE = DEFAULT_TITLE.toLocaleLowerCase();

export const defaultConfig = {
  [OutendType.MQTT]: {
    cacheOfflineData: DEFAULT_ENABLE_OFFLINE_CACHE,
    port: 1883,
    host: DEFAULT_HOST,
  },
  [OutendType.UDP_TARGET]: {
    cacheOfflineData: DEFAULT_ENABLE_OFFLINE_CACHE,
    port: 2599,
    host: DEFAULT_HOST,
    timeout: DEFAULT_TIMEOUT,
    allowPing: DEFAULT_ALLOWPING,
    pingPacket: DEFAULT_VALUE,
  },
  [OutendType.TCP_TRANSPORT]: {
    // dataMode: DataMode.RAW_STRING,
    cacheOfflineData: DEFAULT_ENABLE_OFFLINE_CACHE,
    allowPing: DEFAULT_ALLOWPING,
    pingPacket: DEFAULT_VALUE,
    port: 6005,
    host: DEFAULT_HOST,
    timeout: DEFAULT_TIMEOUT,
  },
  [OutendType.MONGO_SINGLE]: {
    cacheOfflineData: DEFAULT_ENABLE_OFFLINE_CACHE,
    mongoUrl: 'mongodb://root:root@127.0.0.1:27017/?connect=direct',
    database: DEFAULT_VALUE,
    collection: DEFAULT_VALUE,
  },
  [OutendType.GREPTIME_DATABASE]: {
    cacheOfflineData: DEFAULT_ENABLE_OFFLINE_CACHE,
    gwsn: DEFAULT_VALUE,
    host: DEFAULT_HOST,
    port: 4001,
    username: DEFAULT_VALUE,
    password: DEFAULT_VALUE,
    database: 'public',
    table: DEFAULT_VALUE,
  },
  [OutendType.TDENGINE]: {
    cacheOfflineData: DEFAULT_ENABLE_OFFLINE_CACHE,
    port: 6041,
    fqdn: DEFAULT_HOST,
    username: 'root',
    password: 'taosdata',
    dbName: DEFAULT_VALUE,
  },
  [OutendType.HTTP]: {
    cacheOfflineData: DEFAULT_ENABLE_OFFLINE_CACHE,
    url: 'http://127.0.0.1:8080',
    headers: [{ k: '', v: '' }],
    allowPing: DEFAULT_ALLOWPING,
    pingPacket: DEFAULT_VALUE,
    timeout: DEFAULT_TIMEOUT,
  },
  [OutendType.GENERIC_UART_TARGET]: {
    cacheOfflineData: DEFAULT_ENABLE_OFFLINE_CACHE,
    allowPing: DEFAULT_ALLOWPING,
    pingPacket: DEFAULT_VALUE,
    timeout: DEFAULT_TIMEOUT,
    dataMode: DataMode.RAW_STRING,
  },
  [OutendType.SEMTECH_UDP_FORWARDER]: {
    cacheOfflineData: DEFAULT_ENABLE_OFFLINE_CACHE,
    host: DEFAULT_HOST,
    port: 1700,
    mac: 'FFFFFFFFFFFF',
  },
};
