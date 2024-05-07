import { getIntl, getLocale } from '@umijs/max';

/**
 * 数据中心相关代码模板&示例
 */
const intl = getIntl(getLocale());

const apply = `local err = rds:Save(uuid, {
  info = "", -- 对应的字段，这些需要
  temperature = 0, -- 对应的字段
  oxygen = 0,-- 对应的字段
  ph_value = 0-- 对应的字段
  -- Other ...
})
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
        type: 'select',
      },
    ],
  },
];
