import {
  BacnetMode,
  DeviceMode,
  DeviceType,
  OutputEncode,
  OutputMode,
  PLCModel,
  ReadFormat,
  SNMPVersion,
  Transport,
} from '../enum';

const DEFAULT_TIMEOUT = 3000;
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_FREQUENCE = 5000;
const DEFAULT_AUTOREQUEST = 'true';

// TCP 配置
export const defaultHostConfig = {
  port: 3399,
  host: DEFAULT_HOST,
  timeout: DEFAULT_TIMEOUT,
};

// 根据输出模式改变输出编码&输出地址默认值
export const defaultOutputConfig = {
  LOCAL_H264_STREAM_SERVER: {
    outputMode: 'LOCAL_H264_STREAM_SERVER',
    outputEncode: OutputEncode.H264_STREAM,
  },
  LOCAL_JPEG_STREAM_SERVER: {
    outputMode: OutputMode.LOCAL_JPEG_STREAM_SERVER,
    outputEncode: OutputEncode.JPEG_STREAM,
  },
  REMOTE_STREAM_SERVER: {
    outputMode: OutputMode.REMOTE_STREAM_SERVER,
    outputEncode: OutputEncode.H264_STREAM,
    outputAddr: 'rtmp://127.0.0.1/stream/live1',
  },
};

export const defaultInputModeConfig = {
  REMOTE_STREAM_RTSP: {
    inputAddr: `http://${window.location.hostname}:345`,
  },
  LOCAL_CAMERA: {
    inputAddr: undefined,
  },
};

export const defaultConfig = {
  [DeviceType.GENERIC_UART_PROTOCOL]: {
    commonConfig: {
      retryTime: 5,
      mode: DeviceMode.UART,
      timeout: 50,
    },
    hostConfig: defaultHostConfig,
  },
  [DeviceType.GENERIC_MODBUS_MASTER]: {
    commonConfig: {
      autoRequest: DEFAULT_AUTOREQUEST,
      enableOptimize: 'false',
      batchRequest: 'false',
      mode: DeviceMode.UART,
      maxRegNum: 64,
    },
    hostConfig: defaultHostConfig,
  },
  [DeviceType.GENERIC_MODBUS_SLAVER]: {
    commonConfig: {
      mode: DeviceMode.UART,
    },
    hostConfig: {
      port: 1502,
      host: '0.0.0.0',
    },
  },
  [DeviceType.SIEMENS_PLC]: {
    commonConfig: {
      autoRequest: DEFAULT_AUTOREQUEST,
      batchRequest: 'false',
      host: `${DEFAULT_HOST}:102`,
      model: 'S71200',
      rack: 0,
      slot: 1,
      timeout: DEFAULT_TIMEOUT,
      idleTimeout: DEFAULT_FREQUENCE,
    },
  },
  [DeviceType.GENERIC_HTTP_DEVICE]: {
    commonConfig: {
      autoRequest: DEFAULT_AUTOREQUEST,
      timeout: DEFAULT_TIMEOUT,
      frequency: DEFAULT_FREQUENCE,
    },
    httpConfig: {
      url: `http://${DEFAULT_HOST}:8080`,
      headers: [{ k: '', v: '' }],
    },
  },
  // TODO 暂无需求，先隐藏
  // [DeviceType.GENERIC_CAMERA]: {
  //   inputMode: InputMode.LOCAL_CAMERA,
  //   ...defaultOutputConfig['LOCAL_JPEG_STREAM_SERVER'],
  // },
  [DeviceType.GENERIC_SNMP]: {
    commonConfig: {
      autoRequest: DEFAULT_AUTOREQUEST,
      enableGroup: 'false',
      batchRequest: 'false',
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
      frequency: DEFAULT_FREQUENCE,
      batchRequest: 'false',
    },
    bacnetConfig: {
      mode: BacnetMode.BROADCAST,
      localPort: 47808,
      deviceId: 2580,
      vendorId: 2580,
    },
  },
  [DeviceType.BACNET_ROUTER_GW]: {
    bacnetRouterConfig: {
      mode: BacnetMode.BROADCAST,
      localPort: 47808,
      deviceId: 2580,
      deviceName: 'rhilex',
      vendorId: 2580,
    },
  },
  // TODO 暂无需求，先隐藏
  // [DeviceType.TENCENT_IOTHUB_GATEWAY]: {
  //   tencentConfig: {
  //     mode: TencentMode.GATEWAY,
  //   },
  // },
  [DeviceType.GENERIC_UART_RW]: {
    commonConfig: {
      autoRequest: 'true',
    },
    rwConfig: {
      readFormat: ReadFormat.HEX,
      timeSlice: 50,
      tag: 'rhilex',
    },
  },
};

// 根据 PLC 型号改变 rack&slot 默认值
export const defaultModelConfig = {
  [PLCModel.S7200]: {
    commonConfig: {
      slot: 2,
    },
  },
  [PLCModel.S7300]: {
    commonConfig: {
      slot: 2,
    },
  },
  [PLCModel.S7400]: {
    commonConfig: {
      slot: 2,
    },
  },
  [PLCModel.S71200]: {
    commonConfig: {
      slot: 1,
    },
  },
  [PLCModel.S71500]: {
    commonConfig: {
      slot: 1,
    },
  },
};
