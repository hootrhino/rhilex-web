import { TransceiverTypeOption } from '@/pages/CommunicationModule/enum';
import { getTransceiverList } from '@/services/rulex/tongxinmozu';
import { IconFont } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';
import { Space } from 'antd';

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
        label: (
          <Space className="w-full justify-between">
            <span>{item.name}</span>
            <Space>
              <span className="text-[12px] text-[#000000A6]">
                {TransceiverTypeOption[item?.type || 0].text}
              </span>
              <IconFont type={`icon-com-${TransceiverTypeOption[item?.type || 0].icon}`} />
            </Space>
          </Space>
        ),
        value: item.name,
      }));
    },
  },
];
