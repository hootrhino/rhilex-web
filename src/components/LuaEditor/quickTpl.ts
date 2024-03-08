// data:ToHttp 快捷模板
const httpCode1 = `Actions =
{
    function(args)
        local err = data:ToHttp('$UUID', args)
        if err1 ~= nil then
            Throw(err)
        end
        return true, args
    end
}`;

// data:ToMqtt 快捷模板
const mqttCode1 = `Actions =
{
    function(args)
        local err = data:ToToMqtt('$UUID', args)
        if err1 ~= nil then
            Throw(err)
        end
        return true, args
    end
}`;

// data:ToMongo 快捷模板
const mongodbCode1 = `Actions = {
  function(args)
      local err = data:ToMongo('$UUID', args)
      if err1 ~= nil then
          Throw(err)
      end
      return true, args
  end
}`;

// stdlib:Debug 快捷模板
const debugCode1 = `Actions = {
  function(args)
      Debug(args)
      return true, args
  end
}`;

export const dataQuickTpl = {
  Http: [
    {
      label: 'http-tpl1',
      apply: httpCode1,
      type: 'function',
      detail: '数据推送到 HTTP 服务器',
      variables: [{ label: `http 资源`, name: 'uuid', value: '', type: 'string' }],
    },
  ],
  Mqtt: [
    {
      label: 'mqtt-tpl1',
      apply: mqttCode1,
      type: 'function',
      detail: '数据推送到 MQTT 服务器',
      variables: [{ label: `mqtt 资源`, name: 'uuid', value: '', type: 'string' }],
    },
  ],
  Mongo: [
    {
      label: 'mongodb-tpl1',
      apply: mongodbCode1,
      type: 'function',
      detail: '数据保存到 Mongodb',
      variables: [{ label: `mongodb 资源`, name: 'uuid', value: '', type: 'string' }],
    },
  ],
  Debug: [
    {
      label: 'debug-tpl1',
      apply: debugCode1,
      type: 'function',
      detail: '数据打印在控制台',
    },
  ],
};

// 温湿度传感器数据推送到 MQTT Server 快捷模板
const luaQuickTpl1Code1 = `Actions = {
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
          local err = data:ToMqtt(uuid, json)
          if err ~= nil then
              Throw(err)
          end
      end
      return true, args
  end
}`;

// 自定义快捷模板
export const luaQuickTpls = [
  {
    name: '默认分组',
    children: [
      {
        label: '温湿度传感器数据推送到 MQTT Server',
        apply: luaQuickTpl1Code1,
        type: 'function',
        variables: [
          { label: 'MQTT 资源', name: 'uuid', type: 'select', dataSource: 'outends' },
        ],
      },
    ],
    uuid: 'default_luaQuickTpl',
  },
];
