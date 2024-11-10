import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import { getOsNetInterfaces } from '@/services/rhilex/xitongshuju';
import { getCecollasListByGroup } from '@/services/rhilex/yunbianxietong';
import { DEFAULT_GROUP_KEY_CECOLLAS } from '@/utils/constant';
import { FormItemType } from '@/utils/enum';
import { validateFormItem } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';
import { Space } from 'antd';
import type { Rule } from 'antd/es/form';
import type { LabeledValue } from 'antd/es/select';
import type { DeviceItem } from '..';
import { BacnetModeOption } from '../enum';

const { formatMessage } = getIntl(getLocale());

export const BACNET_ROUTER_GW = [
  {
    title: formatMessage({ id: 'device.form.title.group' }, { type: 'BACnet' }),
    valueType: 'group',
    columns: [
      {
        title: formatMessage({ id: 'device.form.title.vendorId' }),
        dataIndex: ['config', 'bacnetRouterConfig', 'vendorId'],
        valueType: 'digit',
        formItemProps: {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'device.form.placeholder.vendorId' }),
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
        title: formatMessage({ id: 'device.form.title.id' }),
        dataIndex: ['config', 'bacnetRouterConfig', 'deviceId'],
        valueType: 'digit',
        formItemProps: {
          rules: [
            { required: true, message: formatMessage({ id: 'device.form.placeholder.id' }) },
            {
              min: 0,
              message: formatMessage({ id: 'device.form.rules.id' }),
              type: 'integer',
            },
            {
              max: 4194302,
              message: formatMessage({ id: 'device.form.rules.id' }),
              type: 'integer',
            },
          ],
        },
        render: (_dom: React.ReactNode, { bacnetRouterConfig }: DeviceItem) =>
          bacnetRouterConfig?.deviceId,
      },
      {
        title: formatMessage({ id: 'device.form.title.deviceName' }),
        dataIndex: ['config', 'bacnetRouterConfig', 'deviceName'],
        render: (_dom: React.ReactNode, { bacnetRouterConfig }: DeviceItem) =>
          bacnetRouterConfig?.deviceName,
      },
      {
        title: formatMessage({ id: 'device.form.title.mode' }),
        dataIndex: ['config', 'bacnetRouterConfig', 'mode'],
        valueType: 'select',
        valueEnum: BacnetModeOption,
        required: true,
        render: (_dom: React.ReactNode, { bacnetRouterConfig }: DeviceItem) =>
          BacnetModeOption[bacnetRouterConfig?.mode],
      },
      {
        title: formatMessage({ id: 'device.form.title.cidr' }),
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
        title: formatMessage({ id: 'device.form.title.localPort' }),
        dataIndex: ['config', 'bacnetRouterConfig', 'localPort'],
        required: true,
        valueType: 'digit',
        render: (_dom: React.ReactNode, { bacnetRouterConfig }: DeviceItem) =>
          bacnetRouterConfig?.localPort,
      },
    ],
  },
  {
    title: formatMessage({ id: 'device.form.title.group.cecollas' }),
    valueType: 'group',
    columns: [
      {
        title: formatMessage({ id: 'device.form.title.cecollas.enable' }),
        dataIndex: ['config', 'cellaConfig', 'enable'],
        renderFormItem: () => <ProSegmented width="md" />,
        render: (_dom: React.ReactNode, { cellaConfig }: DeviceItem) => (
          <ProTag type={StatusType.BOOL}>{cellaConfig?.enable}</ProTag>
        ),
      },
      {
        valueType: 'dependency',
        name: ['config'],
        columns: ({ config }: DeviceItem) => [
          {
            title: formatMessage({ id: 'device.form.title.cecollaId' }),
            dataIndex: ['config', 'cellaConfig', 'cecollaId'],
            valueType: 'select',
            required: true,
            hideInForm: config?.cellaConfig?.enable === 'false',
            hideInDescriptions: !config?.cellaConfig?.enable,
            request: async () => {
              const { data } = await getCecollasListByGroup({
                current: 1,
                size: 999,
                uuid: DEFAULT_GROUP_KEY_CECOLLAS,
              });

              return data.records?.map((item) => ({ label: item.name, value: item.uuid }));
            },
            render: (_dom: React.ReactNode, { cellaConfig }: DeviceItem) => cellaConfig?.cecollaId,
          },
        ],
      },
    ],
  },
];
