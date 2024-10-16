import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';

const { formatMessage } = getIntl(getLocale());

export const TDENGINE = [
  {
    title: formatMessage({ id: 'outend.table.title.cacheOfflineData' }),
    dataIndex: ['config', 'commonConfig', 'cacheOfflineData'],
    required: true,
    renderFormItem: () => <ProSegmented width="md" />,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => (
      <ProTag type={StatusType.BOOL}>{commonConfig?.cacheOfflineData}</ProTag>
    ),
  },
  {
    title: 'FQDN',
    dataIndex: ['config', 'commonConfig', 'fqdn'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.fqdn,
  },
  {
    title: formatMessage({ id: 'form.title.port' }),
    dataIndex: ['config', 'commonConfig', 'port'],
    valueType: 'digit',
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.port,
  },
  {
    title: formatMessage({ id: 'form.title.username' }),
    dataIndex: ['config', 'commonConfig', 'username'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.username,
  },
  {
    title: formatMessage({ id: 'form.title.password' }),
    dataIndex: ['config', 'commonConfig', 'password'],
    valueType: 'password',
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.password,
  },
  {
    title: formatMessage({ id: 'outend.table.title.dbName' }),
    dataIndex: ['config', 'commonConfig', 'dbName'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.dbName,
  },
];
