import GroupList, { DEFAULT_CONFIG } from '@/components/GroupList';
import { getVisualListByGroup } from '@/services/rulex/dapingguanli';
import { DEFAULT_GROUP_KEY_SCREEN, GROUP_TYPE_SCREEN } from '@/utils/constant';
import { getName } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import GroupDetail from './components/GroupDetail';

const Screen = () => {
  const { groupList, getGroupList, activeGroup, setActiveGroup } = useModel('useEditor');
  const [groupConfig, setConfig] = useState<GroupConfig>(DEFAULT_CONFIG);

  // 大屏列表
  const {
    data: groupItems,
    run: getGroupItems,
    refresh,
  } = useRequest((params: API.getVisualListByGroupParams) => getVisualListByGroup(params), {
    manual: true,
  });

  // 重置分组表单
  const handleOnReset = () => {
    getGroupList().then(() => {
      setActiveGroup(DEFAULT_GROUP_KEY_SCREEN);
    });
  };

  // 刷新分组列表
  const handleOnRefresh = () => {
    setConfig(DEFAULT_CONFIG);
    getGroupList();
  };

  useEffect(() => {
    getGroupItems({ uuid: activeGroup });
  }, [activeGroup]);

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard
          headerBordered
          title="大屏分组"
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
            itemCount={groupItems?.length || 0}
            config={groupConfig}
            groupRoot={DEFAULT_GROUP_KEY_SCREEN}
            groupType={GROUP_TYPE_SCREEN}
            onReset={handleOnReset}
            onRefresh={handleOnRefresh}
            updateActiveGroup={setActiveGroup}
            updateConfig={setConfig}
          />
        </ProCard>
        <ProCard title={getName(groupList || [], activeGroup)}>
          <GroupDetail list={groupItems} activeGroup={activeGroup} reload={refresh} />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default Screen;
