/**
 * kv 函数
 */

import { getIntl, getLocale } from '@umijs/max';
const intl = getIntl(getLocale());

export const kvTpl = [
  {
    label: 'kv:Set',
    apply: `kv:Set(arg1, arg2)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.kvSet.detail' }),
  },
  {
    label: 'kv:Get',
    apply: `local value = kv:Get(arg)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.kvGet.detail' }),
  },
  {
    label: 'kv:Del',
    apply: `kv:Del(arg)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.kvDel.detail' }),
  },
];
