import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getOsNetInterfaces } from '@/services/rulex/xitongshuju';
import { getIntl, getLocale } from '@umijs/max';
import { Space } from 'antd';
import type { DeviceItem } from '..';

const intl = getIntl(getLocale());

export const SMART_HOME_CONTROLLER_CONFIG = [
  {
    title: intl.formatMessage({ id: 'device.form.title.group.common' }),
    valueType: 'group',
    columns: [
      {
        title: intl.formatMessage({ id: 'device.form.title.autoScan' }),
        dataIndex: ['config', 'commonConfig', 'autoScan'],
        required: true,
        renderFormItem: () => <ProSegmented width="md" />,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <ProTag type={StatusType.BOOL}>{commonConfig.autoScan}</ProTag>
        ),
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.timeout.scan' }),
        dataIndex: ['config', 'commonConfig', 'timeout'],
        valueType: 'digit',
        required: true,
        fieldProps: {
          addonAfter: 'ms',
        },
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <UnitValue value={commonConfig.timeout} />
        ),
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.frequency.scan' }),
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
    title: intl.formatMessage({ id: 'device.form.title.group.smartHome' }),
    valueType: 'group',
    columns: [
      {
        title: intl.formatMessage({ id: 'device.form.title.cidr' }),
        required: true,
        dataIndex: ['config', 'shellyConfig', 'networkCidr'],
        valueType: 'select',
        request: async () => {
          const { data } = await getOsNetInterfaces();

          return data?.map((item) => ({
            label: (
              <Space>
                <span>{item?.name}</span>
                <span className="text-[12px] text-[#000000A6]">{item?.addr}</span>
              </Space>
            ),
            value: item.addr,
          }));
        },
        render: (_dom: React.ReactNode, { shellyConfig }: DeviceItem) => shellyConfig?.networkCidr,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.webHookPort' }),
        dataIndex: ['config', 'shellyConfig', 'webHookPort'],
        valueType: 'digit',
        required: true,
        render: (_dom: React.ReactNode, { shellyConfig }: DeviceItem) => shellyConfig?.webHookPort,
      },
    ],
  },
];
