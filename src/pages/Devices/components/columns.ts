export const baudRateEnum = new Map([
  [4800, '4800'],
  [9600, '9600'],
  [115200, '115200'],
]);

export const dataBitsEnum = new Map([
  [1, '1'],
  [2, '2'],
  [3, '3'],
  [4, '4'],
  [5, '5'],
  [6, '6'],
  [7, '7'],
  [8, '8'],
]);

export const parityEnum = { E: '奇校验', O: '偶校验', N: '不校验' };

export const stopBitsEnum = new Map([
  [1, '1'],
  [1.5, '1.5'],
  [2, '2'],
]);

export const transportEnum = { rawserial: '自定义串口', rawtcp: '自定义TCP' };

export const modeEnum = {
  RTU: 'RTU',
  TCP: 'TCP',
};

export const funcEnum = new Map([
  [1, '01 读线圈状态'],
  [2, '02 读离散输入状态'],
  [3, '03 读保持寄存器'],
  [4, '04 读输入寄存器'],
  // [5, '05 写单个线圈'],
  // [6, '06 写单个保持寄存器'],
  // [15, '15 写多个线圈'],
  // [16, '16 写多个保持寄存器'],
]);

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
          // GENERIC_SNMP: '通用SNMP协议采集',
          // USER_G776: '通用串口DTU',
          GENERIC_PROTOCOL: '通用时间片中断串口协议',
          GENERIC_MODBUS: '通用Modbus Master',
        },
      },
      {
        title: '设备分组',
        dataIndex: 'gid',
        valueType: 'groupSelect',
        required: true,
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
                      hideInForm: type === 'GENERIC_PROTOCOL',
                    },
                    {
                      title: '是否启动轮询',
                      dataIndex: 'autoRequest',
                      valueType: 'segmented',
                      hideInForm: type === 'GENERIC_PROTOCOL',
                    },
                    // {
                    //   title: '数据标签',
                    //   dataIndex: 'tag',
                    //   required: true,
                    //   hideInForm: type !== 'USER_G776',
                    // },
                    {
                      title: '通信形式',
                      dataIndex: 'transport',
                      valueType: 'select',
                      required: true,
                      hideInForm: type !== 'GENERIC_PROTOCOL',
                      valueEnum: transportEnum,
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
                    // {
                    //   title: '协议分隔符',
                    //   dataIndex: 'separator',
                    //   valueType: 'select',
                    //   hideInForm: type !== 'USER_G776',
                    //   valueEnum: {
                    //     LF: 'LF',
                    //     CRLF: 'CRLF',
                    //   },
                    // },
                    {
                      title: '工作模式',
                      dataIndex: 'mode',
                      valueType: 'select',
                      required: true,
                      hideInForm: type !== 'GENERIC_MODBUS',
                      valueEnum: modeEnum,
                    },
                    // {
                    //   valueType: 'dependency',
                    //   name: ['mode'],
                    //   columns: ({ mode }: any) => {
                    //     if (type === 'GENERIC_MODBUS' && mode === 'RTU') {
                    //       return [
                    //         {
                    //           title: 'RTU 配置',
                    //           dataIndex: 'rtuConfig',
                    //           valueType: 'select',
                    //           required: true,
                    //           hideInForm: type !== 'GENERIC_MODBUS',
                    //         },
                    //       ];
                    //     } else {
                    //       return [];
                    //     }
                    //   },
                    // },
                  ],
                },
              ],
            },
          ],
        },
        // {
        //   title: 'SNMP 配置',
        //   valueType: 'group',
        //   hideInForm: type !== 'GENERIC_SNMP',
        //   columns: [
        //     {
        //       valueType: 'formList',
        //       dataIndex: ['config', 'snmpConfig'],
        //       mode: 'single',
        //       columns: [
        //         {
        //           valueType: 'group',
        //           columns: [
        //             {
        //               title: '主机地址',
        //               dataIndex: 'target',
        //               required: true,
        //               tooltip: true,
        //             },
        //             {
        //               title: '主机端口',
        //               dataIndex: 'port',
        //               valueType: 'digit',
        //               required: true,
        //               tooltip: true,
        //             },
        //             {
        //               title: '通信形式',
        //               dataIndex: 'transport',
        //               valueType: 'select',
        //               required: true,
        //               tooltip: true,
        //               valueEnum: { tcp: 'TCP', udp: 'UDP' },
        //             },
        //           ],
        //         },
        //         {
        //           valueType: 'group',
        //           columns: [
        //             {
        //               title: 'Community',
        //               dataIndex: 'community',
        //               required: true,
        //               tooltip: true,
        //             },
        //             {
        //               title: '安全模式',
        //               dataIndex: 'securityModel',
        //               valueType: 'select',
        //               required: true,
        //               tooltip: true,
        //               valueEnum: new Map([
        //                 [0, '不认证'],
        //                 [3, 'V3 认证'],
        //               ]),
        //             },
        //             {
        //               valueType: 'dependency',
        //               name: ['securityModel'],
        //               columns: ({ securityModel }: any) => {
        //                 if (securityModel === 3) {
        //                   return [
        //                     {
        //                       title: '用户名',
        //                       dataIndex: 'username',
        //                       required: true,
        //                       tooltip: true,
        //                     },
        //                   ];
        //                 } else {
        //                   return [];
        //                 }
        //               },
        //             },
        //           ],
        //         },
        //         {
        //           valueType: 'dependency',
        //           name: ['securityModel'],
        //           columns: ({ securityModel }: any) =>
        //             securityModel === 3
        //               ? [
        //                   {
        //                     valueType: 'group',
        //                     columns: [
        //                       {
        //                         title: '消息选项',
        //                         dataIndex: 'snmpV3MsgFlags',
        //                         valueType: 'select',
        //                         required: true,
        //                         tooltip: true,
        //                         valueEnum: new Map([
        //                           [0, 'NoAuthNoPriv'],
        //                           [1, 'AuthNoPriv'],
        //                           [2, 'AuthPriv'],
        //                           [3, 'Reportable'],
        //                         ]),
        //                       },
        //                       {
        //                         title: 'SNMP 认证协议',
        //                         dataIndex: 'snmpV3AuthProtocol',
        //                         valueType: 'select',
        //                         required: true,
        //                         tooltip: true,
        //                         valueEnum: new Map([
        //                           [1, 'NoAuth'],
        //                           [2, 'MD5'],
        //                           [3, 'SHA'],
        //                           [4, 'SHA224'],
        //                           [5, 'SHA256'],
        //                           [6, 'SHA384'],
        //                           [7, 'SHA512'],
        //                         ]),
        //                       },
        //                       {
        //                         title: 'SNMP 认证密钥',
        //                         dataIndex: 'authenticationPassphrase',
        //                         required: true,
        //                         tooltip: true,
        //                       },
        //                     ],
        //                   },
        //                   {
        //                     valueType: 'group',
        //                     columns: [
        //                       {
        //                         title: '私有认证协议',
        //                         dataIndex: 'privacyProtocol',
        //                         valueType: 'select',
        //                         required: true,
        //                         tooltip: true,
        //                         valueEnum: new Map([
        //                           [1, 'NoPriv'],
        //                           [2, 'DES'],
        //                           [3, 'AES'],
        //                           [4, 'AES192'],
        //                           [5, 'AES256'],
        //                           [6, 'AES192C'],
        //                           [7, 'AES256C'],
        //                         ]),
        //                       },
        //                       {
        //                         title: '私有认证协议密钥',
        //                         dataIndex: 'privacyPassphrase',
        //                         required: true,
        //                         tooltip: true,
        //                       },
        //                     ],
        //                   },
        //                 ]
        //               : [],
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   title: '串口配置',
        //   valueType: 'group',
        //   hideInForm: !['USER_G776'].includes(type),
        //   columns: [
        //     {
        //       valueType: 'formList',
        //       dataIndex: ['config', 'uartConfig'],
        //       mode: 'single',
        //       columns: [
        //         {
        //           valueType: 'group',
        //           columns: [
        //             {
        //               title: '超时时间（毫秒）',
        //               dataIndex: 'timeout',
        //               valueType: 'digit',
        //               required: true,
        //               tooltip: true,
        //             },
        //             {
        //               title: '波特率',
        //               dataIndex: 'baudRate',
        //               valueType: 'select',
        //               required: true,
        //               tooltip: true,
        //               valueEnum: new Map([
        //                 [4800, '4800'],
        //                 [9600, '9600'],
        //                 [115200, '115200'],
        //               ]),
        //             },
        //             {
        //               title: '数据位',
        //               dataIndex: 'dataBits',
        //               valueType: 'select',
        //               required: true,
        //               tooltip: true,
        //               valueEnum: new Map([
        //                 [1, '1'],
        //                 [2, '2'],
        //                 [3, '3'],
        //                 [4, '4'],
        //                 [5, '5'],
        //                 [6, '6'],
        //                 [7, '7'],
        //                 [8, '8'],
        //               ]),
        //             },
        //           ],
        //         },
        //         {
        //           valueType: 'group',
        //           columns: [
        //             {
        //               title: '奇偶校验',
        //               dataIndex: 'parity',
        //               valueType: 'select',
        //               required: true,
        //               tooltip: true,
        //               valueEnum: { E: '奇校验', O: '偶校验', N: '不校验' },
        //             },
        //             {
        //               title: '停止位',
        //               dataIndex: 'stopBits',
        //               valueType: 'select',
        //               required: true,
        //               tooltip: true,
        //               valueEnum: new Map([
        //                 [1, '1'],
        //                 [1.5, '1.5'],
        //                 [2, '2'],
        //               ]),
        //             },
        //             {
        //               title: '串口路径',
        //               dataIndex: 'uart',
        //               valueType: 'autoComplete',
        //               required: true,
        //               tooltip: true,
        //             },
        //           ],
        //         },
        //       ],
        //     },
        //   ],
        // },
        {
          valueType: 'dependency',
          name: ['config', 'commonConfig', 'transport'],
          hideInForm: type !== 'GENERIC_PROTOCOL',
          columns: ({ config }: any) => {
            const transport = config?.commonConfig[0]?.transport;

            if (transport === 'rawserial') {
              return [
                {
                  title: '串口配置',
                  valueType: 'group',
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
                              valueEnum: baudRateEnum,
                            },
                            {
                              title: '数据位',
                              dataIndex: 'dataBits',
                              valueType: 'select',
                              required: true,
                              tooltip: true,
                              valueEnum: dataBitsEnum,
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
                              valueEnum: parityEnum,
                            },
                            {
                              title: '停止位',
                              dataIndex: 'stopBits',
                              valueType: 'select',
                              required: true,
                              tooltip: true,
                              valueEnum: stopBitsEnum,
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
                      dataIndex: ['config', 'hostConfig'],
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
                            },
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
          valueType: 'dependency',
          name: ['config', 'commonConfig', 'mode'],
          hideInForm: type !== 'GENERIC_MODBUS',
          columns: ({ config }: any) => {
            const deviceMode = config?.commonConfig[0]?.mode;

            if (deviceMode === 'RTU') {
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
                              valueEnum: baudRateEnum,
                            },
                            {
                              title: '数据位',
                              dataIndex: 'dataBits',
                              valueType: 'select',
                              required: true,
                              tooltip: true,
                              valueEnum: dataBitsEnum,
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
                              valueEnum: parityEnum,
                            },
                            {
                              title: '停止位',
                              dataIndex: 'stopBits',
                              valueType: 'select',
                              required: true,
                              tooltip: true,
                              valueEnum: stopBitsEnum,
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
                function: 3,
              },
              columns: [
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: '数据标签',
                      dataIndex: 'tag',
                      width: 'md',
                      required: true,
                    },
                    {
                      title: '数据别名',
                      dataIndex: 'alias',
                      width: 'md',
                      required: true,
                    },
                    {
                      title: 'Modbus 功能',
                      dataIndex: 'function',
                      valueType: 'select',
                      width: 'md',
                      required: true,
                      valueEnum: funcEnum,
                    },
                    {
                      title: '从设备 ID',
                      dataIndex: 'slaverId',
                      valueType: 'digit',
                      width: 'xs',
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
                      width: 'xs',
                      required: true,
                    },
                    {
                      title: '读取数量',
                      dataIndex: 'quantity',
                      valueType: 'digit',
                      width: 'xs',
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
