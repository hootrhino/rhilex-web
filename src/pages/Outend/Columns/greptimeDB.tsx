import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const GREPTIME_DATABASE = [
  {
    title: intl.formatMessage({ id: 'outend.table.title.cacheOfflineData' }),
    dataIndex: ['config', 'commonConfig', 'cacheOfflineData'],
    required: true,
    renderFormItem: () => <ProSegmented width="md" />,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => (
      <ProTag type={StatusType.BOOL}>{commonConfig?.cacheOfflineData}</ProTag>
    ),
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.gwsn' }),
    dataIndex: ['config', 'commonConfig', 'gwsn'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.gwsn,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.host' }),
    dataIndex: ['config', 'commonConfig', 'host'],
    required: true,
    copyable: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.host,
  },
  {
    title: intl.formatMessage({ id: 'form.title.port' }),
    dataIndex: ['config', 'commonConfig', 'port'],
    valueType: 'digit',
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.port,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.username' }),
    dataIndex: ['config', 'commonConfig', 'username'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.username,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.password' }),
    dataIndex: ['config', 'commonConfig', 'password'],
    valueType: 'password',
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.password,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.dbName' }),
    dataIndex: ['config', 'commonConfig', 'database'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.database,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.tableName' }),
    dataIndex: ['config', 'commonConfig', 'table'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.table,
  },
];
