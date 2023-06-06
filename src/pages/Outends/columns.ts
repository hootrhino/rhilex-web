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

      return [];
    },
  },
];
