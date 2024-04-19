import HeadersTitle from '@/components/HttpHeaders/Title';
import StateTag, { StateType } from '@/components/StateTag';
import UnitTitle from '@/components/UnitTitle';
import { getHwifaceList, getOsGetVideos } from '@/services/rulex/jiekouguanli';
import { getDevicesGroup } from '@/services/rulex/shebeiguanli';
import { getSchemaList } from '@/services/rulex/shujumoxing';
import { FormItemType } from '@/utils/enum';
import { omit, pick } from '@/utils/redash';
import { getPlayAddress, stringToBool, validateFormItem } from '@/utils/utils';
import { ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { AutoComplete, Space, Typography } from 'antd';
import { Rule } from 'antd/es/form';
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

/**
 * autoRequest 是否启动轮询配置
 */
export const autoRequestConfig = [
  {
    title: '启动轮询',
    dataIndex: ['config', 'commonConfig', 'autoRequest'],
    required: true,
    valueType: 'state',
    transform: (value: string, namePath: string, allValue: Record<string, any>) => ({
      config: {
        commonConfig: {
          ...omit(allValue, ['autoRequest', 'enableOptimize']),
          autoRequest: stringToBool(value),
          enableOptimize: stringToBool(allValue.enableOptimize),
        },
      },
    }),
    convertValue: (value: boolean) => value?.toString(),
    render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
      <StateTag state={commonConfig?.autoRequest} type={StateType.BOOL} />
    ),
  },
];

/**
 * mode 工作模式配置
 */
export const modeConfig = [
  {
    title: '工作模式',
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
export const timeoutConfig = (title: string) => [
  {
    title: <UnitTitle title={title} />,
    dataIndex: ['config', 'commonConfig', 'timeout'],
    valueType: 'digit',
    required: true,
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
      title: '串口配置',
      valueType: 'group',
      key: 'portConfig',
      columns: [
        {
          title: '系统串口',
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
      title: 'TCP 配置',
      valueType: 'group',
      columns: [
        {
          title: <UnitTitle title="请求超时" />,
          dataIndex: ['config', 'hostConfig', 'timeout'],
          valueType: 'digit',
          required: true,
          render: (_dom: React.ReactNode, { hostConfig }: DeviceItem) => hostConfig?.timeout,
        },
        {
          title: '服务地址',
          dataIndex: ['config', 'hostConfig', 'host'],
          required: true,
          render: (_dom: React.ReactNode, { hostConfig }: DeviceItem) => hostConfig?.host,
        },
        {
          title: '端口',
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
    title: '设备名称',
    dataIndex: 'name',
    required: true,
  },
  {
    title: '设备类型',
    dataIndex: 'type',
    valueType: 'select',
    required: true,
    valueEnum: deviceTypeOptions,
  },
  {
    title: '设备分组',
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
    title: '设备状态',
    dataIndex: 'state',
    hideInForm: true,
    renderText: (state: number) => <StateTag state={state} />,
  },
  {
    valueType: 'dependency',
    name: ['type'],
    hideInTable: true,
    columns: ({ type }: DeviceItem) => {
      if (
        [DeviceType.GENERIC_CAMERA, DeviceType.SHELLY_GEN1_PROXY_SERVER].includes(
          type as DeviceType,
        )
      )
        return [];

      return [
        {
          title: '数据模型',
          dataIndex: 'schemaId',
          valueType: 'select',
          request: async () => {
            const { data } = await getSchemaList();

            return data?.map((item) => ({
              label: item?.name,
              value: item.uuid,
            }));
          },
        },
      ];
    },
  },
  {
    title: '备注',
    dataIndex: 'description',
  },
];

/**
 * 类型配置
 */
export const typeConfigColumns = {
  [DeviceType.GENERIC_PROTOCOL]: [
    {
      title: '通用配置',
      valueType: 'group',
      columns: [
        {
          title: '重试次数',
          dataIndex: ['config', 'commonConfig', 'retryTime'],
          valueType: 'digit',
          required: true,
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.retryTime,
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
  [DeviceType.GENERIC_MODBUS]: [
    {
      title: '通用配置',
      valueType: 'group',
      columns: [
        ...autoRequestConfig,
        {
          title: '批量采集',
          dataIndex: ['config', 'commonConfig', 'enableOptimize'],
          required: true,
          valueType: 'state',
          transform: (value: string, namePath: string, allValue: Record<string, any>) => ({
            config: {
              commonConfig: {
                ...omit(allValue, ['autoRequest', 'enableOptimize']),
                enableOptimize: stringToBool(value),
                autoRequest: stringToBool(allValue.autoRequest),
              },
            },
          }),
          convertValue: (value: boolean) => value?.toString(),
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
            <StateTag state={commonConfig?.enableOptimize} type={StateType.BOOL} />
          ),
        },
        {
          title: '最大点位数',
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
  [DeviceType.GENERIC_AIS_RECEIVER]: [
    {
      title: '通用配置',
      valueType: 'group',
      columns: [
        {
          title: '解析 AIS 报文',
          dataIndex: ['config', 'commonConfig', 'parseAis'],
          required: true,
          valueType: 'state',
          transform: (value: string, namePath: string, allValue: Record<string, any>) => ({
            config: {
              commonConfig: { ...allValue, parseAis: stringToBool(value) },
            },
          }),
          convertValue: (value: boolean) => value?.toString(),
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
            <StateTag state={commonConfig?.parseAis} type={StateType.PARSE} />
          ),
        },
        {
          title: '主机序列号',
          dataIndex: ['config', 'commonConfig', 'gwsn'],
          required: true,
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) =>
            commonConfig?.gwsn || '-',
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
  [DeviceType.SIEMENS_PLC]: [
    {
      title: '通用配置',
      valueType: 'group',
      columns: [
        ...autoRequestConfig,
        ...timeoutConfig('连接超时'),
        {
          title: <UnitTitle title="心跳超时" />,
          dataIndex: ['config', 'commonConfig', 'idleTimeout'],
          valueType: 'digit',
          required: true,
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) =>
            commonConfig?.idleTimeout,
        },
        {
          title: 'PLC 地址',
          dataIndex: ['config', 'commonConfig', 'host'],
          required: true,
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.host,
        },
        {
          title: '型号',
          dataIndex: ['config', 'commonConfig', 'model'],
          required: true,
          valueType: 'select',
          valueEnum: plcModelOptions,
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) =>
            plcModelOptions[commonConfig?.model],
        },
        {
          title: '机架号',
          dataIndex: ['config', 'commonConfig', 'rack'],
          required: true,
          valueType: 'select',
          valueEnum: rackEnum,
          render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.rack,
        },
        {
          title: '插槽号',
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
      title: '通用配置',
      valueType: 'group',
      columns: [...autoRequestConfig, ...timeoutConfig('连接超时'), ...frequencyConfig('采集频率')],
    },
    {
      title: 'HTTP 配置',
      valueType: 'group',
      fieldProps: {
        direction: 'vertical',
      },
      key: 'http',
      columns: [
        {
          title: '请求地址',
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
                              message: '请输入 value',
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
      title: '通用配置',
      valueType: 'group',
      key: 'camera',
      columns: [
        {
          title: '输入模式',
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
              title: '视频采集源',
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
          title: '输出模式',
          dataIndex: ['config', 'outputMode'],
          valueType: 'select',
          valueEnum: OutputModeOption,
          required: true,
          tooltip: '注意：因为传输格式原因，Jpeg Stream 模式下仅保存了图像信息，没有原始声音',
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
                title: '输出编码',
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
                title: '输出地址',
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
                    外部播放地址
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
  [DeviceType.SHELLY_GEN1_PROXY_SERVER]: [
    {
      title: '通用配置',
      valueType: 'group',
      columns: [
        {
          title: '自动扫描',
          dataIndex: ['config', 'autoScan'],
          required: true,
          valueType: 'state',
          transform: (value: string, namePath: string, allValue: Record<string, any>) => ({
            config: {
              ...omit(allValue, [namePath]),
              autoScan: stringToBool(value),
            },
          }),
          convertValue: (value: boolean) => value?.toString(),
          render: (_dom: React.ReactNode, { autoScan }: DeviceItem) => (
            <StateTag state={autoScan} type={StateType.BOOL} />
          ),
        },
        {
          title: <UnitTitle title="扫描超时" />,
          dataIndex: ['config', 'timeout'],
          valueType: 'digit',
          required: true,
          render: (_dom: React.ReactNode, { timeout }: DeviceItem) => timeout,
        },
        {
          title: <UnitTitle title="扫描频率" />,
          dataIndex: ['config', 'frequency'],
          valueType: 'digit',
          required: true,
          render: (_dom: React.ReactNode, { frequency }: DeviceItem) => frequency,
        },
        {
          title: 'CIDR',
          required: true,
          dataIndex: ['config', 'networkCidr'],
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
                message: '请输入 CIDR',
              },
              {
                validator: (_rule: Rule, value: string) =>
                  validateFormItem(value, FormItemType.CIDR),
              },
            ],
          },
          render: (_dom: React.ReactNode, { networkCidr }: DeviceItem) => networkCidr,
        },
      ],
    },
  ],
  [DeviceType.GENERIC_SNMP]: [
    {
      title: '通用配置',
      valueType: 'group',
      columns: [...autoRequestConfig, ...timeoutConfig('请求超时'), ...frequencyConfig('请求频率')],
    },
    {
      title: 'SNMP 配置',
      valueType: 'group',
      columns: [
        {
          title: '目标设备',
          dataIndex: ['config', 'snmpConfig', 'target'],
          required: true,
          render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) => snmpConfig?.target,
        },
        {
          title: '目标端口',
          dataIndex: ['config', 'snmpConfig', 'port'],
          valueType: 'digit',
          required: true,
          render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) => snmpConfig?.port,
        },
        {
          title: '传输协议',
          dataIndex: ['config', 'snmpConfig', 'transport'],
          required: true,
          valueType: 'select',
          valueEnum: Transport,
          render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) => snmpConfig?.transport,
        },
        {
          title: '社区名称',
          dataIndex: ['config', 'snmpConfig', 'community'],
          required: true,
          render: (_dom: React.ReactNode, { snmpConfig }: DeviceItem) => snmpConfig?.community,
        },
        {
          title: '协议版本',
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
