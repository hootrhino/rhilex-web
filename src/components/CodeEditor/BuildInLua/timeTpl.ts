/**
 * time 函数相关代码模板&示例
 */

import { firstUpperCase } from '@/utils/utils';

const timeList = [
  { target: 'time', detail: '当前时间' },
  { target: 'timeMs', detail: '当前通用时间戳' },
  { target: 'tsUnix', detail: '当前 Unix 时间戳' },
  { target: 'tsUnixNano', detail: '当前纳秒级时间戳' },
  { target: 'ntpTime', detail: 'NTP 时间' },
  {
    target: 'sleep',
    detail: '休眠',
    variables: [{ label: '休眠时间', name: 'arg', value: 500, type: 'number' }],
  },
];

export const timeTpl = timeList.map((time) => {
  const code =
    time.target === 'sleep'
      ? `local ts = time:${time.target}(arg)`
      : `local ts = time:${time.target}()`;
  const label = `time:Time${firstUpperCase(time.target)}`;
  const variables = time?.variables && time.variables.length > 0 ? time.variables : [];

  return {
    ...time,
    label,
    apply: code,
    type: 'function',
    variables,
  };
});
