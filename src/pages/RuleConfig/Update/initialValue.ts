/** 规则默认值 **/
export const DefaultActions = `Actions = {
  function(args)
    --Debug(args)
    return true, args
  end
}`;

export const DefaultSuccess = `function Success()
--Debug("success")
end`;

export const DefaultFailed = `function Failed(error)
Debug(error)
end`;
