import HeadersTitle from '@/components/HttpHeaders/Title';
import UnitTitle from '@/components/UnitTitle';
import { modeEnum, plcModelEnum, rackEnum, slotEnum, typeEnum } from './initialValue';

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
      if (!Object.keys(typeEnum).includes(type)) return [];

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
                      hideInForm: ![
                        'GENERIC_MODBUS',
                        'SIEMENS_PLC',
                        'GENERIC_HTTP_DEVICE',
                      ].includes(type),
                      transform: (value: string) => ({
                        autoRequest: value === 'true' ? true : false,
                      }),
                      convertValue: (value: boolean) => value?.toString(),
                    },
                    {
                      title: '是否解析 AIS 报文',
                      dataIndex: 'parseAis',
                      valueType: 'segmented',
                      required: true,
                      hideInForm: type !== 'GENERIC_AIS_RECEIVER',
                      transform: (value: string) => ({ parseAis: value === 'true' ? true : false }),
                      convertValue: (value: boolean) => value?.toString(),
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
                      hideInForm: ['SIEMENS_PLC', 'GENERIC_HTTP_DEVICE'].includes(type),
                    },
                    {
                      title: 'PLC 地址',
                      dataIndex: 'host',
                      required: true,
                      hideInForm: type !== 'SIEMENS_PLC',
                    },
                    {
                      title: '型号',
                      dataIndex: 'model',
                      required: true,
                      valueType: 'select',
                      valueEnum: plcModelEnum,
                      hideInForm: type !== 'SIEMENS_PLC',
                    },
                    {
                      title: <UnitTitle title="连接超时时间" />,
                      dataIndex: 'timeout',
                      valueType: 'digit',
                      required: true,
                      hideInForm: !['SIEMENS_PLC', 'GENERIC_HTTP_DEVICE'].includes(type),
                    },
                    {
                      title: <UnitTitle title="采集频率" />,
                      dataIndex: 'frequency',
                      valueType: 'digit',
                      required: true,
                      hideInForm: !['GENERIC_HTTP_DEVICE'].includes(type),
                    },
                  ],
                },
                {
                  valueType: 'group',
                  hideInForm: type !== 'SIEMENS_PLC',
                  columns: [
                    {
                      title: <UnitTitle title="心跳超时时间" />,
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
                    },
                    {
                      title: '插槽号',
                      dataIndex: 'slot',
                      required: true,
                      valueType: 'select',
                      valueEnum: slotEnum,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: 'HTTP 配置',
          valueType: 'group',
          hideInForm: type !== 'GENERIC_HTTP_DEVICE',
          columns: [
            {
              valueType: 'formList',
              dataIndex: ['config', 'httpConfig'],
              mode: 'single',
              columns: [
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: '请求地址',
                      dataIndex: 'url',
                      required: true,
                    },
                  ],
                },
                {
                  valueType: 'formList',
                  dataIndex: 'headers',
                  title: <HeadersTitle />,
                  columns: [
                    {
                      valueType: 'group',
                      columns: [
                        {
                          title: 'key',
                          dataIndex: 'k',
                        },
                        {
                          title: 'value',
                          dataIndex: 'v',
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
                            title: <UnitTitle title="超时时间" />,
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
      ];
    },
  },
];
