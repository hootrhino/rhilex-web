import { builtInLuaTplData } from '@/components/LuaEditor/constant';
import { luaQuickTpls } from '@/components/LuaEditor/quickTpl';
import { getUserluaListByGroup } from '@/services/rulex/yonghuLUApianduan';
import { DEFAULT_GROUP_KEY_LUA_TPL } from '@/utils/constant';
import { useRequest } from '@umijs/max';
import ExampleItem from './ExampleItem';

type CommonRuleProps = {
  activeTabKey: string;
};

const CommonRule = ({ activeTabKey }: CommonRuleProps) => {
  const { data: customTplData } = useRequest(
    () => getUserluaListByGroup({ uuid: DEFAULT_GROUP_KEY_LUA_TPL }),
    {
      refreshDeps: [activeTabKey],
      formatResult: ({ data }) => {
        return data?.length > 0
          ? [
              {
                name: '默认分组',
                children: data,
                uuid: 'default_luaCustomTpl',
              },
            ]
          : [];
      },
    },
  );

  const data = [
    {
      type: 'built-in',
      dataSource: builtInLuaTplData,
    },
    {
      type: 'custom',
      dataSource: customTplData as TplGroupItem[],
    },
    {
      type: 'quick',
      dataSource: luaQuickTpls,
    },
  ];

  return data.map((item) => <ExampleItem {...item} key={item.type} />);
};

export default CommonRule;
