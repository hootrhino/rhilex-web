import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { baudRateEnum, dataBitsEnum, parityEnum, stopBitsEnum } from '@/pages/Device/enum';
import { getOsUarts } from '@/services/rhilex/xitongshuju';
import { getIntl, getLocale } from '@umijs/max';
import { dataModeOption } from '../enum';

const { formatMessage } = getIntl(getLocale());

export const uartColumns = [
  {
    title: formatMessage({ id: 'form.title.timeout' }),
    dataIndex: ['config', 'uartConfig', 'timeout'],
    required: true,
    valueType: 'digit',
    fieldProps: {
      addonAfter: 'ms',
    },
    render: (_dom: React.ReactNode, uartConfig: Record<string, any>) => (
      <UnitValue value={uartConfig?.timeout} />
    ),
  },
  {
    title: formatMessage({ id: 'form.title.baudRate' }),
    dataIndex: ['config', 'uartConfig', 'baudRate'],
    required: true,
    valueType: 'select',
    valueEnum: baudRateEnum,
    render: (_dom: React.ReactNode, uartConfig: Record<string, any>) => uartConfig?.baudRate,
  },
  {
    title: formatMessage({ id: 'form.title.dataBits' }),
    dataIndex: ['config', 'uartConfig', 'dataBits'],
    required: true,
    valueType: 'select',
    valueEnum: dataBitsEnum,
    render: (_dom: React.ReactNode, uartConfig: Record<string, any>) => uartConfig?.dataBits,
  },
  {
    title: formatMessage({ id: 'form.title.parity' }),
    dataIndex: ['config', 'uartConfig', 'parity'],
    required: true,
    valueType: 'select',
    valueEnum: parityEnum,
    render: (_dom: React.ReactNode, uartConfig: Record<string, any>) =>
      parityEnum[uartConfig?.parity],
  },
  {
    title: formatMessage({ id: 'form.title.stopBits' }),
    dataIndex: ['config', 'uartConfig', 'stopBits'],
    required: true,
    valueType: 'select',
    valueEnum: stopBitsEnum,
    render: (_dom: React.ReactNode, uartConfig: Record<string, any>) => uartConfig?.stopBits,
  },
  {
    title: formatMessage({ id: 'form.title.uart' }),
    dataIndex: ['config', 'uartConfig', 'uart'],
    required: true,
    valueType: 'select',
    request: async () => {
      const { data } = await getOsUarts();

      return data.map((item) => ({ label: item, value: item }));
    },
    render: (_dom: React.ReactNode, uartConfig: Record<string, any>) => uartConfig?.uart,
  },
];

export const GENERIC_UART_TARGET = [
  {
    title: formatMessage({ id: 'outend.table.title.cacheOfflineData' }),
    dataIndex: ['config', 'commonConfig', 'cacheOfflineData'],
    required: true,
    renderFormItem: () => <ProSegmented width="md" />,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => (
      <ProTag type={StatusType.BOOL}>{commonConfig?.cacheOfflineData}</ProTag>
    ),
  },
  {
    title: formatMessage({ id: 'outend.table.title.allowPing' }),
    dataIndex: ['config', 'commonConfig', 'allowPing'],
    required: true,
    renderFormItem: () => <ProSegmented width="md" />,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => (
      <ProTag type={StatusType.BOOL}>{commonConfig?.allowPing}</ProTag>
    ),
  },
  {
    title: formatMessage({ id: 'outend.table.title.pingPacket' }),
    dataIndex: ['config', 'commonConfig', 'pingPacket'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.pingPacket,
  },
  {
    title: formatMessage({ id: 'outend.table.title.timeout' }),
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
    title: formatMessage({ id: 'outend.table.title.dataMode' }),
    dataIndex: ['config', 'commonConfig', 'dataMode'],
    valueEnum: dataModeOption,
    valueType: 'select',
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) =>
      dataModeOption[commonConfig?.dataMode],
  },
  {
    title: formatMessage({ id: 'device.form.title.group.port' }),
    valueType: 'group',
    columns: uartColumns,
    hideInDescriptions: true,
  },
];
