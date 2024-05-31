import { getUserluaListByGroup } from '@/services/rulex/yonghudingyiluamoban';
import { DEFAULT_GROUP_KEY_LUA_TPL } from '@/utils/constant';
import { Product } from '@/utils/enum';
import { getIntl, getLocale, useModel, useRequest } from '@umijs/max';
import { builtInLuaTpl } from '../../RuleTpl/BuildIn';
import { quickLuaTpl } from '../../RuleTpl/Quick';
import { ExampleType } from '../enum';
import type { TplGroupItem } from '../typings';
import ExampleItem from './ExampleItem';

type RuleListProps = {
  activeTabKey: string;
};

const RuleList = ({ activeTabKey }: RuleListProps) => {
  const { product } = useModel('useSystem');

  // 自定义模板
  const { data: customTplData } = useRequest(
    () => getUserluaListByGroup({ uuid: DEFAULT_GROUP_KEY_LUA_TPL }),
    {
      ready: !!activeTabKey,
      refreshDeps: [activeTabKey],
      formatResult: ({ data }) => {
        return data?.length > 0
          ? [
              {
                name: getIntl(getLocale()).formatMessage({ id: 'component.title.defaultGroup' }),
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
      type: ExampleType.BUILTIN,
      dataSource: builtInLuaTpl,
    },
    {
      type: ExampleType.QUICK,
      dataSource: quickLuaTpl(product === Product.RHILEXG1),
    },
    {
      type: ExampleType.CUSTOM,
      dataSource: customTplData,
    },
  ];

  return data.map(({ type, dataSource }) => (
    <ExampleItem type={type} dataSource={dataSource as TplGroupItem[]} key={type} />
  ));
};

export default RuleList;
