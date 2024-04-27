import StateTag from '@/components/StateTag';
import {
  EventType,
  eventTypeOption,
  InendType,
  inendTypeOption,
  Mode,
  modeOption,
  qosEnum,
} from './enum';

const DEFAULT_HOST = '127.0.0.1';

export const defaultConfig = {
  [InendType.COAP]: {
    port: 2582,
    host: DEFAULT_HOST,
  },
  [InendType.RULEX_UDP]: {
    port: 2583,
    host: DEFAULT_HOST,
  },
  [InendType.HTTP]: {
    port: 2584,
    host: DEFAULT_HOST,
  },
  [InendType.NATS_SERVER]: {
    port: 4222,
    host: DEFAULT_HOST,
  },
  [InendType.GRPC]: {
    port: 2585,
    host: DEFAULT_HOST,
  },
  [InendType.INTERNAL_EVENT]: {
    type: EventType.ALL,
  },
  [InendType.GENERIC_IOT_HUB]: {
    host: DEFAULT_HOST,
    port: 1883,
    mode: Mode.DC,
  },
  [InendType.GENERIC_MQTT]: {
    host: DEFAULT_HOST,
    port: 1883,
    username: 'rhilex',
    password: 'rhilex',
    qos: 1,
    subTopics: [{ k: '/device/rulex-rhilex1' }],
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
    required: true,
  },
  {
    title: '资源类型',
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: inendTypeOption,
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
    valueType: 'digit',
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
  [InendType.COAP]: defaultConfigColumns,
  [InendType.GENERIC_IOT_HUB]: [
    ...defaultGenericColumns,
    {
      title: '模式',
      dataIndex: ['config', 'mode'],
      valueType: 'select',
      valueEnum: modeOption,
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
  [InendType.RULEX_UDP]: defaultConfigColumns,
  [InendType.HTTP]: defaultConfigColumns,
  [InendType.NATS_SERVER]: [
    ...defaultConfigColumns,
    {
      title: '主题',
      dataIndex: ['config', 'topic'],
      required: true,
    },
  ],
  [InendType.GRPC]: defaultConfigColumns,
  [InendType.INTERNAL_EVENT]: [
    {
      title: '事件类型',
      dataIndex: ['config', 'type'],
      valueType: 'select',
      required: true,
      valueEnum: eventTypeOption,
    },
  ],
  [InendType.GENERIC_MQTT]: [
    ...defaultGenericColumns,
    {
      title: '数据质量',
      dataIndex: ['config', 'qos'],
      valueType: 'select',
      required: true,
      valueEnum: qosEnum,
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
                      return Promise.reject('订阅 topic 表至少要有一项');
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
