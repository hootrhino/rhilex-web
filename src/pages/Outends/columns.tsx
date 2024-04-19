import HeadersTitle from '@/components/HttpHeaders/Title';
import StateTag, { StateType } from '@/components/StateTag';
import UnitTitle from '@/components/UnitTitle';
import { stringToBool } from '@/utils/utils';
import { DataMode, dataModeOption, outendsTypeOption } from './enum';

const DEFAULT_TIMEOUT = 3000;
const DEFAULT_HOST = '127.0.0.1';

export const defaultConfig = {
  MQTT: {
    port: 1883,
    host: DEFAULT_HOST,
  },
  MONGO_SINGLE: {
    mongoUrl: 'mongodb://root:root@127.0.0.1:27017/?connect=direct',
    database: 'rulexdb',
    collection: 'rulex',
  },
  UDP_TARGET: {
    port: 2599,
    host: DEFAULT_HOST,
    timeout: DEFAULT_TIMEOUT,
    allowPing: false,
    pingPacket: 'rhilex',
  },
  TCP_TRANSPORT: {
    dataMode: DataMode.RAW_STRING,
    allowPing: false,
    pingPacket: 'rhilex',
    port: 6005,
    host: DEFAULT_HOST,
    timeout: DEFAULT_TIMEOUT,
  },
  TDENGINE: {
    port: 6041,
    fqdn: DEFAULT_HOST,
    username: 'root',
    password: 'taosdata',
    dbName: 'RULEX',
  },
  HTTP: {
    url: 'http://127.0.0.1:8080',
    headers: [{ k: '', v: '' }],
    allowPing: false,
    pingPacket: 'rhilex',
    timeout: DEFAULT_TIMEOUT,
  },
};

export const baseColumns = [
  {
    title: 'UUID',
    dataIndex: 'uuid',
    hideInForm: true,
    hideInDescriptions: true,
    ellipsis: true,
    copyable: true,
  },
  {
    title: '资源名称',
    dataIndex: 'name',
    ellipsis: true,
    required: true,
  },
  {
    title: '资源类型',
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: outendsTypeOption,
    required: true,
  },
  {
    title: '资源状态',
    dataIndex: 'state',
    hideInForm: true,
    renderText: (state: number) => <StateTag state={state} />,
  },
  {
    title: '备注',
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => description || '-',
  },
];

const pingConfig = [
  {
    title: '开启心跳',
    dataIndex: ['config', 'allowPing'],
    required: true,
    valueType: 'state',
    transform: (value: string, namePath: string, allValue: Record<string, any>) => ({
      config: {
        ...allValue,
        allowPing: stringToBool(value),
      },
    }),
    convertValue: (value: boolean) => value?.toString(),
    renderText: (allowPing: boolean) => <StateTag state={allowPing} type={StateType.BOOL} />,
  },
  {
    title: '心跳包内容',
    dataIndex: ['config', 'pingPacket'],
    required: true,
  },
];

const timeoutConfig = [
  {
    title: <UnitTitle title="超时时间" />,
    dataIndex: ['config', 'timeout'],
    required: true,
    valueType: 'digit',
  },
];

const portConfig = [
  {
    title: '端口',
    dataIndex: ['config', 'port'],
    valueType: 'digit',
    required: true,
  },
];

const hostPortConfig = [
  {
    title: '主机地址',
    dataIndex: ['config', 'host'],
    required: true,
    copyable: true,
  },
  ...portConfig,
];

export const configColumns = {
  MONGO_SINGLE: [
    {
      title: 'MongoDB URL',
      dataIndex: ['config', 'mongoUrl'],
      required: true,
    },
    {
      title: 'MongoDB 数据库',
      dataIndex: ['config', 'database'],
      required: true,
    },
    {
      title: 'MongoDB 集合',
      dataIndex: ['config', 'collection'],
      required: true,
    },
  ],
  MQTT: [
    ...hostPortConfig,
    {
      title: '客户端 ID',
      dataIndex: ['config', 'clientId'],
      required: true,
    },
    {
      title: '上报 TOPIC',
      dataIndex: ['config', 'pubTopic'],
      required: true,
    },
    {
      title: '连接账户',
      dataIndex: ['config', 'username'],
      required: true,
    },
    {
      title: '连接密码',
      dataIndex: ['config', 'password'],
      valueType: 'password',
      required: true,
    },
  ],
  UDP_TARGET: [...pingConfig, ...timeoutConfig, ...hostPortConfig],
  TCP_TRANSPORT: [
    {
      title: '传输模式',
      dataIndex: ['config', 'dataMode'],
      valueEnum: dataModeOption,
      valueType: 'select',
      required: true,
    },
    ...pingConfig,
    ...timeoutConfig,
    ...hostPortConfig,
  ],
  TDENGINE: [
    {
      title: 'FQDN',
      dataIndex: ['config', 'fqdn'],
      required: true,
    },
    ...portConfig,
    {
      title: '用户名',
      dataIndex: ['config', 'username'],
      required: true,
    },
    {
      title: '密码',
      dataIndex: ['config', 'password'],
      valueType: 'password',
      required: true,
    },
    {
      title: '数据库名',
      dataIndex: ['config', 'dbName'],
      required: true,
    },
  ],
  HTTP: [
    ...pingConfig,
    ...timeoutConfig,
    {
      title: '请求地址',
      dataIndex: ['config', 'url'],
      required: true,
    },
    {
      valueType: 'formList',
      dataIndex: ['config', 'headers'],
      title: <HeadersTitle />,
      fieldProps: {
        creatorButtonProps: {
          creatorButtonText: '新增 Header',
          position: 'top',
        },
      },
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
      renderText: (headers: Record<string, any>) =>
        Object.keys(headers)?.length > 0 ? <div /> : null,
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
    columns: ({ type }: any) => {
      if (!type) return [];

      return [
        {
          title: '资源配置',
          valueType: 'group',
          columns:
            type === 'HTTP'
              ? configColumns['HTTP']
              : [
                  {
                    valueType: 'group',
                    columns: configColumns[type],
                  },
                ],
        },
      ];
    },
  },
];
