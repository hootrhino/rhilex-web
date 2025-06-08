/**
 * time 函数相关代码模板&示例
 */

import { toPascalCase } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';
const {formatMessage} = getIntl(getLocale());

const timeList = [
  { target: 'Time', detail: formatMessage({ id: 'component.tpl.time' }) },
  { target: 'TimeMs', detail: formatMessage({ id: 'component.tpl.timeMs' }) },
  { target: 'TsUnix', detail: formatMessage({ id: 'component.tpl.tsUnix' }) },
  { target: 'TsUnixNano', detail: formatMessage({ id: 'component.tpl.tsUnixNano' }) },
  { target: 'NtpTime', detail: formatMessage({ id: 'component.tpl.ntp' }) },
  {
    target: 'Sleep',
    detail: formatMessage({ id: 'component.tpl.sleep' }),
  },
];

export const timeTpl = timeList.map(({target, ...rest}) => {
  const code =
    target === 'Sleep' ? `time:${target}(1000)` : `local ts = time:${target}()`;
  const label = `time:Time${toPascalCase(target)}`;

  return {
    ...rest,
    key: `time-${target}`,
    label,
    apply: code,
    type: 'function',
    hasVariables: false
  };
});
