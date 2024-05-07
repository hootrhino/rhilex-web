import HeadersTitle from '@/components/HttpHeaders/Title';
import ProSegmented from '@/components/ProSegmented';
import StateTag, { StateType } from '@/components/StateTag';
import UnitTitle from '@/components/UnitTitle';
import { getHwifaceList, getOsGetVideos } from '@/services/rulex/jiekouguanli';
import { getDevicesGroup } from '@/services/rulex/shebeiguanli';
import { FormItemType, Product } from '@/utils/enum';
import { pick } from '@/utils/redash';
import { getPlayAddress, validateFormItem } from '@/utils/utils';
import { ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { getIntl, getLocale } from '@umijs/max';
import { AutoComplete, Space, Typography } from 'antd';
import type { FormItemProps, Rule } from 'antd/es/form';
import type { DeviceItem } from '.';
import {
  DeviceMode,
  DeviceType,
  deviceTypeOptions,
  InputMode,
  InputModeOption,
  OutputEncode,
  OutputEncodeOption,
  OutputMode,
  OutputModeOption,
  plcModelOptions,
  rackEnum,
  slotEnum,
  snmpVersionEnum,
  Transport,
} from './enum';

const intl = getIntl(getLocale());

/**
 * 创建配置项 autoRequest/enableGroup/enableOptimize/parseAis
 */
const createBoolConfig = (title: string, dataIndex: string, type = StateType.BOOL) => {
  return [
    {
      title,
      dataIndex: ['config', 'commonConfig', dataIndex],
      required: true,
      renderFormItem: () => <ProSegmented width="md" />,
      render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
        <StateTag state={commonConfig[dataIndex]} type={type} key={dataIndex} />
      ),
    },
  ];
};

/**
 * mode 工作模式配置
 */
export const modeConfig = [
  {
    title: intl.formatMessage({ id: 'device.form.title.mode' }),
    dataIndex: ['config', 'commonConfig', 'mode'],
    valueType: 'select',
    valueEnum: DeviceMode,
    required: true,
    render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.mode,
  },
];

/**
 * timeout 超时时间配置
 */
export const timeoutConfig = (title: string, formItemProps?: FormItemProps, tooltip?: string) => [
  {
    title: <UnitTitle title={title} />,
    dataIndex: ['config', 'commonConfig', 'timeout'],
    valueType: 'digit',
    required: true,
    formItemProps,
    tooltip,
    render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig.timeout,
  },
];

/**
 * frequency 请求频率
 */
export const frequencyConfig = (title: string) => [
  {
    title: <UnitTitle title={title} />,
    dataIndex: ['config', 'commonConfig', 'frequency'],
    valueType: 'digit',
    required: true,
    render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig.frequency,
  },
];

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
          request: async () => {
            const { data } = await getHwifaceList();

            return data?.map((item) => ({
              label: (
                <Space>
                  <span>{item?.name}</span>
                  <span className="text-[12px] text-[#000000A6]">{item?.alias}</span>
                </Space>
              ),
              value: item.uuid,
            }));
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
          title: (
            <UnitTitle title={intl.formatMessage({ id: 'device.form.title.timeout.request' })} />
          ),
          dataIndex: ['config', 'hostConfig', 'timeout'],
          valueType: 'digit',
          required: true,
          render: (_dom: React.ReactNode, { hostConfig }: DeviceItem) => hostConfig?.timeout,
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
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.type' }),
    dataIndex: 'type',
    valueType: 'select',
    required: true,
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
    renderText: (state: number) => <StateTag state={state} />,
  },
  {
    title: intl.formatMessage({ id: 'table.desc' }),
    dataIndex: 'description',
  },
];

/**
 * 类型配置
 */
export const typeConfigColumns = {
  [DeviceType.GENERIC_UART_PROTOCOL]: [
    {
      title: intl.formatMessage({ id: 'device.form.title.group.common' }),
      valueType: 'group',
      columns: [
        {
          title: intl.formatMessage({ id: 'device.form.title.retryTime' }),
          dataIndex: ['config', 'commonConfig', 'retryTime'],
          valueType: 'digit',
          required: true,
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.retryTime,
        },
        {
          title: intl.formatMessage({ id: 'device.form.title.mode' }),
          dataIndex: ['config', 'commonConfig', 'mode'],
          valueType: 'select',
          valueEnum: [DeviceMode.UART],
          required: true,
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.mode,
        },
        ...timeoutConfig(
          intl.formatMessage({ id: 'device.form.title.timeout.uart' }),
          {
            rules: [
              {
                required: true,
                message: intl.formatMessage({ id: 'device.form.placeholder.uartTimeout' }),
              },
              {
                validator: (_rule: Rule, value: number) =>
                  validateFormItem(value, FormItemType.TIMEOUT),
              },
            ],
          },
          '该值是串口最佳读完整包周期，请不要随便修改，修改之前最好知道这个参数是什么含义。如果一定要修改，建议这个值在 30-1000ms 之间',
        ),
      ],
    },
    {
      valueType: 'dependency',
      name: ['config'],
      columns: ({ config }: DeviceItem) => modeColumns[config?.commonConfig?.mode] || [],
    },
  ],
  [DeviceType.GENERIC_MODBUS]: [
    {
      title: intl.formatMessage({ id: 'device.form.title.group.common' }),
      valueType: 'group',
      columns: [
        ...createBoolConfig(
          intl.formatMessage({ id: 'device.form.title.autoRequest' }),
          'autoRequest',
        ),
        ...createBoolConfig(
          intl.formatMessage({ id: 'device.form.title.enableOptimize' }),
          'enableOptimize',
        ),
        {
          title: intl.formatMessage({ id: 'device.form.title.maxRegNum' }),
          dataIndex: ['config', 'commonConfig', 'maxRegNum'],
          valueType: 'digit',
          required: true,
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.maxRegNum,
        },
        ...modeConfig,
      ],
    },
    {
      valueType: 'dependency',
      name: ['config'],
      columns: ({ config }: DeviceItem) => modeColumns[config?.commonConfig?.mode] || [],
    },
  ],
  // [DeviceType.GENERIC_AIS_RECEIVER]: [
  //   {
  //     title: '通用配置',
  //     valueType: 'group',
  //     columns: [
  //       ...createBoolConfig('解析 AIS 报文', 'parseAis', StateType.PARSE),
  //       {
  //         title: '主机序列号',
  //         dataIndex: ['config', 'commonConfig', 'gwsn'],
  //         required: true,
  //         render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) =>
  //           commonConfig?.gwsn || '-',
  //       },
  //       ...modeConfig,
  //     ],
  //   },
  //   {
  //     valueType: 'dependency',
  //     name: ['config'],
  //     columns: ({ config }: DeviceItem) => modeColumns[config?.commonConfig?.mode] || [],
  //   },
  // ],
  [DeviceType.SIEMENS_PLC]: [
    {
      title: intl.formatMessage({ id: 'device.form.title.group.common' }),
      valueType: 'group',
      columns: [
        ...createBoolConfig(
          intl.formatMessage({ id: 'device.form.title.autoRequest' }),
          'autoRequest',
        ),
        ...timeoutConfig(intl.formatMessage({ id: 'device.form.title.timeout.connect' })),
        {
          title: <UnitTitle title={intl.formatMessage({ id: 'device.form.title.timeout.idle' })} />,
          dataIndex: ['config', 'commonConfig', 'idleTimeout'],
          valueType: 'digit',
          required: true,
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) =>
            commonConfig?.idleTimeout,
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
          title: intl.formatMessage({ id: 'device.form.title.slot.plc' }),
          dataIndex: ['config', 'commonConfig', 'slot'],
          required: true,
          valueType: 'select',
          valueEnum: slotEnum,
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.slot,
        },
      ],
    },
  ],
  [DeviceType.GENERIC_HTTP_DEVICE]: [
    {
      title: intl.formatMessage({ id: 'device.form.title.group.common' }),
      valueType: 'group',
      columns: [
        ...createBoolConfig(
          intl.formatMessage({ id: 'device.form.title.autoRequest' }),
          'autoRequest',
        ),
        ...timeoutConfig(intl.formatMessage({ id: 'device.form.title.timeout.connect' })),
        ...frequencyConfig(intl.formatMessage({ id: 'device.form.title.frequency' })),
      ],
    },
    {
      title: intl.formatMessage({ id: 'device.form.title.group.http' }),
      valueType: 'group',
      fieldProps: {
        direction: 'vertical',
      },
      key: 'http',
      columns: [
        {
          title: intl.formatMessage({ id: 'device.form.title.url' }),
          dataIndex: ['config', 'httpConfig', 'url'],
          required: true,
          render: (_dom: React.ReactNode, { httpConfig }: DeviceItem) => httpConfig.url,
        },
        {
          valueType: 'formList',
          dataIndex: ['config', 'httpConfig', 'headers'],
          title: <HeadersTitle />,
          columns: [
            {
              valueType: 'group',
              columns: [
                {
                  title: 'key',
                  dataIndex: 'k',
                },
                {
                  valueType: 'dependency',
                  name: ['k', 'v'],
                  columns: ({ k, v }: { k: string; v: string }) => {
                    const isSuccess = !k || (k && v);

                    return [
                      {
                        title: 'value',
                        dataIndex: 'v',
                        fieldProps: {
                          disabled: !k,
                        },
                        formItemProps: {
                          rules: [
                            {
                              required: isSuccess ? false : true,
                              message: intl.formatMessage(
                                { id: 'placeholder.input' },
                                { text: 'value' },
                              ),
                            },
                          ],
                        },
                      },
                    ];
                  },
                },
              ],
            },
          ],
          render: (_dom: React.ReactNode, { httpConfig }: DeviceItem) => {
            const headers = httpConfig?.headers;
            return Object.keys(headers)?.length > 0 ? <div /> : null;
          },
        },
      ],
    },
  ],
  [DeviceType.GENERIC_CAMERA]: [
    {
      title: intl.formatMessage({ id: 'device.form.title.group.common' }),
      valueType: 'group',
      key: 'camera',
      columns: [
        {
          title: intl.formatMessage({ id: 'device.form.title.inputMode' }),
          dataIndex: ['config', 'inputMode'],
          valueType: 'select',
          valueEnum: InputModeOption,
          required: true,
          render: (_dom: React.ReactNode, { inputMode }: DeviceItem) => InputModeOption[inputMode],
        },
        {
          valueType: 'dependency',
          name: ['config'],
          columns: ({ config }: DeviceItem) => [
            {
              title: intl.formatMessage({ id: 'device.form.title.inputAddr' }),
              dataIndex: ['config', 'inputAddr'],
              required: true,
              renderFormItem: () =>
                config.inputMode === InputMode.LOCAL_CAMERA ? (
                  <ProFormSelect
                    noStyle
                    request={async () => {
                      const { data } = await getOsGetVideos();

                      return data?.map((item) => ({
                        label: (
                          <Space>
                            <span>{item?.name}</span>
                            <span className="text-[12px] text-[#000000A6]">{item?.deviceId}</span>
                          </Space>
                        ),
                        value: item.name,
                      }));
                    }}
                  />
                ) : (
                  <ProFormText width="md" noStyle />
                ),
              render: (_dom: React.ReactNode, { inputAddr }: DeviceItem) => inputAddr,
            },
          ],
        },
        {
          title: intl.formatMessage({ id: 'device.form.title.outputMode' }),
          dataIndex: ['config', 'outputMode'],
          valueType: 'select',
          valueEnum: OutputModeOption,
          required: true,
          tooltip: intl.formatMessage({ id: 'device.tooltip.outputMode' }),
          render: (_dom: React.ReactNode, { outputMode }: DeviceItem) =>
            OutputModeOption[outputMode],
        },
        {
          valueType: 'dependency',
          name: ['config'],
          columns: ({ config }: DeviceItem) => {
            const mode = config?.outputMode;

            return [
              {
                title: intl.formatMessage({ id: 'device.form.title.outputEncode' }),
                dataIndex: ['config', 'outputEncode'],
                valueType: 'select',
                valueEnum:
                  mode === OutputMode.REMOTE_STREAM_SERVER
                    ? pick(OutputEncodeOption, [OutputEncode.H264_STREAM])
                    : pick(OutputEncodeOption, [OutputEncode.JPEG_STREAM]),
                required: true,
                render: (_dom: React.ReactNode, { outputEncode }: DeviceItem) =>
                  OutputEncodeOption[outputEncode],
              },
            ];
          },
        },
        {
          valueType: 'dependency',
          name: ['name', 'config'],
          columns: ({ config, name }: DeviceItem) => {
            const mode = config?.outputMode;
            const playUrl = getPlayAddress(name, mode, 'pull');

            return [
              {
                title: intl.formatMessage({ id: 'device.form.title.outputAddr' }),
                dataIndex: ['config', 'outputAddr'],
                hideInForm: mode !== OutputMode.REMOTE_STREAM_SERVER,
                render: (_dom: React.ReactNode, { outputAddr }: DeviceItem) => outputAddr,
              },
              {
                title: (
                  <Typography.Paragraph
                    copyable={{
                      text: `<img src="${playUrl}" width="640" height="480" alt="视频监控" />`,
                    }}
                    className="text-[#00000073]"
                  >
                    {intl.formatMessage({ id: 'device.form.title.playAddr' })}
                  </Typography.Paragraph>
                ),
                dataIndex: ['config', 'playAddr'],
                hideInForm: true,
                hideInDescriptions: mode === OutputMode.REMOTE_STREAM_SERVER,
                render: () => {
                  const htmlCode = `<img src="${playUrl}" width="640" height="480" alt="视频监控" />`;
                  return (
                    <div className="bg-[#9696961A] p-[16px] text-[#2a2e36a6] rounded-[3px] whitespace-pre-wrap break-all">
                      {htmlCode}
                    </div>
                  );
                },
              },
            ];
          },
        },
      ],
    },
  ],
  [DeviceType.SMART_HOME_CONTROLLER]: [
    {
      title: intl.formatMessage({ id: 'device.form.title.group.common' }),
      valueType: 'group',
      columns: [
        ...createBoolConfig(intl.formatMessage({ id: 'device.form.title.autoScan' }), 'autoScan'),
        ...timeoutConfig(intl.formatMessage({ id: 'device.form.title.timeout.scan' })),
        ...frequencyConfig(intl.formatMessage({ id: 'device.form.title.frequency.scan' })),
        {
          title: 'CIDR',
          required: true,
          dataIndex: ['config', 'commonConfig', 'networkCidr'],
          renderFormItem: () => (
            <AutoComplete
              options={[
                { value: '10.0.0.0/16', label: '10.0.0.0/16' },
                { value: '172.168.1.0/24', label: '172.168.1.0/24' },
                { value: '172.168.0.0/16', label: '172.168.0.0/16' },
                { value: '192.168.1.0/24', label: '192.168.1.0/24' },
                { value: '192.168.0.0/16', label: '192.168.0.0/16' },
              ]}
              style={{ width: 328 }}
            />
          ),
          formItemProps: {
            rules: [
              {
                required: true,
                message: intl.formatMessage({ id: 'device.form.placeholder.cidr' }),
              },
              {
                validator: (_rule: Rule, value: string) =>
                  validateFormItem(value, FormItemType.CIDR),
              },
            ],
          },
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig.networkCidr,
        },
        {
          title: intl.formatMessage({ id: 'device.form.title.webHookPort' }),
          dataIndex: ['config', 'commonConfig', 'webHookPort'],
          valueType: 'digit',
          required: true,
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) =>
            commonConfig?.webHookPort,
        },
      ],
    },
  ],
  [DeviceType.GENERIC_SNMP]: [
    {
      title: intl.formatMessage({ id: 'device.form.title.group.common' }),
      valueType: 'group',
      columns: [
        ...createBoolConfig(
          intl.formatMessage({ id: 'device.form.title.autoRequest' }),
          'autoRequest',
        ),
        ...createBoolConfig(
          intl.formatMessage({ id: 'device.form.title.enableGroup' }),
          'enableGroup',
        ),
        ...timeoutConfig(intl.formatMessage({ id: 'device.form.title.timeout.request' })),
        ...frequencyConfig(intl.formatMessage({ id: 'device.form.title.frequency.request' })),
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
          valueEnum: Transport,
          render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) => snmpConfig?.transport,
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
          valueEnum: snmpVersionEnum,
          render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) => `v${snmpConfig?.version}`,
        },
      ],
    },
  ],
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
