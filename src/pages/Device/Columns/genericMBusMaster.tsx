import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getCecollasListByGroup } from '@/services/rhilex/yunbianxietong';
import { DEFAULT_GROUP_KEY_CECOLLAS } from '@/utils/constant';
import { getIntl, getLocale } from '@umijs/max';
import { modeColumns } from '.';
import type { DeviceItem } from '..';
import { DeviceMode } from '../enum';

const { formatMessage } = getIntl(getLocale());

export const GENERIC_MBUS_EN13433_MASTER = [
  {
    title: formatMessage({ id: 'device.form.title.group.common' }),
    valueType: 'group',
    columns: [
      {
        title: formatMessage({ id: 'device.form.title.autoRequest' }),
        dataIndex: ['config', 'commonConfig', 'autoRequest'],
        required: true,
        renderFormItem: () => <ProSegmented width="md" />,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <ProTag type={StatusType.BOOL}>{commonConfig?.autoRequest}</ProTag>
        ),
      },
      {
        title: formatMessage({ id: 'device.form.title.enableBatchRequest' }),
        dataIndex: ['config', 'commonConfig', 'batchRequest'],
        required: true,
        renderFormItem: () => <ProSegmented width="md" />,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <ProTag type={StatusType.BOOL}>{commonConfig?.batchRequest}</ProTag>
        ),
      },
      {
        title: formatMessage({ id: 'device.form.title.frequency' }),
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
    columns: ({ config }: DeviceItem) => [
      ...modeColumns[config?.commonConfig?.mode],
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
            render: (_dom: React.ReactNode, { cellaConfig }: DeviceItem) => cellaConfig?.cecollaId,
          },
        ],
      },
    ],
  },
];
