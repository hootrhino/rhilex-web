import { getIntl, getLocale } from '@umijs/max';
import { DEFAULT_CONFIG } from './defaultConfig';

const intl = getIntl(getLocale());

export const NATS_SERVER = [
  // {
  //   title: intl.formatMessage({ id: 'inend.table.title.host' }),
  //   dataIndex: ['config', 'host'],
  //   required: true,
  // },
  // {
  //   title: intl.formatMessage({ id: 'form.title.port' }),
  //   dataIndex: ['config', 'port'],
  //   valueType: 'digit',
  //   required: true,
  //   render: (port: number) => port,
  // },
  ...DEFAULT_CONFIG,
  {
    title: intl.formatMessage({ id: 'inend.table.title.topic' }),
    dataIndex: ['config', 'topic'],
    required: true,
  },
];
