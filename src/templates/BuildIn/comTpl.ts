/**
 * 通信模组相关代码模板&示例
 */

import { getIntl, getLocale } from '@umijs/max';

const intl = getIntl(getLocale());

export const getRfcomAction = (uuid?: string) => `Actions = {
  function(args)
    local result, err = rfcom:Ctrl("${uuid}", 'COMMAND')
    if err ~= nil then
      Throw(err)
      return true, args
    else
      Debug(result)
      return true, args
    end
  end
}`;

export const comTpl = [
  {
    key: 'rfcom',
    label: 'rfcom:Ctrl',
    apply: getRfcomAction('uuid'),
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.rfcom.detail' }),
    hasVariables: true
  },
];
