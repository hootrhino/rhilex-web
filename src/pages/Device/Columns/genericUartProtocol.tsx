import UnitValue from '@/components/UnitValue';
import { FormItemType } from '@/utils/enum';
import { validateFormItem } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';
import type { Rule } from 'antd/es/form';
import { modeColumns } from '.';
import type { DeviceItem } from '..';
import { DeviceMode } from '../enum';

const { formatMessage } = getIntl(getLocale());

export const GENERIC_UART_PROTOCOL = [
  {
    title: formatMessage({ id: 'device.form.title.group.common' }),
    valueType: 'group',
    columns: [
      {
        title: formatMessage({ id: 'device.form.title.retryTime' }),
        dataIndex: ['config', 'commonConfig', 'retryTime'],
        valueType: 'digit',
        required: true,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.retryTime,
      },
      {
        title: formatMessage({ id: 'device.form.title.mode' }),
        dataIndex: ['config', 'commonConfig', 'mode'],
        valueType: 'select',
        valueEnum: [DeviceMode.UART],
        required: true,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.mode,
      },
      {
        title: formatMessage({ id: 'device.form.title.timeout.uart' }),
        dataIndex: ['config', 'commonConfig', 'timeout'],
        valueType: 'digit',
        required: true,
        formItemProps: {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'device.form.placeholder.uartTimeout' }),
            },
            {
              validator: (_rule: Rule, value: number) =>
                validateFormItem(value, FormItemType.TIMEOUT),
            },
          ],
        },
        tooltip: formatMessage({ id: 'device.tooltip.uartTimeout' }),
        fieldProps: {
          addonAfter: 'ms',
        },
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <UnitValue value={commonConfig.timeout} />
        ),
      },
    ],
  },
  {
    valueType: 'dependency',
    name: ['config'],
    columns: ({ config }: DeviceItem) => modeColumns[config?.commonConfig?.mode] || [],
  },
];
