export const defaultValue = {
  type: 'GENERIC_SNMP',
  config: {
    commonConfig: [
      {
        frequency: 3000,
        retryTime: 5,
        timeout: 3000,
        autoRequest: 'false',
        separator: 'LF',
        transport: 'rawserial',
        mode: 'RTU',
      },
    ],
    snmpConfig: [
      {
        port: 161,
        securityModel: 0,
        target: '127.0.0.1',
        transport: 'udp',
        community: 'public',
      },
    ],
    uartConfig: [
      {
        timeout: 3000,
        baudRate: 9600,
        dataBits: 8,
        stopBits: 1,
        parity: 'N',
        uart: 'COM1',
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
    rtuConfig: [
      {
        timeout: 3000,
        baudRate: 9600,
        dataBits: 8,
        parity: 'N',
        stopBits: 1,
        uart: 'COM1',
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
        function: 3
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
