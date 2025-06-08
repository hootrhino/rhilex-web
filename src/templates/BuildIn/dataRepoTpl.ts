/**
 * 数据中心相关代码模板&示例
 */

import { getIntl, getLocale } from '@umijs/max';
const {formatMessage} = getIntl(getLocale());

const apply = `local err = rds:Save(uuid, schema)
if err ~= nil then
  Throw(err)
  return 0
end`;

export const dataRepoTpl = [
  {
    key: 'rds-save',
    label: 'rds:Save',
    apply,
    type: 'function',
    detail: formatMessage({ id: 'component.tpl.save.detail' }),
    hasVariables: false
  },
];
