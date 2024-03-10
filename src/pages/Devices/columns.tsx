import HeadersTitle from '@/components/HttpHeaders/Title';
import ProSegmented from '@/components/ProSegmented';
import StateTag from '@/components/StateTag';
import UnitTitle from '@/components/UnitTitle';
import { getHwifaceList, getOsGetVideos } from '@/services/rulex/jiekouguanli';
import { getDevicesGroup } from '@/services/rulex/shebeiguanli';
import { getSchemaList } from '@/services/rulex/shujumoxing';
import { boolEnum, boolMap } from '@/utils/enum';
import { ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import type { DeviceItem } from '.';
import {
  inputModeEnum,
  modeEnum,
  outputEncodeEnum,
  outputModeEnum,
  parseAisEnum,
  plcModelEnum,
  rackEnum,
  slotEnum,
  typeEnum,
} from './enum';

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
    valueEnum: typeEnum,
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
      if (type === 'GENERIC_CAMERA') return [];

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

// autoRequest 是否启动轮询
export const autoRequestConfig = [
  {
    title: '是否启动轮询',
    dataIndex: ['config', 'commonConfig', 'autoRequest'],
    required: true,
    transform: (value: string, namePath: string, allValue: Record<string, any>) => ({
      config: {
        commonConfig: { ...allValue, autoRequest: boolMap[value] },
      },
    }),
    convertValue: (value: boolean) => value?.toString(),
    renderFormItem: () => <ProSegmented width="md" />,
    render: (_: any, { commonConfig }: DeviceItem) => (
      <Tag color={boolEnum[commonConfig?.autoRequest]?.color}>
        {boolEnum[commonConfig?.autoRequest]?.text}
      </Tag>
    ),
  },
];

// mode 工作模式
export const modeConfig = [
  {
    title: '工作模式',
    dataIndex: ['config', 'commonConfig', 'mode'],
    valueType: 'select',
    valueEnum: modeEnum,
    required: true,
    render: (_: any, { commonConfig }: DeviceItem) => commonConfig?.mode,
  },
];

// timeout 超时时间
export const timeoutConfig = [
  {
    title: <UnitTitle title="连接超时" />,
    dataIndex: ['config', 'commonConfig', 'timeout'],
    valueType: 'digit',
    required: true,
    fieldProps: {
      placeholder: '请输入连接超时时间（毫秒）',
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入连接超时时间（毫秒）',
        },
      ],
    },
    render: (_: any, { commonConfig }: DeviceItem) => commonConfig.timeout,
  },
];

// TCP & UART Config
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
          render: (_: any, { portUuid }: DeviceItem) => portUuid,
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
          fieldProps: {
            placeholder: '请输入请求超时时间（毫秒）',
          },
          formItemProps: {
            rules: [
              {
                required: true,
                message: '请输入请求超时时间（毫秒）',
              },
            ],
          },
          render: (_: any, { hostConfig }: DeviceItem) => hostConfig?.timeout,
        },
        {
          title: '服务地址',
          dataIndex: ['config', 'hostConfig', 'host'],
          required: true,
          render: (_: any, { hostConfig }: DeviceItem) => hostConfig?.host,
        },
        {
          title: '端口',
          dataIndex: ['config', 'hostConfig', 'port'],
          valueType: 'digit',
          required: true,
          render: (_: any, { hostConfig }: DeviceItem) => hostConfig?.port,
        },
      ],
    },
  ],
  '': [],
};

export const typeConfigColumns = {
  GENERIC_PROTOCOL: [
    {
      title: '通用配置',
      valueType: 'group',
      columns: [
        {
          title: '重试次数',
          dataIndex: ['config', 'commonConfig', 'retryTime'],
          valueType: 'digit',
          required: true,
          render: (_: any, { commonConfig }: DeviceItem) => commonConfig?.retryTime,
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
  GENERIC_MODBUS: [
    {
      title: '通用配置',
      valueType: 'group',
      columns: [...autoRequestConfig, ...modeConfig],
    },
    {
      valueType: 'dependency',
      name: ['config'],
      columns: ({ config }: DeviceItem) => modeColumns[config?.commonConfig?.mode] || [],
    },
  ],
  GENERIC_AIS_RECEIVER: [
    {
      title: '通用配置',
      valueType: 'group',
      columns: [
        {
          title: '是否解析 AIS 报文',
          dataIndex: ['config', 'commonConfig', 'parseAis'],
          required: true,
          transform: (value: string, namePath: string, allValue: Record<string, any>) => ({
            config: {
              commonConfig: { ...allValue, parseAis: boolMap[value] },
            },
          }),
          convertValue: (value: boolean) => value?.toString(),
          renderFormItem: () => <ProSegmented width="md" />,
          render: (_: any, { commonConfig }: DeviceItem) => (
            <Tag color={parseAisEnum[commonConfig?.parseAis]?.color}>
              {parseAisEnum[commonConfig?.parseAis]?.text}
            </Tag>
          ),
        },
        {
          title: '主机序列号',
          dataIndex: ['config', 'commonConfig', 'gwsn'],
          required: true,
          render: (_: any, { commonConfig }: DeviceItem) => commonConfig?.gwsn,
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
  SIEMENS_PLC: [
    {
      title: '通用配置',
      valueType: 'group',
      columns: [
        ...autoRequestConfig,
        ...timeoutConfig,
        {
          title: <UnitTitle title="心跳超时时间" />,
          dataIndex: ['config', 'commonConfig', 'idleTimeout'],
          valueType: 'digit',
          required: true,
          fieldProps: {
            placeholder: '请输入心跳超时时间（毫秒）',
          },
          formItemProps: {
            rules: [
              {
                required: true,
                message: '请输入心跳超时时间（毫秒）',
              },
            ],
          },
          render: (_: any, { commonConfig }: DeviceItem) => commonConfig?.idleTimeout,
        },
        {
          title: 'PLC 地址',
          dataIndex: ['config', 'commonConfig', 'host'],
          required: true,
          render: (_: any, { commonConfig }: DeviceItem) => commonConfig?.host,
        },
        {
          title: '型号',
          dataIndex: ['config', 'commonConfig', 'model'],
          required: true,
          valueType: 'select',
          valueEnum: plcModelEnum,
          render: (_: any, { commonConfig }: DeviceItem) => plcModelEnum[commonConfig?.model],
        },
        {
          title: '机架号',
          dataIndex: ['config', 'commonConfig', 'rack'],
          required: true,
          valueType: 'select',
          valueEnum: rackEnum,
          render: (_: any, { commonConfig }: DeviceItem) => commonConfig?.rack,
        },
        {
          title: '插槽号',
          dataIndex: ['config', 'commonConfig', 'slot'],
          required: true,
          valueType: 'select',
          valueEnum: slotEnum,
          render: (_: any, { commonConfig }: DeviceItem) => commonConfig?.slot,
        },
      ],
    },
  ],
  GENERIC_HTTP_DEVICE: [
    {
      title: '通用配置',
      valueType: 'group',
      columns: [
        ...autoRequestConfig,
        ...timeoutConfig,
        {
          title: <UnitTitle title="采集频率" />,
          dataIndex: ['config', 'commonConfig', 'frequency'],
          valueType: 'digit',
          required: true,
          fieldProps: {
            placeholder: '请输入采集频率（毫秒）',
          },
          formItemProps: {
            rules: [
              {
                required: true,
                message: '请输入采集频率（毫秒）',
              },
            ],
          },
          render: (_: any, { commonConfig }: DeviceItem) => commonConfig.frequency,
        },
      ],
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
          render: (_: any, { httpConfig }: DeviceItem) => httpConfig.url,
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
                              message: 'value 不能为空',
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
          render: (_: any, { httpConfig }: DeviceItem) => {
            const headers = httpConfig?.headers;
            return Object.keys(headers)?.length > 0 ? <div /> : null;
          },
        },
      ],
    },
  ],
  GENERIC_CAMERA: [
    {
      title: '通用配置',
      valueType: 'group',
      columns: [
        {
          title: '输入模式',
          dataIndex: ['config', 'inputMode'],
          valueType: 'select',
          valueEnum: inputModeEnum,
          required: true,
          fieldProps: {
            allowClear: false,
          },
          render: (_: any, { inputMode }: DeviceItem) => inputModeEnum[inputMode],
        },
        {
          valueType: 'dependency',
          name: ['config'],
          columns: ({ config }: DeviceItem) => [
            {
              title: '视频采集源',
              dataIndex: ['config', 'inputAddr'],
              required: true,
              request: async () => {
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
              },
              renderFormItem: () =>
                config.inputMode === 'LOCAL_CAMERA' ? (
                  <ProFormSelect options={[]} noStyle />
                ) : (
                  <ProFormText width="md" noStyle />
                ),
              render: (_: any, { inputAddr }: DeviceItem) => inputAddr,
            },
          ],
        },
        {
          title: '输出模式',
          dataIndex: ['config', 'outputMode'],
          valueType: 'select',
          valueEnum: outputModeEnum,
          required: true,
          fieldProps: {
            allowClear: false,
          },
          render: (_: any, { outputMode }: DeviceItem) => outputModeEnum[outputMode],
        },
        {
          title: '输出编码',
          dataIndex: ['config', 'outputEncode'],
          valueType: 'select',
          valueEnum: outputEncodeEnum,
          required: true,
          fieldProps: {
            allowClear: false,
          },
          render: (_: any, { outputEncode }: DeviceItem) => outputEncodeEnum[outputEncode],
        },
        {
          valueType: 'dependency',
          name: ['config'],
          columns: ({ config }: DeviceItem) => {
            const mode = config?.outputMode;

            return [
              {
                title: '输出地址',
                dataIndex: ['config', 'outputAddr'],
                hideInForm: mode !== 'REMOTE_STREAM_SERVER',
                render: (_: any, { outputAddr }: DeviceItem) => outputAddr,
              },
            ];
          },
        },
      ],
    },
  ],
};

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
