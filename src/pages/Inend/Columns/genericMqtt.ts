import { getIntl, getLocale } from '@umijs/max';
import { qosOption } from '../enum';
import { DEFAULT_CONFIG } from './defaultConfig';

const intl = getIntl(getLocale());

export const GENERIC_MQTT = [
  // {
  //   title: intl.formatMessage({ id: 'inend.table.title.host' }),
  //   dataIndex: ['config', 'host'],
  //   required: true,
  // },
  // {
  //   title: intl.formatMessage({ id: 'form.title.port' }),
  //   dataIndex: ['config', 'port'],
  //   valueType: 'digit',
  //   required: true,
  //   render: (port: number) => port,
  // },
  ...DEFAULT_CONFIG,
  {
    title: intl.formatMessage({ id: 'form.title.clientId' }),
    dataIndex: ['config', 'clientId'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'inend.table.title.username' }),
    dataIndex: ['config', 'username'],
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'inend.table.title.password' }),
    dataIndex: ['config', 'password'],
    valueType: 'password',
    required: true,
  },
  {
    title: intl.formatMessage({ id: 'inend.table.title.qos' }),
    dataIndex: ['config', 'qos'],
    valueType: 'select',
    required: true,
    fieldProps: {
      options: qosOption,
    },
  },
  {
    valueType: 'formList',
    dataIndex: ['config', 'subTopics'],
    title: intl.formatMessage({ id: 'inend.table.title.subTopics' }),
    fieldProps: {
      required: true,
      min: 1,
      creatorButtonProps: {
        creatorButtonText: intl.formatMessage({ id: 'button.list' }, { item: 'Topic' }),
      },
    },
    columns: [
      {
        valueType: 'group',
        columns: [
          {
            title: '',
            dataIndex: 'k',
            fieldProps: {
              placeholder: intl.formatMessage({ id: 'inend.table.placeholder.subTopics' }),
            },
            formItemProps: {
              rules: [
                {
                  required: true,
                  validator: async (_: any, value: string) => {
                    if (value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      intl.formatMessage({ id: 'inend.table.rules.subTopics' }),
                    );
                  },
                },
              ],
            },
          },
        ],
      },
    ],
    renderText: (record: string[]) => record.join(','),
  },
];
