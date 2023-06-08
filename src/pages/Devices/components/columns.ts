export const columns = [
  {
    valueType: 'group',
    columns: [
      {
        title: '设备名称',
        dataIndex: 'name',
        required: true,
      },
      {
        title: '设备类型',
        dataIndex: 'type',
        valueType: 'select',
        required: true,
        valueEnum: {
          GENERIC_SNMP: 'SNMP协议采集器',
          USER_G776: '有人4G串口通信DTU',
          GENERIC_PROTOCOL: '自定义串口协议',
          GENERIC_MODBUS: '通用Modbus协议采集器',
        },
      },
      {
        title: '备注信息',
        dataIndex: 'description',
      },
    ],
  },

  {
    valueType: 'dependency',
    name: ['type'],
    columns: ({ type }: any) => {
      return [
        {
          title: '通用配置',
          valueType: 'group',
          columns: [
            {
              valueType: 'formList',
              dataIndex: ['config', 'commonConfig'],
              mode: 'single',
              columns: [
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: '采集频率（毫秒）',
                      dataIndex: 'frequency',
                      valueType: 'digit',
                      required: true,
                    },
                    {
                      title: '是否启动轮询',
                      dataIndex: 'autoRequest',
                      valueType: 'segmented',
                      hideInForm: type === 'GENERIC_PROTOCOL',
                    },
                    {
                      title: '数据标签',
                      dataIndex: 'tag',
                      required: true,
                      hideInForm: type !== 'USER_G776',
                    },
                    {
                      title: '通信形式',
                      dataIndex: 'transport',
                      valueType: 'select',
                      required: true,
                      hideInForm: type !== 'GENERIC_PROTOCOL',
                      valueEnum: { rs485rawserial: 'RS485串口连接' },
                    },
                    {
                      title: '重试次数',
                      dataIndex: 'retryTime',
                      valueType: 'digit',
                      required: true,
                      hideInForm: type !== 'GENERIC_PROTOCOL',
                    },
                    {
                      title: '超时时间（毫秒）',
                      dataIndex: 'timeout',
                      valueType: 'digit',
                      required: true,
                      hideInForm: type !== 'GENERIC_MODBUS',
                    },
                  ],
                },
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: '协议分隔符',
                      dataIndex: 'separator',
                      valueType: 'select',
                      hideInForm: type !== 'USER_G776',
                      valueEnum: {
                        LF: 'LF',
                        CRLF: 'CRLF',
                      },
                    },
                    {
                      title: '工作模式',
                      dataIndex: 'mode',
                      valueType: 'select',
                      required: true,
                      hideInForm: type !== 'GENERIC_MODBUS',
                      valueEnum: {
                        rtu: 'RTU',
                        tcp: 'TCP',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: 'SNMP 配置',
          valueType: 'group',
          hideInForm: type !== 'GENERIC_SNMP',
          columns: [
            {
              valueType: 'formList',
              dataIndex: ['config', 'snmpConfig'],
              mode: 'single',
              columns: [
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: '主机地址',
                      dataIndex: 'target',
                      required: true,
                      tooltip: true,
                    },
                    {
                      title: '主机端口',
                      dataIndex: 'port',
                      valueType: 'digit',
                      required: true,
                      tooltip: true,
                    },
                    {
                      title: '通信形式',
                      dataIndex: 'transport',
                      valueType: 'select',
                      required: true,
                      tooltip: true,
                      valueEnum: { tcp: 'TCP', udp: 'UDP' },
                    },
                  ],
                },
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: 'Community',
                      dataIndex: 'community',
                      required: true,
                      tooltip: true,
                    },
                    {
                      title: '安全模式',
                      dataIndex: 'securityModel',
                      valueType: 'select',
                      required: true,
                      tooltip: true,
                      valueEnum: new Map([
                        [0, '不认证'],
                        [3, 'V3 认证'],
                      ]),
                    },
                    {
                      valueType: 'dependency',
                      name: ['securityModel'],
                      columns: ({ securityModel }: any) => {
                        if (securityModel === 3) {
                          return [
                            {
                              title: '用户名',
                              dataIndex: 'username',
                              required: true,
                              tooltip: true,
                            },
                          ];
                        } else {
                          return [];
                        }
                      },
                    },
                  ],
                },
                {
                  valueType: 'dependency',
                  name: ['securityModel'],
                  columns: ({ securityModel }: any) =>
                    securityModel === 3
                      ? [
                          {
                            valueType: 'group',
                            columns: [
                              {
                                title: '消息选项',
                                dataIndex: 'snmpV3MsgFlags',
                                valueType: 'select',
                                required: true,
                                tooltip: true,
                                valueEnum: new Map([
                                  [0, 'NoAuthNoPriv'],
                                  [1, 'AuthNoPriv'],
                                  [2, 'AuthPriv'],
                                  [3, 'Reportable'],
                                ]),
                              },
                              {
                                title: 'SNMP 认证协议',
                                dataIndex: 'snmpV3AuthProtocol',
                                valueType: 'select',
                                required: true,
                                tooltip: true,
                                valueEnum: new Map([
                                  [1, 'NoAuth'],
                                  [2, 'MD5'],
                                  [3, 'SHA'],
                                  [4, 'SHA224'],
                                  [5, 'SHA256'],
                                  [6, 'SHA384'],
                                  [7, 'SHA512'],
                                ]),
                              },
                              {
                                title: 'SNMP 认证密钥',
                                dataIndex: 'authenticationPassphrase',
                                required: true,
                                tooltip: true,
                              },
                            ],
                          },
                          {
                            valueType: 'group',
                            columns: [
                              {
                                title: '私有认证协议',
                                dataIndex: 'privacyProtocol',
                                valueType: 'select',
                                required: true,
                                tooltip: true,
                                valueEnum: new Map([
                                  [1, 'NoPriv'],
                                  [2, 'DES'],
                                  [3, 'AES'],
                                  [4, 'AES192'],
                                  [5, 'AES256'],
                                  [6, 'AES192C'],
                                  [7, 'AES256C'],
                                ]),
                              },
                              {
                                title: '私有认证协议密钥',
                                dataIndex: 'privacyPassphrase',
                                required: true,
                                tooltip: true,
                              },
                            ],
                          },
                        ]
                      : [],
                },
              ],
            },
          ],
        },
        {
          title: '串口配置',
          valueType: 'group',
          hideInForm: type !== 'USER_G776',
          columns: [
            {
              valueType: 'formList',
              dataIndex: ['config', 'uartConfig'],
              mode: 'single',
              columns: [
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: '超时时间（毫秒）',
                      dataIndex: 'timeout',
                      valueType: 'digit',
                      required: true,
                      tooltip: true,
                    },
                    {
                      title: '波特率',
                      dataIndex: 'baudRate',
                      valueType: 'select',
                      required: true,
                      tooltip: true,
                      valueEnum: new Map([
                        [4800, '4800'],
                        [9600, '9600'],
                        [115200, '115200'],
                      ]),
                    },
                    {
                      title: '数据位',
                      dataIndex: 'dataBits',
                      valueType: 'digit',
                      required: true,
                      tooltip: true,
                    },
                  ],
                },
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: '奇偶校验',
                      dataIndex: 'parity',
                      valueType: 'select',
                      required: true,
                      tooltip: true,
                      valueEnum: { E: '奇校验', O: '偶校验', N: '不校验' },
                    },
                    {
                      title: '停止位',
                      dataIndex: 'stopBits',
                      valueType: 'digit',
                      required: true,
                      tooltip: true,
                    },
                    {
                      title: '串口路径',
                      dataIndex: 'uart',
                      valueType: 'autoComplete',
                      required: true,
                      tooltip: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: '设备配置',
          valueType: 'group',
          hideInForm: type !== 'GENERIC_PROTOCOL',
          columns: [
            {
              valueType: 'formList',
              dataIndex: ['config', 'deviceConfig'],
              mode: 'multiple',
              initialValue: {
                type: 1,
                rw: 1,
                checkAlgorithm: 'NONECHECK',
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
              },
              columns: [
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: '协议名称',
                      dataIndex: 'name',
                      required: true,
                      tooltip: true,
                    },
                    {
                      title: '协议类型',
                      dataIndex: 'type',
                      valueType: 'select',
                      required: true,
                      tooltip: true,
                      valueEnum: new Map([
                        [1, '静态协议'],
                        [2, '动态协议'],
                        [3, '自定义时间片读'],
                        [4, '自定义时间片读写'],
                      ]),
                    },
                    {
                      title: '备注信息',
                      dataIndex: 'description',
                    },
                  ],
                },
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: '读取权限',
                      dataIndex: 'rw',
                      valueType: 'select',
                      required: true,
                      tooltip: true,
                      valueEnum: new Map([
                        [1, '只读'],
                        [2, '只写'],
                        [3, '读写'],
                      ]),
                    },
                    {
                      valueType: 'dependency',
                      name: ['type'],
                      columns: ({ type }: any) => {
                        return [
                          {
                            title: '缓冲区大小',
                            dataIndex: 'bufferSize',
                            valueType: 'digit',
                            required: true,
                            tooltip: true,
                            hideInForm: type !== 1,
                          },
                          {
                            title: '定时请求倒计时（毫秒）',
                            dataIndex: 'timeSlice',
                            valueType: 'digit',
                            required: true,
                            tooltip: true,
                            hideInForm: ![3, 4].includes(type),
                          },
                        ];
                      },
                    },
                    {
                      title: '指令等待时间（毫秒）',
                      dataIndex: 'timeout',
                      valueType: 'digit',
                      required: true,
                      tooltip: true,
                    },
                  ],
                },
                {
                  valueType: 'dependency',
                  name: ['type'],
                  columns: ({ type }: any) =>
                    [1, 2].includes(type)
                      ? [
                          {
                            valueType: 'group',
                            columns: [
                              {
                                title: '数据校验算法',
                                dataIndex: 'checkAlgorithm',
                                valueType: 'select',
                                required: true,
                                tooltip: true,
                                valueEnum: {
                                  XOR: 'XOR 校验',
                                  CRC16: 'CRC16 校验',
                                  NONECHECK: '不校验（默认）',
                                },
                              },
                              {
                                title: '校验值比对位',
                                dataIndex: 'checksumValuePos',
                                valueType: 'digit',
                                required: true,
                                tooltip: true,
                              },
                              {
                                title: '校验算法起始位置',
                                dataIndex: 'checksumBegin',
                                valueType: 'digit',
                                required: true,
                                tooltip: true,
                              },
                            ],
                          },
                          {
                            valueType: 'group',
                            columns: [
                              {
                                title: '校验算法结束位置',
                                dataIndex: 'checksumEnd',
                                valueType: 'digit',
                                required: true,
                                tooltip: true,
                              },
                              {
                                valueType: 'dependency',
                                name: ['checkAlgorithm'],
                                columns: ({ checkAlgorithm }: any) => [
                                  {
                                    title: '校验失败处理',
                                    dataIndex: 'onCheckError',
                                    valueType: 'select',
                                    required: true,
                                    tooltip: true,
                                    hideInForm: checkAlgorithm === 'NONECHECK',
                                    valueEnum: {
                                      LOG: '输出到日志',
                                      IGNORE: '忽略错误',
                                    },
                                  },
                                ],
                              },
                              {
                                title: '是否启动轮询',
                                dataIndex: 'autoRequest',
                                valueType: 'segmented',
                                tooltip: true,
                                hideInForm: type === 'GENERIC_PROTOCOL',
                              },
                            ],
                          },
                          {
                            valueType: 'group',
                            columns: [
                              {
                                title: '协议请求参数',
                                dataIndex: ['protocol', 'in'],
                                required: true,
                                tooltip: true,
                              },
                              {
                                title: '权重系数',
                                dataIndex: 'weight',
                                valueType: 'digit',
                                tooltip: true,
                              },
                              {
                                title: '初始值',
                                dataIndex: 'initValue',
                                valueType: 'digit',
                                tooltip: true,
                              },
                            ],
                          },
                        ]
                      : [],
                },
              ],
            },
          ],
        },
        {
          valueType: 'dependency',
          name: ['config', 'commonConfig', 'mode'],
          hideInForm: type !== 'GENERIC_MODBUS',
          columns: ({ config }: any) => {
            const deviceMode = config?.commonConfig[0]?.mode;

            if (deviceMode === 'rtu') {
              return [
                {
                  title: 'RTU 配置',
                  valueType: 'group',
                  columns: [
                    {
                      valueType: 'formList',
                      dataIndex: ['config', 'rtuConfig'],
                      mode: 'single',
                      columns: [
                        {
                          valueType: 'group',
                          columns: [
                            {
                              title: '超时时间（毫秒）',
                              dataIndex: 'timeout',
                              valueType: 'digit',
                              required: true,
                              tooltip: true,
                            },
                            {
                              title: '波特率',
                              dataIndex: 'baudRate',
                              valueType: 'select',
                              required: true,
                              tooltip: true,
                              valueEnum: new Map([
                                [4800, '4800'],
                                [9600, '9600'],
                                [115200, '115200'],
                              ]),
                            },
                            {
                              title: '数据位',
                              dataIndex: 'dataBits',
                              valueType: 'digit',
                              required: true,
                              tooltip: true,
                            },
                          ],
                        },
                        {
                          valueType: 'group',
                          columns: [
                            {
                              title: '奇偶校验',
                              dataIndex: 'parity',
                              valueType: 'select',
                              required: true,
                              tooltip: true,
                              valueEnum: { E: '奇校验', O: '偶校验', N: '不校验' },
                            },
                            {
                              title: '停止位',
                              dataIndex: 'stopBits',
                              valueType: 'digit',
                              required: true,
                              tooltip: true,
                            },
                            {
                              title: '串口路径',
                              dataIndex: 'uart',
                              valueType: 'autoComplete',
                              required: true,
                              tooltip: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ];
            } else {
              return [
                {
                  title: 'TCP 配置',
                  valueType: 'group',
                  columns: [
                    {
                      valueType: 'formList',
                      dataIndex: ['config', 'tcpConfig'],
                      mode: 'single',
                      columns: [
                        {
                          valueType: 'group',
                          columns: [
                            {
                              title: '服务地址',
                              dataIndex: 'host',
                              required: true,
                            },
                            {
                              title: '服务端口',
                              dataIndex: 'port',
                              valueType: 'digit',
                              required: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ];
            }
          },
        },

        {
          title: '寄存器配置',
          valueType: 'group',
          hideInForm: type !== 'GENERIC_MODBUS',
          columns: [
            {
              valueType: 'formList',
              dataIndex: ['config', 'registers'],
              mode: 'multiple',
              initialValue: {
                weight: 1,
                initValue: 0,
                slaverId: 1,
                address: 0,
                quantity: 1,
              },
              columns: [
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: '数据标签',
                      dataIndex: 'tag',
                      required: true,
                    },
                    {
                      title: '权重系数',
                      dataIndex: 'weight',
                      valueType: 'digit',
                      required: true,
                    },
                    {
                      title: '初始值',
                      dataIndex: 'initValue',
                      valueType: 'digit',
                      required: true,
                    },
                  ],
                },
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: 'Modbus 功能',
                      dataIndex: 'function',
                      valueType: 'select',
                      required: true,
                      valueEnum: new Map([
                        [1, '01 读线圈状态'],
                        [2, '02 读离散输入状态'],
                        [3, '03 读保持寄存器'],
                        [4, '04 读输入寄存器'],
                        [5, '05 写单个线圈'],
                        [6, '06 写单个保持寄存器'],
                        [15, '15 写多个线圈'],
                        [16, '16 写多个保持寄存器'],
                      ]),
                    },
                    {
                      title: '从设备 ID',
                      dataIndex: 'slaverId',
                      valueType: 'digit',
                      required: true,
                      rules: [
                        {
                          max: 255,
                          type: 'integer',
                          message: '从设备 ID 在 1-255 之间',
                        },
                        {
                          min: 1,
                          type: 'integer',
                          message: '从设备 ID 在 1-255 之间',
                        },
                      ],
                    },
                    {
                      title: '起始地址',
                      dataIndex: 'address',
                      valueType: 'digit',
                      required: true,
                    },
                  ],
                },
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: '读取数量',
                      dataIndex: 'quantity',
                      valueType: 'digit',
                      required: true,
                      rules: [
                        {
                          min: 1,
                          type: 'integer',
                          message: '读取数量在 1-255 之间',
                        },
                        {
                          max: 255,
                          type: 'integer',
                          message: '读取数量在 1-255 之间',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
    },
  },
];
