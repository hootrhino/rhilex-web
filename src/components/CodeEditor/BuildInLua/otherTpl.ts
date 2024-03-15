/**
 * 其他函数相关代码模板&示例
 */

export const otherTpl = [
  {
    label: 'math:TFloat',
    apply: `local Value = json:TFloat(arg1, arg2)`,
    type: 'function',
    detail: '截取浮点数',
    variables: [
      { label: '数值', name: 'arg1', value: 0, type: 'number' },
      { label: '取小数位数', name: 'arg2', value: 2, type: 'number' },
    ],
  },
  {
    label: 'jq:Execute',
    apply: `local Value = jq:Execute(arg1, arg2 )`,
    type: 'function',
    detail: 'JQ 筛选数据',
    variables: [
      { label: 'JSON 字符串', name: 'arg1', value: '', type: 'string' },
      { label: 'JQ 表达式', name: 'arg2', value: '', type: 'string' },
    ],
  },
  {
    label: 'rpc:Request',
    apply: `local Value = rpc:Request(arg1, arg2, arg3)`,
    type: 'function',
    detail: 'RPC 调用',
    variables: [
      { label: 'RPC 资源', name: 'arg1', value: '', type: 'string' },
      { label: 'RPC 指令', name: 'arg2', value: '', type: 'string' },
      { label: 'RPC 参数', name: 'arg2', value: '', type: 'string' },
    ],
  },
];
