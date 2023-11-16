type SniptParams = {
  target: string;
  detail: string;
  extra?: string;
  params?: number;
}

// Lua 关键词
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

// Lua 内置方法函数

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

export const getDataToFunc = ({ target, detail }: SniptParams) => {
  const code = `
local err1 = data:To${target}('uuid', arg)
if err1 ~= nil then
  stdlib:Log(err)
end
`;
  return { label: `data:To${target}`, apply: code, type: 'function', detail };
};

// stdlib 函数
const stdlibDebug = `stdlib:Debug('字符串会被输出到 Websocket 日志')`;
const stdlibThrow = `stdlib:Throw('字符串会被输出到 Websocket 日志')`;

// time 函数
const timeList = [
  { target: 'Time', detail: '当前时间' },
  { target: 'TimeMs', detail: '当前通用时间戳' },
  { target: 'TsUnix', detail: '当前 Unix 时间戳' },
  { target: 'TsUnixNano', detail: '当前纳秒级时间戳' },
  { target: 'NtpTime', detail: 'NTP 时间' },
  { target: 'Sleep', detail: '休眠', extra: '时间单位是毫秒' },
];

export const getTimeFunc = ({
  target,
  detail,
  extra,
}: SniptParams) => {
  const code = `local ts = time:${target}(${extra})`;
  return { label: `time:Time${target}`, apply: code, type: 'function', detail };
};

// kv 函数
const kvSet = `kv:Set("K", "value")`;
const kvGet = `local value = kv:Get("K")`;
const kvDel = `kv:Del("K")`;

// localdb 函数
const localdbQuery = `local Table = localdb:Query('select * from db1')
for i, v in ipairs(Table) do
  stdlib:Log(err)
end`;
const localdbExecute = `local error = localdb:Query('insert into tb1')`;

// json 函数
const jsonT2J = `local Value = json:T2J(LuaTable)`;
const jsonJ2T = `local Value = json:J2T(jsonStr)`;

// math 函数
const mathTFloat = `local Value = json:TFloat(3.1415, 2)`;

// jq 函数
const jqExecute = `local Value = jq:Execute(somedata, "Jq Expresssion" ))`;

// rpc 函数
const rpcRequest = `local Value = rpc:Request('uuid', "cmd", "arg")`;

// devide 函数
const deviceList = [
  { target: 'Write', detail: '向设备写入数据' },
  { target: 'Read', detail: '从设备读取数据' },
  { target: 'Ctrl', detail: '向设备发送控制指令' },
];

export const getDeviceFunc = ({target,detail}: SniptParams) => {
  const err1 = target === 'Read' ? `local Data, err1 = device:${target}('uuid', "cmd", "args")` : `local err1 = device:${target}('uuid', "cmd", "args")`;
  const code = `
${err1}
if err1 ~= nil then
  stdlib:Log(err)
end
`;
  return { label: `device:${target}`, apply: code, type: 'function', detail };
};

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

export const getRhinopiFunc = ({target, detail}: SniptParams) => {
  const code = `
local err1 = rhinopi:${target}(0)
if err1 ~= nil then
    stdlib:Log(err)
end
`;
  return { label: `rhinopi:${target}`, apply: code, type: 'function', detail };
};

// modbus 函数
const modbusList = [
  { target: 'F5', detail: '写单个线圈', extra: '00' },
  { target: 'F6', detail: '写单个寄存器',extra: 'AABB' },
  { target: 'F15', detail: '写多个线圈',extra: 'AA', params: 8 },
  { target: 'F16', detail: '写多个寄存器',extra: 'AABBCCDD', params: 2 },
];

export const getModbusFunc = ({target, detail, extra, params}: SniptParams) => {
  const err1 = params ? `local err1 = modbus:${target}(UUID, 1, 0, ${params}, ${extra})` : `local err1 = modbus:${target}(UUID, 1, 0, ${extra})`;
  const code = `
${err1}
if err1 ~= nil then
    stdlib:Log(err)
end
`;
  return { label: `modbus:${target}`, apply: code, type: 'function', detail };
};

export const luaGlobFuncs = [
  ...dataToList?.map((data) => getDataToFunc(data)),
  ...timeList?.map((time) => getTimeFunc(time)),
  ...rhinopiList?.map((rhinopi) => getRhinopiFunc(rhinopi)),
  ...deviceList?.map((device) => getDeviceFunc(device)),
  ...modbusList?.map((modbus) => getModbusFunc(modbus)),
  { label: 'stdlib:Debug', apply: stdlibDebug, type: 'function', detail: '打印日志' },
  { label: 'stdlib:Throw', apply: stdlibThrow, type: 'function', detail: '抛出异常' },
  { label: 'kv:Set', apply: kvSet, type: 'function', detail: '全局缓存设置值' },
  { label: 'kv:Get', apply: kvGet, type: 'function', detail: '全局缓存取值' },
  { label: 'kv:Del', apply: kvDel, type: 'function', detail: '全局缓存删除值' },
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
  },
  { label: 'json:T2J', apply: jsonT2J, type: 'function', detail: 'LuaTable 转 JSON 字符串' },
  { label: 'json:J2T', apply: jsonJ2T, type: 'function', detail: 'JSON 字符串转 LuaTable' },
  { label: 'math:TFloat', apply: mathTFloat, type: 'function', detail: '截取浮点数' },
  { label: 'jq:Execute', apply: jqExecute, type: 'function', detail: 'JQ 筛选数据' },
  { label: 'rpc:Request', apply: rpcRequest, type: 'function', detail: 'RPC 调用' },
];
