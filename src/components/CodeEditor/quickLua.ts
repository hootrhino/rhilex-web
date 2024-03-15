import { dataToQuickTpl } from './BuildInLua/dataToTpl';

// 自定义快捷模板
export const quickLuaTpl = [
  {
    name: '默认分组',
    children: [...dataToQuickTpl],
    uuid: 'default_luaQuickTpl',
  },
];
