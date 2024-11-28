/**
 * 标准库函数
 */
import { getIntl, getLocale } from '@umijs/max';
const {formatMessage} = getIntl(getLocale());

export const getDebugCode = (info?: string) => `Actions = {
  function(args)
    Debug("${info}")
    return true, args
  end
}`;

export const standardTpl = [
  {
    key: 'standardDebug',
    label: 'Debug',
    apply: getDebugCode('success'),
    type: 'function',
    detail: formatMessage({ id: 'component.tpl.standard.debug' }),
    hasVariables: true
  },
  {
    key: 'standard-throw',
    label: 'Throw',
    apply: 'Throw(err)',
    type: 'function',
    detail: formatMessage({ id: 'component.tpl.standard.debug.usage2' }),
    hasVariables: false
  },
];
