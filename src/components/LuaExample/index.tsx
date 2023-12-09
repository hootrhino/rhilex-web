import {
  getUserluaGroup,
  getUserluaListByGroup,
  getUserluaSearch,
} from '@/services/rulex/yonghuLUApianduan';
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

  // 模板分组列表
  const { data: groupList } = useRequest(() => getUserluaGroup(), {
    formatResult: (res) => {
      const formatTpl = res?.data?.map((item) => ({
        uuid: item?.uuid,
        name: item?.name,
        children: [],
      }));
      return formatTpl;
    },
    onSuccess: (res) => setCustomTplData(res),
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

  // 搜索自定义模板分组
  const searchGroup = async (value: string) => {
    const newGroupData = customTplData
      ?.map((item) => item.name.includes(value) && item)
      ?.filter((item) => item);
    if (newGroupData?.length > 0) {
      setCustomTplData(newGroupData as TplGroupItem[]);
    } else {
      // TODO 搜索内层返回值缺少gid字段
      const res = await getUserluaSearch({ keyword: value });
      console.log(res, customTplData);
      // searchTpl({keyword: value});
    }
  };

  // 搜索快捷模板
  const handleOnSearch = (value: string) => {
    if (!value) {
      setBuiltInTplData(luaTemplates);
      setCustomTplData(groupList as TplGroupItem[]);
    } else {
      const searchValue = value.toLowerCase();
      const newData = filterData(searchValue);
      setBuiltInTplData(newData as TplGroupItem[]);
      searchGroup(searchValue);
    }
  };

  const handleOnChange = async (activeKey: string | string[]) => {
    const activeGroup = activeKey?.[0];
    const res = await getUserluaListByGroup({ uuid: activeGroup });
    const newData = customTplData?.map((item) => {
      if (item.uuid === activeGroup) {
        return {
          ...item,
          children: res?.data,
        };
      } else {
        return item;
      }
    });
    setCustomTplData(newData);
  };

  useEffect(() => {
    setBuiltInTplData(luaTemplates);
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
      {customTplData && customTplData.length > 0 && <Divider />}
      <ExampleItem
        type="custom"
        dataSource={customTplData as TplGroupItem[]}
        onChange={handleOnChange}
      />
    </Drawer>
  );
};

export default LuaExample;
