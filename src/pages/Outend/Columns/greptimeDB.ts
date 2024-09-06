import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const GREPTIME_DATABASE = [
  {
    title: intl.formatMessage({ id: 'outend.table.title.gwsn' }),
    dataIndex: ['config', 'gwsn'],
    required: true,
  },
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
  {
    title: intl.formatMessage({ id: 'outend.table.title.dbName' }),
    dataIndex: ['config', 'database'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.tableName' }),
    dataIndex: ['config', 'table'],
    required: true,
  },
];
