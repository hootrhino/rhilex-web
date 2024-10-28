import { DeviceType } from "@/pages/Device/enum";

const tciothubAction = (uuid: string) => `Actions = {
  function(args)
      Debug("[====] Received tciothub Command:" .. args);
      local dataT, errJ2T = json:J2T(args);
      if errJ2T ~= nil then
          Throw("json:J2T error:" .. errJ2T);
          return false, args;
      end;
      if dataT.method == "control" then
          Debug("[====] tciothub Send Control CMD:" .. args);
          local errIothub = tciothub:CtrlReplySuccess("${uuid}", dataT.msgToken);
          if errIothub ~= nil then
              Throw("tciothub:CtrlReplySuccess Error:" .. errIothub);
              return false, args;
          end;
      end;
      if dataT.method == "action" then
          Debug("[====] tciothub Send Control CMD:" .. args);
          local errIothub = tciothub:ActionReplySuccess("${uuid}", dataT.msgToken);
          if errIothub ~= nil then
              Throw("tciothub:ActionReplySuccess Error:" .. errIothub);
              return false, args;
          end;
      end;
      if dataT.method == "get_status" then
          Debug("[====] tciothub Get Status:" .. args)
          local errIothub = tciothub:GetPropertyReply("${uuid}", {
              --params1
              --params2
              --params...
          })
          if errIothub ~= nil then
              Throw("ithings:PropertyReplySuccess Error:" .. errIothub)
              return false, args
          end
      end;
      return true, args;
  end
};`;

const ithingsAction = (uuid: string) => `
Actions = {
    function(args)
        Debug("[====] Received Ithings Command:" .. args);
        local dataT, errJ2T = json:J2T(args);
        if errJ2T ~= nil then
            Throw("json:J2T error:" .. errJ2T);
            return false, args;
        end;
        if dataT.method == "control" then
            Debug("[====] Ithings Send Control CMD:" .. args);
            local errIothub = ithings:CtrlReplySuccess("${uuid}", dataT.msgToken);
            if errIothub ~= nil then
                Throw("ithings:CtrlReplySuccess Error:" .. errIothub);
                return false, args;
            end;
        end;
        if dataT.method == "action" then
            Debug("[====] Ithings Send Control CMD:" .. args);
            local errIothub = ithings:ActionReplySuccess("${uuid}", dataT.msgToken);
            if errIothub ~= nil then
                Throw("ithings:ActionReplySuccess Error:" .. errIothub);
                return false, args;
            end;
        end;
        if dataT.method == "getReport" then
            Debug("[====] Ithings Get Status:" .. args)
            local errIothub = ithings:GetPropertyReply("${uuid}", {
                --params1
                --params2
                --params...
            })
            if errIothub ~= nil then
                Throw("ithings:PropertyReplySuccess Error:" .. errIothub)
                return false, args
            end
        end
        return true, args;
    end
};`;

export const getIotHubQuickAction = (type: string, uuid: string) => {
 return type === DeviceType.TENCENT_IOTHUB_GATEWAY ? tciothubAction(uuid) : ithingsAction(uuid);
}
