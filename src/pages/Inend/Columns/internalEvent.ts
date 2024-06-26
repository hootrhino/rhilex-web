import { getIntl, getLocale } from '@umijs/max';
import { eventTypeOption } from '../enum';

const intl = getIntl(getLocale());

export const INTERNAL_EVENT = [
  {
    title: intl.formatMessage({ id: 'inend.table.title.eventType' }),
    dataIndex: ['config', 'type'],
    valueType: 'select',
    required: true,
    valueEnum: eventTypeOption,
  },
];
