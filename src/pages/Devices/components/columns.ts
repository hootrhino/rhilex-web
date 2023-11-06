// 通信形式
export const transportEnum = { rawserial: '自定义串口', rawtcp: '自定义TCP' };

// 模式
export const modeEnum = {
  RTU: 'RTU',
  TCP: 'TCP',
};

// Modbus 功能
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

// 设备类型
export const typeEnum = {
  // GENERIC_SNMP: '通用SNMP协议采集',
  // USER_G776: '通用串口DTU',
  GENERIC_PROTOCOL: '通用时间片中断串口协议',
  GENERIC_MODBUS: '通用 Modbus Master',
  GENERIC_AIS: '通用船舶AIS数据解析器',
};

// 协议分隔符
export const separatorEnum = {
  LF: 'LF',
  CRLF: 'CRLF',
};

// 安全模式
export const securityModelEnum = new Map([
  [0, '不认证'],
  [3, 'V3 认证'],
]);

// 消息选项
export const snmpV3MsgFlagsEnum = new Map([
  [0, 'NoAuthNoPriv'],
  [1, 'AuthNoPriv'],
  [2, 'AuthPriv'],
  [3, 'Reportable'],
]);

// SNMP 认证协议
export const snmpV3AuthProtocolEnum = new Map([
  [1, 'NoAuth'],
  [2, 'MD5'],
  [3, 'SHA'],
  [4, 'SHA224'],
  [5, 'SHA256'],
  [6, 'SHA384'],
  [7, 'SHA512'],
]);

// 私有认证协议
export const privacyProtocolEnum = new Map([
  [1, 'NoPriv'],
  [2, 'DES'],
  [3, 'AES'],
  [4, 'AES192'],
  [5, 'AES256'],
  [6, 'AES192C'],
  [7, 'AES256C'],
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
        valueEnum: typeEnum,
      },
      {
        title: '设备分组',
        dataIndex: 'gid',
        valueType: 'groupSelect',
        required: true,
      },
      {
        title: '备注',
        dataIndex: 'description',
      },
    ],
  },
  {
    valueType: 'dependency',
    name: ['type'],
    columns: ({ type }: any) => {
      if (type === 'GENERIC_AIS') {
        // 通用船舶AIS数据解析器
        return [
          {
            title: '配置',
            valueType: 'group',
            columns: [
              {
                title: '服务地址',
                dataIndex: ['config', 'host'],
                required: true,
              },
              {
                title: '服务端口',
                dataIndex: ['config', 'port'],
                valueType: 'digit',
                required: true,
              },
            ],
          },
        ];
      } else if (type === 'GENERIC_PROTOCOL') {
        // 通用时间片中断串口协议
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
                        title: '通信形式',
                        dataIndex: 'transport',
                        valueType: 'select',
                        required: true,
                        valueEnum: transportEnum,
                      },
                      {
                        title: '重试次数',
                        dataIndex: 'retryTime',
                        valueType: 'digit',
                        required: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            valueType: 'dependency',
            name: ['config', 'commonConfig', 'transport'],
            columns: ({ config }: any) => {
              const transport = config?.commonConfig[0]?.transport;

              return [
                {
                  title: '串口配置',
                  valueType: 'group',
                  hideInForm: transport !== 'rawserial',
                  columns: [
                    {
                      title: '系统串口',
                      dataIndex: ['config', 'portUuid'],
                      valueType: 'portSelect',
                      required: true,
                    },
                  ],
                },
                {
                  title: 'TCP 配置',
                  valueType: 'group',
                  hideInForm: transport !== 'rawtcp',
                  columns: [
                    {
                      valueType: 'formList',
                      dataIndex: ['config', 'hostConfig'],
                      mode: 'single',
                      initialValue: {
                        port: 3399,
                        host: '127.0.0.1',
                        timeout: 3000,
                      },
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
            },
          },
        ];
      } else if (type === 'GENERIC_MODBUS') {
        // 通用 Modbus Master
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
                      },
                      {
                        title: '超时时间（毫秒）',
                        dataIndex: 'timeout',
                        valueType: 'digit',
                        required: true,
                      },
                      {
                        title: '工作模式',
                        dataIndex: 'mode',
                        valueType: 'select',
                        required: true,
                        valueEnum: modeEnum,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            valueType: 'dependency',
            name: ['config', 'commonConfig', 'mode'],
            columns: ({ config }: any) => {
              const deviceMode = config?.commonConfig[0]?.mode;

              return [
                {
                  title: '串口配置',
                  valueType: 'group',
                  hideInForm: deviceMode !== 'RTU',
                  columns: [
                    {
                      title: '系统串口',
                      dataIndex: ['config', 'portUuid'],
                      valueType: 'portSelect',
                      required: true,
                    },
                  ],
                },
                {
                  title: 'TCP 配置',
                  valueType: 'group',
                  hideInForm: deviceMode !== 'TCP',
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
                {
                  title: '寄存器配置',
                  valueType: 'group',
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
      } else {
        return [];
      }
    },
  },
];
