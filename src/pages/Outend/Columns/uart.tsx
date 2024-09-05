import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getHwifaceList } from '@/services/rhilex/jiekouguanli';
import { stringToBool } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';
import { Space } from 'antd';
import type { LabeledValue } from 'antd/es/select';
import { dataModeOption } from '../enum';

const intl = getIntl(getLocale());

export const GENERIC_UART_TARGET = [
  {
    title: intl.formatMessage({ id: 'outend.table.title.allowPing' }),
    dataIndex: ['config', 'allowPing'],
    required: true,
    convertValue: (value: boolean) => value?.toString(),
    transform: (value: string) => ({ config: { allowPing: stringToBool(value) } }),
    renderFormItem: () => <ProSegmented width="md" />,
    renderText: (allowPing: boolean) => <ProTag type={StatusType.BOOL}>{allowPing}</ProTag>,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.pingPacket' }),
    dataIndex: ['config', 'pingPacket'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.timeout.rw' }),
    dataIndex: ['config', 'timeout'],
    required: true,
    valueType: 'digit',
    fieldProps: {
      addonAfter: 'ms',
    },
    render: (timeout: number) => <UnitValue value={timeout} />,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.dataMode' }),
    dataIndex: ['config', 'dataMode'],
    valueEnum: dataModeOption,
    valueType: 'select',
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.portUuid' }),
    dataIndex: ['config', 'portUuid'],
    valueType: 'select',
    required: true,
    fieldProps: {
      optionRender: (option: LabeledValue) => (
        <Space>
          <span>{option?.label}</span>
          <span className="text-[12px] text-[#000000A6]">{option?.value}</span>
        </Space>
      ),
    },
    request: async () => {
      const { data } = await getHwifaceList();
      return data.map((item) => ({ label: item.name, value: item.uuid }));
    },
    render: (portUuid: string) => portUuid,
  },
];
