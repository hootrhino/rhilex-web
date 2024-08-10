import HeadersTitle from '@/components/HttpHeaders/Title';
import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getIntl, getLocale } from '@umijs/max';
import type { DeviceItem } from '..';

const intl = getIntl(getLocale());

export const GENERIC_HTTP_DEVICE_CONFIG = [
  {
    title: intl.formatMessage({ id: 'device.form.title.group.common' }),
    valueType: 'group',
    columns: [
      {
        title: intl.formatMessage({ id: 'device.form.title.autoRequest' }),
        dataIndex: ['config', 'commonConfig', 'autoRequest'],
        required: true,
        renderFormItem: () => <ProSegmented width="md" />,
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <ProTag type={StatusType.BOOL}>{commonConfig.autoRequest}</ProTag>
        ),
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.timeout.connect' }),
        dataIndex: ['config', 'commonConfig', 'timeout'],
        valueType: 'digit',
        required: true,
        fieldProps: {
          addonAfter: 'ms',
        },
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <UnitValue value={commonConfig.timeout} />
        ),
      },
      {
        title: intl.formatMessage({ id: 'device.form.title.frequency' }),
        dataIndex: ['config', 'commonConfig', 'frequency'],
        valueType: 'digit',
        required: true,
        fieldProps: {
          addonAfter: 'ms',
        },
        render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
          <UnitValue value={commonConfig.frequency} />
        ),
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.group.http' }),
    valueType: 'group',
    fieldProps: {
      direction: 'vertical',
    },
    key: 'http',
    columns: [
      {
        title: intl.formatMessage({ id: 'device.form.title.url' }),
        dataIndex: ['config', 'httpConfig', 'url'],
        required: true,
        render: (_dom: React.ReactNode, { httpConfig }: DeviceItem) => httpConfig.url,
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
  },
];
