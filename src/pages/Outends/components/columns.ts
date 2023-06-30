export const columns = [
  {
    valueType: 'group',
    columns: [
      {
        title: '目标名称',
        dataIndex: 'name',
        required: true,
      },
      {
        title: '目标类型',
        dataIndex: 'type',
        valueType: 'select',
        required: true,
        valueEnum: {
          MONGO_SINGLE: 'MongoDB',
          MQTT: 'MQTT Broker',
          UDP_TARGET: 'UDP Server',
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
      if (type === 'MONGO_SINGLE') {
        return [
          {
            title: '目标配置',
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
                        title: 'MongoDB URL',
                        dataIndex: 'mongoUrl',
                        required: true,
                      },
                      {
                        title: 'MongoDB 数据库',
                        dataIndex: 'database',
                        required: true,
                      },
                      {
                        title: 'MongoDB 集合',
                        dataIndex: 'collection',
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
      if (type === 'MQTT') {
        return [
          {
            title: '目标配置',
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
                      {
                        title: '客户端ID',
                        dataIndex: 'clientId',
                        required: true,
                      },
                    ],
                  },
                  {
                    valueType: 'group',
                    columns: [
                      {
                        title: '连接账户',
                        dataIndex: 'username',
                        required: true,
                      },
                      {
                        title: '连接密码',
                        dataIndex: 'password',
                        valueType: 'password',
                        required: true,
                      },
                      {
                        title: '上报 TOPIC',
                        dataIndex: 'pubTopic',
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
      if (type === 'UDP_TARGET') {
        return [
          {
            title: '目标配置',
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

      return [];
    },
  },
];
