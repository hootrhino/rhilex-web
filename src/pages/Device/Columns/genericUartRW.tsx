import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getHwifaceList } from '@/services/rulex/jiekouguanli';
import { getIntl, getLocale } from '@umijs/max';
import { Space } from 'antd';
import type { LabeledValue } from 'antd/es/select';
import type { DeviceItem } from '..';
import { ReadFormatOption } from '../enum';

const intl = getIntl(getLocale());

export const GENERIC_UART_RW_CONFIG = [
  {
    title: intl.formatMessage({ id: 'device.form.title.group.common' }),
    valueType: 'group',
    columns: [
      {
        title: intl.formatMessage({ id: 'device.form.title.rwConfig.autoRequest' }),
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
    title: intl.formatMessage({ id: 'device.form.title.group.uartRW' }),
    valueType: 'group',
    columns: [
      {
        title: intl.formatMessage({ id: 'device.form.title.tag' }),
        required: true,
        dataIndex: ['config', 'rwConfig', 'tag'],
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.readFormat' }),
        valueType: 'select',
        required: true,
        valueEnum: ReadFormatOption,
        dataIndex: ['config', 'rwConfig', 'readFormat'],
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.timeSlice' }),
        valueType: 'digit',
        dataIndex: ['config', 'rwConfig', 'timeSlice'],
        required: true,
        fieldProps: {
          addonAfter: 'ms',
        },
        render: (_dom: React.ReactNode, { hostConfig }: DeviceItem) => (
          <UnitValue value={hostConfig?.timeout} />
        ),
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.group.port' }),
    valueType: 'group',
    key: 'portConfig',
    columns: [
      {
        title: intl.formatMessage({ id: 'device.form.title.portUuid' }),
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
        render: (_dom: React.ReactNode, { portUuid }: DeviceItem) => portUuid,
      },
    ],
  },
];
