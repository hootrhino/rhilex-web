import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const SEMTECH_UDP_FORWARDER = [
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
    title: intl.formatMessage({ id: 'outend.table.title.mac' }),
    dataIndex: ['config', 'mac'],
    required: true,
  },
];
