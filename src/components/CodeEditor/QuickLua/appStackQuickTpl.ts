const en6400Code = `function Main(arg)
  while true do
    local _, Error = network:Ping("114.114.114.114");
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
    local _, Error = network:Ping("114.114.114.114");
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

export const RHILEXG1Tpl = [
  {
    label: '当没有网络时，网关上的 LED 会快速闪烁 5 次',
    detail: `RHILEXG1 联网测试`,
    apply: rhilexg1Code,
    type: 'function',
  },
];

export const En6400Tpl = [
  {
    label: '当没有网络时，网关上的 LED 会快速闪烁 5 次',
    detail: `EN6400 联网测试`,
    apply: en6400Code,
    type: 'function',
  },
];
