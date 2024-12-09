import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';
import { OutendType, outendTypeOption } from '../enum';
import { GREPTIME_DATABASE } from './greptimeDB';
import { RHILEX_GRPC_TARGET } from './grpc';
import { HTTP } from './http';
import { MONGO_SINGLE } from './mongoDB';
import { MQTT } from './mqttBroker';
import { SEMTECH_UDP_FORWARDER } from './semtechUDP';
import { TDENGINE } from './tdengine';
import { GENERIC_UART_TARGET } from './uart';
import { UDP_TARGET } from './udp';

const { formatMessage } = getIntl(getLocale());

export const baseColumns = [
  {
    title: 'UUID',
    dataIndex: 'uuid',
    hideInForm: true,
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
    valueEnum: outendTypeOption,
    required: true,
    ellipsis: true,
    renderText: (type: OutendType) => (type ? outendTypeOption[type] : '-'),
  },
  {
    title: formatMessage({ id: 'table.title.status' }),
    dataIndex: 'state',
    hideInForm: true,
    renderText: (state: number) => <ProTag type={StatusType.DEVICE}>{state || 0}</ProTag>,
  },
  {
    title: formatMessage({ id: 'table.title.desc' }),
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => description || '-',
  },
];

export const configColumns = {
  [OutendType.MQTT]: MQTT,
  [OutendType.ITHINGS_IOT]: MQTT,
  [OutendType.UDP_TARGET]: UDP_TARGET,
  [OutendType.TCP_TRANSPORT]: UDP_TARGET,
  [OutendType.MONGO_SINGLE]: MONGO_SINGLE,
  [OutendType.GREPTIME_DATABASE]: GREPTIME_DATABASE,
  [OutendType.TDENGINE]: TDENGINE,
  [OutendType.HTTP]: HTTP,
  [OutendType.RHILEX_GRPC_TARGET]: RHILEX_GRPC_TARGET,
  [OutendType.GENERIC_UART_TARGET]: GENERIC_UART_TARGET,
  [OutendType.SEMTECH_UDP_FORWARDER]: SEMTECH_UDP_FORWARDER,
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
      if (!type) return [];

      return [
        {
          title: formatMessage({ id: 'outend.title.common' }),
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
