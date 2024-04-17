/**
 * device 函数相关代码模板&示例
 */

const deviceList = [
  { target: 'Write', detail: '向设备写入数据' },
  { target: 'Read', detail: '从设备读取数据' },
  { target: 'Ctrl', detail: '向设备发送控制指令' },
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

export const deviceTpl = deviceList?.map((device) => ({
  ...device,
  label: `device:${device.target}`,
  apply: getCode(device.target),
  type: 'function',
  variables: [
    { label: '设备资源', name: 'arg1', value: '', type: 'select', dataSource: 'device' },
    { label: '设备指令', name: 'arg2', value: '', type: 'string' },
    { label: '设备参数', name: 'arg3', value: '', type: 'string' },
  ],
}));
