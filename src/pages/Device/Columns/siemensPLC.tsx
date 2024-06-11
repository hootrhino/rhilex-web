import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getIntl, getLocale } from '@umijs/max';
import type { DeviceItem } from '..';
import { plcModelOptions, rackEnum, slotEnum } from '../enum';

const intl = getIntl(getLocale());

export const SIEMENS_PLC_CONFIG = [
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
        title: intl.formatMessage({ id: 'device.form.title.timeout.connect' }),
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
        title: intl.formatMessage({ id: 'device.form.title.timeout.idle' }),
        dataIndex: ['config', 'commonConfig', 'idleTimeout'],
        valueType: 'digit',
        required: true,
        fieldProps: {
          addonAfter: 'ms',
        },
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <UnitValue value={commonConfig?.idleTimeout} />
        ),
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.host.plc' }),
        dataIndex: ['config', 'commonConfig', 'host'],
        required: true,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.host,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.model.plc' }),
        dataIndex: ['config', 'commonConfig', 'model'],
        required: true,
        valueType: 'select',
        valueEnum: plcModelOptions,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) =>
          plcModelOptions[commonConfig?.model],
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.rack' }),
        dataIndex: ['config', 'commonConfig', 'rack'],
        required: true,
        valueType: 'select',
        valueEnum: rackEnum,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.rack,
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.slot' }),
        dataIndex: ['config', 'commonConfig', 'slot'],
        required: true,
        valueType: 'select',
        valueEnum: slotEnum,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.slot,
      },
    ],
  },
];
