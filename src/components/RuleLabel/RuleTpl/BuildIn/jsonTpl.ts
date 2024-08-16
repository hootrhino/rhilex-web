/**
 * json 函数
 */

import { getIntl, getLocale } from '@umijs/max';
const intl = getIntl(getLocale());

export const jsonTpl = [
  {
    label: 'json:T2J',
    apply: `local Value = json:T2J(arg)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.jsonT2J.detail' }),
  },
  {
    label: 'json:J2T',
    apply: `local Value = json:J2T(arg)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.jsonJ2T.detail' }),
  },
];
