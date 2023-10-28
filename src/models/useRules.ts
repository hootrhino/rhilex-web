import { useState } from 'react';

export type RuleFormItem = {
  actions: string;
  description?: string;
  failed: string;
  fromSource: string;
  fromDevice: string;
  name: string;
  success: string;
  uuid?: string;
  [key: string]: any;
};

const DefaultActions = `Actions = {
  function(args)
    -- rulexlib:Debug(args)
    return true, args
  end
}`;

const DefaultSuccess = `function Success()
--rulexlib:log("success")
end`;

const DefaultFailed = `function Failed(error)
rulexlib:log(error)
end`;

export const DefaultRules = {
  actions: DefaultActions,
  success: DefaultSuccess,
  failed: DefaultFailed,
  sourceType: 'fromSource',
  name: '',
  fromSource: '',
  fromDevice: '',
};

const useRules = () => {
  const [initialValues, setInitialValues] = useState<RuleFormItem>(DefaultRules);

  return {
    initialValues,
    setInitialValues,
  };
};

export default useRules;
