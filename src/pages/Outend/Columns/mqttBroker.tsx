import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const MQTT = [
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
    title: intl.formatMessage({ id: 'form.title.clientId' }),
    dataIndex: ['config', 'commonConfig', 'clientId'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.clientId,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.pubTopic' }),
    dataIndex: ['config', 'commonConfig', 'pubTopic'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.pubTopic,
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
];
