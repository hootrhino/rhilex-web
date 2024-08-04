import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getHwifaceList } from '@/services/rulex/jiekouguanli';
import { getDevicesGroup } from '@/services/rulex/shebeiguanli';
import { Product } from '@/utils/enum';
import { getIntl, getLocale } from '@umijs/max';
import { Space } from 'antd';
import type { DeviceItem } from '..';
import { DeviceType, deviceTypeOptions } from '../enum';
import { BACNET_ROUTER_GW_CONFIG } from './bacnetRouterGW';
import { GENERIC_BACNET_IP_CONFIG } from './genericBacnetIP';
import { GENERIC_HTTP_DEVICE_CONFIG } from './genericHttpDevice';
import { GENERIC_MODBUS_MASTER_CONFIG } from './genericModbusMaster';
import { GENERIC_MODBUS_SLAVER_CONFIG } from './genericModbusSlaver';
import { GENERIC_SNMP_CONFIG } from './genericSnmp';
import { GENERIC_UART_PROTOCOL_CONFIG } from './genericUartProtocol';
import { GENERIC_UART_RW_CONFIG } from './genericUartRW';
import { SIEMENS_PLC_CONFIG } from './siemensPLC';
// TODO import { SMART_HOME_CONTROLLER_CONFIG } from './smartHomeController';
import type { LabeledValue } from 'antd/es/select';
import { TENCENT_IOTHUB_GATEWAY_CONFIG } from './tencentIothubGateway';

const intl = getIntl(getLocale());

/**
 * TCP & UART 配置
 */
export const modeColumns = {
  UART: [
    {
      title: intl.formatMessage({ id: 'device.form.title.group.port' }),
      valueType: 'group',
      key: 'portConfig',
      columns: [
        {
          title: intl.formatMessage({ id: 'device.form.title.portUuid' }),
          dataIndex: ['config', 'portUuid'],
          valueType: 'select',
          required: true,
          fieldProps: {
            optionRender: (option: LabeledValue) => (
              <Space>
                <span>{option?.label}</span>
                <span className="text-[12px] text-[#000000A6]">{option?.value}</span>
              </Space>
            ),
          },
          request: async () => {
            const { data } = await getHwifaceList();

            return data.map((item) => ({ label: item.name, value: item.uuid }));
          },
          render: (_dom: React.ReactNode, { portUuid }: DeviceItem) => portUuid,
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
          title: intl.formatMessage({ id: 'device.form.title.port' }),
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
export const baseColumns = (product: Product) => [
  {
    title: 'UUID',
    dataIndex: 'uuid',
    ellipsis: true,
    copyable: true,
    hideInForm: true,
    hideInDescriptions: true,
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.name' }),
    dataIndex: 'name',
    required: true,
    ellipsis: true,
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.type' }),
    dataIndex: 'type',
    valueType: 'select',
    required: true,
    ellipsis: true,
    valueEnum: deviceTypeOptions[product],
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
    title: intl.formatMessage({ id: 'device.form.title.state' }),
    dataIndex: 'state',
    hideInForm: true,
    width: 100,
    renderText: (state: number) => <ProTag type={StatusType.DEVICE}>{state}</ProTag>,
  },
  {
    title: intl.formatMessage({ id: 'table.desc' }),
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
  [DeviceType.GENERIC_MODBUS_MASTER]: GENERIC_MODBUS_MASTER_CONFIG,
  [DeviceType.GENERIC_MODBUS_SLAVER]: GENERIC_MODBUS_SLAVER_CONFIG,
  [DeviceType.SIEMENS_PLC]: SIEMENS_PLC_CONFIG,
  [DeviceType.GENERIC_HTTP_DEVICE]: GENERIC_HTTP_DEVICE_CONFIG,
  // TODO [DeviceType.SMART_HOME_CONTROLLER]: SMART_HOME_CONTROLLER_CONFIG,
  [DeviceType.GENERIC_SNMP]: GENERIC_SNMP_CONFIG,
  [DeviceType.GENERIC_BACNET_IP]: GENERIC_BACNET_IP_CONFIG,
  [DeviceType.BACNET_ROUTER_GW]: BACNET_ROUTER_GW_CONFIG,
  [DeviceType.TENCENT_IOTHUB_GATEWAY]: TENCENT_IOTHUB_GATEWAY_CONFIG,
  [DeviceType.GENERIC_UART_RW]: GENERIC_UART_RW_CONFIG,
};

/**
 * 设备配置
 */
export const columns = (product: Product) => [
  {
    valueType: 'group',
    columns: baseColumns(product),
  },
  {
    valueType: 'dependency',
    name: ['type'],
    columns: ({ type }: any) => typeConfigColumns[type] || [],
  },
];
