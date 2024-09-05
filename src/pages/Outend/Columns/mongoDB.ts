import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const MONGO_SINGLE = [
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
