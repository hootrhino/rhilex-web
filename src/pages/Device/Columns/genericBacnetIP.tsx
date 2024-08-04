import UnitValue from '@/components/UnitValue';
import { getOsNetInterfaces } from '@/services/rulex/xitongshuju';
import { FormItemType } from '@/utils/enum';
import { validateFormItem } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';
import { Space } from 'antd';
import type { Rule } from 'antd/es/form';
import type { LabeledValue } from 'antd/es/select';
import type { DeviceItem } from '..';
import { BacnetModeOption } from '../enum';

const intl = getIntl(getLocale());

export const GENERIC_BACNET_IP_CONFIG = [
  {
    title: intl.formatMessage({ id: 'device.form.title.group.common' }),
    valueType: 'group',
    columns: [
      {
        title: intl.formatMessage({ id: 'device.form.title.frequency' }),
        dataIndex: ['config', 'commonConfig', 'frequency'],
        valueType: 'digit',
        required: true,
        fieldProps: {
          addonAfter: 'ms',
        },
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <UnitValue value={commonConfig.frequency} />
        ),
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.group.bacnet' }),
    valueType: 'group',
    columns: [
      {
        title: intl.formatMessage({ id: 'device.form.title.vendorId' }),
        dataIndex: ['config', 'bacnetConfig', 'vendorId'],
        valueType: 'digit',
        formItemProps: {
          rules: [
            {
              required: true,
              message: intl.formatMessage({ id: 'device.form.placeholder.vendorId' }),
            },
            {
              validator: (_rule: Rule, value: number) =>
                validateFormItem(value, FormItemType.VENDORID),
            },
          ],
        },
        render: (_dom: React.ReactNode, { bacnetConfig }: DeviceItem) => bacnetConfig?.vendorId,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.id' }),
        dataIndex: ['config', 'bacnetConfig', 'deviceId'],
        valueType: 'digit',
        formItemProps: {
          rules: [
            { required: true, message: intl.formatMessage({ id: 'device.form.placeholder.id' }) },
            {
              min: 0,
              message: intl.formatMessage({ id: 'device.form.rules.id' }),
              type: 'integer',
            },
            {
              max: 4194302,
              message: intl.formatMessage({ id: 'device.form.rules.id' }),
              type: 'integer',
            },
          ],
        },
        render: (_dom: React.ReactNode, { bacnetConfig }: DeviceItem) => bacnetConfig?.deviceId,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.mode' }),
        dataIndex: ['config', 'bacnetConfig', 'mode'],
        valueType: 'select',
        valueEnum: BacnetModeOption,
        required: true,
        render: (_dom: React.ReactNode, { bacnetConfig }: DeviceItem) =>
          BacnetModeOption[bacnetConfig?.mode],
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.cidr' }),
        dataIndex: ['config', 'bacnetConfig', 'networkCidr'],
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
          const { data } = await getOsNetInterfaces();

          return data.map((item) => ({ label: item.name, value: item.addr }));
        },
        render: (_dom: React.ReactNode, { bacnetConfig }: DeviceItem) => bacnetConfig?.networkCidr,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.localPort' }),
        dataIndex: ['config', 'bacnetConfig', 'localPort'],
        required: true,
        valueType: 'digit',
        render: (_dom: React.ReactNode, { bacnetConfig }: DeviceItem) => bacnetConfig?.localPort,
      },
    ],
  },
];
