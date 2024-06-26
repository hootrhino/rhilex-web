import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const GRPC = [
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
