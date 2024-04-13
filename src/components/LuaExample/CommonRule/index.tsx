import { builtInLuaTpl } from '@/components/CodeEditor/BuildInLua';
import { quickLuaTpl } from '@/components/CodeEditor/QuickLua';
import { getUserluaListByGroup } from '@/services/rulex/yonghuLuApianduan';
import { DEFAULT_GROUP_KEY_LUA_TPL } from '@/utils/constant';
import { useModel, useRequest } from '@umijs/max';
import type { TplGroupItem } from './ExampleItem';
import ExampleItem from './ExampleItem';

type CommonRuleProps = {
  activeTabKey: string;
};

const CommonRule = ({ activeTabKey }: CommonRuleProps) => {
  const { isH3 } = useModel('useSystem');
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
      dataSource: builtInLuaTpl,
    },
    {
      type: 'custom',
      dataSource: customTplData,
    },
    {
      type: 'quick',
      dataSource: quickLuaTpl(isH3),
    },
  ];

  return data.map(({ type, dataSource }) => (
    <ExampleItem type={type} dataSource={dataSource as TplGroupItem[]} key={type} />
  ));
};

export default CommonRule;
