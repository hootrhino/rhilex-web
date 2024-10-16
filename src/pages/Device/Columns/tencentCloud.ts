import { getIntl, getLocale } from '@umijs/max';
import type { DeviceItem } from '..';
import { TencentMode } from '../enum';

const { formatMessage } = getIntl(getLocale());

export const TENCENT_IOTHUB_GATEWAY = [
  {
    title: formatMessage({ id: 'device.form.title.group.tencent' }),
    valueType: 'group',
    columns: [
      {
        title: formatMessage({ id: 'device.form.title.mode' }),
        dataIndex: ['config', 'tencentConfig', 'mode'],
        valueType: 'select',
        valueEnum: TencentMode,
        required: true,
        render: (_dom: React.ReactNode, { tencentConfig }: DeviceItem) => tencentConfig?.mode,
      },
      {
        title: formatMessage({ id: 'device.form.title.productId' }),
        dataIndex: ['config', 'tencentConfig', 'productId'],
        required: true,
        render: (_dom: React.ReactNode, { tencentConfig }: DeviceItem) => tencentConfig?.productId,
      },
      {
        title: formatMessage({ id: 'device.form.title.deviceName' }),
        dataIndex: ['config', 'tencentConfig', 'deviceName'],
        required: true,
        render: (_dom: React.ReactNode, { tencentConfig }: DeviceItem) => tencentConfig?.deviceName,
      },
      {
        title: formatMessage({ id: 'device.form.title.devicePsk' }),
        dataIndex: ['config', 'tencentConfig', 'devicePsk'],
        required: true,
        render: (_dom: React.ReactNode, { tencentConfig }: DeviceItem) => tencentConfig?.devicePsk,
      },
    ],
  },
];
