import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@umijs/max';
import type { DeviceItem } from '..';

const { formatMessage } = getIntl(getLocale());

export const GENERIC_NEMA_GNS_PROTOCOL = (uartColumns: Record<string, any>[]) => [
  {
    title: formatMessage({ id: 'device.form.title.group' }, { type: 'GPS' }),
    valueType: 'group',
    columns: [
      {
        title: formatMessage({ id: 'device.form.title.parse' }),
        dataIndex: ['config', 'gpsConfig', 'parse'],
        required: true,
        renderFormItem: () => <ProSegmented />,
        render: (_dom: React.ReactNode, { gpsConfig }: DeviceItem) => (
          <ProTag type={StatusType.BOOL}>{gpsConfig?.parse}</ProTag>
        ),
      },
      {
        title: formatMessage({ id: 'device.form.title.gwsn' }),
        dataIndex: ['config', 'gpsConfig', 'gwsn'],
        required: true,
        render: (_dom: React.ReactNode, { gpsConfig }: DeviceItem) => gpsConfig?.gwsn,
      },
    ],
  },
  ...uartColumns,
];
