/**
 * dataTo 函数相关代码模板&示例
 */

import { toPascalCase } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';
import { TplDataSource, TplDataType } from '../../RuleExample/enum';

const intl = getIntl(getLocale());

export const dataToServers = [
  { target: 'http', detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'HTTP' }) },
  { target: 'mqtt', detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'MQTT' }) },
  { target: 'udp', detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'UDP' }) },
  { target: 'tcp', detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'TCP' }) },
  { target: 'uart', detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'UART' }) },
  {
    target: 'tdEngine',
    detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'Tdengine' }),
  },
  {
    target: 'mongo',
    detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'Mongodb' }),
  },
  { target: 'nats', detail: intl.formatMessage({ id: 'component.tpl.data' }, { server: 'Nats' }) },
];

export const getVariables = (server: string) => [
  {
    label: intl.formatMessage({ id: 'component.tpl.data.arg' }, { server: server.toUpperCase() }),
    name: 'uuid',
    type: TplDataType.SELECT,
    dataSource: TplDataSource.OUTEND,
  },
];

// 函数使用示例
const getUsageTpl = (server: string) => {
  const code = `Actions = {
  function(args)
      local err = data:To${toPascalCase(server)}(uuid, args)
      if err ~= nil then
          Throw(err)
      end
      return true, args
  end
}`;

  return {
    label: intl.formatMessage({ id: 'component.tpl.usage' }),
    apply: code,
    type: 'function',
    variables: getVariables(server),
  };
};

// 函数基本示例
export const dataToTpl = dataToServers?.map(({ target, ...rest }) => {
  const funcName = `data:To${toPascalCase(target)}`;
  const code = `local err = ${funcName}(uuid, args)
if err ~= nil then
  Throw(err)
  return true, args
end`;

  return {
    ...rest,
    label: funcName,
    apply: code,
    type: 'function',
    usage: getUsageTpl(target),
  };
});

// 完整示例（快捷模板）
// Modbus 数据解析并推向 MqttServer 快捷模板
export const getQuickCode = (server: string) => `Actions = {
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
          local err = data:To${toPascalCase(server)}(uuid, json)
          if err ~= nil then
              Throw(err)
          end
      end
      return true, args
  end
}`;
