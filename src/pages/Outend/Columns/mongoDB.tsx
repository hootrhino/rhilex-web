import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const MONGO_SINGLE = [
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
    title: 'MongoDB URL',
    dataIndex: ['config', 'mongoUrl'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.database' }),
    dataIndex: ['config', 'database'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.collection' }, { type: 'MongoDB' }),
    dataIndex: ['config', 'collection'],
    required: true,
  },
];
