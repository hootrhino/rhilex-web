import { getUserluaGroup, getUserluaListByGroup } from '@/services/rulex/yonghuLUApianduan';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import GroupList from './GroupList';
import TplList from './TplList';

export const DEFAULT_TYPE = 'LUA_TEMPLATE';

const CustomTpl = () => {
  const [activeGroup, setActiveGroup] = useState<string>(DEFAULT_TYPE);

  // 分组列表
  const { data: groupList, run: getGroupList } = useRequest(() => getUserluaGroup());

  // 模板列表
  const { data: tplList, run: getTplList } = useRequest(
    (params: API.getUserluaListByGroupParams) => getUserluaListByGroup(params),
    {
      manual: true,
    },
  );

  const getGroupName = (key: string) => {
    const group = groupList?.find((group: any) => group.uuid === key);

    return group?.name;
  };

  const handleOnReset = () => {
    getGroupList().then(() => {
      setActiveGroup(DEFAULT_TYPE);
    });
  };

  useEffect(() => {
    getTplList({ uuid: activeGroup });
  }, [activeGroup]);

  return (
    <>
      <PageContainer>
        <ProCard split="vertical">
          <ProCard
            headerBordered
            title="模板分组"
            colSpan="270px"
            extra={
              <Button
                key="add"
                type="primary"
                icon={<PlusOutlined />}
                // onClick={() => {
                //   setConfig({ open: true, title: '新建模板分组', type: 'new' });
                // }}
              >
                新建
              </Button>
            }
            headStyle={{ paddingInline: 16 }}
            bodyStyle={{ paddingInline: 16 }}
          >
            <GroupList
              dataSource={groupList || []}
              activeGroup={activeGroup}
              tplCount={tplList?.length || 0}
              onReset={handleOnReset}
              onRefresh={getGroupList}
              updateActiveGroup={setActiveGroup}
            />
          </ProCard>
          <ProCard title={getGroupName(activeGroup)}>
            <TplList dataSource={tplList || []} />
          </ProCard>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default CustomTpl;
