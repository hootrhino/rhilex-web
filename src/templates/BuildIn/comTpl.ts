/**
 * 通信模组相关代码模板&示例
 */

import { getIntl, getLocale } from '@umijs/max';
import { TplDataSource, TplDataType } from '../../components/RuleExample/enum';

const intl = getIntl(getLocale());

const code = `local result, err = rfcom:Ctrl('uuid', 'cmd')`;
const usageCode = `Actions = {
  function(args)
    local result, err = rfcom:Ctrl('uuid', 'COMMAND')
    if err ~= nil then
      Throw(err)
      return true, args
    else
      Debug(result)
      return true, args
    end
  end
}`;

const variables = [
  {
    label: intl.formatMessage({ id: 'component.tpl.rfcom.arg' }),
    name: 'uuid',
    type: TplDataType.SELECT,
    dataSource: TplDataSource.RFCOM,
  },
];

export const comTpl = [
  {
    key: 'rfcom-ctrl',
    label: 'rfcom:Ctrl',
    apply: code,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.rfcom.detail' }),
    usage: {
      label: intl.formatMessage({ id: 'component.tpl.usage' }),
      apply: usageCode,
      type: 'function',
      variables,
    },
  },
];
