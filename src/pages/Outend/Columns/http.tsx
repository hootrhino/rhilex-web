import HeadersTitle from '@/components/HttpHeaders/Title';
import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const HTTP = [
  {
    title: intl.formatMessage({ id: 'outend.table.title.cacheOfflineData' }),
    dataIndex: ['config', 'commonConfig', 'cacheOfflineData'],
    required: true,
    renderFormItem: () => <ProSegmented width="md" />,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => (
      <ProTag type={StatusType.BOOL}>{commonConfig?.cacheOfflineData}</ProTag>
    ),
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.allowPing' }),
    dataIndex: ['config', 'commonConfig', 'allowPing'],
    required: true,
    renderFormItem: () => <ProSegmented width="md" />,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => (
      <ProTag type={StatusType.BOOL}>{commonConfig?.allowPing}</ProTag>
    ),
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.pingPacket' }),
    dataIndex: ['config', 'commonConfig', 'pingPacket'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.pingPacket,
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.timeout' }),
    dataIndex: ['config', 'commonConfig', 'timeout'],
    required: true,
    valueType: 'digit',
    fieldProps: {
      addonAfter: 'ms',
    },
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => (
      <UnitValue value={commonConfig?.timeout} />
    ),
  },
  {
    title: intl.formatMessage({ id: 'outend.table.title.url' }),
    dataIndex: ['config', 'commonConfig', 'url'],
    required: true,
    render: (_dom: React.ReactNode, commonConfig: Record<string, any>) => commonConfig?.url,
  },
  {
    valueType: 'formList',
    dataIndex: ['config', 'commonConfig', 'headers'],
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
                        message: intl.formatMessage({ id: 'placeholder.input' }, { text: 'value' }),
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
];
