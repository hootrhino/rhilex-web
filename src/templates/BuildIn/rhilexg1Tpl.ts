/**
 * rhilexg1 函数相关代码模板&示例
 */

import { getIntl, getLocale } from '@umijs/max';
const intl = getIntl(getLocale());

const rhilexg1List = [
  {
    target: 'DO1Set',
    detail: intl.formatMessage({ id: 'component.tpl.rhilexg1.set' }, { target: 'DO1' }),
  },
  {
    target: 'DO1Get',
    detail: intl.formatMessage({ id: 'component.tpl.rhilexg1.get' }, { target: 'DO1' }),
  },
  {
    target: 'DO2Set',
    detail: intl.formatMessage({ id: 'component.tpl.rhilexg1.set' }, { target: 'DO2' }),
  },
  {
    target: 'DO2Get',
    detail: intl.formatMessage({ id: 'component.tpl.rhilexg1.get' }, { target: 'DO2' }),
  },
  {
    target: 'DI1Get',
    detail: intl.formatMessage({ id: 'component.tpl.rhilexg1.get' }, { target: 'DI1' }),
  },
  {
    target: 'DI2Get',
    detail: intl.formatMessage({ id: 'component.tpl.rhilexg1.get' }, { target: 'DI2' }),
  },
  {
    target: 'DI3Get',
    detail: intl.formatMessage({ id: 'component.tpl.rhilexg1.get' }, { target: 'DI3' }),
  },
];

export const rhilexg1Tpl = rhilexg1List?.map(({target, ...rest}) => {
  const code = `local err = rhilexg1:${target}(arg)
if err ~= nil then
    Debug(err)
end`;

  return {
    ...rest,
    key: `rhilexg1-${target}`,
    label: `rhilexg1:${target}`,
    apply: code,
    type: 'function',
  };
});
