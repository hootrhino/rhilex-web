import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const NATS_SERVER = [
  {
    title: intl.formatMessage({ id: 'inend.table.title.host' }),
    dataIndex: ['config', 'host'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'form.title.port' }),
    dataIndex: ['config', 'port'],
    valueType: 'digit',
    required: true,
    render: (port: number) => port,
  },
  {
    title: intl.formatMessage({ id: 'inend.table.title.topic' }),
    dataIndex: ['config', 'topic'],
    required: true,
  },
];
