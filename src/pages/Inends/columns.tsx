import StateTag from '@/components/StateTag';
import { validateName } from '@/utils/regExp';
import { eventEnum, modeEnum, qosEnum, typeEnum } from './enum';

export const defaultConfig = {
  COAP: {
    port: 2582,
    host: '127.0.0.1',
  },
  RULEX_UDP: {
    port: 2583,
    host: '127.0.0.1',
  },
  HTTP: {
    port: 2584,
    host: '127.0.0.1',
  },
  NATS_SERVER: {
    port: 4222,
    host: '127.0.0.1',
  },
  GRPC: {
    port: 2585,
    host: '127.0.0.1',
  },
  INTERNAL_EVENT: {
    type: 'ALL',
  },
  GENERIC_IOT_HUB: {
    host: '127.0.0.1',
    port: 1883,
    mode: 'DC',
  },
  GENERIC_MQTT: {
    host: '127.0.0.1',
    port: 1883,
    username: 'rhino',
    password: 'rhino',
    qos: 1,
    subTopics: [{ k: '/device/rulex-eekit1' }],
  },
};

export const baseColumns = [
  {
    title: 'UUID',
    dataIndex: 'uuid',
    hideInForm: true,
    hideInDescriptions: true,
    ellipsis: true,
    copyable: true,
  },
  {
    title: '资源名称',
    dataIndex: 'name',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '名称不能为空',
        },
        {
          validator: (_, value) => {
            if (!value || validateName(value)) {
              return Promise.resolve();
            }
            return Promise.reject('名称仅支持字母、数字或下划线，长度在 6-14 个字符之间');
          },
        },
      ],
    },
  },
  {
    title: '资源类型',
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: typeEnum,
    required: true,
  },
  {
    title: '资源状态',
    dataIndex: 'state',
    hideInForm: true,
    renderText: (state: number) => <StateTag state={state} />,
  },
  {
    title: '备注',
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => description || '-',
  },
];

const defaultConfigColumns = [
  {
    title: '服务地址',
    dataIndex: ['config', 'host'],
    required: true,
  },
  {
    title: '端口',
    dataIndex: ['config', 'port'],
    required: true,
  },
];

const defaultGenericColumns = [
  ...defaultConfigColumns,
  {
    title: '客户端 ID',
    dataIndex: ['config', 'clientId'],
    required: true,
  },
  {
    title: '用户名称',
    dataIndex: ['config', 'username'],
    required: true,
  },
  {
    title: '用户密码',
    dataIndex: ['config', 'password'],
    valueType: 'password',
    required: true,
  },
];

export const configColumns = {
  COAP: defaultConfigColumns,
  GENERIC_IOT_HUB: [
    ...defaultGenericColumns,
    {
      title: '模式',
      dataIndex: ['config', 'mode'],
      valueType: 'select',
      valueEnum: modeEnum,
      required: true,
    },
    {
      title: '设备名称',
      dataIndex: ['config', 'deviceName'],
      required: true,
    },
    {
      title: '产品 ID',
      dataIndex: ['config', 'productId'],
      copyable: true,
      required: true,
    },
  ],
  RULEX_UDP: defaultConfigColumns,
  HTTP: defaultConfigColumns,
  NATS_SERVER: [
    ...defaultConfigColumns,
    {
      title: '主题',
      dataIndex: ['config', 'topic'],
      required: true,
    },
  ],
  GRPC: defaultConfigColumns,
  INTERNAL_EVENT: [
    {
      title: '事件类型',
      dataIndex: ['config', 'type'],
      valueType: 'select',
      required: true,
      valueEnum: eventEnum,
    },
  ],
  GENERIC_MQTT: [
    ...defaultGenericColumns,
    {
      title: '数据质量',
      dataIndex: ['config', 'qos'],
      valueType: 'select',
      required: true,
      valueEnum: qosEnum,
      // renderText: record =>
    },
    {
      valueType: 'formList',
      dataIndex: ['config', 'subTopics'],
      title: '订阅 topic 表',
      fieldProps: {
        required: true,
        min: 1,
      },
      columns: [
        {
          valueType: 'group',
          columns: [
            {
              title: '',
              dataIndex: 'k',
              fieldProps: {
                placeholder: '请输入订阅 tipic',
              },
              formItemProps: {
                rules: [
                  {
                    required: true,
                    validator: async (_: any, value: string) => {
                      if (value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('订阅 topic 表至少要有一项！');
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
      renderText: (record: string[]) => record.join(','),
    },
  ],
};

export const columns = [
  {
    valueType: 'group',
    columns: baseColumns,
  },
  {
    valueType: 'dependency',
    name: ['type'],
    columns: ({ type }: any) => {
      return [
        {
          title: '资源配置',
          valueType: 'group',
          columns: [
            {
              valueType: 'group',
              columns: configColumns[type],
            },
          ],
        },
      ];
    },
  },
];
