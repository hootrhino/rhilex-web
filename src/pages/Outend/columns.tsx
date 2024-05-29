import HeadersTitle from '@/components/HttpHeaders/Title';
import ProSegmented from '@/components/ProSegmented';
import { getHwifaceList } from '@/services/rulex/jiekouguanli';
import { stringToBool } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';
import { Space } from 'antd';
import { DataMode, dataModeOption, OutendType, outendTypeOption } from './enum';
import ProTag, { StatusType } from '@/components/ProTag';

const DEFAULT_TIMEOUT = 3000;
const DEFAULT_HOST = '127.0.0.1';

export const defaultConfig = {
  [OutendType.MQTT]: {
    port: 1883,
    host: DEFAULT_HOST,
  },
  [OutendType.MONGO_SINGLE]: {
    mongoUrl: 'mongodb://root:root@127.0.0.1:27017/?connect=direct',
    database: 'rulexdb',
    collection: 'rulex',
  },
  [OutendType.UDP_TARGET]: {
    port: 2599,
    host: DEFAULT_HOST,
    timeout: DEFAULT_TIMEOUT,
    allowPing: false,
    pingPacket: 'rhilex',
  },
  [OutendType.TCP_TRANSPORT]: {
    dataMode: DataMode.RAW_STRING,
    allowPing: false,
    pingPacket: 'rhilex',
    port: 6005,
    host: DEFAULT_HOST,
    timeout: DEFAULT_TIMEOUT,
  },
  [OutendType.TDENGINE]: {
    port: 6041,
    fqdn: DEFAULT_HOST,
    username: 'root',
    password: 'taosdata',
    dbName: 'RULEX',
  },
  [OutendType.HTTP]: {
    url: 'http://127.0.0.1:8080',
    headers: [{ k: '', v: '' }],
    allowPing: false,
    pingPacket: 'rhilex',
    timeout: DEFAULT_TIMEOUT,
  },
  [OutendType.GENERIC_UART_TARGET]: {
    allowPing: false,
    pingPacket: 'rhilex',
    timeout: DEFAULT_TIMEOUT,
    dataMode: DataMode.RAW_STRING,
  },
};

const intl = getIntl(getLocale());

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
    title: intl.formatMessage({ id: 'outend.table.title.name' }),
    dataIndex: 'name',
    ellipsis: true,
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.type' }),
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: outendTypeOption,
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.state' }),
    dataIndex: 'state',
    hideInForm: true,
    renderText: (state: number) => <ProTag type={StatusType.DEVICE}>{state}</ProTag>,
  },
  {
    title: intl.formatMessage({ id: 'table.desc' }),
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => description || '-',
  },
];

const pingConfig = [
  {
    title: intl.formatMessage({ id: 'outend.table.title.allowPing' }),
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
    renderText: (allowPing: boolean) => <ProTag type={StatusType.BOOL}>{allowPing}</ProTag>,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.pingPacket' }),
    dataIndex: ['config', 'pingPacket'],
    required: true,
  },
];

const timeoutConfig = (title?: string) => [
  {
    title: title || intl.formatMessage({ id: 'outend.table.title.timeout' }),
    dataIndex: ['config', 'timeout'],
    required: true,
    valueType: 'digit',
    fieldProps: {
      addonAfter: 'ms',
    },
  },
];

const portConfig = [
  {
    title: intl.formatMessage({ id: 'outend.table.title.port' }),
    dataIndex: ['config', 'port'],
    valueType: 'digit',
    required: true,
    render: (port: number) => port,
  },
];

const hostPortConfig = [
  {
    title: intl.formatMessage({ id: 'outend.table.title.host' }),
    dataIndex: ['config', 'host'],
    required: true,
    copyable: true,
  },
  ...portConfig,
];

const dataModeConfig = [
  {
    title: intl.formatMessage({ id: 'outend.table.title.dataMode' }),
    dataIndex: ['config', 'dataMode'],
    valueEnum: dataModeOption,
    valueType: 'select',
    required: true,
  },
];

export const configColumns = {
  [OutendType.MONGO_SINGLE]: [
    {
      title: 'MongoDB URL',
      dataIndex: ['config', 'mongoUrl'],
      required: true,
    },
    {
      title: intl.formatMessage({ id: 'outend.type.database' }, { type: 'MongoDB' }),
      dataIndex: ['config', 'database'],
      required: true,
    },
    {
      title: intl.formatMessage({ id: 'outend.table.title.collection' }, { type: 'MongoDB' }),
      dataIndex: ['config', 'collection'],
      required: true,
    },
  ],
  [OutendType.MQTT]: [
    ...hostPortConfig,
    {
      title: intl.formatMessage({ id: 'outend.table.title.clientId' }),
      dataIndex: ['config', 'clientId'],
      required: true,
    },
    {
      title: intl.formatMessage({ id: 'outend.table.title.pubTopic' }),
      dataIndex: ['config', 'pubTopic'],
      required: true,
    },
    {
      title: intl.formatMessage({ id: 'outend.table.title.username' }),
      dataIndex: ['config', 'username'],
      required: true,
    },
    {
      title: intl.formatMessage({ id: 'outend.table.title.password' }),
      dataIndex: ['config', 'password'],
      valueType: 'password',
      required: true,
    },
  ],
  [OutendType.UDP_TARGET]: [...pingConfig, ...timeoutConfig(), ...hostPortConfig],
  [OutendType.TCP_TRANSPORT]: [
    ...pingConfig,
    ...timeoutConfig(),
    ...dataModeConfig,
    ...hostPortConfig,
  ],
  [OutendType.TDENGINE]: [
    {
      title: 'FQDN',
      dataIndex: ['config', 'fqdn'],
      required: true,
    },
    ...portConfig,
    {
      title: intl.formatMessage({ id: 'form.title.username' }),
      dataIndex: ['config', 'username'],
      required: true,
    },
    {
      title: intl.formatMessage({ id: 'form.title.password' }),
      dataIndex: ['config', 'password'],
      valueType: 'password',
      required: true,
    },
    {
      title: intl.formatMessage({ id: 'outend.table.title.dbName' }),
      dataIndex: ['config', 'dbName'],
      required: true,
    },
  ],
  [OutendType.HTTP]: [
    ...pingConfig,
    ...timeoutConfig(),
    {
      title: intl.formatMessage({ id: 'outend.table.title.url' }),
      dataIndex: ['config', 'url'],
      required: true,
    },
    {
      valueType: 'formList',
      dataIndex: ['config', 'headers'],
      title: <HeadersTitle />,
      fieldProps: {
        creatorButtonProps: {
          creatorButtonText: intl.formatMessage({ id: 'button.list' }, { item: 'Header' }),
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
      renderText: (headers: Record<string, any>) =>
        Object.keys(headers)?.length > 0 ? <div /> : null,
    },
  ],
  [OutendType.GENERIC_UART_TARGET]: [
    ...pingConfig,
    ...timeoutConfig(intl.formatMessage({ id: 'outend.table.title.timeout.rw' })),
    ...dataModeConfig,
    {
      title: intl.formatMessage({ id: 'outend.table.title.portUuid' }),
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
      render: (portUuid: string) => portUuid,
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
          title: intl.formatMessage({ id: 'outend.title.source' }),
          valueType: 'group',
          columns:
            type === OutendType.HTTP
              ? configColumns[OutendType.HTTP]
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
