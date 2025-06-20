import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';

const { formatMessage } = getIntl(getLocale());

export const MONGO_SINGLE = [
  {
    title: formatMessage({ id: 'outend.table.title.cacheOfflineData' }),
    dataIndex: ['config', 'commonConfig', 'cacheOfflineData'],
    required: true,
    renderFormItem: () => <ProSegmented />,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => (
      <ProTag type={StatusType.BOOL}>{commonConfig?.cacheOfflineData}</ProTag>
    ),
  },
  {
    title: 'MongoDB URL',
    dataIndex: ['config', 'commonConfig', 'mongoUrl'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.mongoUrl,
  },
  {
    title: formatMessage({ id: 'outend.table.title.database' }),
    dataIndex: ['config', 'commonConfig', 'database'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.database,
  },
  {
    title: formatMessage({ id: 'outend.table.title.collection' }, { type: 'MongoDB' }),
    dataIndex: ['config', 'commonConfig', 'collection'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.collection,
  },
];
