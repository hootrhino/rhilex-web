export const completions = [
  {
    name: 'myKeyword1',
    value: 'myKeyword1',
    score: 100,
    meta: 'myKeyword',
  },
  {
    name: 'myKeyword2',
    value: 'myKeyword2',
    score: 100,
    meta: 'myKeyword',
  },
  {
    name: 'myFunction1',
    value: 'function myFunction1()\n\t-- body\nend',
    score: 100,
    meta: '模板1',
  },
  {
    name: 'myFunction2',
    value: 'function myFunction2()\n\t-- body\nend',
    score: 100,
    meta: '模板2',
  },
  {
    name: 'MatchUInt',
    value:
      'local MatchHexTb = rulexlib:MatchUInt("k1:[0,1];k2:[2,3]", "0xFFFFFF")\n\tprint("MatchHexTb.k1=", MatchHexTb.k1)\n\tprint("MatchHexTb.k2=", MatchHexTb.k2)',
    score: 100,
    meta: '十六进制字符串匹配',
  },
];
