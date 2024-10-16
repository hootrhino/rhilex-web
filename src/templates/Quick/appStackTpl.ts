import { getIntl, getLocale } from '@umijs/max';

const {formatMessage} = getIntl(getLocale());

export const getAppStackAction = (ip?: string) => `function Main(arg)
while true do
  local _, Error = network:Ping("${ip || 'ip'}");
  if Error ~= nil then
      for i = 1, 5, 1 do
          rhilexg1:Led1On();
          time:Sleep(50);
          rhilexg1:Led1Off();
          time:Sleep(50);
      end;
  else
      rhilexg1:Led1On();
      time:Sleep(50);
      rhilexg1:Led1Off();
      time:Sleep(50);
  end;
  time:Sleep(5000);
end;
return 0;
end;`

export const appStackQuickTpl = [
  {
    key: 'appStack',
    label: formatMessage({ id: 'component.tpl.rhilex.label' }),
    detail: formatMessage({ id: 'component.tpl.rhilex.detail' }, { name: 'RHILEXG1' }),
    apply: getAppStackAction('8.8.8.8'),
    type: 'function',
    hasVariables: true
  },
]
