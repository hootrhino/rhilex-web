import {
  blockTypeEnum,
  defaultBlocksConfig,
  defaultRegistersConfig,
  funcEnum,
  modeEnum,
  plcModelEnum,
  rackEnum,
  slotEnum,
  typeEnum,
} from './initialValue';

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
      if (
        !['GENERIC_AIS_RECEIVER', 'GENERIC_PROTOCOL', 'GENERIC_MODBUS', 'S1200PLC'].includes(type)
      )
        return [];

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
                      title: '重试次数',
                      dataIndex: 'retryTime',
                      valueType: 'digit',
                      required: true,
                      hideInForm: type !== 'GENERIC_PROTOCOL',
                    },
                    {
                      title: '是否启动轮询',
                      dataIndex: 'autoRequest',
                      valueType: 'segmented',
                      required: true,
                      hideInForm: !['GENERIC_MODBUS', 'S1200PLC'].includes(type),
                    },
                    {
                      title: '是否解析 AIS 报文',
                      dataIndex: 'parseAis',
                      valueType: 'segmented',
                      required: true,
                      hideInForm: type !== 'GENERIC_AIS_RECEIVER',
                    },
                    {
                      title: '主机序列号',
                      dataIndex: 'gwsn',
                      required: true,
                      hideInForm: type !== 'GENERIC_AIS_RECEIVER',
                    },
                    {
                      title: '工作模式',
                      dataIndex: 'mode',
                      valueType: 'select',
                      required: true,
                      valueEnum: modeEnum,
                      hideInForm: type === 'S1200PLC',
                    },
                    {
                      title: 'PLC 地址',
                      dataIndex: 'host',
                      required: true,
                      hideInForm: type !== 'S1200PLC',
                    },
                    {
                      title: '型号',
                      dataIndex: 'model',
                      required: true,
                      valueType: 'select',
                      valueEnum: plcModelEnum,
                      hideInForm: type !== 'S1200PLC',
                    },
                    {
                      title: '连接超时时间（毫秒）',
                      dataIndex: 'timeout',
                      valueType: 'digit',
                      required: true,
                      hideInForm: type !== 'S1200PLC',
                    },
                  ],
                },
                {
                  valueType: 'dependency',
                  name: ['model'],
                  hideInForm: type !== 'S1200PLC',
                  columns: ({ model }: { model: string }) => {
                    return [
                      {
                        valueType: 'group',
                        columns: [
                          {
                            title: '心跳超时时间（毫秒）',
                            dataIndex: 'idleTimeout',
                            valueType: 'digit',
                            required: true,
                          },
                          {
                            title: '机架号',
                            dataIndex: 'rack',
                            required: true,
                            valueType: 'select',
                            valueEnum: rackEnum,
                            hideInForm: model === 'S7200',
                          },
                          {
                            title: '插槽号',
                            dataIndex: 'slot',
                            required: true,
                            valueType: 'select',
                            valueEnum: slotEnum,
                            hideInForm: model === 'S7200',
                          },
                        ],
                      },
                    ];
                  },
                },
              ],
            },
          ],
        },
        {
          valueType: 'dependency',
          name: ['config', 'commonConfig'],
          columns: ({ config }: any) => {
            const deviceMode = config?.commonConfig[0]?.mode;

            return [
              {
                title: '串口配置',
                valueType: 'group',
                hideInForm: deviceMode !== 'UART',
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
                            title: '端口',
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
        {
          title: '寄存器配置',
          valueType: 'group',
          hideInForm: type !== 'GENERIC_MODBUS',
          columns: [
            {
              valueType: 'formList',
              dataIndex: ['config', 'registers'],
              mode: 'multiple',
              initialValue: defaultRegistersConfig[0],
              columns: [
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: '数据标签',
                      dataIndex: 'tag',
                      width: 'sm',
                      required: true,
                    },
                    {
                      title: '数据别名',
                      dataIndex: 'alias',
                      width: 'sm',
                      required: true,
                    },
                    {
                      title: 'Modbus 功能',
                      dataIndex: 'function',
                      valueType: 'select',
                      width: 'sm',
                      required: true,
                      valueEnum: funcEnum,
                    },
                    {
                      title: '采集频率（毫秒）',
                      dataIndex: 'frequency',
                      valueType: 'digit',
                      width: 'sm',
                      required: true,
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
        {
          title: '点位列表',
          valueType: 'group',
          hideInForm: type !== 'S1200PLC',
          columns: [
            {
              valueType: 'formList',
              dataIndex: ['config', 'blocks'],
              mode: 'multiple',
              initialValue: defaultBlocksConfig[0],
              columns: [
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: '数据标签',
                      dataIndex: 'tag',
                      width: 'sm',
                      required: true,
                    },
                    {
                      title: '块类型',
                      dataIndex: 'type',
                      width: 'sm',
                      required: true,
                      valueType: 'select',
                      valueEnum: blockTypeEnum,
                    },
                    {
                      title: '采集频率（毫秒）',
                      dataIndex: 'frequency',
                      valueType: 'digit',
                      width: 'sm',
                      required: true,
                    },
                    {
                      valueType: 'dependency',
                      name: ['type'],
                      columns: ({ type }: { type: string }) => {
                        return [
                          {
                            title: '块地址',
                            dataIndex: 'address',
                            valueType: 'digit',
                            width: 'sm',
                            required: true,
                            hideInForm: type === 'MB',
                          },
                        ];
                      },
                    },
                    {
                      title: '起始地址',
                      dataIndex: 'start',
                      valueType: 'digit',
                      width: 'sm',
                      required: true,
                    },
                    {
                      title: '采集长度（字节）',
                      dataIndex: 'size',
                      valueType: 'digit',
                      width: 'sm',
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
