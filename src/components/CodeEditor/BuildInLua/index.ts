import { dataToTpl } from './dataToTpl';
import { deviceTpl } from './deviceTpl';
import { modbusTpl } from './modbusTpl';
import { otherTpl } from './otherTpl';
import { rhinopiTpl } from './rhinopiTpl';
import { timeTpl } from './timeTpl';

/** Lua 关键词 **/
export const buildInKeywords = [
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

// 标准库函数
export const standardTpl = [
  {
    label: 'Debug',
    apply: 'Debug(arg)',
    type: 'function',
    detail: '打印日志',
    usage: {
      label: 'debug-tpl1',
      apply: `Actions = {
  function(args)
    Debug(args)
    return true, args
  end
}`,
      type: 'function',
      detail: '函数使用示例',
    },
  },
  {
    label: 'Throw',
    apply: 'Throw(err)',
    type: 'function',
    detail: '抛出异常',
  },
];

// kv 函数
export const kvTpl = [
  {
    label: 'kv:Set',
    apply: `kv:Set(arg1, arg2)`,
    type: 'function',
    detail: '全局缓存设置值',
    variables: [
      { label: 'Key', name: 'arg1', value: '', type: 'string' },
      { label: 'Value', name: 'arg2', value: '', type: 'string' },
    ],
  },
  {
    label: 'kv:Get',
    apply: `local value = kv:Get(arg)`,
    type: 'function',
    detail: '全局缓存取值',
    variables: [{ label: 'Key', name: 'arg', value: '', type: 'string' }],
  },
  {
    label: 'kv:Del',
    apply: `kv:Del(arg)`,
    type: 'function',
    detail: '全局缓存删除值',
    variables: [{ label: 'Key', name: 'arg', value: '', type: 'string' }],
  },
];

// localdb 函数
export const localdbTpl = [
  {
    label: 'localdb:Query',
    apply: `local Table = localdb:Query('select * from db1')
for i, v in ipairs(Table) do
  Debug(err)
end`,
    type: 'function',
    detail: '本地数据库查询(有返回值)',
  },
  {
    label: 'localdb:Execute',
    apply: `local error = localdb:Query(arg)`,
    type: 'function',
    detail: '本地数据库执行(无返回值)',
    variables: [{ label: 'SQL 语句', name: 'arg', value: '', type: 'string' }],
  },
];

// json 函数
export const jsonTpl = [
  {
    label: 'json:T2J',
    apply: `local Value = json:T2J(arg)`,
    type: 'function',
    detail: 'LuaTable 转 JSON 字符串',
    variables: [{ label: 'Lua 表变量', name: 'arg', value: '', type: 'string' }],
  },
  {
    label: 'json:J2T',
    apply: `local Value = json:J2T(arg)`,
    type: 'function',
    detail: 'JSON 字符串转 LuaTable',
    variables: [{ label: 'JSON字符串', name: 'arg', value: '', type: 'string' }],
  },
];

/** Lua 内置模板 */
export const buildInSnippet = [
  ...dataToTpl,
  ...timeTpl,
  ...rhinopiTpl,
  ...deviceTpl,
  ...modbusTpl,
  ...kvTpl,
  ...standardTpl,
  ...localdbTpl,
  ...jsonTpl,
  ...otherTpl,
];

export const builtInLuaTpl = [
  {
    name: 'data 函数',
    children: dataToTpl,
    uuid: 'data',
  },
  {
    name: 'time 函数',
    children: timeTpl,
    uuid: 'time',
  },
  {
    name: 'rhinopi 函数',
    children: rhinopiTpl,
    uuid: 'rhinopi',
  },
  {
    name: 'device 函数',
    children: deviceTpl,
    uuid: 'device',
  },
  {
    name: 'modbus 函数',
    children: modbusTpl,
    uuid: 'modbus',
  },
  {
    name: 'kv 函数',
    children: kvTpl,
    uuid: 'kv',
  },
  {
    name: '标准库函数',
    children: standardTpl,
    uuid: 'standard',
  },
  {
    name: 'localdb 函数',
    children: localdbTpl,
    uuid: 'localdb',
  },
  {
    name: 'json 函数',
    children: jsonTpl,
    uuid: 'json',
  },
  {
    name: '其他函数',
    children: otherTpl,
    uuid: 'other',
  },
];
