import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';
import { InendType, inendTypeOption } from '../enum';
import { CoAP } from './coap';
import { COMTC_EVENT_FORWARDAR } from './comtcEventForwardar';
import { GENERIC_IOT_HUB } from './genericIothub';
import { GENERIC_MQTT } from './genericMqtt';
import { GENERIC_MQTT_SERVER } from './genericMqttServer';
import { GRPC } from './grpc';
import { HTTP } from './http';
import { INTERNAL_EVENT } from './internalEvent';
import { NATS_SERVER } from './natsServer';
import { RULEX_UDP } from './rulexUdp';

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

/**
 * 类型配置
 */
export const typeConfigColumns = {
  [InendType.COAP]: CoAP,
  [InendType.GENERIC_IOT_HUB]: GENERIC_IOT_HUB,
  [InendType.RULEX_UDP]: RULEX_UDP,
  [InendType.HTTP]: HTTP,
  [InendType.NATS_SERVER]: NATS_SERVER,
  [InendType.GRPC]: GRPC,
  [InendType.INTERNAL_EVENT]: INTERNAL_EVENT,
  [InendType.GENERIC_MQTT]: GENERIC_MQTT,
  [InendType.GENERIC_MQTT_SERVER]: GENERIC_MQTT_SERVER,
  [InendType.COMTC_EVENT_FORWARDAR]: COMTC_EVENT_FORWARDAR,
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
