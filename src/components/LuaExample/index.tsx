import { getUserluaGroup, getUserluaSearch } from '@/services/rulex/yonghuLUApianduan';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { history, useRequest } from '@umijs/max';
import type { DrawerProps } from 'antd';
import { Button, Divider, Drawer, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { luaTemplates } from '../LuaEditor/constant';
import ExampleItem from './ExampleItem';

type LuaExampleProps = DrawerProps;

const LuaExample = ({ ...props }: LuaExampleProps) => {
  const [customTplData, setCustomTplData] = useState<TplGroupItem[]>([]);
  const [builtInTplData, setBuiltInTplData] = useState<TplGroupItem[]>([]);

  // TODO 搜索自定义模板
  const {run: searchTpl, data} = useRequest((params: API.getUserluaSearchParams) => getUserluaSearch(params), {
    manual: true,
  })

  // 模板分组列表
  const { data: groupList, run: getGroupList } = useRequest(() => getUserluaGroup(), {
    manual: true,
    formatResult: (res) => {
      const formatTpl = res?.data?.map((item) => ({
        uuid: item?.uuid,
        name: item?.name,
        children: [],
      }));
      return formatTpl;
    },
  });

  // 搜索内置模板
  const filterData = (value: string) => {
    let filtered = [...luaTemplates];
    const regex = new RegExp(value, 'i');

    return filtered
      .map((item) => {
        let matchItem = { ...item };

        // 搜索标题
        if (matchItem.name.includes(value)) {
          return matchItem;
        }

        // 搜索内层
        matchItem.children = item.children.filter(
          (child) => child.label.match(regex) || child.detail.match(regex),
        );
        return matchItem.children?.length > 0 ? matchItem : null;
      })
      .filter((item) => item);
  };

  // 搜索快捷模板
  const handleOnSearch = (value: string) => {
    if (!value) {
      setBuiltInTplData(luaTemplates);
      setCustomTplData(groupList as TplGroupItem[]);
    } else {
      const newData = filterData(value.toLowerCase());
      setBuiltInTplData(newData as TplGroupItem[]);
      searchTpl({keyword: value});
    }
  };

  useEffect(() => {
    // TODO 格式化搜索结果
    console.log(data, customTplData);
  }, [data])

  useEffect(() => {
    setBuiltInTplData(luaTemplates);
    getGroupList();
  }, []);

  return (
    <Drawer
      destroyOnClose
      maskClosable={false}
      title="常用 Lua 示例"
      placement="right"
      size="large"
      extra={
        <Space>
          <Input
            allowClear
            placeholder="搜索模板"
            size="small"
            prefix={<SearchOutlined />}
            onChange={(e) => handleOnSearch(e.target.value)}
          />
          <Button
            ghost
            size="small"
            type="primary"
            onClick={() => history.push('/custom-tpl')}
            icon={<EditOutlined />}
          >
            去自定义模板
          </Button>
        </Space>
      }
      {...props}
    >
      <ExampleItem type="built-in" dataSource={builtInTplData} />
      {groupList && groupList.length > 0 && <Divider />}
      <ExampleItem type="custom" dataSource={groupList as TplGroupItem[]} />
    </Drawer>
  );
};

export default LuaExample;
