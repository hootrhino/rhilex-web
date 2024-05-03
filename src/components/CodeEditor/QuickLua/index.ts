import { getIntl, getLocale } from '@umijs/max';
import { En6400Tpl, RHILEXG1Tpl } from './appStackQuickTpl';
import { dataToQuickTpl } from './dataToQuickTpl';

// 自定义快捷模板
export const quickLuaTpl = (isRHILEXG1: boolean) => {
  const appStackQuickTpl = isRHILEXG1 ? RHILEXG1Tpl : En6400Tpl;

  return [
    {
      name: getIntl(getLocale()).formatMessage({ id: 'component.title.defaultGroup' }),
      children: [...dataToQuickTpl, ...appStackQuickTpl],
      uuid: 'default_luaQuickTpl',
    },
  ];
};
