import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getDevicesGroup } from '@/services/rhilex/shebeiguanli';
import { getOsUarts } from '@/services/rhilex/xitongshuju';
import { getIntl, getLocale } from '@umijs/max';
import type { DeviceItem } from '..';
import {
  baudRateEnum,
  dataBitsEnum,
  DeviceType,
  deviceTypeOptions,
  parityEnum,
  stopBitsEnum,
} from '../enum';
import { BACNET_ROUTER_GW_CONFIG } from './bacnetRouterGW';
import { DLT6452007_MASTER_CONFIG } from './dtl6452007Master';
import { GENERIC_BACNET_IP_CONFIG } from './genericBacnetIP';
import { GENERIC_HTTP_DEVICE_CONFIG } from './genericHttpDevice';
import { GENERIC_MBUS_MASTER_CONFIG } from './genericMBusMaster';
import { GENERIC_MODBUS_MASTER_CONFIG } from './genericModbusMaster';
import { GENERIC_MODBUS_SLAVER_CONFIG } from './genericModbusSlaver';
import { GENERIC_SNMP_CONFIG } from './genericSnmp';
import { GENERIC_UART_PROTOCOL_CONFIG } from './genericUartProtocol';
import { GENERIC_UART_RW_CONFIG } from './genericUartRW';
import { ITHINGS_IOTHUB_GATEWAY_CONFIG } from './ithings';
import { SIEMENS_PLC_CONFIG } from './siemensPLC';
import { TENCENT_IOTHUB_GATEWAY_CONFIG } from './tencentCloud';

const intl = getIntl(getLocale());

/**
 * TCP & UART 配置
 */
export const modeColumns = {
  UART: [
    {
      title: intl.formatMessage({ id: 'device.form.title.group.port' }),
      valueType: 'group',
      columns: [
        {
          title: intl.formatMessage({ id: 'form.title.timeout' }),
          dataIndex: ['config', 'uartConfig', 'timeout'],
          required: true,
          valueType: 'digit',
          fieldProps: {
            addonAfter: 'ms',
          },
          render: (_dom: React.ReactNode, { uartConfig }: DeviceItem) => (
            <UnitValue value={uartConfig?.timeout} />
          ),
        },
        {
          title: intl.formatMessage({ id: 'form.title.baudRate' }),
          dataIndex: ['config', 'uartConfig', 'baudRate'],
          required: true,
          valueType: 'select',
          valueEnum: baudRateEnum,
          render: (_dom: React.ReactNode, { uartConfig }: DeviceItem) => uartConfig?.baudRate,
        },
        {
          title: intl.formatMessage({ id: 'form.title.dataBits' }),
          dataIndex: ['config', 'uartConfig', 'dataBits'],
          required: true,
          valueType: 'select',
          valueEnum: dataBitsEnum,
          render: (_dom: React.ReactNode, { uartConfig }: DeviceItem) => uartConfig?.dataBits,
        },
        {
          title: intl.formatMessage({ id: 'form.title.parity' }),
          dataIndex: ['config', 'uartConfig', 'parity'],
          required: true,
          valueType: 'select',
          valueEnum: parityEnum,
          render: (_dom: React.ReactNode, { uartConfig }: DeviceItem) =>
            parityEnum[uartConfig?.parity],
        },
        {
          title: intl.formatMessage({ id: 'form.title.stopBits' }),
          dataIndex: ['config', 'uartConfig', 'stopBits'],
          required: true,
          valueType: 'select',
          valueEnum: stopBitsEnum,
          render: (_dom: React.ReactNode, { uartConfig }: DeviceItem) => uartConfig?.stopBits,
        },
        {
          title: intl.formatMessage({ id: 'form.title.uart' }),
          dataIndex: ['config', 'uartConfig', 'uart'],
          required: true,
          valueType: 'select',
          request: async () => {
            const { data } = await getOsUarts();

            return data.map((item) => ({ label: item, value: item }));
          },
          render: (_dom: React.ReactNode, { uartConfig }: DeviceItem) => uartConfig?.uart,
        },
      ],
    },
  ],
  TCP: [
    {
      title: intl.formatMessage({ id: 'device.form.title.group.tcp' }),
      valueType: 'group',
      columns: [
        {
          key: 'timeout',
          title: intl.formatMessage({ id: 'device.form.title.timeout.request' }),
          dataIndex: ['config', 'hostConfig', 'timeout'],
          valueType: 'digit',
          required: true,
          fieldProps: {
            addonAfter: 'ms',
          },
          render: (_dom: React.ReactNode, { hostConfig }: DeviceItem) => (
            <UnitValue value={hostConfig?.timeout} />
          ),
        },
        {
          title: intl.formatMessage({ id: 'device.form.title.host' }),
          dataIndex: ['config', 'hostConfig', 'host'],
          required: true,
          render: (_dom: React.ReactNode, { hostConfig }: DeviceItem) => hostConfig?.host,
        },
        {
          title: intl.formatMessage({ id: 'form.title.port' }),
          dataIndex: ['config', 'hostConfig', 'port'],
          valueType: 'digit',
          required: true,
          render: (_dom: React.ReactNode, { hostConfig }: DeviceItem) => hostConfig?.port,
        },
      ],
    },
  ],
  '': [],
};

/**
 * 基本配置
 */
export const baseColumns = [
  {
    title: 'UUID',
    dataIndex: 'uuid',
    ellipsis: true,
    copyable: true,
    hideInForm: true,
    hideInDescriptions: true,
  },
  {
    title: intl.formatMessage({ id: 'form.title.name' }),
    dataIndex: 'name',
    required: true,
    ellipsis: true,
  },
  {
    title: intl.formatMessage({ id: 'form.title.type' }),
    dataIndex: 'type',
    valueType: 'select',
    required: true,
    ellipsis: true,
    valueEnum: deviceTypeOptions,
    renderText: (type: DeviceType) => type && deviceTypeOptions[type],
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.gid' }),
    dataIndex: 'gid',
    valueType: 'select',
    required: true,
    hideInTable: true,
    request: async () => {
      const { data } = await getDevicesGroup();

      return data?.map((item) => ({
        label: item?.name,
        value: item.uuid,
      }));
    },
  },
  {
    title: intl.formatMessage({ id: 'form.title.status' }),
    dataIndex: 'state',
    hideInForm: true,
    width: 100,
    renderText: (state: number) => <ProTag type={StatusType.DEVICE}>{state || 0}</ProTag>,
  },
  {
    title: intl.formatMessage({ id: 'table.title.desc' }),
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => (description ? description : '-'),
  },
];

/**
 * 类型配置
 */
export const typeConfigColumns = {
  [DeviceType.GENERIC_UART_PROTOCOL]: GENERIC_UART_PROTOCOL_CONFIG,
  [DeviceType.GENERIC_UART_RW]: GENERIC_UART_RW_CONFIG,
  [DeviceType.GENERIC_MODBUS_MASTER]: GENERIC_MODBUS_MASTER_CONFIG,
  [DeviceType.GENERIC_MODBUS_SLAVER]: GENERIC_MODBUS_SLAVER_CONFIG,
  [DeviceType.GENERIC_MBUS_MASTER]: GENERIC_MBUS_MASTER_CONFIG,
  [DeviceType.SIEMENS_PLC]: SIEMENS_PLC_CONFIG,
  [DeviceType.GENERIC_HTTP_DEVICE]: GENERIC_HTTP_DEVICE_CONFIG,
  [DeviceType.GENERIC_SNMP]: GENERIC_SNMP_CONFIG,
  [DeviceType.GENERIC_BACNET_IP]: GENERIC_BACNET_IP_CONFIG,
  [DeviceType.BACNET_ROUTER_GW]: BACNET_ROUTER_GW_CONFIG,
  [DeviceType.DLT6452007_MASTER]: DLT6452007_MASTER_CONFIG,
  [DeviceType.TENCENT_IOTHUB_GATEWAY]: TENCENT_IOTHUB_GATEWAY_CONFIG,
  [DeviceType.ITHINGS_IOTHUB_GATEWAY]: ITHINGS_IOTHUB_GATEWAY_CONFIG,
};

/**
 * 设备配置
 */
export const columns = [
  {
    valueType: 'group',
    columns: baseColumns,
  },
  {
    valueType: 'dependency',
    name: ['type'],
    columns: ({ type }: any) => typeConfigColumns[type] || [],
  },
];
