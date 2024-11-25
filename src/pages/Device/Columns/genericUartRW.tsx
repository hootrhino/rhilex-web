import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getIntl, getLocale } from '@umijs/max';
import type { DeviceItem } from '..';
import { ReadFormatOption } from '../enum';

const { formatMessage } = getIntl(getLocale());

export const GENERIC_UART_RW = (uartColumns: Record<string, any>[]) => [
  {
    title: formatMessage({ id: 'device.form.title.group.common' }),
    valueType: 'group',
    columns: [
      {
        title: formatMessage({ id: 'device.form.title.rwConfig.autoRequest' }),
        dataIndex: ['config', 'commonConfig', 'autoRequest'],
        required: true,
        renderFormItem: () => <ProSegmented width="md" />,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <ProTag type={StatusType.BOOL}>{commonConfig?.autoRequest}</ProTag>
        ),
      },
    ],
  },
  {
    title: formatMessage({ id: 'device.form.title.group.uartRW' }),
    valueType: 'group',
    columns: [
      {
        title: formatMessage({ id: 'device.form.title.tag' }),
        required: true,
        dataIndex: ['config', 'rwConfig', 'tag'],
        render: (_dom: React.ReactNode, { rwConfig }: DeviceItem) => rwConfig.tag,
      },
      {
        title: formatMessage({ id: 'device.form.title.readFormat' }),
        valueType: 'select',
        required: true,
        valueEnum: ReadFormatOption,
        dataIndex: ['config', 'rwConfig', 'readFormat'],
        render: (_dom: React.ReactNode, { rwConfig }: DeviceItem) =>
          rwConfig.readFormat ? ReadFormatOption[rwConfig.readFormat] : '-',
      },
      {
        title: formatMessage({ id: 'device.form.title.timeSlice' }),
        valueType: 'digit',
        dataIndex: ['config', 'rwConfig', 'timeSlice'],
        required: true,
        fieldProps: {
          addonAfter: 'ms',
        },
        render: (_dom: React.ReactNode, { rwConfig }: DeviceItem) => (
          <UnitValue value={rwConfig?.timeSlice} />
        ),
      },
    ],
  },
  ...uartColumns,
];
