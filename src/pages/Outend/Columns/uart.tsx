import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { baudRateEnum, dataBitsEnum, parityEnum, stopBitsEnum } from '@/pages/Device/enum';
import { getHwifaceList } from '@/services/rhilex/jiekouguanli';
import { getIntl, getLocale } from '@umijs/max';
import { dataModeOption } from '../enum';

const intl = getIntl(getLocale());

export const uartColumns = [
  {
    title: intl.formatMessage({ id: 'form.title.timeout' }),
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
    title: intl.formatMessage({ id: 'form.title.baudRate' }),
    dataIndex: ['config', 'uartConfig', 'baudRate'],
    required: true,
    valueType: 'select',
    valueEnum: baudRateEnum,
    render: (_dom: React.ReactNode, uartConfig: Record<string, any>) => uartConfig?.baudRate,
  },
  {
    title: intl.formatMessage({ id: 'form.title.dataBits' }),
    dataIndex: ['config', 'uartConfig', 'dataBits'],
    required: true,
    valueType: 'select',
    valueEnum: dataBitsEnum,
    render: (_dom: React.ReactNode, uartConfig: Record<string, any>) => uartConfig?.dataBits,
  },
  {
    title: intl.formatMessage({ id: 'form.title.parity' }),
    dataIndex: ['config', 'uartConfig', 'parity'],
    required: true,
    valueType: 'select',
    valueEnum: parityEnum,
    render: (_dom: React.ReactNode, uartConfig: Record<string, any>) =>
      parityEnum[uartConfig?.parity],
  },
  {
    title: intl.formatMessage({ id: 'form.title.stopBits' }),
    dataIndex: ['config', 'uartConfig', 'stopBits'],
    required: true,
    valueType: 'select',
    valueEnum: stopBitsEnum,
    render: (_dom: React.ReactNode, uartConfig: Record<string, any>) => uartConfig?.stopBits,
  },
  {
    title: intl.formatMessage({ id: 'form.title.uart' }),
    dataIndex: ['config', 'uartConfig', 'uart'],
    required: true,
    valueType: 'select',
    request: async () => {
      const { data } = await getHwifaceList();

      return data.map((item) => ({ label: item.name, value: item.name }));
    },
    render: (_dom: React.ReactNode, uartConfig: Record<string, any>) => uartConfig?.uart,
  },
];

export const GENERIC_UART_TARGET = [
  {
    title: intl.formatMessage({ id: 'outend.table.title.cacheOfflineData' }),
    dataIndex: ['config', 'cacheOfflineData'],
    required: true,
    renderFormItem: () => <ProSegmented width="md" />,
    renderText: (cacheOfflineData: boolean) => (
      <ProTag type={StatusType.BOOL}>{cacheOfflineData}</ProTag>
    ),
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.allowPing' }),
    dataIndex: ['config', 'allowPing'],
    required: true,
    renderFormItem: () => <ProSegmented width="md" />,
    renderText: (allowPing: boolean) => <ProTag type={StatusType.BOOL}>{allowPing}</ProTag>,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.pingPacket' }),
    dataIndex: ['config', 'pingPacket'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.timeout' }),
    dataIndex: ['config', 'timeout'],
    required: true,
    valueType: 'digit',
    fieldProps: {
      addonAfter: 'ms',
    },
    render: (timeout: number) => <UnitValue value={timeout} />,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.dataMode' }),
    dataIndex: ['config', 'dataMode'],
    valueEnum: dataModeOption,
    valueType: 'select',
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.group.port' }),
    valueType: 'group',
    columns: uartColumns,
    hideInDescriptions: true,
  },
];
