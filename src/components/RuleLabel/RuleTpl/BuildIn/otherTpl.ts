/**
 * 其他函数相关代码模板&示例
 */

import { getIntl, getLocale } from '@umijs/max';
const intl = getIntl(getLocale());

export const otherTpl = [
  {
    label: 'math:TFloat',
    apply: `local Value = json:TFloat(arg1, arg2)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.math.detail' }),
  },
  {
    label: 'jq:Execute',
    apply: `local Value = jq:Execute(arg1, arg2 )`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.jq.detail' }),
  },
  {
    label: 'rpc:Request',
    apply: `local Value = rpc:Request(arg1, arg2, arg3)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.rpc.detail' }),
  },
];
