import { getIntl, getLocale } from '@umijs/max';
import { eventTypeOption } from '../enum';

const { formatMessage } = getIntl(getLocale());

export const INTERNAL_EVENT = [
  {
    title: formatMessage({ id: 'inend.table.title.eventType' }),
    dataIndex: ['config', 'type'],
    valueType: 'select',
    required: true,
    valueEnum: eventTypeOption,
  },
];
