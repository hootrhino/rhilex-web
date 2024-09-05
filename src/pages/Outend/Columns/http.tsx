import HeadersTitle from '@/components/HttpHeaders/Title';
import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { stringToBool } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const HTTP = [
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
  {
    title: intl.formatMessage({ id: 'outend.table.title.timeout' }),
    dataIndex: ['config', 'timeout'],
    required: true,
    valueType: 'digit',
    fieldProps: {
      addonAfter: 'ms',
    },
    render: (timeout: number) => <UnitValue value={timeout} />,
  },
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
