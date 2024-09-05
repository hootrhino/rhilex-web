import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';
import { OutendType, outendTypeOption } from '../enum';
import { HTTP } from './http';
import { MONGO_SINGLE } from './mongoDB';
import { MQTT } from './mqttBroker';
import { SEMTECH_UDP_FORWARDER } from './semtechUDP';
import { TDENGINE } from './tdengine';
import { GENERIC_UART_TARGET } from './uart';
import { UDP_TARGET } from './udp';

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
    valueEnum: outendTypeOption,
    required: true,
    ellipsis: true,
    renderText: (type: OutendType) => (type ? outendTypeOption[type] : '-'),
  },
  {
    title: intl.formatMessage({ id: 'table.title.status' }),
    dataIndex: 'state',
    hideInForm: true,
    renderText: (state: number) => <ProTag type={StatusType.DEVICE}>{state || 0}</ProTag>,
  },
  {
    title: intl.formatMessage({ id: 'table.title.desc' }),
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => description || '-',
  },
];

// TODO 暂时隐藏
// const dataModeConfig = [
//   {
//     title: intl.formatMessage({ id: 'outend.table.title.dataMode' }),
//     dataIndex: ['config', 'dataMode'],
//     valueEnum: dataModeOption,
//     valueType: 'select',
//     required: true,
//   },
// ];

export const configColumns = {
  [OutendType.MONGO_SINGLE]: MONGO_SINGLE,
  [OutendType.MQTT]: MQTT,
  [OutendType.UDP_TARGET]: UDP_TARGET,
  [OutendType.TCP_TRANSPORT]: [
    ...UDP_TARGET,
    //TODO 暂时隐藏 ...dataModeConfig,
  ],
  [OutendType.TDENGINE]: TDENGINE,
  [OutendType.HTTP]: HTTP,
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
          title: intl.formatMessage({ id: 'outend.title.source' }),
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
