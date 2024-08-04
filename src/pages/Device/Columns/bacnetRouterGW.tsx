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

export const BACNET_ROUTER_GW_CONFIG = [
  {
    title: intl.formatMessage({ id: 'device.form.title.group.bacnet' }),
    valueType: 'group',
    columns: [
      {
        title: intl.formatMessage({ id: 'device.form.title.vendorId' }),
        dataIndex: ['config', 'bacnetRouterConfig', 'vendorId'],
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
        render: (_dom: React.ReactNode, { bacnetRouterConfig }: DeviceItem) =>
          bacnetRouterConfig?.vendorId,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.id' }),
        dataIndex: ['config', 'bacnetRouterConfig', 'deviceId'],
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
        render: (_dom: React.ReactNode, { bacnetRouterConfig }: DeviceItem) =>
          bacnetRouterConfig?.deviceId,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.deviceName' }),
        dataIndex: ['config', 'bacnetRouterConfig', 'deviceName'],
        render: (_dom: React.ReactNode, { bacnetRouterConfig }: DeviceItem) =>
          bacnetRouterConfig?.deviceName,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.mode' }),
        dataIndex: ['config', 'bacnetRouterConfig', 'mode'],
        valueType: 'select',
        valueEnum: BacnetModeOption,
        required: true,
        render: (_dom: React.ReactNode, { bacnetRouterConfig }: DeviceItem) =>
          BacnetModeOption[bacnetRouterConfig?.mode],
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.cidr' }),
        dataIndex: ['config', 'bacnetRouterConfig', 'networkCidr'],
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
        render: (_dom: React.ReactNode, { bacnetRouterConfig }: DeviceItem) =>
          bacnetRouterConfig?.networkCidr,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.localPort' }),
        dataIndex: ['config', 'bacnetRouterConfig', 'localPort'],
        required: true,
        valueType: 'digit',
        render: (_dom: React.ReactNode, { bacnetRouterConfig }: DeviceItem) =>
          bacnetRouterConfig?.localPort,
      },
    ],
  },
];
