export const columns = [
  {
    valueType: 'group',
    columns: [
      {
        title: '资源名称',
        dataIndex: 'name',
        required: true,
      },
      {
        title: '资源类型',
        dataIndex: 'type',
        valueType: 'select',
        required: true,
        valueEnum: {
          COAP: 'COAP 协议支持',
          GENERIC_IOT_HUB: 'IoTHUB 平台支持',
          RULEX_UDP: 'UUDP 协议支持',
          HTTP: 'HTTP 协议支持',
          NATS_SERVER: 'Nats 中间件支持',
          GRPC: 'GRPC 协议支持',
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
      if (type === 'GENERIC_IOT_HUB') {
        return [
          {
            title: '资源配置',
            valueType: 'group',
            columns: [
              {
                valueType: 'formList',
                dataIndex: ['config'],
                mode: 'single',
                columns: [
                  {
                    valueType: 'group',
                    columns: [
                      {
                        title: '主机地址',
                        dataIndex: 'host',
                        required: true,
                      },
                      {
                        title: '服务端口',
                        dataIndex: 'port',
                        valueType: 'digit',
                        required: true,
                      },
                      {
                        title: '模式',
                        dataIndex: 'mode',
                        valueType: 'select',
                        required: true,
                        valueEnum: {
                          GW: '网关',
                          DC: '直连',
                        },
                      },
                    ],
                  },
                  {
                    valueType: 'group',
                    columns: [
                      {
                        title: '产品 ID',
                        dataIndex: 'productId',
                        required: true,
                      },
                      {
                        title: '设备名',
                        dataIndex: 'deviceName',
                        required: true,
                      },
                      {
                        title: '客户端 ID',
                        dataIndex: 'clientId',
                        required: true,
                      },
                    ],
                  },
                  {
                    valueType: 'group',
                    columns: [
                      {
                        title: '用户名称',
                        dataIndex: 'username',
                        required: true,
                      },
                      {
                        title: '用户密码',
                        dataIndex: 'password',
                        valueType: 'password',
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

      return [
        {
          title: '资源配置',
          valueType: 'group',
          columns: [
            {
              valueType: 'formList',
              dataIndex: ['config'],
              mode: 'single',
              columns: [
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: '主机地址',
                      dataIndex: 'host',
                      required: true,
                    },
                    {
                      title: '服务端口',
                      dataIndex: 'port',
                      valueType: 'digit',
                      required: true,
                    },
                    {
                      title: '主题',
                      dataIndex: 'topic',
                      required: true,
                      hideInForm: type !== 'NATS_SERVER',
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
