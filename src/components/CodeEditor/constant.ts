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

// TODO Lua 内置方法函数 apply&detail补充完整
export const luaGlobFuncs = [
  { label: 'type', apply: `type(val_name)`, type: 'function', detail: '查看数据类型' },
  { label: 'xpcall', apply: `type(val_name)`, type: 'function' },
  { label: 'tostring', apply: `type(val_name)`, type: 'function' },
  { label: 'tonumber', apply: `type(val_name)`, type: 'function' },
  { label: 'setmetatable', apply: `type(val_name)`, type: 'function' },
  { label: 'select', apply: `type(val_name)`, type: 'function' },
  { label: 'rawset', apply: `type(val_name)`, type: 'function' },
  { label: 'rawget', apply: `type(val_name)`, type: 'function' },
  { label: 'rawequal', apply: `type(val_name)`, type: 'function' },
  { label: 'print', apply: `type(val_name)`, type: 'function' },
  { label: 'pcall', apply: `type(val_name)`, type: 'function' },
  { label: 'pairs', apply: `type(val_name)`, type: 'function' },
  { label: 'next', apply: `type(val_name)`, type: 'function' },
  { label: 'loadfile', apply: `type(val_name)`, type: 'function' },
  { label: 'load', apply: `type(val_name)`, type: 'function' },
  { label: 'ipairs', apply: `type(val_name)`, type: 'function' },
  { label: 'getmetatable', apply: `type(val_name)`, type: 'function' },
  { label: 'error', apply: `type(val_name)`, type: 'function' },
  { label: 'dofile', apply: `type(val_name)`, type: 'function' },
  { label: 'collectgarbage', apply: `type(val_name)`, type: 'function' },
  { label: 'assert', apply: `type(val_name)`, type: 'function' },
];

// Lua 自定义方法
export const luaCustomFuncs = [
  {
    label: 'MatchUInt',
    type: 'function',
    apply:
      'local MatchHexTb = rulexlib:MatchUInt("k1:[0,1];k2:[2,3]", "0xFFFFFF")\n\tprint("MatchHexTb.k1=", MatchHexTb.k1)\n\tprint("MatchHexTb.k2=", MatchHexTb.k2)',
    detail: '十六进制字符串匹配',
  },
];
