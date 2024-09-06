/**
 * dataTo 函数相关代码模板&示例
 */

import { toPascalCase } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';
import { TplDataSource, TplDataType } from '../../components/RuleExample/enum';
import type { TplItem } from '@/components/RuleExample/typings';

const intl = getIntl(getLocale());

const dataToServers = [
  { target: 'http', detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'HTTP' }) },
  { target: 'mqtt', detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'MQTT' }) },
  { target: 'udp', detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'UDP' }) },
  { target: 'tcp', detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'TCP' }) },
  { target: 'uart', detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'UART' }) },
  {
    target: 'tDengine',
    detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'TDengine' }),
  },
  {
    target: 'mongoDB',
    detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'MongoDB' }),
  },
  {
    target: 'greptimeDB',
    detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'GreptimeDB' }),
  },
  { target: 'nats', detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'NATS' }) },
];

const getVariables = (server: string) => [
  {
    label: intl.formatMessage({ id: 'component.tpl.data.arg' }, { server: server.toUpperCase() }),
    name: 'uuid',
    type: TplDataType.SELECT,
    dataSource: TplDataSource.OUTEND,
  },
];

// 完整示例（快捷模板）
// Modbus 数据解析并推向 MqttServer 快捷模板
const getQuickCode = (name: string) => `Actions = {
  function(args)
      local dataT, err = json:J2T(args)
      if (err ~= nil) then
          Throw(err)
          return true, args
      end
      for _, value in pairs(dataT) do
          local params = {}
          params[value['tag']] = value.value
          local json = json:T2J({
              id = time:TimeMs(),
              method = "thing.event.property.post",
              params = params
          })
          local err = ${name}(uuid, json)
          if err ~= nil then
              Throw(err)
          end
      end
      return true, args
  end
}`;

// 函数使用示例
const getUsageCode = (name: string) => `Actions = {
  function(args)
      local err = ${name}(uuid, args)
      if err ~= nil then
          Throw(err)
      end
      return true, args
  end
}`;

// 基本函数
const getCode = (name: string) => `local err = ${name}(uuid, args)
if err ~= nil then
  Throw(err)
  return true, args
end`;

// 函数基本示例
export const dataToTpl: TplItem[] = [];
export const dataToQuickTpl: TplItem[] = [];

dataToServers?.forEach(({ target, ...rest }) => {
  const funcName = `data:To${toPascalCase(target)}`;
const detail = intl.formatMessage(
  { id: 'component.tpl.data.quick.modbus' },
  { server: `${toPascalCase(target)}Server` },
);

const newTpl = {
  ...rest,
  label: funcName,
  apply: getCode(funcName),
  type: 'function',
  key: `data-${target}`,
  usage: {
    label: intl.formatMessage({ id: 'component.tpl.usage' }),
    apply: getUsageCode(funcName),
    type: 'function',
    variables: getVariables(target),
  },
};
const newQuickTpl = {
  label: '',
  detail,
  key: `data-${toPascalCase(target)}Server`,
  apply: getQuickCode(funcName),
  type: 'function',
  variables: getVariables(target),
}

dataToTpl.push(newTpl);
dataToQuickTpl.push(newQuickTpl)
});


