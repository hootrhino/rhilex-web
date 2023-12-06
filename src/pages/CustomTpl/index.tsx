import GroupList, { DEFAULT_CONFIG } from '@/components/GroupList';
import { getUserluaGroup, getUserluaListByGroup } from '@/services/rulex/yonghuLUApianduan';
import { DEFAULT_GROUP_KEY_LUA_TPL, GROUP_TYPE_LUA_TPL } from '@/utils/constant';
import { getGroupName } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import type { GroupConfig } from '@/components/GroupList';
import TplList from './TplList';

const CustomTpl = () => {
  const [activeGroup, setActiveGroup] = useState<string>(DEFAULT_GROUP_KEY_LUA_TPL);
  const [groupConfig, setConfig] = useState<GroupConfig>(DEFAULT_CONFIG);

  // 分组列表
  const { data: groupList, run: getGroupList } = useRequest(() => getUserluaGroup());

  // 模板列表
  const { data: tplList, run: getTplList } = useRequest(
    (params: API.getUserluaListByGroupParams) => getUserluaListByGroup(params),
    {
      manual: true,
    },
  );

  // 重置分组表单
  const handleOnReset = () => {
    getGroupList().then(() => {
      setActiveGroup(DEFAULT_GROUP_KEY_LUA_TPL);
    });
  };

  // 刷新分组列表
  const handleOnRefresh = () => {
    setConfig(DEFAULT_CONFIG);
    getGroupList();
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
                onClick={() => {
                  setConfig({ ...DEFAULT_CONFIG, open: true });
                }}
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
              itemCount={tplList?.length || 0}
              config={groupConfig}
              groupRoot={DEFAULT_GROUP_KEY_LUA_TPL}
              groupType={GROUP_TYPE_LUA_TPL}
              onReset={handleOnReset}
              onRefresh={handleOnRefresh}
              updateActiveGroup={setActiveGroup}
              updateConfig={setConfig}
            />
          </ProCard>
          <ProCard title={getGroupName(groupList || [], activeGroup)}>
            <TplList dataSource={tplList || []} />
          </ProCard>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default CustomTpl;
