/**
 * localdb 函数
 */

import { getIntl, getLocale } from '@umijs/max';
const intl = getIntl(getLocale());

export const localdbTpl = [
  {
    label: 'localdb:Query',
    apply: `local Table = localdb:Query('select * from db1')
for i, v in ipairs(Table) do
  Debug(err)
end`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.query.detail' }),
  },
  {
    label: 'localdb:Execute',
    apply: `local error = localdb:Query(arg)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.execute.detail' }),
  },
];
