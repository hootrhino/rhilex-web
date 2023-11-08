// 资源类型
export const typeEnum = {
  MONGO_SINGLE: 'MongoDB',
  MQTT: 'MQTT Broker',
  UDP_TARGET: 'UDP Server',
};

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
        valueEnum: typeEnum,
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
                  hideInForm: type !== 'MONGO_SINGLE',
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
                {
                  valueType: 'group',
                  hideInForm: type !== 'MQTT',
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
                    {
                      title: '上报 TOPIC',
                      dataIndex: 'pubTopic',
                      required: true,
                    },
                  ],
                },
                {
                  valueType: 'group',
                  hideInForm: type !== 'MQTT',
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
                  ],
                },
                {
                  valueType: 'group',
                  hideInForm: type !== 'UDP_TARGET',
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
