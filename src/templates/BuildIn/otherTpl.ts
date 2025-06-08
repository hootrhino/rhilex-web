/**
 * 其他函数相关代码模板&示例
 */

import { getIntl, getLocale } from '@umijs/max';
const {formatMessage} = getIntl(getLocale());

export const otherTpl = [
  {
    key: 'math-tfloat',
    label: 'math:TFloat',
    apply: `local Value = json:TFloat(arg1, arg2)`,
    type: 'function',
    detail: formatMessage({ id: 'component.tpl.math.detail' }),
    hasVariables: false
  },
  {
    key: 'jq-execute',
    label: 'jq:Execute',
    apply: `local Value = jq:Execute(arg1, arg2 )`,
    type: 'function',
    detail: formatMessage({ id: 'component.tpl.jq.detail' }),
    hasVariables: false
  },
  {
    key: 'rpc-request',
    label: 'rpc:Request',
    apply: `local Value = rpc:Request(arg1, arg2, arg3)`,
    type: 'function',
    detail: formatMessage({ id: 'component.tpl.rpc.detail' }),
    hasVariables: false
  },
];
