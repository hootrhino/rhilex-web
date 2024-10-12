import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getIntl, getLocale } from '@umijs/max';
import { dataModeOption } from '../enum';

const intl = getIntl(getLocale());

export const UDP_TARGET = [
  {
    title: intl.formatMessage({ id: 'outend.table.title.cacheOfflineData' }),
    dataIndex: ['config', 'commonConfig', 'cacheOfflineData'],
    required: true,
    renderFormItem: () => <ProSegmented width="md" />,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => (
      <ProTag type={StatusType.BOOL}>{commonConfig?.cacheOfflineData}</ProTag>
    ),
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.allowPing' }),
    dataIndex: ['config', 'commonConfig', 'allowPing'],
    required: true,
    renderFormItem: () => <ProSegmented width="md" />,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => (
      <ProTag type={StatusType.BOOL}>{commonConfig?.allowPing}</ProTag>
    ),
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.pingPacket' }),
    dataIndex: ['config', 'commonConfig', 'pingPacket'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.pingPacket,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.timeout' }),
    dataIndex: ['config', 'commonConfig', 'timeout'],
    required: true,
    valueType: 'digit',
    fieldProps: {
      addonAfter: 'ms',
    },
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => (
      <UnitValue value={commonConfig?.timeout} />
    ),
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.dataMode' }),
    dataIndex: ['config', 'commonConfig', 'dataMode'],
    valueEnum: dataModeOption,
    valueType: 'select',
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) =>
      dataModeOption[commonConfig?.dataMode],
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.host' }),
    dataIndex: ['config', 'commonConfig', 'host'],
    required: true,
    copyable: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.host,
  },
  {
    title: intl.formatMessage({ id: 'form.title.port' }),
    dataIndex: ['config', 'commonConfig', 'port'],
    valueType: 'digit',
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.port,
  },
];
