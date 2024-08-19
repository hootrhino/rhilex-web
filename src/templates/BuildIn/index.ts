import { getIntl, getLocale } from '@umijs/max';
import { comTpl } from './comTpl';
import { dataRepoTpl } from './dataRepoTpl';
import { dataToTpl } from './dataToTpl';
import { deviceTpl } from './deviceTpl';
import { jsonTpl } from './jsonTpl';
import { kvTpl } from './kvTpl';
import { localdbTpl } from './localdbTpl';
import { modbusTpl } from './modbusTpl';
import { otherTpl } from './otherTpl';
import { rhilexg1Tpl } from './rhilexg1Tpl';
import { standardTpl } from './standardTpl';
import { timeTpl } from './timeTpl';

const intl = getIntl(getLocale());

/**
 * 编辑器代码提示 - Lua 关键词
 */
export const buildInKeywords = new Map([['luaKeywords', [
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
].map(item => ({label: item, type: 'keyword'}))]]);

/**
 * 编辑器代码提示 - Lua 内置方法函数
 */
export const builtInFuncs = new Map([['luaBuiltFuncs', [
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
]]])

/**
 * 编辑器代码提示 - Lua 内置模板
 */
export const buildInSnippet = new Map([['luaSnappet', [
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
]]]);

/**
 * 规则示例
 */
export const builtInLuaTpl = [
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'Data' }),
    uuid: 'data',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'Time' }),
    uuid: 'time',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'Rhilexg1' }),
    uuid: 'rhilexg1',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'Device' }),
    uuid: 'device',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'Modbus' }),
    uuid: 'modbus',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'KV' }),
    uuid: 'kv',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name.standard' }),
    uuid: 'standard',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'Localdb' }),
    uuid: 'localdb',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name' }, { name: 'JSON' }),
    uuid: 'json',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name.dataRepo' }),
    uuid: 'dataRepo',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.rfcom.name' }),
    uuid: 'com',
  },
  {
    name: intl.formatMessage({ id: 'component.tpl.name.other' }),
    uuid: 'other',
  },
];

export const builtInChildren = new Map([
  ['data',dataToTpl],
  ['time', timeTpl],
  ['rhilexg1', rhilexg1Tpl],
  ['device', deviceTpl],
  ['modbus', modbusTpl],
  ['kv', kvTpl],
  ['standard', standardTpl],
  ['localdb', localdbTpl],
  ['json', jsonTpl],
  ['dataRepo', dataRepoTpl],
  ['com', comTpl],
  ['other', otherTpl],
]);
