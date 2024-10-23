import { DEFAULT_TITLE } from '@/utils/constant';
import {
  BacnetMode,
  DeviceMode,
  DeviceType,
  PLCModel,
  ReadFormat,
  SNMPVersion,
  TencentMode,
  Transport,
} from '../enum';

const DEFAULT_TIMEOUT = 3000;
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_FREQUENCE = 5000;
const DEFAULT_TRUE = 'true';
const DEFAULT_FALSE = 'false';
const DEFAULT_VALUE = DEFAULT_TITLE.toLocaleLowerCase();

// TCP 配置
export const defaultHostConfig = {
  port: 3399,
  host: DEFAULT_HOST,
  timeout: DEFAULT_TIMEOUT,
};

// UART 配置
export const defaultUartConfig = {
  timeout: DEFAULT_TIMEOUT,
  baudRate: 9600,
  dataBits: 8,
  parity: 'N',
  stopBits: 1,
};

// 根据 PLC 型号改变 slot 默认值
export const defaultModelSlot = {
  [PLCModel.S7200]: 2,
  [PLCModel.S7300]: 2,
  [PLCModel.S7400]: 2,
  [PLCModel.S71200]: 1,
  [PLCModel.S71500]: 1,
};

// 默认通用配置
const defaultCommonConfig = {
  autoRequest: DEFAULT_TRUE,
  batchRequest: DEFAULT_FALSE,
  mode: DeviceMode.UART,
};

// 国标配置
const defaultNationalConfig = {
  commonConfig: defaultCommonConfig,
  hostConfig: defaultHostConfig,
  uartConfig: {
    ...defaultUartConfig,
    baudRate: 2400,
    parity: 'E',
  },
};

// 云配置
const defaultIotHubConfig = {
  mode: TencentMode.GATEWAY,
};

// BACnet 配置
const defaultBacnetConfig = {
  mode: BacnetMode.BROADCAST,
  localPort: 47808,
  deviceId: 2580,
  vendorId: 2580,
};

export const defaultConfig = {
  [DeviceType.GENERIC_UART_RW]: {
    commonConfig: {
      autoRequest: DEFAULT_TRUE,
    },
    uartConfig: defaultUartConfig,
    rwConfig: {
      readFormat: ReadFormat.HEX,
      timeSlice: 50,
      tag: DEFAULT_VALUE,
    },
  },
  [DeviceType.GENERIC_USER_PROTOCOL]: {
    commonConfig: defaultCommonConfig,
    hostConfig: defaultHostConfig,
    uartConfig: defaultUartConfig,
  },
  [DeviceType.GENERIC_MODBUS_MASTER]: {
    commonConfig: {
      ...defaultCommonConfig,
      enableOptimize: DEFAULT_FALSE,
      maxRegNum: 64,
    },
    hostConfig: defaultHostConfig,
    uartConfig: defaultUartConfig,
  },
  [DeviceType.GENERIC_MODBUS_SLAVER]: {
    commonConfig: {
      mode: DeviceMode.UART,
    },
    uartConfig: defaultUartConfig,
    hostConfig: {
      port: 1502,
      host: '0.0.0.0',
    },
  },
  [DeviceType.GENERIC_MBUS_MASTER]: {
    commonConfig: {
      ...defaultCommonConfig,
      frequency: DEFAULT_FREQUENCE,
    },
    hostConfig: {
      port: 6005,
      host: '0.0.0.0',
      timeout: DEFAULT_TIMEOUT,
    },
    uartConfig: defaultUartConfig,
  },
  [DeviceType.SIEMENS_PLC]: {
    commonConfig: {
      autoRequest: DEFAULT_TRUE,
      batchRequest: DEFAULT_FALSE,
      timeout: DEFAULT_TIMEOUT,
      idleTimeout: DEFAULT_FREQUENCE,
    },
    s1200Config: {
      host: `${DEFAULT_HOST}:102`,
      model: PLCModel.S71200,
      rack: 0,
      slot: defaultModelSlot[PLCModel.S71200],
    },
  },
  [DeviceType.GENERIC_HTTP_DEVICE]: {
    commonConfig: {
      autoRequest: DEFAULT_TRUE,
      timeout: DEFAULT_TIMEOUT,
      frequency: DEFAULT_FREQUENCE,
    },
    httpConfig: {
      url: `http://${DEFAULT_HOST}:8080`,
      headers: [{ k: '', v: '' }],
    },
  },
  [DeviceType.GENERIC_SNMP]: {
    commonConfig: {
      autoRequest: DEFAULT_TRUE,
      batchRequest: DEFAULT_FALSE,
      enableGroup: DEFAULT_FALSE,
      timeout: DEFAULT_TIMEOUT,
      frequency: DEFAULT_FREQUENCE,
    },
    snmpConfig: {
      target: DEFAULT_HOST,
      port: 161,
      transport: Transport.UDP,
      community: 'public',
      version: SNMPVersion.V2,
    },
  },
  [DeviceType.GENERIC_BACNET_IP]: {
    commonConfig: {
      batchRequest: DEFAULT_FALSE,
      frequency: DEFAULT_FREQUENCE,
    },
    bacnetConfig: defaultBacnetConfig,
  },
  [DeviceType.BACNET_ROUTER_GW]: {
    bacnetRouterConfig: {
      ...defaultBacnetConfig,
      deviceName: DEFAULT_VALUE,
    },
  },
  [DeviceType.TENCENT_IOTHUB_GATEWAY]: {
    tencentConfig: defaultIotHubConfig,
  },
  [DeviceType.ITHINGS_IOTHUB_GATEWAY]: {
    ithingsConfig: defaultIotHubConfig,
  },
  [DeviceType.DLT6452007_MASTER]: defaultNationalConfig,
  [DeviceType.CJT1882004_MASTER]: defaultNationalConfig,
  [DeviceType.SZY2062016_MASTER]: defaultNationalConfig,
};
