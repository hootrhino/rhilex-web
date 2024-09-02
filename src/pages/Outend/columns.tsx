import HeadersTitle from '@/components/HttpHeaders/Title';
import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getHwifaceList } from '@/services/rhilex/jiekouguanli';
import { stringToBool } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';
import { Space } from 'antd';
import { LabeledValue } from 'antd/es/select';
import { dataModeOption, OutendType, outendTypeOption } from './enum';

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
    ellipsis: true,
    renderText: (type: OutendType) => (type ? outendTypeOption[type] : '-'),
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.state' }),
    dataIndex: 'state',
    hideInForm: true,
    renderText: (state: number) => <ProTag type={StatusType.DEVICE}>{state || 0}</ProTag>,
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
    convertValue: (value: boolean) => value?.toString(),
    transform: (value: string) => ({ config: { allowPing: stringToBool(value) } }),
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
    render: (timeout: number) => <UnitValue value={timeout} />,
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
      title: intl.formatMessage({ id: 'outend.table.title.database' }),
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
    //TODO 暂时隐藏 ...dataModeConfig,
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
      hideInDescriptions: true,
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
      render: (portUuid: string) => portUuid,
    },
  ],
  [OutendType.SEMTECH_UDP_FORWARDER]: [
    ...hostPortConfig,
    {
      title: intl.formatMessage({ id: 'outend.table.title.mac' }),
      dataIndex: ['config', 'mac'],
      required: true,
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
