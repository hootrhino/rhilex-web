import { getHwifaceList } from '@/services/rulex/jiekouguanli';
import { getIntl, getLocale } from '@umijs/max';
import { Space } from 'antd';
import type { DeviceItem } from '..';
import { DeviceMode } from '../enum';

const intl = getIntl(getLocale());

const modeColumns = {
  UART: [
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
          request: async () => {
            const { data } = await getHwifaceList();

            return data?.map((item) => ({
              label: (
                <Space>
                  <span>{item?.name}</span>
                  <span className="text-[12px] text-[#000000A6]">{item?.alias}</span>
                </Space>
              ),
              value: item.uuid,
            }));
          },
          render: (_dom: React.ReactNode, { portUuid }: DeviceItem) => portUuid,
        },
      ],
    },
  ],
  TCP: [
    {
      title: intl.formatMessage({ id: 'device.form.title.group.tcp' }),
      valueType: 'group',
      columns: [
        {
          title: intl.formatMessage({ id: 'device.form.title.host' }),
          dataIndex: ['config', 'hostConfig', 'host'],
          required: true,
          render: (_dom: React.ReactNode, { hostConfig }: DeviceItem) => hostConfig?.host,
        },
        {
          title: intl.formatMessage({ id: 'device.form.title.port' }),
          dataIndex: ['config', 'hostConfig', 'port'],
          valueType: 'digit',
          required: true,
          render: (_dom: React.ReactNode, { hostConfig }: DeviceItem) => hostConfig?.port,
        },
      ],
    },
  ],
  '': [],
};

export const GENERIC_MODBUS_SLAVER_CONFIG = [
  {
    title: intl.formatMessage({ id: 'device.form.title.group.common' }),
    valueType: 'group',
    columns: [
      {
        title: intl.formatMessage({ id: 'device.form.title.mode' }),
        dataIndex: ['config', 'commonConfig', 'mode'],
        valueType: 'select',
        valueEnum: DeviceMode,
        required: true,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.mode,
      },
    ],
  },
  {
    valueType: 'dependency',
    name: ['config'],
    columns: ({ config }: DeviceItem) => modeColumns[config?.commonConfig?.mode] || [],
  },
];
