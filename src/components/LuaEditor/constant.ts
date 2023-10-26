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
export const luaGlobFuncs = [
  { label: 'type', apply: `type(val_name)`, type: 'function', detail: '查看数据类型' },
  { label: 'xpcall', apply: `xpcall(f, err, ...)`, type: 'function', detail: '错误处理' },
  { label: 'tostring', apply: `tostring(val)`, type: 'function', detail: '将参数转换为字符串' },
  {
    label: 'tonumber',
    apply: `tonumber(val [, base])`,
    type: 'function',
    detail: '将参数转换为数字',
  },
  { label: 'setmetatable', apply: `setmetatable(val_name)`, type: 'function', detail: '' },
  { label: 'select', apply: `select(val_name)`, type: 'function', detail: '' },
  {
    label: 'rawset',
    apply: `rawset(table, index, value)`,
    type: 'function',
    detail: '设置表索引处的值',
  },
  {
    label: 'rawget',
    apply: `rawget(table_name, index)`,
    type: 'function',
    detail: '返回表指定索引的值',
  },
  {
    label: 'rawequal',
    apply: `rawequal(val1, val2)`,
    type: 'function',
    detail: '比较两个参数是否相等',
  },
  { label: 'print', apply: `print(val)`, type: 'function', detail: '打印信息到控制台' },
  { label: 'pcall', apply: `pcall(f, arg1, arg2, ...)`, type: 'function', detail: '异常捕获' },
  { label: 'pairs', apply: `pairs(vals)`, type: 'function', detail: '遍历集合' },
  { label: 'ipairs', apply: `ipairs(vals)`, type: 'function', detail: '遍历集合' },
  { label: 'next', apply: `next(table[, index])`, type: 'function', detail: '遍历表中所有的域' },
  {
    label: 'loadfile',
    apply: `loadfile([file_name])`,
    type: 'function',
    detail: '读取源代码文件，但是不执行代码',
  },
  { label: 'load', apply: `load(f [, chunk_name])`, type: 'function', detail: '加载一个chunk' },
  {
    label: 'getmetatable',
    apply: `getmetatable(table)`,
    type: 'function',
    detail: '返回对象的元表',
  },
  { label: 'error', apply: `error(message[, level])`, type: 'function', detail: '错误处理' },
  {
    label: 'dofile',
    apply: `dofile(file_name)`,
    type: 'function',
    detail: '读取源代码文件，并且把它的内容作为一个chunk来执行',
  },
  {
    label: 'collectgarbage',
    apply: `collectgarbage([opt[, arg]])`,
    type: 'function',
    detail: '内存管理',
  },
  { label: 'assert', apply: `assert(v [, message])`, type: 'function', detail: '错误处理' },
];

// Lua 常见模板
const mqttTpl = `Actions = {
  function(args)
      local err1 = data:ToMqtt(#{UUID}, args)
      if err1 ~= nil then
          stdlib:Log(err)
      end
      return true, args
  end
}`;

const mongodbTpl = `Actions = {
  function(args)
      local err1 = data:ToMongo(#{UUID}, args)
      if err1 ~= nil then
          stdlib:Log(err)
      end
      return true, args
  end
}`;

const tdengineTpl = `Actions = {
  function(args)
      local err1 = data:ToTdEngine(#{UUID}, args)
      if err1 ~= nil then
          stdlib:Log(err)
      end
      return true, args
  end
}`;

const natsTpl = `Actions = {
  function(args)
      local err1 = data:ToNats(#{UUID}, args)
      if err1 ~= nil then
          stdlib:Log(err)
      end
      return true, args
  end
}`;

const httpTpl = `Actions = {
  function(args)
      local err1 = data:ToHttp(#{UUID}, args)
      if err1 ~= nil then
          stdlib:Log(err)
      end
      return true, args
  end
}`;

const udpTpl = `Actions = {
  function(args)
      local err1 = data:ToUdp(#{UUID}, args)
      if err1 ~= nil then
          stdlib:Log(err)
      end
      return true, data
  end
}`;

const writeTpl = `function(args)
  local data1, err1 = device:Write(#{UUID}, "", "")
  if err ~= nil then
      stdlib:Log(err)
  end
  return true, args
end`;

const readTpl = `function(args)
  local data1, err1 = device:Read('uuid', "", "")
  if err ~= nil then
      stdlib:Log(err)
  end
  return true, args
end`;

const ctrlTpl = `function(args)
  local data1, err1 = device:Ctrl(#{uuid}, "", "")
  if err ~= nil then
      stdlib:Log(err)
  end
  return true, args
end`;

const rpcTpl = `function(args)
  local data1, err1 = rpc:Request('uuid', "", "")
  if err ~= nil then
      stdlib:Log(err)
  end
  return true, args
end`;

const jqTpl = `function(args)
  local data1, err1 = jq:JQ(".[]")
  if err1 ~= nil then
      stdlib:Log(err1)
  end
  return true, args
end`;

const throwTpl = `function(args)
  stdlib:Throw("some message")
  return true, args
end`;

const debugTpl = `function(args)
  stdlib:Debug("some message")
  return true, args
end`;

const timeTpl = `function(args)
  time:Time()
  time:TimeMs()
  time:TsUnix()
  time:TsUnixNano()
  time:NtpTime()
  time:Sleep(100)
  return true, args
end`;

const matchUIntTpl = `local MatchHexTb = rulexlib:MatchUInt("k1:[0,1];k2:[2,3]", "0xFFFFFF")
  print("MatchHexTb.k1=", MatchHexTb.k1)
  print("MatchHexTb.k2=", MatchHexTb.k2)
`;

export const luaSnippets = [
  {
    template: matchUIntTpl,
    completion: {
      label: 'MatchUInt',
      detail: '十六进制字符串匹配',
      type: 'class',
    },
  },
  {
    template: mqttTpl,
    completion: {
      label: 'MQTT',
      detail: '数据流出模板',
      type: 'class',
    },
  },
  {
    template: mongodbTpl,
    completion: {
      label: 'Mongodb',
      detail: '数据流出模板',
      type: 'class',
    },
  },
  {
    template: tdengineTpl,
    completion: {
      label: 'Tdengine',
      detail: '数据流出模板',
      type: 'class',
    },
  },
  {
    template: natsTpl,
    completion: {
      label: 'Nats',
      detail: '数据流出模板',
      type: 'class',
    },
  },
  {
    template: httpTpl,
    completion: {
      label: 'HTTP',
      detail: '数据流出模板',
      type: 'class',
    },
  },
  {
    template: udpTpl,
    completion: {
      label: 'UDP',
      detail: '数据流出模板',
      type: 'class',
    },
  },
  {
    template: writeTpl,
    completion: {
      label: 'Write',
      detail: '向设备写入数据',
      type: 'class',
    },
  },
  {
    template: readTpl,
    completion: {
      label: 'Read',
      detail: '从设备读取数据',
      type: 'class',
    },
  },
  {
    template: ctrlTpl,
    completion: {
      label: 'Ctrl',
      detail: '设备指令控制',
      type: 'class',
    },
  },
  {
    template: rpcTpl,
    completion: {
      label: 'RPC',
      detail: '发送RPC编解码请求',
      type: 'class',
    },
  },
  {
    template: jqTpl,
    completion: {
      label: 'JQ',
      detail: 'JQ数据筛选',
      type: 'class',
    },
  },
  {
    template: throwTpl,
    completion: {
      label: 'Stdlib:Throw',
      detail: '异常处理',
      type: 'class',
    },
  },
  {
    template: debugTpl,
    completion: {
      label: 'Stdlib:Debug',
      detail: '调试打印',
      type: 'class',
    },
  },
  {
    template: timeTpl,
    completion: {
      label: 'Time',
      detail: '时间函数',
      type: 'class',
    },
  },
];
