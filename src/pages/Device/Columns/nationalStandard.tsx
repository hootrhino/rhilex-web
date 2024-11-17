import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import { getCecollasListByGroup } from '@/services/rhilex/yunbianxietong';
import { DEFAULT_GROUP_KEY_CECOLLAS } from '@/utils/constant';
import { getIntl, getLocale } from '@umijs/max';
import { modeColumns } from '.';
import type { DeviceItem } from '..';
import { DeviceMode } from '../enum';

const { formatMessage } = getIntl(getLocale());

/**
 * 国标协议配置 DLT6452007_MASTER | CJT1882004_MASTER | SZY2062016_MASTER
 */
export const NATIONAL_STANDARD = [
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
            dataIndex: ['config', 'cecollaConfig', 'enable'],
            renderFormItem: () => <ProSegmented width="md" />,
            render: (_dom: React.ReactNode, { cecollaConfig }: DeviceItem) => (
              <ProTag type={StatusType.BOOL}>{cecollaConfig?.enable}</ProTag>
            ),
          },
          {
            valueType: 'dependency',
            name: ['config'],
            columns: ({ config }: DeviceItem) => [
              {
                title: formatMessage({ id: 'device.form.title.cecollaId' }),
                dataIndex: ['config', 'cecollaConfig', 'cecollaId'],
                valueType: 'select',
                required: true,
                hideInForm: config?.cecollaConfig?.enable === 'false',
                hideInDescriptions: !config?.cecollaConfig?.enable,
                request: async () => {
                  const { data } = await getCecollasListByGroup({
                    current: 1,
                    size: 999,
                    gid: DEFAULT_GROUP_KEY_CECOLLAS,
                  });

                  return data.records?.map((item) => ({ label: item.name, value: item.uuid }));
                },
                render: (_dom: React.ReactNode, { cecollaConfig }: DeviceItem) =>
                  cecollaConfig?.cecollaId,
              },
            ],
          },
        ],
      },
    ],
  },
];
