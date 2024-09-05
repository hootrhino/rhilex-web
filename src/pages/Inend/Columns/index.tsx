import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';
import { InendType, inendTypeOption } from '../enum';
import { COMTC_EVENT_FORWARDER } from './comtcEventForwardar';
// import { GENERIC_IOT_HUB } from './genericIothub';
// import { GENERIC_MQTT } from './genericMqtt';
import { GENERIC_MQTT_SERVER } from './genericMqttServer';
import { INTERNAL_EVENT } from './internalEvent';
// import { NATS_SERVER } from './natsServer';
import { DEFAULT_CONFIG } from './defaultConfig';

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
    title: intl.formatMessage({ id: 'table.title.name' }),
    dataIndex: 'name',
    ellipsis: true,
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'table.title.type' }),
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: inendTypeOption,
    required: true,
    ellipsis: true,
    renderText: (record: InendType) => (record ? inendTypeOption[record] : '-'),
  },
  {
    title: intl.formatMessage({ id: 'table.title.status' }),
    dataIndex: 'state',
    hideInForm: true,
    renderText: (state: number) => <ProTag type={StatusType.DEVICE}>{state}</ProTag>,
  },
  {
    title: intl.formatMessage({ id: 'table.title.desc' }),
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => description || '-',
  },
];

/**
 * 类型配置
 */
export const typeConfigColumns = {
  [InendType.COAP]: DEFAULT_CONFIG,
  [InendType.UDP_SERVER]: DEFAULT_CONFIG,
  [InendType.TCP_SERVER]: DEFAULT_CONFIG,
  [InendType.HTTP]: DEFAULT_CONFIG,
  [InendType.GRPC]: DEFAULT_CONFIG,
  [InendType.INTERNAL_EVENT]: INTERNAL_EVENT,
  // TODO [InendType.GENERIC_IOT_HUB]: GENERIC_IOT_HUB,
  // TODO [InendType.NATS_SERVER]: NATS_SERVER,
  // TODO [InendType.GENERIC_MQTT]: GENERIC_MQTT,
  [InendType.GENERIC_MQTT_SERVER]: GENERIC_MQTT_SERVER,
  [InendType.COMTC_EVENT_FORWARDER]: COMTC_EVENT_FORWARDER,
};

export const columns = [
  {
    valueType: 'group',
    columns: baseColumns,
  },
  {
    valueType: 'dependency',
    name: ['type'],
    columns: ({ type }: any) => [
      {
        title: intl.formatMessage({ id: 'inend.title.group' }),
        valueType: 'group',
        columns: [
          {
            valueType: 'group',
            columns: typeConfigColumns[type],
          },
        ],
      },
    ],
  },
];
