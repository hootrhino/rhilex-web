import { getIntl, getLocale } from '@umijs/max';
import { modeOption } from '../enum';

const intl = getIntl(getLocale());

export const GENERIC_IOT_HUB = [
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
  {
    title: intl.formatMessage({ id: 'inend.table.title.clientId' }),
    dataIndex: ['config', 'clientId'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'inend.table.title.username' }),
    dataIndex: ['config', 'username'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'inend.table.title.password' }),
    dataIndex: ['config', 'password'],
    valueType: 'password',
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'inend.table.title.mode' }),
    dataIndex: ['config', 'mode'],
    valueType: 'select',
    valueEnum: modeOption,
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'inend.table.title.deviceName' }),
    dataIndex: ['config', 'deviceName'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'inend.table.title.productId' }),
    dataIndex: ['config', 'productId'],
    copyable: true,
    required: true,
  },
];
