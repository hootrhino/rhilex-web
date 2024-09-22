/**
 * dataTo 函数相关代码模板&示例
 */
import { getIntl, getLocale } from '@umijs/max';
import type { TplItem } from '@/components/RuleExample/typings';
import { OutendType, dataToType } from '@/pages/Outend/enum';

const intl = getIntl(getLocale());

// Modbus 数据解析并推向北向资源快捷模板
export const getDataToQuickAction = (type?: OutendType, uuid?: string, enableBatchRequest?: boolean) => {
  const target = type ? dataToType[type === OutendType.ITHINGS_IOT ? OutendType.MQTT : type] : 'Target';
  const targetId = uuid || 'uuid';
  const requestCode = enableBatchRequest ? `params[value['tag']] = value.value` : `params[value.tag] = value.value * 1`;

  const ithingsAction = `Actions = {
    function(args)
        local dataT, err = json:J2T(args)
        if (err ~= nil) then
            Throw(err)
            return true, args
        end
        for _, value in pairs(dataT) do
            local params = {}
            ${requestCode}
            local json = json:T2J({
              timestamp = time:TimeMs(),
              msgToken = "rhilex",
              method = "report",
              params = params
            })
            local err = data:To${target}("${targetId}", json)
            if err ~= nil then
                Throw(err)
            end
        end
        return true, args
    end
  }`;

  const defaultAction = `Actions = {
    function(args)
        local dataT, err = json:J2T(args)
        if (err ~= nil) then
            Throw(err)
            return true, args
        end
        for _, value in pairs(dataT) do
            local params = {}
            ${requestCode}
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
  }`;

  return type === OutendType.ITHINGS_IOT ? ithingsAction : defaultAction;
};

// 函数使用示例
export const getDataToAction = (type?: OutendType, uuid?: string) => {
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
  apply: getDataToAction(),
  detail: intl.formatMessage({id: 'component.tpl.data'}),
  type: 'function',
  hasVariables: true
}];

export const dataToQuickTpl: TplItem[] = [{
  label: '',
  key: 'dataToTargetQuick',
  detail: intl.formatMessage({id: 'component.tpl.data.quick.modbus'}),
  apply: getDataToQuickAction(),
  type: 'function',
  hasVariables: true
}];


