/**
 * kv 函数
 */

import { getIntl, getLocale } from '@umijs/max';
const {formatMessage} = getIntl(getLocale());

export const kvTpl = [
  {
    key: 'kv-set',
    label: 'kv:Set',
    apply: `kv:Set(arg1, arg2)`,
    type: 'function',
    detail: formatMessage({ id: 'component.tpl.kvSet.detail' }),
    hasVariables: false
  },
  {
    key: 'kv-get',
    label: 'kv:Get',
    apply: `local value = kv:Get(arg)`,
    type: 'function',
    detail: formatMessage({ id: 'component.tpl.kvGet.detail' }),
    hasVariables: false
  },
  {
    key: 'kv-del',
    label: 'kv:Del',
    apply: `kv:Del(arg)`,
    type: 'function',
    detail: formatMessage({ id: 'component.tpl.kvDel.detail' }),
    hasVariables: false
  },
];
