export const columns = (id: string) => [
  {
    valueType: 'group',
    columns: [
      {
        title: 'APP 名称',
        dataIndex: 'name',
        required: true,
      },
      {
        title: 'APP 版本',
        dataIndex: 'version',
        required: true,
      },
      {
        title: '是否自启',
        dataIndex: 'autoStart',
        valueType: 'segmented',
        required: true,
      },
    ],
  },
  {
    valueType: 'group',
    columns: [
      {
        title: '脚本类型',
        dataIndex: 'type',
        valueType: 'select',
        required: true,
        tooltip: 'https://rulex.pages.dev/',
        valueEnum: {
          lua: 'LUA 脚本',
        },
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
    hideInForm: !id,
    columns: ({ type }: any) => {
      if (type !== 'lua') return [];
      return [
        {
          title: 'Lua 源码',
          dataIndex: 'luaSource',
          valueType: 'luaCode',
          required: true,
        },
      ];
    },
  },
];
