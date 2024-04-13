/**
 * dataTo 函数相关代码模板&示例
 */

import { firstUpperCase } from '@/utils/utils';

export const dataToServers = [
  { target: 'http', detail: '数据推送到 HTTP 服务' },
  { target: 'mqtt', detail: '数据推送到 MQTT 服务' },
  { target: 'udp', detail: '数据推送到 UDP 服务' },
  { target: 'tcp', detail: '数据推送到 TCP 服务' },
  { target: 'tdEngine', detail: '数据推送到 Tdengine 数据库' },
  { target: 'mongo', detail: '数据推送到 Mongodb 数据库' },
  { target: 'nats', detail: '数据推送到 Nats' },
];

export const getVariables = (server: string) => [
  { label: `${server.toUpperCase()} 资源`, name: 'uuid', type: 'select', dataSource: 'outends' },
];

// 函数使用示例
const getUsageTpl = (server: string) => {
  const code = `Actions = {
  function(args)
      local err = data:To${firstUpperCase(server)}(uuid, args)
      if err ~= nil then
          Throw(err)
      end
      return true, args
  end
}`;

  return {
    label: '函数使用示例',
    apply: code,
    type: 'function',
    variables: getVariables(server),
  };
};

// 函数基本示例
export const dataToTpl = dataToServers?.map(({ target, ...rest }) => {
  const funcName = `data:To${firstUpperCase(target)}`;
  const code = `local err = ${funcName}(arg1, args)
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
    variables: getVariables(target),
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
          local err = data:To${firstUpperCase(server)}(uuid, json)
          if err ~= nil then
              Throw(err)
          end
      end
      return true, args
  end
}`;
