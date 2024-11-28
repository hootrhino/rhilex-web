/**
 * modbus 函数相关代码模板&示例
 */

import { getIntl, getLocale } from '@umijs/max';
const {formatMessage} = getIntl(getLocale());

const modbusList = [
  { target: 'F5', detail: formatMessage({ id: 'component.tpl.f5' }) },
  { target: 'F6', detail: formatMessage({ id: 'component.tpl.f6' }) },
  { target: 'F15', detail: formatMessage({ id: 'component.tpl.f15' }) },
  { target: 'F16', detail: formatMessage({ id: 'component.tpl.f16' }) },
];

export const modbusTpl = modbusList?.map(({target, ...rest}) => {
  let err = '';
  if (['F15', 'F16'].includes(target)) {
    err = `local err = modbus:${target}(arg1, arg2, arg3, arg4, arg5)`;
  } else {
    err = `local err = modbus:${target}(arg1, arg2, arg3, arg4)`;
  }

  const code = `${err}
if err ~= nil then
    Debug(err)
end`;

  return {
    ...rest,
    key: `modbus-${target}`,
    label: `modbus:${target}`,
    apply: code,
    type: 'function',
    hasVariables: false
  };
});
