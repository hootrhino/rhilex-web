import { En6400Tpl, H3Tpl } from './appStackQuickTpl';
import { dataToQuickTpl } from './dataToQuickTpl';

// 自定义快捷模板
export const quickLuaTpl = (isH3: boolean) => {
  const appStackQuickTpl = isH3 ? H3Tpl : En6400Tpl;

  return [
    {
      name: '默认分组',
      children: [...dataToQuickTpl, ...appStackQuickTpl],
      uuid: 'default_luaQuickTpl',
    },
  ];
};
