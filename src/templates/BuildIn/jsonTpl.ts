/**
 * json 函数
 */

import { getIntl, getLocale } from '@umijs/max';
const {formatMessage} = getIntl(getLocale());

export const jsonTpl = [
  {
    key: 'json-T2J',
    label: 'json:T2J',
    apply: `local Value = json:T2J(arg)`,
    type: 'function',
    detail: formatMessage({ id: 'component.tpl.jsonT2J.detail' }),
    hasVariables: false
  },
  {
    key: 'json-J2T',
    label: 'json:J2T',
    apply: `local Value = json:J2T(arg)`,
    type: 'function',
    detail: formatMessage({ id: 'component.tpl.jsonJ2T.detail' }),
    hasVariables: false
  },
];
