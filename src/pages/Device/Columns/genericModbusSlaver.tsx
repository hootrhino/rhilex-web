import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import { getCecollasListByGroup } from '@/services/rhilex/yunbianxietong';
import { DEFAULT_GROUP_KEY_CECOLLAS } from '@/utils/constant';
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
      return [
        ...modeColumn[config?.commonConfig?.mode],
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
              render: (_dom: React.ReactNode, { cellaConfig }: DeviceItem) =>
                cellaConfig?.cecollaId,
            },
          ],
        },
      ];
    },
  },
];
