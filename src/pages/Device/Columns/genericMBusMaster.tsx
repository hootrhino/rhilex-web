import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getAlarmRuleList } from '@/services/rhilex/yujingzhongxin';
import { getCecollasListByGroup } from '@/services/rhilex/yunbianxietong';
import { DEFAULT_GROUP_KEY_CECOLLAS } from '@/utils/constant';
import { getIntl, getLocale } from '@umijs/max';
import { modeColumns } from '.';
import type { DeviceItem } from '..';
import { DeviceMode } from '../enum';

const { formatMessage } = getIntl(getLocale());

export const GENERIC_MBUS_EN13433_MASTER = [
  {
    valueType: 'dependency',
    name: ['config'],
    columns: ({ config }: DeviceItem) => [
      {
        title: formatMessage({ id: 'device.form.title.group.common' }),
        valueType: 'group',
        columns: [
          {
            title: formatMessage({ id: 'device.form.title.autoRequest' }),
            dataIndex: ['config', 'commonConfig', 'autoRequest'],
            required: true,
            renderFormItem: () => <ProSegmented />,
            render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
              <ProTag type={StatusType.BOOL}>{commonConfig?.autoRequest}</ProTag>
            ),
          },
          {
            title: formatMessage({ id: 'device.form.title.enableBatchRequest' }),
            dataIndex: ['config', 'commonConfig', 'batchRequest'],
            required: true,
            renderFormItem: () => <ProSegmented />,
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
      ...modeColumns[config?.commonConfig?.mode],
      {
        title: formatMessage({ id: 'device.form.title.group.cecollas' }),
        valueType: 'group',
        columns: [
          {
            title: formatMessage({ id: 'device.form.title.cecollas.enable' }),
            dataIndex: ['config', 'cecollaConfig', 'enable'],
            renderFormItem: () => <ProSegmented />,
            render: (_dom: React.ReactNode, { cecollaConfig }: DeviceItem) => (
              <ProTag type={StatusType.BOOL}>{cecollaConfig?.enable}</ProTag>
            ),
          },
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
          {
            title: formatMessage({ id: 'device.form.title.enableCreateSchema' }),
            dataIndex: ['config', 'cecollaConfig', 'enableCreateSchema'],
            required: true,
            hideInForm: config?.cecollaConfig?.enable === 'false',
            hideInDescriptions: !config?.cecollaConfig?.enable,
            renderFormItem: () => <ProSegmented />,
            render: (_dom: React.ReactNode, { cecollaConfig }: DeviceItem) => (
              <ProTag type={StatusType.BOOL}>{cecollaConfig?.enableCreateSchema}</ProTag>
            ),
          },
        ],
      },
      {
        title: formatMessage({ id: 'device.form.title.group.alarm' }),
        valueType: 'group',
        columns: [
          {
            title: formatMessage({ id: 'device.form.title.alarm.enable' }),
            dataIndex: ['config', 'alarmConfig', 'enable'],
            renderFormItem: () => <ProSegmented />,
            render: (_dom: React.ReactNode, { alarmConfig }: DeviceItem) => (
              <ProTag type={StatusType.BOOL}>{alarmConfig?.enable || false}</ProTag>
            ),
          },
          {
            title: formatMessage({ id: 'device.form.title.alarm.ruleId' }),
            dataIndex: ['config', 'alarmConfig', 'alarmRuleId'],
            valueType: 'select',
            required: true,
            hideInForm: config?.alarmConfig?.enable === 'false',
            hideInDescriptions: !config?.alarmConfig?.enable,
            request: async () => {
              const { data } = await getAlarmRuleList({
                current: 1,
                size: 999,
              });

              return data.records?.map((item) => ({ label: item.name, value: item.uuid }));
            },
            render: (_dom: React.ReactNode, { alarmConfig }: DeviceItem) =>
              alarmConfig?.alarmRuleId,
          },
        ],
      },
    ],
  },
];
