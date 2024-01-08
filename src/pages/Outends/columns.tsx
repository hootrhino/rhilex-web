import HeadersTitle from '@/components/HttpHeaders/Title';
import ProSegmented from '@/components/ProSegmented';
import StateTag from '@/components/StateTag';
import UnitTitle from '@/components/UnitTitle';
import { boolEnum, boolMap } from '@/utils/enum';
import { Tag } from 'antd';
import { modeEnum, typeEnum } from './enum';

export const defaultConfig = {
  MQTT: [
    {
      port: 1883,
      host: '127.0.0.1',
    },
  ],
  MONGO_SINGLE: [
    {
      mongoUrl: 'mongodb://root:root@127.0.0.1:27017/?connect=direct',
      database: 'rulexdb',
      collection: 'rulex',
    },
  ],
  UDP_TARGET: [
    {
      port: 2599,
      host: '127.0.0.1',
      timeout: 3000,
    },
  ],
  TCP_TRANSPORT: [
    {
      dataMode: 'RAW_STRING',
      allowPing: 'false',
      pingPacket: 'HR0001',
      port: 6005,
      host: '127.0.0.1',
      timeout: 3000,
    },
  ],
  TDENGINE: [
    {
      port: 6041,
      fqdn: '127.0.0.1',
      username: 'root',
      password: 'taosdata',
      dbName: 'RULEX',
    },
  ],
  HTTP: [
    {
      url: 'http://127.0.0.1:8080',
      headers: [{ k: '', v: '' }],
    },
  ],
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
    dataIndex: 'timeout',
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
    dataIndex: 'host',
    required: true,
    copyable: true,
  },
  {
    title: '端口',
    dataIndex: 'port',
    required: true,
  },
];

const udpConfig = [...timeoutConfig, ...hostPortConfig];

export const configColumns = {
  MONGO_SINGLE: [
    {
      title: 'MongoDB URL',
      dataIndex: 'mongoUrl',
      required: true,
    },
    {
      title: 'MongoDB 数据库',
      dataIndex: 'database',
      required: true,
    },
    {
      title: 'MongoDB 集合',
      dataIndex: 'collection',
      required: true,
    },
  ],
  MQTT: [
    ...hostPortConfig,
    {
      title: '客户端 ID',
      dataIndex: 'clientId',
      required: true,
    },
    {
      title: '上报 TOPIC',
      dataIndex: 'pubTopic',
      required: true,
    },
    {
      title: '连接账户',
      dataIndex: 'username',
      required: true,
    },
    {
      title: '连接密码',
      dataIndex: 'password',
      valueType: 'password',
      required: true,
    },
  ],
  UDP_TARGET: udpConfig,
  TCP_TRANSPORT: [
    {
      title: '传输模式',
      dataIndex: 'dataMode',
      valueEnum: modeEnum,
      valueType: 'select',
      required: true,
    },
    {
      title: '开启心跳',
      dataIndex: 'allowPing',
      required: true,
      convertValue: (value: boolean) => value?.toString(),
      transform: (value: string) => ({ allowPing: boolMap[value] }),
      renderFormItem: () => <ProSegmented width="md" />,
      renderText: (allowPing: boolean) => {
        const key = allowPing ? 'true' : 'false';
        return <Tag color={boolEnum[key]?.color}>{boolEnum[key]?.text}</Tag>;
      },
    },
    {
      title: '心跳包内容',
      dataIndex: 'pingPacket',
      required: true,
    },
    ...udpConfig,
  ],
  TDENGINE: [
    {
      title: 'FQDN',
      dataIndex: 'fqdn',
      required: true,
    },
    {
      title: '端口',
      dataIndex: 'port',
      required: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      required: true,
    },
    {
      title: '密码',
      dataIndex: 'password',
      valueType: 'password',
      required: true,
    },
    {
      title: '数据库名',
      dataIndex: 'dbName',
      required: true,
    },
  ],
  HTTP: [
    {
      title: '请求地址',
      dataIndex: 'url',
      required: true,
    },
    {
      valueType: 'formList',
      dataIndex: 'headers',
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
          columns: [
            {
              valueType: 'formList',
              dataIndex: 'config',
              mode: 'single',
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
          ],
        },
      ];
    },
  },
];
