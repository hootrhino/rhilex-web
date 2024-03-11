/** 规则默认值 **/
export const DefaultActions = `Actions = {
  function(args)
    --stdlib:Debug(args)
    return true, args
  end
}`;

export const DefaultSuccess = `function Success()
--stdlib:log("success")
end`;

export const DefaultFailed = `function Failed(error)
stdlib:log(error)
end`;
