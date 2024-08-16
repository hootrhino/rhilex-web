import { getIntl, getLocale } from '@umijs/max';
import { TplDataType } from '../../components/RuleExample/enum';

const intl = getIntl(getLocale());

const en6400Code = `function Main(arg)
  while true do
    local _, Error = network:Ping(ip);
    if Error ~= nil then
        for i = 1, 5, 1 do
            en6400:Led1On();
            time:Sleep(50);
            en6400:Led1Off();
            time:Sleep(50);
        end;
    else
        en6400:Led1On();
        time:Sleep(50);
        en6400:Led1Off();
        time:Sleep(50);
    end;
    time:Sleep(5000);
  end;
  return 0;
end;`;

const rhilexg1Code = `function Main(arg)
  while true do
    local _, Error = network:Ping(ip);
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
end;`;

const variables = [
  {
    label: 'IP',
    name: 'ip',
    type: TplDataType.SELECT,
    dataSource: ['8.8.8.8', '114.114.114.114', '202.108.22.5', '202.108.22.103'],
  },
];

export const RHILEXG1Tpl = [
  {
    label: intl.formatMessage({ id: 'component.tpl.rhilex.label' }),
    detail: intl.formatMessage({ id: 'component.tpl.rhilex.detail' }, { name: 'RHILEXG1' }),
    apply: rhilexg1Code,
    type: 'function',
    variables,
  },
];

export const En6400Tpl = [
  {
    label: intl.formatMessage({ id: 'component.tpl.rhilex.label' }),
    detail: intl.formatMessage({ id: 'component.tpl.rhilex.detail' }, { name: 'EN6400' }),
    apply: en6400Code,
    type: 'function',
    variables,
  },
];
