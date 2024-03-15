/**
 * modbus 函数相关代码模板&示例
 */

const modbusList = [
  { target: 'F5', detail: '写单个线圈' },
  { target: 'F6', detail: '写单个寄存器' },
  { target: 'F15', detail: '写多个线圈' },
  { target: 'F16', detail: '写多个寄存器' },
];

const getVariables = (target: string) => {
  let err = '';
  let variables = [
    { label: 'Modbus 设备资源', name: 'arg1', value: '', type: 'string' },
    { label: 'Modbus ID', name: 'arg2', value: 1, type: 'number' },
  ];

  if (['F15', 'F16'].includes(target)) {
    err = `local err1 = modbus:${target}(arg1, arg2, arg3, arg4, arg5)`;
    variables = [
      ...variables,
      { label: '起始地址', name: 'arg3', value: 0, type: 'number' },
      { label: '写入数量', name: 'arg4', value: 1, type: 'number' },
      { label: '写入数据', name: 'arg5', value: '', type: 'string' },
    ];
  } else {
    err = `local err1 = modbus:${target}(arg1, arg2, arg3, arg4)`;
    variables = [
      ...variables,
      { label: '线圈值', name: 'arg3', value: 0, type: 'number' },
      { label: '写入数据', name: 'arg4', value: '00', type: 'string' },
    ];
  }

  return { err, variables };
};

export const modbusTpl = modbusList?.map((modbus) => {
  const { err, variables } = getVariables(modbus.target);

  const code = `${err}
if err1 ~= nil then
    Debug(err)
end`;

  return {
    ...modbus,
    label: `modbus:${modbus.target}`,
    apply: code,
    type: 'function',
    variables,
  };
});
