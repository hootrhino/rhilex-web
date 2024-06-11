import { getIntl, getLocale } from '@umijs/max';
import type { DeviceItem } from '..';
import { TencentMode } from '../enum';

const intl = getIntl(getLocale());

export const TENCENT_IOTHUB_GATEWAY_CONFIG = [
  {
    title: intl.formatMessage({ id: 'device.form.title.group.tencent' }),
    valueType: 'group',
    columns: [
      {
        title: intl.formatMessage({ id: 'device.form.title.mode' }),
        dataIndex: ['config', 'tencentConfig', 'mode'],
        valueType: 'select',
        valueEnum: TencentMode,
        required: true,
        render: (_dom: React.ReactNode, { tencentConfig }: DeviceItem) => tencentConfig?.mode,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.productId' }),
        dataIndex: ['config', 'tencentConfig', 'productId'],
        required: true,
        render: (_dom: React.ReactNode, { tencentConfig }: DeviceItem) => tencentConfig?.productId,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.deviceName' }),
        dataIndex: ['config', 'tencentConfig', 'deviceName'],
        required: true,
        render: (_dom: React.ReactNode, { tencentConfig }: DeviceItem) => tencentConfig?.deviceName,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.devicePsk' }),
        dataIndex: ['config', 'tencentConfig', 'devicePsk'],
        required: true,
        render: (_dom: React.ReactNode, { tencentConfig }: DeviceItem) => tencentConfig?.devicePsk,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.clientId' }),
        dataIndex: ['config', 'tencentConfig', 'clientId'],
        required: true,
        render: (_dom: React.ReactNode, { tencentConfig }: DeviceItem) => tencentConfig?.clientId,
      },
    ],
  },
];
