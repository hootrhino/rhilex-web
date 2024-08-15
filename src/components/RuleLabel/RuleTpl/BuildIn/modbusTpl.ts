import { getIntl, getLocale } from '@umijs/max';

/**
 * modbus 函数相关代码模板&示例
 */
const intl = getIntl(getLocale());

const modbusList = [
  { target: 'F5', detail: intl.formatMessage({ id: 'component.tpl.f5' }) },
  { target: 'F6', detail: intl.formatMessage({ id: 'component.tpl.f6' }) },
  { target: 'F15', detail: intl.formatMessage({ id: 'component.tpl.f15' }) },
  { target: 'F16', detail: intl.formatMessage({ id: 'component.tpl.f16' }) },
];

export const modbusTpl = modbusList?.map((modbus) => {
  let err = '';
  if (['F15', 'F16'].includes(modbus.target)) {
    err = `local err = modbus:${modbus.target}(arg1, arg2, arg3, arg4, arg5)`;
  } else {
    err = `local err = modbus:${modbus.target}(arg1, arg2, arg3, arg4)`;
  }

  const code = `${err}
if err ~= nil then
    Debug(err)
end`;

  return {
    ...modbus,
    label: `modbus:${modbus.target}`,
    apply: code,
    type: 'function',
  };
});
