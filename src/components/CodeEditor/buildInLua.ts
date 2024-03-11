import { dataQuickTpl } from "./quickLuaTpl";

/** Lua 关键词 **/
export const luaKeywords = [
  'and',
  'break',
  'do',
  'else',
  'elseif',
  'end',
  'false',
  'for',
  'function',
  'if',
  'in',
  'local',
  'nil',
  'not',
  'or',
  'repeat',
  'return',
  'then',
  'true',
  'until',
  'while',
  'goto',
];

/** Lua 内置方法函数 **/
export const builtInFuncs = [
  {
    label: 'then .. end',
    apply: `then

    end`,
    type: 'snippet',
  },
  {
    label: 'do .. end',
    apply: `do

    end`,
    type: 'snippet',
  },
  {
    label: 'if .. then',
    apply: `if  then

    end`,
    type: 'snippet',
  },
  {
    label: 'elseif .. then',
    apply: `elseif  then`,
    type: 'snippet',
  },
  {
    label: 'for .. ipairs',
    apply: `for index, value in ipairs(t) do

    end`,
    type: 'snippet',
  },
  {
    label: 'for .. pairs',
    apply: `for key, value in pairs(t) do

    end`,
    type: 'snippet',
  },
  {
    label: 'in ..',
    apply: `in pairs(t) do

    end`,
    type: 'snippet',
  },
  {
    label: 'for i = ..',
    apply: `for i = 1, 10, 1 do

    end`,
    type: 'snippet',
  },
  {
    label: 'function ()',
    apply: `function ()

    end`,
    type: 'snippet',
  },
  {
    label: 'local function',
    apply: `local function ()

    end`,
    type: 'snippet',
  },
  {
    label: 'repeat .. until',
    apply: `repeat

    until`,
    type: 'snippet',
  },
  {
    label: 'do return end',
    apply: `do return end`,
    type: 'snippet',
  },
  {
    label: 'while .. do',
    apply: `while true do

    end`,
    type: 'snippet',
  },
];

// data 函数
const dataToList = [
  { target: 'Http', detail: '数据推送到 HTTP 服务' },
  { target: 'Mqtt', detail: '数据推送到 MQTT 服务' },
  { target: 'Udp', detail: '数据推送到 UDP 服务' },
  { target: 'Tcp', detail: '数据推送到 TCP 服务' },
  { target: 'TdEngine', detail: '数据推送到 Tdengine 数据库' },
  { target: 'Mongo', detail: '数据推送到 Mongodb 数据库' },
  { target: 'Nats', detail: '数据推送到 Nats' },
  { target: 'Screen', detail: '数据推送到大屏' },
];

export const dataFuncs = dataToList?.map((data) => {
  const code = `local err = data:To${data.target}(arg1, args)
if err ~= nil then
  stdlib:Throw(err)
  return true, args
end`;
  return {
    label: `data:To${data.target}`,
    apply: code,
    type: 'function',
    detail: data.detail,
    quickTpl: dataQuickTpl[data.target],
    variables: [
      { label: `${data.target.toUpperCase()}资源`, name: 'arg1', type: 'select', dataSource: 'outends' },
    ],
  };
});

// stdlib 函数
const stdlibDebug = `stdlib:Debug(arg)`;
const stdlibThrow = `stdlib:Throw(err)`;

export const stdlibFuncs = [
  {
    label: 'stdlib:Debug',
    apply: stdlibDebug,
    type: 'function',
    detail: '打印日志',
    quickTpl: dataQuickTpl['Debug'],
    // variables: [{ label: '输出内容', name: 'arg', value: '', type: 'string' }],
  },
  {
    label: 'stdlib:Throw',
    apply: stdlibThrow,
    type: 'function',
    detail: '抛出异常',
    // variables: [{ label: '异常消息', name: 'arg', value: '', type: 'string' }],
  },
];

// time 函数
const timeList = [
  { target: 'Time', detail: '当前时间', variables: [] },
  { target: 'TimeMs', detail: '当前通用时间戳', variables: [] },
  { target: 'TsUnix', detail: '当前 Unix 时间戳', variables: [] },
  { target: 'TsUnixNano', detail: '当前纳秒级时间戳', variables: [] },
  { target: 'NtpTime', detail: 'NTP 时间', variables: [] },
  {
    target: 'Sleep',
    detail: '休眠',
    extra: 'arg',
    variables: [{ label: '休眠时间', name: 'arg', value: '', type: 'number' }],
  },
];

export const timeFuncs = timeList?.map((time) => {
  const code = time.extra
    ? `local ts = time:${time.target}(${time.extra})`
    : `local ts = time:${time.target}()`;
  return {
    ...time,
    label: `time:Time${time.target}`,
    apply: code,
    type: 'function',
    detail: time.detail,
  };
});

// kv 函数
const kvSet = `kv:Set(arg1, arg2)`;
const kvGet = `local value = kv:Get(arg)`;
const kvDel = `kv:Del(arg)`;

export const kvFuncs = [
  {
    label: 'kv:Set',
    apply: kvSet,
    type: 'function',
    detail: '全局缓存设置值',
    variables: [
      { label: 'Key', name: 'arg1', value: '', type: 'string' },
      { label: 'Value', name: 'arg2', value: '', type: 'string' },
    ],
  },
  {
    label: 'kv:Get',
    apply: kvGet,
    type: 'function',
    detail: '全局缓存取值',
    variables: [{ label: 'Key', name: 'arg', value: '', type: 'string' }],
  },
  {
    label: 'kv:Del',
    apply: kvDel,
    type: 'function',
    detail: '全局缓存删除值',
    variables: [{ label: 'Key', name: 'arg', value: '', type: 'string' }],
  },
];

// localdb 函数
const localdbQuery = `local Table = localdb:Query('select * from db1')
for i, v in ipairs(Table) do
  stdlib:Log(err)
end`;

const localdbExecute = `local error = localdb:Query(arg)`;

export const localdbFuncs = [
  {
    label: 'localdb:Query',
    apply: localdbQuery,
    type: 'function',
    detail: '本地数据库查询(有返回值)',
  },
  {
    label: 'localdb:Execute',
    apply: localdbExecute,
    type: 'function',
    detail: '本地数据库执行(无返回值)',
    variables: [{ label: 'SQL 语句', name: 'arg', value: '', type: 'string' }],
  },
];

// json 函数
const jsonT2J = `local Value = json:T2J(arg)`;
const jsonJ2T = `local Value = json:J2T(arg)`;

export const jsonFuncs = [
  {
    label: 'json:T2J',
    apply: jsonT2J,
    type: 'function',
    detail: 'LuaTable 转 JSON 字符串',
    variables: [{ label: 'Lua 表变量', name: 'arg', value: '', type: 'string' }],
  },
  {
    label: 'json:J2T',
    apply: jsonJ2T,
    type: 'function',
    detail: 'JSON 字符串转 LuaTable',
    variables: [{ label: 'JSON字符串', name: 'arg', value: '', type: 'string' }],
  },
];

// math 函数
const mathTFloat = `local Value = json:TFloat(arg1, arg2)`;

// jq 函数
const jqExecute = `local Value = jq:Execute(arg1, arg2 ))`;

// rpc 函数
const rpcRequest = `local Value = rpc:Request(arg1, arg2, arg3)`;

export const otherFuncs = [
  {
    label: 'math:TFloat',
    apply: mathTFloat,
    type: 'function',
    detail: '截取浮点数',
    variables: [
      { label: '数值', name: 'arg1', value: 0, type: 'number' },
      { label: '取小数位数', name: 'arg2', value: 2, type: 'number' },
    ],
  },
  {
    label: 'jq:Execute',
    apply: jqExecute,
    type: 'function',
    detail: 'JQ 筛选数据',
    variables: [
      { label: 'JSON 字符串', name: 'arg1', value: '', type: 'string' },
      { label: 'JQ 表达式', name: 'arg2', value: '', type: 'string' },
    ],
  },
  {
    label: 'rpc:Request',
    apply: rpcRequest,
    type: 'function',
    detail: 'RPC 调用',
    variables: [
      { label: 'RPC 资源', name: 'arg1', value: '', type: 'string' },
      { label: 'RPC 指令', name: 'arg2', value: '', type: 'string' },
      { label: 'RPC 参数', name: 'arg2', value: '', type: 'string' },
    ],
  },
];

// device 函数
const deviceList = [
  { target: 'Write', detail: '向设备写入数据' },
  { target: 'Read', detail: '从设备读取数据' },
  { target: 'Ctrl', detail: '向设备发送控制指令' },
];

export const deviceFuncs = deviceList?.map((device) => {
  const err1 =
    device.target === 'Read'
      ? `local Data, err1 = device:${device.target}(arg1, arg2, arg3)`
      : `local err1 = device:${device.target}(arg1, arg2, arg3)`;
  const code = `${err1}
if err1 ~= nil then
  stdlib:Log(err)
end`;
  return {
    label: `device:${device.target}`,
    apply: code,
    type: 'function',
    detail: device.detail,
    variables: [
      { label: '设备资源', name: 'arg1', value: '', type: 'select', dataSource: 'devices' },
      { label: '设备指令', name: 'arg2', value: '', type: 'string' },
      { label: '设备参数', name: 'arg3', value: '', type: 'string' },
    ],
  };
});

// rhinopi 函数
const rhinopiList = [
  { target: 'DO1Set', detail: '设置 DO1 的值' },
  { target: 'DO1Get', detail: '获取 DO1 的值' },
  { target: 'DO2Set', detail: '设置 DO2 的值' },
  { target: 'DO2Get', detail: '获取 DO2 的值' },
  { target: 'DI1Get', detail: '获取 DI1 的值' },
  { target: 'DI2Get', detail: '获取 DI2 的值' },
  { target: 'DI3Get', detail: '获取 DI3 的值' },
];

export const rhinopiFuncs = rhinopiList?.map((rhinopi) => {
  const code = `
local err1 = rhinopi:${rhinopi.target}(arg)
if err1 ~= nil then
    stdlib:Log(err)
end
`;
  return {
    label: `rhinopi:${rhinopi.target}`,
    apply: code,
    type: 'function',
    detail: rhinopi.detail,
    variables: [{ label: '犀牛网关GPIO编号', name: 'arg', value: 0, type: 'number' }],
  };
});

// modbus 函数
const modbusList = [
  { target: 'F5', detail: '写单个线圈' },
  { target: 'F6', detail: '写单个寄存器' },
  { target: 'F15', detail: '写多个线圈' },
  { target: 'F16', detail: '写多个寄存器' },
];

export const modbusFuncs = modbusList?.map((modbus) => {
  let err1 = '';
  let variables = [
    { label: 'Modbus 设备资源', name: 'arg1', value: '', type: 'string' },
    { label: 'Modbus ID', name: 'arg2', value: 1, type: 'number' },
  ] as TplVariables[];

  if (['F15', 'F16'].includes(modbus?.target)) {
    err1 = `local err1 = modbus:${modbus.target}(arg1, arg2, arg3, arg4, arg5)`;
    variables = [
      ...variables,
      { label: '起始地址', name: 'arg3', value: 0, type: 'number' },
      { label: '写入数量', name: 'arg4', value: 1, type: 'number' },
      { label: '写入数据', name: 'arg5', value: '', type: 'string' },
    ];
  } else {
    err1 = `local err1 = modbus:${modbus.target}(arg1, arg2, arg3, arg4)`;
    variables = [
      ...variables,
      { label: '线圈值', name: 'arg3', value: 0, type: 'number' },
      { label: '写入数据', name: 'arg4', value: '00', type: 'string' },
    ];
  }

  const code = `${err1}
if err1 ~= nil then
    stdlib:Log(err)
end`;

  return {
    label: `modbus:${modbus.target}`,
    apply: code,
    type: 'function',
    detail: modbus.detail,
    variables,
  };
});

export const luaGlobFuncs = [
  ...dataFuncs,
  ...timeFuncs,
  ...rhinopiFuncs,
  ...deviceFuncs,
  ...modbusFuncs,
  ...kvFuncs,
  ...stdlibFuncs,
  ...localdbFuncs,
  ...jsonFuncs,
  ...otherFuncs,
];

export const builtInLuaTplData = [
  {
    name: 'data 函数',
    children: dataFuncs,
    uuid: 'data',
  },
  {
    name: 'time 函数',
    children: timeFuncs,
    uuid: 'time',
  },
  {
    name: 'rhinopi 函数',
    children: rhinopiFuncs,
    uuid: 'rhinopi',
  },
  {
    name: 'device 函数',
    children: deviceFuncs,
    uuid: 'device',
  },
  {
    name: 'modbus 函数',
    children: modbusFuncs,
    uuid: 'modbus',
  },
  {
    name: 'kv 函数',
    children: kvFuncs,
    uuid: 'kv',
  },
  {
    name: 'stdlib 函数',
    children: stdlibFuncs,
    uuid: 'stdlib',
  },
  {
    name: 'localdb 函数',
    children: localdbFuncs,
    uuid: 'localdb',
  },
  {
    name: 'json 函数',
    children: jsonFuncs,
    uuid: 'json',
  },
  {
    name: '其他函数',
    children: otherFuncs,
    uuid: 'other',
  },
];
