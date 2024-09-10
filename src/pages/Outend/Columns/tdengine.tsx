import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const TDENGINE = [
  {
    title: intl.formatMessage({ id: 'outend.table.title.cacheOfflineData' }),
    dataIndex: ['config', 'cacheOfflineData'],
    required: true,
    renderFormItem: () => <ProSegmented width="md" />,
    renderText: (cacheOfflineData: boolean) => (
      <ProTag type={StatusType.BOOL}>{cacheOfflineData}</ProTag>
    ),
  },
  {
    title: 'FQDN',
    dataIndex: ['config', 'fqdn'],
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
    title: intl.formatMessage({ id: 'form.title.username' }),
    dataIndex: ['config', 'username'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'form.title.password' }),
    dataIndex: ['config', 'password'],
    valueType: 'password',
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.dbName' }),
    dataIndex: ['config', 'dbName'],
    required: true,
  },
];
