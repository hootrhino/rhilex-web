/**
 * dataTo 函数相关代码模板&示例
 */
import { getIntl, getLocale } from '@umijs/max';
import type { TplItem } from '@/components/RuleExample/typings';
import { OutendType, dataToType } from '@/pages/Outend/enum';

const intl = getIntl(getLocale());

// 完整示例（快捷模板）
// Modbus 数据解析并推向 MqttServer 快捷模板
export const getQuickCode = (type?: OutendType, uuid?: string) => {
  const target = type ? dataToType[type] : 'Target';
 const targetId = uuid || 'uuid';

  return `Actions = {
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
            local err = data:To${target}("${targetId}", json)
            if err ~= nil then
                Throw(err)
            end
        end
        return true, args
    end
  }`
};

// 函数使用示例
export const getActions = (type?: OutendType, uuid?: string) => {
  const target = type ? dataToType[type] : 'Target';
  const targetId = uuid || 'uuid';

  return `Actions = {
    function(args)
        local err = data:To${target}("${targetId}", args)
        if err ~= nil then
            Throw(err)
        end
        return true, args
    end
  }`;
};

// 函数基本示例
export const dataToTpl: TplItem[] = [{
  key: 'dataToTarget',
  label: 'data:ToTarget',
  apply: getActions(),
  detail: intl.formatMessage({id: 'component.tpl.data'}),
  type: 'function',
  hasVariables: true
}];

export const dataToQuickTpl: TplItem[] = [{
  label: '',
  key: 'dataToTargetQuick',
  detail: intl.formatMessage({id: 'component.tpl.data.quick.modbus'}),
  apply: getQuickCode(),
  type: 'function',
  hasVariables: true
}];


