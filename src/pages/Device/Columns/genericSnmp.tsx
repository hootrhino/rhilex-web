import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getCecollasListByGroup } from '@/services/rhilex/yunbianxietong';
import { DEFAULT_GROUP_KEY_CECOLLAS } from '@/utils/constant';
import { getIntl, getLocale } from '@umijs/max';
import type { DeviceItem } from '..';
import { SNMPVersionOption, TransportOption } from '../enum';

const { formatMessage } = getIntl(getLocale());

export const GENERIC_SNMP = [
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
          <ProTag type={StatusType.BOOL}>{commonConfig.autoRequest}</ProTag>
        ),
      },
      {
        title: formatMessage({ id: 'device.form.title.enableGroup' }),
        dataIndex: ['config', 'commonConfig', 'enableGroup'],
        required: true,
        renderFormItem: () => <ProSegmented />,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <ProTag type={StatusType.BOOL}>{commonConfig.enableGroup}</ProTag>
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
        title: formatMessage({ id: 'device.form.title.timeout.request' }),
        dataIndex: ['config', 'commonConfig', 'timeout'],
        valueType: 'digit',
        required: true,
        fieldProps: {
          addonAfter: 'ms',
        },
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <UnitValue value={commonConfig.timeout} />
        ),
      },
      {
        title: formatMessage({ id: 'device.form.title.frequency.request' }),
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
    ],
  },
  {
    title: formatMessage({ id: 'device.form.title.group' }, { type: 'SNMP' }),
    valueType: 'group',
    columns: [
      {
        title: formatMessage({ id: 'device.form.title.target.device' }),
        dataIndex: ['config', 'snmpConfig', 'target'],
        required: true,
        render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) => snmpConfig?.target,
      },
      {
        title: formatMessage({ id: 'device.form.title.target.port' }),
        dataIndex: ['config', 'snmpConfig', 'port'],
        valueType: 'digit',
        required: true,
        render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) => snmpConfig?.port,
      },
      {
        title: formatMessage({ id: 'device.form.title.transport' }),
        dataIndex: ['config', 'snmpConfig', 'transport'],
        required: true,
        valueType: 'select',
        valueEnum: TransportOption,
        render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) =>
          TransportOption[snmpConfig?.transport],
      },
      {
        title: formatMessage({ id: 'device.form.title.community' }),
        dataIndex: ['config', 'snmpConfig', 'community'],
        required: true,
        render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) => snmpConfig?.community,
      },
      {
        title: formatMessage({ id: 'device.form.title.version' }),
        dataIndex: ['config', 'snmpConfig', 'version'],
        required: true,
        valueType: 'select',
        valueEnum: SNMPVersionOption,
        render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) =>
          SNMPVersionOption.get(snmpConfig?.version),
      },
    ],
  },
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
        valueType: 'dependency',
        name: ['config'],
        columns: ({ config }: DeviceItem) => [
          {
            valueType: 'group',
            columns: [
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
        ],
      },
    ],
  },
];
