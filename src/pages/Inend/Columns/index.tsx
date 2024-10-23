import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';
import { InendType, inendTypeOption } from '../enum';
import { COMTC_EVENT_FORWARDER } from './comtcEventForwardar';
import { CUSTOM_PROTOCOL_SERVER } from './customProtocol';
import { DEFAULT_CONFIG } from './defaultConfig';
import { GENERIC_MQTT_SERVER } from './genericMqttServer';
import { INTERNAL_EVENT } from './internalEvent';

const { formatMessage } = getIntl(getLocale());

/**
 * 类型配置
 */
export const typeConfigColumns = {
  [InendType.COAP_SERVER]: DEFAULT_CONFIG,
  [InendType.UDP_SERVER]: DEFAULT_CONFIG,
  [InendType.TCP_SERVER]: DEFAULT_CONFIG,
  [InendType.HTTP_SERVER]: DEFAULT_CONFIG,
  [InendType.GRPC_SERVER]: DEFAULT_CONFIG,
  [InendType.INTERNAL_EVENT]: INTERNAL_EVENT,
  [InendType.GENERIC_MQTT_SERVER]: GENERIC_MQTT_SERVER,
  [InendType.COMTC_EVENT_FORWARDER]: COMTC_EVENT_FORWARDER,
  [InendType.CUSTOM_PROTOCOL_SERVER]: CUSTOM_PROTOCOL_SERVER,
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
    title: formatMessage({ id: 'table.title.name' }),
    dataIndex: 'name',
    ellipsis: true,
    required: true,
  },
  {
    title: formatMessage({ id: 'table.title.type' }),
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: inendTypeOption,
    required: true,
    ellipsis: true,
    renderText: (record: InendType) => (record ? inendTypeOption[record] : '-'),
  },
  {
    title: formatMessage({ id: 'table.title.status' }),
    dataIndex: 'state',
    hideInForm: true,
    renderText: (state: number) => <ProTag type={StatusType.DEVICE}>{state}</ProTag>,
  },
  {
    title: formatMessage({ id: 'table.title.desc' }),
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => description || '-',
  },
];

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
        title: formatMessage({ id: 'inend.title.group' }),
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
