import UnitValue from '@/components/UnitValue';
import { getIntl, getLocale } from '@umijs/max';

const { formatMessage } = getIntl(getLocale());

export const CUSTOM_PROTOCOL_SERVER = [
  {
    title: formatMessage({ id: 'inend.table.title.host' }),
    dataIndex: ['config', 'host'],
    required: true,
  },
  {
    title: formatMessage({ id: 'form.title.port' }),
    dataIndex: ['config', 'port'],
    valueType: 'digit',
    required: true,
    render: (port: number) => port,
  },
  {
    title: formatMessage({ id: 'inend.table.title.timeout' }),
    dataIndex: ['config', 'timeout'],
    valueType: 'digit',
    required: true,
    fieldProps: {
      addonAfter: 'ms',
    },
    render: (timeout: number) => <UnitValue value={timeout} />,
  },
  {
    title: formatMessage({ id: 'inend.table.title.protocolExpr' }),
    dataIndex: ['config', 'protocolExpr'],
    required: true,
  },
  {
    title: formatMessage({ id: 'inend.table.title.maxDataLength' }),
    dataIndex: ['config', 'maxDataLength'],
    valueType: 'digit',
    formItemProps: {
      rules: [
        { required: true, message: formatMessage({ id: 'inend.table.placeholder.maxDataLength' }) },
        {
          min: 1,
          message: formatMessage({ id: 'inend.table.rules.maxDataLength' }),
          type: 'integer',
        },
        {
          max: 1024,
          message: formatMessage({ id: 'inend.table.rules.maxDataLength' }),
          type: 'integer',
        },
      ],
    },
  },
];
