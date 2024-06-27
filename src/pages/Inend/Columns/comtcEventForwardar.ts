import { getTransceiverList } from '@/services/rulex/tongxinmozu';
import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const COMTC_EVENT_FORWARDAR = [
  {
    title: intl.formatMessage({ id: 'inend.table.title.comName' }),
    dataIndex: ['config', 'comName'],
    valueType: 'select',
    required: true,
    request: async () => {
      const { data } = await getTransceiverList();

      return data?.map((item) => ({
        label: item.name,
        value: item.name,
      }));
    },
  },
];
