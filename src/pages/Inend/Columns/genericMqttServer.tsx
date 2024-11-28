import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';

const { formatMessage } = getIntl(getLocale());

export const GENERIC_MQTT_SERVER = [
  {
    title: formatMessage({ id: 'inend.table.title.anonymous' }),
    dataIndex: ['config', 'anonymous'],
    required: true,
    convertValue: (value: boolean) => value?.toString(),
    transform: (value: string) => ({ config: { anonymous: value === 'true' ? true : false } }),
    renderFormItem: () => <ProSegmented />,
    renderText: (anonymous: boolean) => <ProTag type={StatusType.BOOL}>{anonymous}</ProTag>,
  },
  {
    title: formatMessage({ id: 'inend.table.title.serverName' }),
    dataIndex: ['config', 'serverName'],
    required: true,
  },
  {
    title: formatMessage({ id: 'inend.table.title.listenHost' }),
    dataIndex: ['config', 'host'],
    required: true,
  },
  {
    title: formatMessage({ id: 'inend.table.title.listenPort' }),
    dataIndex: ['config', 'port'],
    valueType: 'digit',
    required: true,
    render: (port: number) => port,
  },
];
