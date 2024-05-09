import { TplDataSource, TplDataType } from '@/components/LuaExample/enum';
import { getIntl, getLocale } from '@umijs/max';

/**
 * 数据中心相关代码模板&示例
 */
const intl = getIntl(getLocale());

const apply = `local err = rds:Save(uuid, schema)
if err ~= nil then
  Throw(err)
  return 0
end`;

export const dataCenterTpl = [
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
