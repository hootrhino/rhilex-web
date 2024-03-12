// TCP 配置
export const defaultHostConfig = {
  port: 3399,
  host: '127.0.0.1',
  timeout: 3000,
};

// 根据输出模式改变输出编码&输出地址默认值
export const defaultOutputConfig = {
  LOCAL_H264_STREAM_SERVER: {
    // outputMode: 'LOCAL_H264_STREAM_SERVER',
    outputEncode: 'H264_STREAM',
  },
  LOCAL_JPEG_STREAM_SERVER: {
    // outputMode: 'LOCAL_JPEG_STREAM_SERVER',
    outputEncode: 'JPEG_STREAM',
  },
  REMOTE_STREAM_SERVER: {
    // outputMode: 'REMOTE_STREAM_SERVER',
    outputEncode: 'H264_STREAM',
    outputAddr: 'rtmp://127.0.0.1/stream/live1',
  },
};

export const defaultInputModeConfig = {
  REMOTE_STREAM_RTSP: {
    inputAddr: `http://${window.location.hostname}:345`
  },
  LOCAL_CAMERA: {
    inputAddr: undefined
  }
}

export const defaultConfig = {
  GENERIC_PROTOCOL: {
    commonConfig: {
      retryTime: 5,
      mode: 'TCP',
    },
    hostConfig: defaultHostConfig,
  },
  GENERIC_MODBUS: {
    commonConfig: {
      autoRequest: false,
      mode: 'TCP',
    },
    hostConfig: defaultHostConfig,
  },
  GENERIC_AIS_RECEIVER: {
    commonConfig: {
      parseAis: false,
      gwsn: 'HR0001',
      mode: 'TCP',
    },
    hostConfig: {
      port: 6005,
      host: '0.0.0.0',
      timeout: 3000,
    },
  },
  SIEMENS_PLC: {
    commonConfig: {
      autoRequest: false,
      host: '127.0.0.1:102',
      model: 'S71200',
      rack: 0,
      slot: 1,
      timeout: 3000,
      idleTimeout: 5000,
    },
  },
  GENERIC_HTTP_DEVICE: {
    commonConfig: {
      autoRequest: false,
      timeout: 3000,
      frequency: 1000,
    },
    httpConfig: {
      url: 'http://127.0.0.1:8080',
    },
  },
  GENERIC_CAMERA: {
    inputMode: 'LOCAL_CAMERA',
    ...defaultOutputConfig['LOCAL_JPEG_STREAM_SERVER'],
  },
};

// 根据 PLC 型号改变 rack&slot 默认值
export const defaultModelConfig = {
  S7200: {
    commonConfig: {
      slot: 2,
    },
  },
  S7300: {
    commonConfig: {
      slot: 2,
    },
  },
  S7400: {
    commonConfig: {
      slot: 2,
    },
  },
  S71200: {
    commonConfig: {
      slot: 1,
    },
  },
  S71500: {
    commonConfig: {
      slot: 1,
    },
  },
};
