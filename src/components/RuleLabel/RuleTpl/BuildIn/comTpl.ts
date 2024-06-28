import { getIntl, getLocale } from '@umijs/max';
import { TplDataSource, TplDataType } from '../../RuleExample/enum';

const intl = getIntl(getLocale());

/**
 * 通信模组相关代码模板&示例
 */

const apply = `local result, err = rfcom:Ctrl('uuid', 'cmd')`;
const usageApply = `Actions = {
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
    label: 'rfcom:Ctrl',
    apply,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.rfcom.detail' }),
    usage: {
      label: intl.formatMessage({ id: 'component.tpl.usage' }),
      apply: usageApply,
      type: 'function',
      variables,
    },
  },
];
