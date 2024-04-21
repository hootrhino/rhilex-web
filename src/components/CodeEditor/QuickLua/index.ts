import { En6400Tpl, RHINOPITpl } from './appStackQuickTpl';
import { dataToQuickTpl } from './dataToQuickTpl';

// 自定义快捷模板
export const quickLuaTpl = (isRHINOPI: boolean) => {
  const appStackQuickTpl = isRHINOPI ? RHINOPITpl : En6400Tpl;

  return [
    {
      name: '默认分组',
      children: [...dataToQuickTpl, ...appStackQuickTpl],
      uuid: 'default_luaQuickTpl',
    },
  ];
};
