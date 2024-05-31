/**
 * time 函数相关代码模板&示例
 */
import { toPascalCase } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';
import { TplDataType } from '../../RuleExample/enum';
const intl = getIntl(getLocale());

const timeList = [
  { target: 'Time', detail: intl.formatMessage({ id: 'component.tpl.time' }) },
  { target: 'TimeMs', detail: intl.formatMessage({ id: 'component.tpl.timeMs' }) },
  { target: 'TsUnix', detail: intl.formatMessage({ id: 'component.tpl.tsUnix' }) },
  { target: 'TsUnixNano', detail: intl.formatMessage({ id: 'component.tpl.tsUnixNano' }) },
  { target: 'NtpTime', detail: intl.formatMessage({ id: 'component.tpl.ntp' }) },
  {
    target: 'Sleep',
    detail: intl.formatMessage({ id: 'component.tpl.sleep' }),
    variables: [
      {
        label: intl.formatMessage({ id: 'component.tpl.sleep.arg' }),
        name: 'arg',
        value: 500,
        type: TplDataType.NUMBER,
      },
    ],
  },
];

export const timeTpl = timeList.map((time) => {
  const code =
    time.target === 'sleep'
      ? `local ts = time:${time.target}(arg)`
      : `local ts = time:${time.target}()`;
  const label = `time:Time${toPascalCase(time.target)}`;
  const variables = time?.variables && time.variables.length > 0 ? time.variables : [];

  return {
    ...time,
    label,
    apply: code,
    type: 'function',
    variables,
  };
});
