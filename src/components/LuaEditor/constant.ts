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
const dataToHttp = `local err1 = data:ToHttp('uuid', arg)
if err1 ~= nil then
  stdlib:Log(err)
end
`;
const dataToMqtt = `local err1 = data:ToMqtt('uuid', arg)
if err1 ~= nil then
  stdlib:Log(err)
end
`;
const dataToUdp = `local err1 = data:ToUdp('uuid', arg)
if err1 ~= nil then
  stdlib:Log(err)
end
`;
const dataToTdEngine = `local err1 = data:ToTdEngine('uuid', arg)
if err1 ~= nil then
  stdlib:Log(err)
end
`;
const dataToMongo = `local err1 = data:ToMongo('uuid', arg)
if err1 ~= nil then
  stdlib:Log(err)
end
`;
const dataToNats = `local err1 = data:ToNats('uuid', arg)
if err1 ~= nil then
  stdlib:Log(err)
end
`;
const dataToScreen = `local err1 = data:ToScreen('uuid', arg)
if err1 ~= nil then
  stdlib:Log(err)
end
`;

// stdlib 函数
const stdlibDebug = `stdlib:Debug('字符串会被输出到 Websocket 日志')`;
const stdlibThrow = `stdlib:Throw('字符串会被输出到 Websocket 日志')`;

// time 函数
const timeTime = `local ts = time:Time()`;
const timeTimeMs = `local ts = time:TimeMs()`;
const timeTsUnix = `local ts = time:TsUnix()`;
const timeTsUnixNano = `local ts = time:TsUnixNano()`;
const timeNtpTime = `local ts = time:NtpTime()`;
const timeSleep = `local ts = time:Sleep(时间单位是毫秒)`;

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
const deviceWrite = `local data1, err1 = device:Write('uuid', "cmd", "args")
if err ~= nil then
  stdlib:Log(err)
end`;

const deviceRead = `local data1, err1 = device:Read('uuid', "cmd", "args")
if err ~= nil then
    stdlib:Log(err)
end`;

const deviceCtrl = `local data1, err1 = device:Ctrl('uuid', "cmd", "args")
if err ~= nil then
    stdlib:Log(err)
end`;

// rhinopi 函数
const rhinopiDO1Set = `local err1 = rhinopi:DO1Set(0)
if err ~= nil then
    stdlib:Log(err)
end`;
const rhinopiDO1Get = `local err1 = rhinopi:DO1Get(0)
if err ~= nil then
    stdlib:Log(err)
end`;
const rhinopiDO2Set = `local err1 = rhinopi:DO2Set(0)
if err ~= nil then
    stdlib:Log(err)
end`;
const rhinopiDO2Get = `local err1 = rhinopi:DO2Get(0)
if err ~= nil then
    stdlib:Log(err)
end`;
const rhinopiDI1Get = `local err1 = rhinopi:DI1Get(0)
if err ~= nil then
    stdlib:Log(err)
end`;
const rhinopiDI2Get = `local err1 = rhinopi:DI2Get(0)
if err ~= nil then
    stdlib:Log(err)
end`;
const rhinopiDI3Get = `local err1 = rhinopi:DI3Get(0)
if err ~= nil then
    stdlib:Log(err)
end`;

export const luaGlobFuncs = [
  { label: 'data:ToHttp', apply: dataToHttp, type: 'function', detail: '数据推送到 HTTP 服务' },
  { label: 'data:ToMqtt', apply: dataToMqtt, type: 'function', detail: '数据推送到 MQTT 服务' },
  { label: 'data:ToUdp', apply: dataToUdp, type: 'function', detail: '数据推送到 UDP 服务' },
  {
    label: 'data:ToTdEngine',
    apply: dataToTdEngine,
    type: 'function',
    detail: '数据推送到 Tdengine',
  },
  { label: 'data:ToMongo', apply: dataToMongo, type: 'function', detail: '数据推送到 Mongodb' },
  { label: 'data:ToNats', apply: dataToNats, type: 'function', detail: '数据推送到 Nats' },
  { label: 'data:ToScreen', apply: dataToScreen, type: 'function', detail: '数据推送到大屏' },
  { label: 'stdlib:Debug', apply: stdlibDebug, type: 'function', detail: '打印日志' },
  { label: 'stdlib:Throw', apply: stdlibThrow, type: 'function', detail: '抛出异常' },
  { label: 'time:Time', apply: timeTime, type: 'function', detail: '当前时间' },
  { label: 'time:Time', apply: timeTimeMs, type: 'function', detail: '当前通用时间戳' },
  { label: 'time:Time', apply: timeTsUnix, type: 'function', detail: '当前 Unix 时间戳' },
  { label: 'time:Time', apply: timeTsUnixNano, type: 'function', detail: '当前纳秒级时间戳' },
  { label: 'time:Time', apply: timeNtpTime, type: 'function', detail: 'NTP 时间' },
  { label: 'time:Time', apply: timeSleep, type: 'function', detail: '休眠' },
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
  { label: 'device:Write', apply: deviceWrite, type: 'function', detail: '向设备写入数据' },
  { label: 'device:Read', apply: deviceRead, type: 'function', detail: '从设备读取数据' },
  { label: 'device:Ctrl', apply: deviceCtrl, type: 'function', detail: '向设备发送控制指令' },
  { label: 'rhinopi:DO1Set', apply: rhinopiDO1Set, type: 'function', detail: '设置 DO1 的值' },
  { label: 'rhinopi:DO1Get', apply: rhinopiDO1Get, type: 'function', detail: '获取 DO1 的值' },
  { label: 'rhinopi:DO2Set', apply: rhinopiDO2Set, type: 'function', detail: '设置 DO2 的值' },
  { label: 'rhinopi:DO2Get', apply: rhinopiDO2Get, type: 'function', detail: '获取 DO2 的值' },
  { label: 'rhinopi:DI1Get', apply: rhinopiDI1Get, type: 'function', detail: '获取 DI1 的值' },
  { label: 'rhinopi:DI2Get', apply: rhinopiDI2Get, type: 'function', detail: '获取 DI2 的值' },
  { label: 'rhinopi:DI3Get', apply: rhinopiDI3Get, type: 'function', detail: '获取 DI3 的值' },
];
