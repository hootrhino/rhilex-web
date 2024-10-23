import { getIntl, getLocale } from '@umijs/max';
import { modeColumns } from '.';
import type { DeviceItem } from '..';
import { DeviceMode } from '../enum';

const { formatMessage } = getIntl(getLocale());

export const GENERIC_MODBUS_SLAVER = [
  {
    title: formatMessage({ id: 'device.form.title.group.common' }),
    valueType: 'group',
    columns: [
      {
        title: formatMessage({ id: 'device.form.title.mode' }),
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
    columns: ({ config }: DeviceItem) => {
      const tcpConfig = modeColumns['TCP'][0];
      const slaverTcpConfig = tcpConfig.columns.slice(1);

      const modeColumn = {
        UART: modeColumns['UART'],
        TCP: [
          {
            title: formatMessage({ id: 'device.form.title.group' }, { type: 'TCP' }),
            valueType: 'group',
            columns: slaverTcpConfig,
          },
        ],
        '': [],
      };
      return modeColumn[config?.commonConfig?.mode] || [];
    },
  },
];
