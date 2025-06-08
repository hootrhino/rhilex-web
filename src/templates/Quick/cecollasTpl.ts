import { getIntl, getLocale } from '@umijs/max';

const {formatMessage} = getIntl(getLocale());

export const tplCode = `--
-- @CecollaId : Cloud Platform Id
-- Report Properties
-- @identifiers: ["key1", "key2",,]
--
function HandleReportProperties(CecollaId, Token, ProductId, DeviceId, identifiers)
    local errIothub = ithings:GetPropertyReplySuccess(CecollaId, Token, ProductId, DeviceId, identifiers)
    if errIothub ~= nil then
        Throw("上传属性失败，错误信息:", errIothub)
    end
end

--
-- Handle Received Params
--
function HandleParams(ProductId, DeviceId, Params)
    Debug("[== 处理属性 ==] ", "产品=", ProductId, "设备=", DeviceId)
    for key, value in pairs(Params) do
        Debug("[== 处理属性 ==] ", "属性名=", key, "值=", value)
    end
end

--
-- Handle Received Action
--
function HandleAction(ProductId, DeviceId, ActionId, Params)
    Debug("[== 处理行为调用 ==] ", "产品=", ProductId, ", 设备=", DeviceId, ", 行为=", ActionId)
    for key, value in pairs(Params) do
        Debug("[== 处理行为调用 ==]", "属性名=", key, "值=", value)
    end
end

--
-- Action Main
-- @CecollaId : Cloud Platform Id
-- @Env: {
--    "Product" : "ProductId"
--    "Device"  : "DeviceId"
--    "Payload" : "Payload"
-- }
--

function Main(CecollaId, Env)
    Debug("[== Cecolla Debug ==] 收到平台下发指令, CecollaId=", CecollaId, ", Payload=", Env.Payload);
    local dataT, errJ2T = json:J2T(Env.Payload);
    if errJ2T ~= nil then
        Throw("JSON解析失败, 错误信息:", errJ2T);
        return
    end;
    if dataT.method == "control" then
        Debug("[== Cecolla Debug ==] 收到控制指令:", Env.Payload);
        HandleParams(Env.Product, Env.Device, dataT.params)
        local errIothub = ithings:CtrlReplySuccess(CecollaId, dataT.msgToken);
        if errIothub ~= nil then
            Throw("控制指令失败，错误信息:", errIothub);
            return
        end;
    end;
    if dataT.method == "action" then
        Debug("[== Cecolla Debug ==] 收到行为调用指令:", Env.Payload);
        HandleAction(Env.Product, Env.Device, dataT.actionID, dataT.params)
        local errIothub = ithings:ActionReplySuccess(CecollaId, dataT.msgToken);
        if errIothub ~= nil then
            Throw("行为调用失败，错误信息:", errIothub);
            return
        end;
    end;
    if dataT.method == "getReport" then
        Debug("[==Debug==] 收到请求上报数据:", Env.Payload);
        HandleReportProperties(CecollaId, dataT.msgToken, Env.Product, Env.Device, dataT.identifiers)
    end;
end`;

export const cecollasQuickTpl = [
  {
    key: 'cecollas',
    detail: formatMessage({id: 'component.tpl.cecollas.detail'}),
    type: 'function',
    apply: tplCode,
  },
]
