/**
 * device 函数相关代码模板&示例
 */

import { getIntl, getLocale } from '@umijs/max';
const {formatMessage} = getIntl(getLocale());

const deviceList = [
  { target: 'Write', detail: formatMessage({ id: 'component.tpl.device.write' }) },
  { target: 'Read', detail: formatMessage({ id: 'component.tpl.device.read' }) },
  { target: 'Ctrl', detail: formatMessage({ id: 'component.tpl.device.ctrl' }) },
];

const getCode = (target: string) => {
  const err =
    target === 'Read'
      ? `local Data, err = device:${target}(arg1, arg2, arg3)`
      : `local err = device:${target}(arg1, arg2, arg3)`;

  return `${err}
if err ~= nil then
  Debug(err)
end`;
};

export const deviceTpl = deviceList?.map(({target, ...rest}) => ({
  ...rest,
  key: `device-${target}`,
  label: `device:${target}`,
  apply: getCode(target),
  type: 'function',
}));
