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
import { BACNET_ROUTER_GW } from './bacnetRouterGW';
import { GENERIC_BACNET_IP } from './genericBacnetIP';
import { GENERIC_HTTP_DEVICE } from './genericHttpDevice';
import { GENERIC_MBUS_MASTER } from './genericMBusMaster';
import { GENERIC_MODBUS_MASTER } from './genericModbusMaster';
import { GENERIC_MODBUS_SLAVER } from './genericModbusSlaver';
import { GENERIC_SNMP } from './genericSnmp';
import { GENERIC_UART_RW } from './genericUartRW';
import { GENERIC_USER_PROTOCOL } from './genericUserProtocol';
import { ITHINGS_IOTHUB_GATEWAY } from './ithings';
import { National_Standard } from './nationalStandard';
import { SIEMENS_PLC } from './siemensPLC';
import { TENCENT_IOTHUB_GATEWAY } from './tencentCloud';

const { formatMessage } = getIntl(getLocale());

/**
 * TCP & UART 配置
 */
export const modeColumns = {
  UART: [
    {
      title: formatMessage({ id: 'device.form.title.group.port' }),
      valueType: 'group',
      columns: [
        {
          title: formatMessage({ id: 'form.title.timeout' }),
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
          title: formatMessage({ id: 'form.title.baudRate' }),
          dataIndex: ['config', 'uartConfig', 'baudRate'],
          required: true,
          valueType: 'select',
          valueEnum: baudRateEnum,
          render: (_dom: React.ReactNode, { uartConfig }: DeviceItem) => uartConfig?.baudRate,
        },
        {
          title: formatMessage({ id: 'form.title.dataBits' }),
          dataIndex: ['config', 'uartConfig', 'dataBits'],
          required: true,
          valueType: 'select',
          valueEnum: dataBitsEnum,
          render: (_dom: React.ReactNode, { uartConfig }: DeviceItem) => uartConfig?.dataBits,
        },
        {
          title: formatMessage({ id: 'form.title.parity' }),
          dataIndex: ['config', 'uartConfig', 'parity'],
          required: true,
          valueType: 'select',
          valueEnum: parityEnum,
          render: (_dom: React.ReactNode, { uartConfig }: DeviceItem) =>
            parityEnum[uartConfig?.parity],
        },
        {
          title: formatMessage({ id: 'form.title.stopBits' }),
          dataIndex: ['config', 'uartConfig', 'stopBits'],
          required: true,
          valueType: 'select',
          valueEnum: stopBitsEnum,
          render: (_dom: React.ReactNode, { uartConfig }: DeviceItem) => uartConfig?.stopBits,
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
          render: (_dom: React.ReactNode, { uartConfig }: DeviceItem) => uartConfig?.uart,
        },
      ],
    },
  ],
  TCP: [
    {
      title: formatMessage({ id: 'device.form.title.group' }, { type: 'TCP' }),
      valueType: 'group',
      columns: [
        {
          title: formatMessage({ id: 'device.form.title.timeout.request' }),
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
          title: formatMessage({ id: 'device.form.title.host' }),
          dataIndex: ['config', 'hostConfig', 'host'],
          required: true,
          render: (_dom: React.ReactNode, { hostConfig }: DeviceItem) => hostConfig?.host,
        },
        {
          title: formatMessage({ id: 'form.title.port' }),
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
export const baseColumns = (isFreeTrial?: boolean) => [
  {
    title: 'UUID',
    dataIndex: 'uuid',
    ellipsis: true,
    copyable: true,
    hideInForm: true,
    hideInDescriptions: true,
  },
  {
    title: formatMessage({ id: 'form.title.name' }),
    dataIndex: 'name',
    required: true,
    ellipsis: true,
  },
  {
    title: formatMessage({ id: 'form.title.type' }),
    dataIndex: 'type',
    valueType: 'select',
    required: true,
    ellipsis: true,
    request: () =>
      Object.keys(deviceTypeOptions).map((key) => {
        if (isFreeTrial) {
          return {
            label: deviceTypeOptions[key],
            value: key,
            disabled: ![
              DeviceType.GENERIC_UART_RW,
              DeviceType.GENERIC_MODBUS_MASTER,
              DeviceType.GENERIC_MODBUS_SLAVER,
            ].includes(key as DeviceType),
          };
        }

        return {
          label: deviceTypeOptions[key],
          value: key,
        };
      }),
    renderText: (type: DeviceType) => type && deviceTypeOptions[type],
  },
  {
    title: formatMessage({ id: 'device.form.title.gid' }),
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
    title: formatMessage({ id: 'form.title.status' }),
    dataIndex: 'state',
    hideInForm: true,
    width: 100,
    renderText: (state: number) => <ProTag type={StatusType.DEVICE}>{state || 0}</ProTag>,
  },
  {
    title: formatMessage({ id: 'table.title.desc' }),
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => (description ? description : '-'),
  },
];

/**
 * 类型配置
 */
export const typeConfigColumns = {
  [DeviceType.GENERIC_UART_RW]: GENERIC_UART_RW,
  [DeviceType.GENERIC_USER_PROTOCOL]: GENERIC_USER_PROTOCOL,
  [DeviceType.GENERIC_MODBUS_MASTER]: GENERIC_MODBUS_MASTER,
  [DeviceType.GENERIC_MODBUS_SLAVER]: GENERIC_MODBUS_SLAVER,
  [DeviceType.GENERIC_MBUS_MASTER]: GENERIC_MBUS_MASTER,
  [DeviceType.SIEMENS_PLC]: SIEMENS_PLC,
  [DeviceType.GENERIC_HTTP_DEVICE]: GENERIC_HTTP_DEVICE,
  [DeviceType.GENERIC_SNMP]: GENERIC_SNMP,
  [DeviceType.GENERIC_BACNET_IP]: GENERIC_BACNET_IP,
  [DeviceType.BACNET_ROUTER_GW]: BACNET_ROUTER_GW,
  [DeviceType.DLT6452007_MASTER]: National_Standard,
  [DeviceType.CJT1882004_MASTER]: National_Standard,
  [DeviceType.SZY2062016_MASTER]: National_Standard,
  [DeviceType.TENCENT_IOTHUB_GATEWAY]: TENCENT_IOTHUB_GATEWAY,
  [DeviceType.ITHINGS_IOTHUB_GATEWAY]: ITHINGS_IOTHUB_GATEWAY,
};

/**
 * 设备配置
 */
export const columns = (isFreeTrial: boolean) => [
  {
    valueType: 'group',
    columns: baseColumns(isFreeTrial),
  },
  {
    valueType: 'dependency',
    name: ['type'],
    columns: ({ type }: any) => typeConfigColumns[type] || [],
  },
];
