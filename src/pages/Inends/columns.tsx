import StateTag from '@/components/StateTag';
import { eventEnum, modeEnum, typeEnum } from './enum';

export const defaultConfig = {
  COAP: [
    {
      port: 2582,
      host: '127.0.0.1',
    },
  ],
  RULEX_UDP: [
    {
      port: 2583,
      host: '127.0.0.1',
    },
  ],
  HTTP: [
    {
      port: 2584,
      host: '127.0.0.1',
    },
  ],
  NATS_SERVER: [
    {
      port: 4222,
      host: '127.0.0.1',
    },
  ],
  GRPC: [
    {
      port: 2585,
      host: '127.0.0.1',
    },
  ],
  INTERNAL_EVENT: [
    {
      type: 'ALL',
    },
  ],
  GENERIC_IOT_HUB: [
    {
      host: '127.0.0.1',
      port: 1883,
      mode: 'DC',
    },
  ],
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
    renderText: (description: string) => description || '-'
  },
];

const defaultConfigColumns = [
  {
    title: '服务地址',
    dataIndex: 'host',
    required: true,
  },
  {
    title: '端口',
    dataIndex: 'port',
    required: true,
  },
];

export const configColumns = {
  COAP: defaultConfigColumns,
  GENERIC_IOT_HUB: [
    ...defaultConfigColumns,
    {
      title: '模式',
      dataIndex: 'mode',
      valueType: 'select',
      valueEnum: modeEnum,
      required: true,
    },
    {
      title: '产品 ID',
      dataIndex: 'productId',
      copyable: true,
      required: true,
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      required: true,
    },
    {
      title: '客户端 ID',
      dataIndex: 'clientId',
      required: true,
    },
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
  RULEX_UDP: defaultConfigColumns,
  HTTP: defaultConfigColumns,
  NATS_SERVER: [
    ...defaultConfigColumns,
    {
      title: '主题',
      dataIndex: 'topic',
      required: true,
    },
  ],
  GRPC: defaultConfigColumns,
  INTERNAL_EVENT: [
    {
      title: '事件类型',
      dataIndex: 'type',
      valueType: 'select',
      required: true,
      valueEnum: eventEnum,
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
              valueType: 'formList',
              dataIndex: 'config',
              mode: 'single',
              columns: [
                {
                  valueType: 'group',
                  columns: configColumns[type],
                },
              ],
            },
          ],
        },
      ];
    },
  },
];
