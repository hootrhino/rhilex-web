export const defaultValue = ( activeGroupKey: string) => {
  return {
    type: 'GENERIC_PROTOCOL',
    gid: activeGroupKey,
    config: {
      host: '127.0.0.1',
      port: 6005,
      commonConfig: [
        {
          frequency: 3000,
          retryTime: 5,
          timeout: 3000,
          autoRequest: 'false',
          transport: 'rawserial',
          mode: 'RTU',
        },
      ],
      deviceConfig: [
        {
          type: 1,
          rw: 1,
          bufferSize: 0,
          timeSlice: 10,
          timeout: 3000,
          checksumValuePos: 0,
          checksumBegin: 0,
          checksumEnd: 0,
          weight: 1,
          initValue: 0,
          autoRequest: 'false',
          onCheckError: 'IGNORE',
          checkAlgorithm: 'NONECHECK',
        },
      ],
      tcpConfig: [
        {
          port: 502,
          host: '127.0.0.1',
        },
      ],
      registers: [
        {
          weight: 1,
          initValue: 0,
          slaverId: 1,
          address: 0,
          quantity: 1,
          function: 3,
        },
      ],
      hostConfig: [
        {
          port: 3399,
          host: '127.0.0.1',
          timeout: 3000,
        },
      ],
    },
  };
};
