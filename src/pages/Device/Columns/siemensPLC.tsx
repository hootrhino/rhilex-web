import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getIntl, getLocale } from '@umijs/max';
import type { DeviceItem } from '..';
import { plcModelOptions, rackEnum, slotEnum } from '../enum';

const { formatMessage } = getIntl(getLocale());

export const SIEMENS_PLC = [
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
          <ProTag type={StatusType.BOOL}>{commonConfig.autoRequest}</ProTag>
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
        title: formatMessage({ id: 'device.form.title.timeout.connect' }),
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
        title: formatMessage({ id: 'device.form.title.timeout.idle' }),
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
        title: formatMessage({ id: 'device.form.title.group' }, { type: 'PLC' }),
        valueType: 'group',
        columns: [
          {
            title: formatMessage({ id: 'device.form.title.host.plc' }),
            dataIndex: ['config', 's1200Config', 'host'],
            required: true,
            render: (_dom: React.ReactNode, { s1200Config }: DeviceItem) => s1200Config?.host,
          },
          {
            title: formatMessage({ id: 'device.form.title.model.plc' }),
            dataIndex: ['config', 's1200Config', 'model'],
            required: true,
            valueType: 'select',
            valueEnum: plcModelOptions,
            render: (_dom: React.ReactNode, { s1200Config }: DeviceItem) =>
              plcModelOptions[s1200Config?.model],
          },
          {
            title: formatMessage({ id: 'device.form.title.rack' }),
            dataIndex: ['config', 's1200Config', 'rack'],
            required: true,
            valueType: 'select',
            valueEnum: rackEnum,
            render: (_dom: React.ReactNode, { s1200Config }: DeviceItem) => s1200Config?.rack,
          },
          {
            title: formatMessage({ id: 'device.form.title.slot' }),
            dataIndex: ['config', 's1200Config', 'slot'],
            required: true,
            valueType: 'select',
            valueEnum: slotEnum,
            render: (_dom: React.ReactNode, { s1200Config }: DeviceItem) => s1200Config?.slot,
          },
        ],
      },
    ],
  },
];
