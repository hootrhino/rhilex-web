import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const SEMTECH_UDP_FORWARDER = [
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
    title: intl.formatMessage({ id: 'outend.table.title.mac' }),
    dataIndex: ['config', 'commonConfig', 'mac'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.mac,
  },
];
