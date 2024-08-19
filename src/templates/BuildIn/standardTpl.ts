/**
 * 标准库函数
 */

import { TplDataType } from '@/components/RuleExample/enum';
import { getIntl, getLocale } from '@umijs/max';
const intl = getIntl(getLocale());

const debugCode = `Actions = {
  function(args)
    Debug(info)
    return true, args
  end
}`;

export const standardTpl = [
  {
    key: 'standard-debug',
    label: 'Debug',
    apply: 'Debug(arg)',
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.standard.debug' }),
    usage: {
      label: intl.formatMessage({ id: 'component.tpl.usage' }),
      apply: debugCode,
      type: 'function',
      variables: [{
        label: intl.formatMessage({id: 'component.tpl.standard.debug.arg'}),
        name: 'info',
        type: TplDataType.STRING,
        value: 'success'
      }]
    },
  },
  {
    key: 'standard-throw',
    label: 'Throw',
    apply: 'Throw(err)',
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.standard.debug.usage2' }),
  },
];
