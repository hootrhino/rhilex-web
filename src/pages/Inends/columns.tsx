import StateTag from '@/components/StateTag';
import type { ProColumns } from '@ant-design/pro-components';
import type { InendsItem } from '.';
import { eventEnum, modeEnum, typeEnum } from './enum';

export const defaultConfig = {
  COAP: [
    {
      port: 2582,
      host: '127.0.0.1',
    },
  ],
  RULEX_UDP: [
    {
      port: 2583,
      host: '127.0.0.1',
    },
  ],
  HTTP: [
    {
      port: 2584,
      host: '127.0.0.1',
    },
  ],
  NATS_SERVER: [
    {
      port: 4222,
      host: '127.0.0.1',
    },
  ],
  GRPC: [
    {
      port: 2585,
      host: '127.0.0.1',
    },
  ],
  INTERNAL_EVENT: [
    {
      type: 'ALL',
    },
  ],
  GENERIC_IOT_HUB: [
    {
      host: '127.0.0.1',
      port: 1883,
      mode: 'DC',
    },
  ],
};

export const baseColumns: ProColumns<InendsItem>[] = [
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
    width: 'md',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入资源名称',
        },
      ],
    },
    fieldProps: {
      placeholder: '请输入资源名称',
    },
  },
  {
    title: '资源类型',
    dataIndex: 'type',
    valueType: 'select',
    width: 'md',
    valueEnum: typeEnum,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选择资源类型',
        },
      ],
    },
    fieldProps: {
      placeholder: '请选择资源类型',
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
    width: 'md',
    dataIndex: 'description',
    ellipsis: true,
    fieldProps: {
      placeholder: '请输入备注',
    },
    renderText: (description) => description || '-'
  },
];

const defaultConfigColumns = [
  {
    title: '服务地址',
    width: 'md',
    dataIndex: 'host',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入服务地址',
        },
      ],
    },
    fieldProps: {
      placeholder: '请输入服务地址',
    },
  },
  {
    title: '端口',
    width: 'md',
    dataIndex: 'port',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入端口',
        },
      ],
    },
    fieldProps: {
      placeholder: '请输入端口',
    },
  },
];

export const configColumns = {
  COAP: defaultConfigColumns,
  GENERIC_IOT_HUB: [
    ...defaultConfigColumns,
    {
      title: '模式',
      dataIndex: 'mode',
      width: 'md',
      valueEnum: modeEnum,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择模式',
          },
        ],
      },
      fieldProps: {
        placeholder: '请选择模式',
      },
    },
    {
      title: '产品 ID',
      dataIndex: 'productId',
      width: 'md',
      copyable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入产品 ID',
          },
        ],
      },
      fieldProps: {
        placeholder: '请输入产品 ID',
      },
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      width: 'md',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入设备名称',
          },
        ],
      },
      fieldProps: {
        placeholder: '请输入设备名称',
      },
    },
    {
      title: '客户端 ID',
      dataIndex: 'clientId',
      width: 'md',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入客户端 ID',
          },
        ],
      },
      fieldProps: {
        placeholder: '请输入客户端 ID',
      },
    },
    {
      title: '用户名称',
      dataIndex: 'username',
      width: 'md',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入用户名称',
          },
        ],
      },
      fieldProps: {
        placeholder: '请输入用户名称',
      },
    },
    {
      title: '用户密码',
      dataIndex: 'password',
      valueType: 'password',
      width: 'md',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入用户密码',
          },
        ],
      },
      fieldProps: {
        placeholder: '请输入用户密码',
      },
    },
  ],
  RULEX_UDP: defaultConfigColumns,
  HTTP: defaultConfigColumns,
  NATS_SERVER: [
    ...defaultConfigColumns,
    {
      title: '主题',
      dataIndex: 'topic',
      width: 'md',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入主题',
          },
        ],
      },
      fieldProps: {
        placeholder: '请输入主题',
      },
    },
  ],
  GRPC: defaultConfigColumns,
  INTERNAL_EVENT: [
    {
      title: '事件类型',
      dataIndex: 'type',
      valueType: 'select',
      width: 'md',
      valueEnum: eventEnum,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择事件类型',
          },
        ],
      },
      fieldProps: {
        placeholder: '请选择事件类型',
      },
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
      return [
        {
          title: '资源配置',
          valueType: 'group',
          columns: [
            {
              valueType: 'formList',
              dataIndex: 'config',
              fieldProps: {
                creatorButtonProps: false,
                copyIconProps: false,
                deleteIconProps: false,
              },
              columns: [
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
