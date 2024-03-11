import { builtInLuaTplData } from '@/components/CodeEditor/buildInLua';
import { luaQuickTpls } from '@/components/CodeEditor/quickLuaTpl';
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
      dataSource: customTplData,
    },
    {
      type: 'quick',
      dataSource: luaQuickTpls,
    },
  ];

  return data.map(({ type, dataSource }) => (
    <ExampleItem type={type} dataSource={dataSource as TplGroupItem[]} key={type} />
  ));
};

export default CommonRule;
