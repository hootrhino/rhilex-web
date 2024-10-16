/**
 * localdb 函数
 */

import { getIntl, getLocale } from '@umijs/max';
const {formatMessage} = getIntl(getLocale());

export const localdbTpl = [
  {
    key: 'localdb-query',
    label: 'localdb:Query',
    apply: `local Table = localdb:Query('select * from db1')
for i, v in ipairs(Table) do
  Debug(err)
end`,
    type: 'function',
    detail: formatMessage({ id: 'component.tpl.query.detail' }),
  },
  {
    key: 'localdb-execute',
    label: 'localdb:Execute',
    apply: `local error = localdb:Query(arg)`,
    type: 'function',
    detail: formatMessage({ id: 'component.tpl.execute.detail' }),
  },
];
