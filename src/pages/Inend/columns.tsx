import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';
import {
  EventType,
  eventTypeOption,
  InendType,
  inendTypeOption,
  Mode,
  modeOption,
  QoSLevel,
  qosOption,
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
    qos: QoSLevel.LEVEL1,
    subTopics: [{ k: '/device/rulex-rhilex1' }],
  },
};

const intl = getIntl(getLocale());

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
    title: intl.formatMessage({ id: 'inend.table.title.name' }),
    dataIndex: 'name',
    ellipsis: true,
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'inend.table.title.type' }),
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: inendTypeOption,
    required: true,
    ellipsis: true,
  },
  {
    title: intl.formatMessage({ id: 'inend.table.title.state' }),
    dataIndex: 'state',
    hideInForm: true,
    renderText: (state: number) => <ProTag type={StatusType.DEVICE}>{state}</ProTag>,
  },
  {
    title: intl.formatMessage({ id: 'table.desc' }),
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => description || '-',
  },
];

const defaultConfigColumns = [
  {
    title: intl.formatMessage({ id: 'inend.table.title.host' }),
    dataIndex: ['config', 'host'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'inend.table.title.port' }),
    dataIndex: ['config', 'port'],
    valueType: 'digit',
    required: true,
    render: (port: number) => port,
  },
];

const defaultGenericColumns = [
  ...defaultConfigColumns,
  {
    title: intl.formatMessage({ id: 'inend.table.title.clientId' }),
    dataIndex: ['config', 'clientId'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'inend.table.title.username' }),
    dataIndex: ['config', 'username'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'inend.table.title.password' }),
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
      title: intl.formatMessage({ id: 'inend.table.title.mode' }),
      dataIndex: ['config', 'mode'],
      valueType: 'select',
      valueEnum: modeOption,
      required: true,
    },
    {
      title: intl.formatMessage({ id: 'inend.table.title.deviceName' }),
      dataIndex: ['config', 'deviceName'],
      required: true,
    },
    {
      title: intl.formatMessage({ id: 'inend.table.title.productId' }),
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
      title: intl.formatMessage({ id: 'inend.table.title.topic' }),
      dataIndex: ['config', 'topic'],
      required: true,
    },
  ],
  [InendType.GRPC]: defaultConfigColumns,
  [InendType.INTERNAL_EVENT]: [
    {
      title: intl.formatMessage({ id: 'inend.table.title.eventType' }),
      dataIndex: ['config', 'type'],
      valueType: 'select',
      required: true,
      valueEnum: eventTypeOption,
    },
  ],
  [InendType.GENERIC_MQTT]: [
    ...defaultGenericColumns,
    {
      title: intl.formatMessage({ id: 'inend.table.title.qos' }),
      dataIndex: ['config', 'qos'],
      valueType: 'select',
      required: true,
      fieldProps: {
        options: qosOption,
      },
    },
    {
      valueType: 'formList',
      dataIndex: ['config', 'subTopics'],
      title: intl.formatMessage({ id: 'inend.table.title.subTopics' }),
      fieldProps: {
        required: true,
        min: 1,
        creatorButtonProps: {
          creatorButtonText: intl.formatMessage({ id: 'button.list' }, { item: 'Topic' }),
        },
      },
      columns: [
        {
          valueType: 'group',
          columns: [
            {
              title: '',
              dataIndex: 'k',
              fieldProps: {
                placeholder: intl.formatMessage({ id: 'inend.table.placeholder.subTopics' }),
              },
              formItemProps: {
                rules: [
                  {
                    required: true,
                    validator: async (_: any, value: string) => {
                      if (value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        intl.formatMessage({ id: 'inend.table.rules.subTopics' }),
                      );
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
          title: intl.formatMessage({ id: 'inend.title.group' }),
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
