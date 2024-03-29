import HeadersTitle from '@/components/HttpHeaders/Title';
import ProSegmented from '@/components/ProSegmented';
import StateTag from '@/components/StateTag';
import UnitTitle from '@/components/UnitTitle';
import { validateName } from '@/utils/regExp';
import { stringToBool } from '@/utils/utils';
import { modeEnum, typeEnum } from './enum';

export const defaultConfig = {
  MQTT: {
    port: 1883,
    host: '127.0.0.1',
  },
  MONGO_SINGLE: {
    mongoUrl: 'mongodb://root:root@127.0.0.1:27017/?connect=direct',
    database: 'rulexdb',
    collection: 'rulex',
  },
  UDP_TARGET: {
    port: 2599,
    host: '127.0.0.1',
    timeout: 3000,
    allowPing: 'false',
    pingPacket: 'rhilex',
  },
  TCP_TRANSPORT: {
    dataMode: 'RAW_STRING',
    allowPing: 'false',
    pingPacket: 'rhilex',
    port: 6005,
    host: '127.0.0.1',
    timeout: 3000,
  },
  TDENGINE: {
    port: 6041,
    fqdn: '127.0.0.1',
    username: 'root',
    password: 'taosdata',
    dbName: 'RULEX',
  },
  HTTP: {
    url: 'http://127.0.0.1:8080',
    headers: [{ k: '', v: '' }],
    allowPing: 'false',
    pingPacket: 'rhilex',
    timeout: 3000,
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
            return Promise.reject('名称仅支持字母、数字或下划线，长度在 6-14 个字符之间');
          },
        },
      ],
    },
  },
  {
    title: '资源类型',
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: typeEnum,
    required: true,
    fieldProps: {
      allowClear: false,
    },
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

const timeoutConfig = [
  {
    title: <UnitTitle title="超时时间" />,
    dataIndex: ['config', 'timeout'],
    fieldProps: {
      placeholder: '请输入超时时间（毫秒）',
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入超时时间（毫秒）',
        },
      ],
    },
  },
];

const hostPortConfig = [
  {
    title: '主机地址',
    dataIndex: ['config', 'host'],
    required: true,
    copyable: true,
  },
  {
    title: '端口',
    dataIndex: ['config', 'port'],
    valueType: 'digit',
    required: true,
  },
];

const udpConfig = [...timeoutConfig, ...hostPortConfig];

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
  UDP_TARGET: [
    {
      title: '开启心跳',
      dataIndex: ['config', 'allowPing'],
      required: true,
      transform: (value: string, namePath: string, allValue: Record<string, any>) => ({
        config: {
          ...allValue,
          allowPing: stringToBool(value),
        },
      }),
      convertValue: (value: boolean) => value?.toString(),
      renderFormItem: () => <ProSegmented width="md" />,
      renderText: (allowPing: boolean) => <StateTag state={allowPing} type="bool" />,
    },
    {
      title: '心跳包内容',
      dataIndex: ['config', 'pingPacket'],
      required: true,
    },
    ...udpConfig,
  ],
  TCP_TRANSPORT: [
    {
      title: '传输模式',
      dataIndex: ['config', 'dataMode'],
      valueEnum: modeEnum,
      valueType: 'select',
      required: true,
    },
    {
      title: '开启心跳',
      dataIndex: ['config', 'allowPing'],
      required: true,
      transform: (value: string, namePath: string, allValue: Record<string, any>) => ({
        config: {
          ...allValue,
          allowPing: stringToBool(value),
        },
      }),
      convertValue: (value: boolean) => value?.toString(),
      renderFormItem: () => <ProSegmented width="md" />,
      renderText: (allowPing: boolean) => <StateTag state={allowPing} type="bool" />,
    },
    {
      title: '心跳包内容',
      dataIndex: ['config', 'pingPacket'],
      required: true,
    },
    ...udpConfig,
  ],
  TDENGINE: [
    {
      title: 'FQDN',
      dataIndex: ['config', 'fqdn'],
      required: true,
    },
    {
      title: '端口',
      dataIndex: ['config', 'port'],
      valueType: 'digit',
      required: true,
    },
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
    {
      title: '开启心跳',
      dataIndex: ['config', 'allowPing'],
      required: true,
      transform: (value: string, namePath: string, allValue: Record<string, any>) => ({
        config: {
          ...allValue,
          allowPing: stringToBool(value),
        },
      }),
      convertValue: (value: boolean) => value?.toString(),
      renderFormItem: () => <ProSegmented width="md" />,
      renderText: (allowPing: boolean) => <StateTag state={allowPing} type="bool" />,
    },
    {
      title: '心跳包内容',
      dataIndex: ['config', 'pingPacket'],
      required: true,
    },
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
