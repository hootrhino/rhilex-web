import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const MQTT = [
  {
    title: intl.formatMessage({ id: 'outend.table.title.host' }),
    dataIndex: ['config', 'host'],
    required: true,
    copyable: true,
  },
  {
    title: intl.formatMessage({ id: 'form.title.port' }),
    dataIndex: ['config', 'port'],
    valueType: 'digit',
    required: true,
    render: (port: number) => port,
  },
  {
    title: intl.formatMessage({ id: 'form.title.clientId' }),
    dataIndex: ['config', 'clientId'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.pubTopic' }),
    dataIndex: ['config', 'pubTopic'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.username' }),
    dataIndex: ['config', 'username'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.password' }),
    dataIndex: ['config', 'password'],
    valueType: 'password',
    required: true,
  },
];
