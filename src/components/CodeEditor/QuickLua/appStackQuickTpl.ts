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

const eekith3Code = `function Main(arg)
  while true do
    local _, Error = network:Ping("114.114.114.114");
    if Error ~= nil then
        for i = 1, 5, 1 do
            rhinopi:Led1On();
            time:Sleep(50);
            rhinopi:Led1Off();
            time:Sleep(50);
        end;
    else
        rhinopi:Led1On();
        time:Sleep(50);
        rhinopi:Led1Off();
        time:Sleep(50);
    end;
    time:Sleep(5000);
  end;
  return 0;
end;`;

export const H3Tpl = [
  {
    label: '当没有网络时，网关上的 LED 会快速闪烁 5 次',
    detail: `EEKITH3 联网测试`,
    apply: eekith3Code,
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
