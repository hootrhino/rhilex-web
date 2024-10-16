import { getIntl, getLocale } from '@umijs/max';
import type { DeviceItem } from '..';
import { TencentMode } from '../enum';

const { formatMessage } = getIntl(getLocale());

export const ITHINGS_IOTHUB_GATEWAY = [
  {
    title: formatMessage({ id: 'device.form.title.group.tencent' }),
    valueType: 'group',
    columns: [
      {
        title: formatMessage({ id: 'device.form.title.mode' }),
        dataIndex: ['config', 'ithingsConfig', 'mode'],
        valueType: 'select',
        valueEnum: TencentMode,
        required: true,
        render: (_dom: React.ReactNode, { ithingsConfig }: DeviceItem) => ithingsConfig?.mode,
      },
      {
        title: formatMessage({ id: 'device.form.title.productId' }),
        dataIndex: ['config', 'ithingsConfig', 'productId'],
        required: true,
        render: (_dom: React.ReactNode, { ithingsConfig }: DeviceItem) => ithingsConfig?.productId,
      },
      {
        title: formatMessage({ id: 'device.form.title.deviceName' }),
        dataIndex: ['config', 'ithingsConfig', 'deviceName'],
        required: true,
        render: (_dom: React.ReactNode, { ithingsConfig }: DeviceItem) => ithingsConfig?.deviceName,
      },
      {
        title: formatMessage({ id: 'device.form.title.devicePsk' }),
        dataIndex: ['config', 'ithingsConfig', 'devicePsk'],
        required: true,
        render: (_dom: React.ReactNode, { ithingsConfig }: DeviceItem) => ithingsConfig?.devicePsk,
      },
      {
        title: formatMessage({ id: 'device.form.title.serverEndpoint' }),
        dataIndex: ['config', 'ithingsConfig', 'serverEndpoint'],
        required: true,
        render: (_dom: React.ReactNode, { ithingsConfig }: DeviceItem) =>
          ithingsConfig?.serverEndpoint,
      },
    ],
  },
];
