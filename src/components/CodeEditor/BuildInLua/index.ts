import { TplDataType } from '@/components/LuaExample/enum';
import { getIntl, getLocale } from '@umijs/max';
import { dataCenterTpl } from './dataCenterTpl';
import { dataToTpl } from './dataToTpl';
import { deviceTpl } from './deviceTpl';
import { modbusTpl } from './modbusTpl';
import { otherTpl } from './otherTpl';
import { rhilexg1Tpl } from './rhilexg1Tpl';
import { timeTpl } from './timeTpl';

const intl = getIntl(getLocale());

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
    detail: intl.formatMessage({ id: 'component.tpl.standard.debug' }),
    usage: {
      label: intl.formatMessage({ id: 'component.tpl.standard.debug.usage1' }),
      apply: `Actions = {
  function(args)
    Debug(args)
    return true, args
  end
}`,
      type: 'function',
      detail: intl.formatMessage({ id: 'component.tpl.standard.debug.usage1' }),
    },
  },
  {
    label: 'Throw',
    apply: 'Throw(err)',
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.standard.debug.usage2' }),
  },
];

// kv 函数
export const kvTpl = [
  {
    label: 'kv:Set',
    apply: `kv:Set(arg1, arg2)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.kvSet.detail' }),
    variables: [
      { label: 'Key', name: 'arg1', value: '', type: TplDataType.STRING },
      { label: 'Value', name: 'arg2', value: '', type: TplDataType.STRING },
    ],
  },
  {
    label: 'kv:Get',
    apply: `local value = kv:Get(arg)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.kvGet.detail' }),
    variables: [{ label: 'Key', name: 'arg', value: '', type: TplDataType.STRING }],
  },
  {
    label: 'kv:Del',
    apply: `kv:Del(arg)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.kvDel.detail' }),
    variables: [{ label: 'Key', name: 'arg', value: '', type: TplDataType.STRING }],
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
    detail: intl.formatMessage({ id: 'component.tpl.query.detail' }),
  },
  {
    label: 'localdb:Execute',
    apply: `local error = localdb:Query(arg)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.execute.detail' }),
    variables: [
      {
        label: intl.formatMessage({ id: 'component.tpl.query.arg' }),
        name: 'arg',
        value: '',
        type: TplDataType.STRING,
      },
    ],
  },
];

// json 函数
export const jsonTpl = [
  {
    label: 'json:T2J',
    apply: `local Value = json:T2J(arg)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.jsonT2J.detail' }),
    variables: [
      {
        label: intl.formatMessage({ id: 'component.tpl.jsonT2J.arg' }),
        name: 'arg',
        value: '',
        type: TplDataType.STRING,
      },
    ],
  },
  {
    label: 'json:J2T',
    apply: `local Value = json:J2T(arg)`,
    type: 'function',
    detail: intl.formatMessage({ id: 'component.tpl.jsonJ2T.detail' }),
    variables: [
      {
        label: intl.formatMessage({ id: 'component.tpl.jsonJ2T.arg' }),
        name: 'arg',
        value: '',
        type: TplDataType.STRING,
      },
    ],
  },
];

/** Lua 内置模板 */
export const buildInSnippet = [
  ...dataToTpl,
  ...timeTpl,
  ...rhilexg1Tpl,
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
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'Data' }),
    children: dataToTpl,
    uuid: 'data',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'Time' }),
    children: timeTpl,
    uuid: 'time',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'Rhilexg1' }),
    children: rhilexg1Tpl,
    uuid: 'rhilexg1',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'Device' }),
    children: deviceTpl,
    uuid: 'device',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'Modbus' }),
    children: modbusTpl,
    uuid: 'modbus',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'KV' }),
    children: kvTpl,
    uuid: 'kv',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name.standard' }),
    children: standardTpl,
    uuid: 'standard',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'Localdb' }),
    children: localdbTpl,
    uuid: 'localdb',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'JSON' }),
    children: jsonTpl,
    uuid: 'json',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name.dataRepo' }),
    children: dataCenterTpl,
    uuid: 'dataCenter',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name.other' }),
    children: otherTpl,
    uuid: 'other',
  },
];
