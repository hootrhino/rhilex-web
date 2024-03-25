/**
 * rhinopi 函数相关代码模板&示例
 */

const rhinopiList = [
  { target: 'DO1Set', detail: '设置 DO1 的值' },
  { target: 'DO1Get', detail: '获取 DO1 的值' },
  { target: 'DO2Set', detail: '设置 DO2 的值' },
  { target: 'DO2Get', detail: '获取 DO2 的值' },
  { target: 'DI1Get', detail: '获取 DI1 的值' },
  { target: 'DI2Get', detail: '获取 DI2 的值' },
  { target: 'DI3Get', detail: '获取 DI3 的值' },
];

export const rhinopiTpl = rhinopiList?.map((rhinopi) => {
  const code = `local err = rhinopi:${rhinopi.target}(arg)
if err ~= nil then
    Debug(err)
end`;

  return {
    ...rhinopi,
    label: `rhinopi:${rhinopi.target}`,
    apply: code,
    type: 'function',
    variables: [{ label: '犀牛网关 GPIO 编号', name: 'arg', value: 0, type: 'number' }],
  };
});
