import { TplDataType } from '@/components/LuaExample/enum';
import { getIntl, getLocale } from '@umijs/max';

/**
 * 其他函数相关代码模板&示例
 */
const intl = getIntl(getLocale());

export const otherTpl = [
  {
    label: 'math:TFloat',
    apply: `local Value = json:TFloat(arg1, arg2)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.math.detail' }),
    variables: [
      {
        label: intl.formatMessage({ id: 'component.tpl.math.arg1' }),
        name: 'arg1',
        value: 0,
        type: TplDataType.NUMBER,
      },
      {
        label: intl.formatMessage({ id: 'component.tpl.math.arg2' }),
        name: 'arg2',
        value: 2,
        type: TplDataType.NUMBER,
      },
    ],
  },
  {
    label: 'jq:Execute',
    apply: `local Value = jq:Execute(arg1, arg2 )`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.jq.detail' }),
    variables: [
      {
        label: intl.formatMessage({ id: 'component.tpl.jq.arg1' }),
        name: 'arg1',
        value: '',
        type: TplDataType.STRING,
      },
      {
        label: intl.formatMessage({ id: 'component.tpl.jq.arg2' }),
        name: 'arg2',
        value: '',
        type: TplDataType.STRING,
      },
    ],
  },
  {
    label: 'rpc:Request',
    apply: `local Value = rpc:Request(arg1, arg2, arg3)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.rpc.detail' }),
    variables: [
      {
        label: intl.formatMessage({ id: 'component.tpl.rpc.arg1' }),
        name: 'arg1',
        value: '',
        type: TplDataType.STRING,
      },
      {
        label: intl.formatMessage({ id: 'component.tpl.rpc.arg2' }),
        name: 'arg2',
        value: '',
        type: TplDataType.STRING,
      },
      {
        label: intl.formatMessage({ id: 'component.tpl.rpc.arg3' }),
        name: 'arg2',
        value: '',
        type: TplDataType.STRING,
      },
    ],
  },
];
