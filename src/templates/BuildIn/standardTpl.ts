/**
 * 标准库函数
 */

import { getIntl, getLocale } from '@umijs/max';
const intl = getIntl(getLocale());

const debugCode = `Actions = {
  function(args)
    Debug(args)
    return true, args
  end
}`;

export const standardTpl = [
  {
    label: 'Debug',
    apply: 'Debug(arg)',
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.standard.debug' }),
    usage: {
      label: intl.formatMessage({ id: 'component.tpl.usage' }),
      apply: debugCode,
      type: 'function',
      detail: intl.formatMessage({ id: 'component.tpl.usage' }),
    },
  },
  {
    label: 'Throw',
    apply: 'Throw(err)',
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.standard.debug.usage2' }),
  },
];
