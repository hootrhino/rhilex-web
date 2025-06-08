import { TransceiverTypeOption } from '@/pages/CommunicationModule/enum';
import { getTransceiverList } from '@/services/rhilex/tongxinmozu';
import { IconFont } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';
import { Space } from 'antd';

const { formatMessage } = getIntl(getLocale());

export const COMTC_EVENT_FORWARDER = [
  {
    title: formatMessage({ id: 'inend.table.title.comName' }),
    dataIndex: ['config', 'comName'],
    valueType: 'select',
    required: true,
    fieldProps: {
      optionRender: (option: { label: number; value: string; type: number }) => (
        <Space className="w-full justify-between">
          <span>{option.value}</span>
          <Space>
            <span className="text-[12px] text-[#000000A6]">
              {TransceiverTypeOption[option?.type || 0].text}
            </span>
            <IconFont type={`icon-com-${TransceiverTypeOption[option?.type || 0].icon}`} />
          </Space>
        </Space>
      ),
    },
    request: async () => {
      const { data } = await getTransceiverList();

      return data.map((item) => ({ label: item.name, value: item.name, type: item.type }));
    },
  },
];
