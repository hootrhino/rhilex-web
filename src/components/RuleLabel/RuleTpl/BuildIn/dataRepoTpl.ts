import { getIntl, getLocale } from '@umijs/max';
import { TplDataSource, TplDataType } from '../../RuleExample/enum';

/**
 * 数据中心相关代码模板&示例
 */
const intl = getIntl(getLocale());

const apply = `local err = rds:Save(uuid, schema)
if err ~= nil then
  Throw(err)
  return 0
end`;

export const dataRepoTpl = [
  {
    label: 'rds:Save',
    apply,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.save.detail' }),
    variables: [
      {
        label: intl.formatMessage({ id: 'component.tpl.save.arg' }),
        name: 'uuid',
        type: TplDataType.SELECT,
        dataSource: TplDataSource.SCHEMA,
      },
      {
        label: '参数',
        name: 'schema',
        type: TplDataType.OBJECT,
        hideInForm: true,
      },
    ],
  },
];
