import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getIntl, getLocale } from '@umijs/max';
import type { DeviceItem } from '..';
import { SNMPVersionOption, TransportOption } from '../enum';

const intl = getIntl(getLocale());

export const GENERIC_SNMP_CONFIG = [
  {
    title: intl.formatMessage({ id: 'device.form.title.group.common' }),
    valueType: 'group',
    columns: [
      {
        title: intl.formatMessage({ id: 'device.form.title.autoRequest' }),
        dataIndex: ['config', 'commonConfig', 'autoRequest'],
        required: true,
        renderFormItem: () => <ProSegmented width="md" />,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <ProTag type={StatusType.BOOL}>{commonConfig.autoRequest}</ProTag>
        ),
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.enableGroup' }),
        dataIndex: ['config', 'commonConfig', 'enableGroup'],
        required: true,
        renderFormItem: () => <ProSegmented width="md" />,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <ProTag type={StatusType.BOOL}>{commonConfig.enableGroup}</ProTag>
        ),
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.enableBatchRequest' }),
        dataIndex: ['config', 'commonConfig', 'batchRequest'],
        required: true,
        renderFormItem: () => <ProSegmented width="md" />,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <ProTag type={StatusType.BOOL}>{commonConfig?.batchRequest}</ProTag>
        ),
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.timeout.request' }),
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
        title: intl.formatMessage({ id: 'device.form.title.frequency.request' }),
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
    title: intl.formatMessage({ id: 'device.form.title.group.snmp' }),
    valueType: 'group',
    columns: [
      {
        title: intl.formatMessage({ id: 'device.form.title.target.device' }),
        dataIndex: ['config', 'snmpConfig', 'target'],
        required: true,
        render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) => snmpConfig?.target,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.target.port' }),
        dataIndex: ['config', 'snmpConfig', 'port'],
        valueType: 'digit',
        required: true,
        render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) => snmpConfig?.port,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.transport' }),
        dataIndex: ['config', 'snmpConfig', 'transport'],
        required: true,
        valueType: 'select',
        valueEnum: TransportOption,
        render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) =>
          TransportOption[snmpConfig?.transport],
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.community' }),
        dataIndex: ['config', 'snmpConfig', 'community'],
        required: true,
        render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) => snmpConfig?.community,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.version' }),
        dataIndex: ['config', 'snmpConfig', 'version'],
        required: true,
        valueType: 'select',
        valueEnum: SNMPVersionOption,
        render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) =>
          SNMPVersionOption.get(snmpConfig?.version),
      },
    ],
  },
];
