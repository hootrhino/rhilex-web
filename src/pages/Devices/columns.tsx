import HeadersTitle from '@/components/HttpHeaders/Title';
import ProSegmented from '@/components/ProSegmented';
import StateTag from '@/components/StateTag';
import UnitTitle from '@/components/UnitTitle';
import { getHwifaceList, getOsGetVideos } from '@/services/rulex/jiekouguanli';
import { getDevicesGroup } from '@/services/rulex/shebeiguanli';
import { getSchemaList } from '@/services/rulex/shujumoxing';
import { omit, pick } from '@/utils/redash';
import { validateName } from '@/utils/regExp';
import { getPlayAddress, stringToBool } from '@/utils/utils';
import { ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Space, Typography } from 'antd';
import type { DeviceItem } from '.';
import {
  DeviceMode,
  deviceTypeOptions,
  InputMode,
  OutputEncode,
  OutputMode,
  plcModelOptions,
  rackEnum,
  slotEnum,
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
    formItemProps: {
      rules: [
        {
          required: true,
          message: '名称不能为空',
        },
        {
          validator: (_, value) => {
            if (!value || validateName(value)) {
              return Promise.resolve();
            }
            return Promise.reject('名称仅支持中文、字母、数字或下划线，长度在 6-14 个字符之间');
          },
        },
      ],
    },
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
        commonConfig: {
          ...omit(allValue, ['autoRequest', 'enableOptimize']),
          autoRequest: stringToBool(value),
          enableOptimize: stringToBool(allValue.enableOptimize),
        },
      },
    }),
    convertValue: (value: boolean) => value?.toString(),
    renderFormItem: () => <ProSegmented width="md" />,
    render: (_: any, { commonConfig }: DeviceItem) => (
      <StateTag state={commonConfig?.autoRequest} type="bool" />
    ),
  },
];

// mode 工作模式
export const modeConfig = [
  {
    title: '工作模式',
    dataIndex: ['config', 'commonConfig', 'mode'],
    valueType: 'select',
    valueEnum: DeviceMode,
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
      columns: [
        ...autoRequestConfig,
        {
          title: '开启性能优化',
          dataIndex: ['config', 'commonConfig', 'enableOptimize'],
          required: true,
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
          renderFormItem: () => <ProSegmented width="md" />,
          render: (_: any, { commonConfig }: DeviceItem) => (
            <StateTag state={commonConfig?.enableOptimize} type="bool" />
          ),
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
              commonConfig: { ...allValue, parseAis: stringToBool(value) },
            },
          }),
          convertValue: (value: boolean) => value?.toString(),
          renderFormItem: () => <ProSegmented width="md" />,
          render: (_: any, { commonConfig }: DeviceItem) => (
            <StateTag state={commonConfig?.parseAis} type="parse" />
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
          valueEnum: plcModelOptions,
          render: (_: any, { commonConfig }: DeviceItem) => plcModelOptions[commonConfig?.model],
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
      key: 'camera',
      columns: [
        {
          title: '输入模式',
          dataIndex: ['config', 'inputMode'],
          valueType: 'select',
          valueEnum: InputMode,
          required: true,
          fieldProps: {
            allowClear: false,
          },
          render: (_: any, { inputMode }: DeviceItem) => InputMode[inputMode],
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
              render: (_: any, { inputAddr }: DeviceItem) => inputAddr,
            },
          ],
        },
        {
          title: '输出模式',
          dataIndex: ['config', 'outputMode'],
          valueType: 'select',
          valueEnum: OutputMode,
          required: true,
          fieldProps: {
            allowClear: false,
          },
          tooltip: '注意：因为传输格式原因，Jpeg Stream 模式下仅保存了图像信息，没有原始声音。',
          render: (_: any, { outputMode }: DeviceItem) => OutputMode[outputMode],
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
                  mode === 'REMOTE_STREAM_SERVER'
                    ? pick(OutputEncode, ['H264_STREAM'])
                    : pick(OutputEncode, ['JPEG_STREAM']),
                required: true,
                fieldProps: {
                  allowClear: false,
                },
                render: (_: any, { outputEncode }: DeviceItem) => OutputEncode[outputEncode],
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
                hideInForm: mode !== 'REMOTE_STREAM_SERVER',
                render: (_: any, { outputAddr }: DeviceItem) => outputAddr,
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
                hideInDescriptions: mode === 'REMOTE_STREAM_SERVER',
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
