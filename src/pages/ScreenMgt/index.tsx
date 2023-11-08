import { modal } from '@/components/PopupHack';
import { getVisualListByGroup } from '@/services/rulex/dapingguanli';
import { DeleteOutlined, EditOutlined, FolderOpenOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProCard,
  ProFormText,
  ProList,
} from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { Button, Space, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import GroupDetail from './components/GroupDetail';

export type GroupItem = {
  uuid: string;
  name: string;
  type: string;
  [key: string]: any;
};

type GroupConfig = {
  open: boolean;
  type: string;
  title: string;
};

const DEFAULT_TYPE = 'VISUAL';

const defaultCofig = { open: false, type: 'new', title: '新建项目分组' };

const Screen = () => {
  const groupFormRef = useRef<ProFormInstance>();
  const { groupList, getGroupList, activeGroup, setActiveGroup } = useModel('useEditor');
  const {
    remove: removeGroup,
    create: createGroup,
    update: updateGroup,
    getDetail: getGroupDetail,
    detail: groupDetail,
  } = useModel('useGroup');
  const [groupConfig, setConfig] = useState<GroupConfig>(defaultCofig);

  // 大屏列表
  const {
    data: groupItems,
    run: getGroupItems,
    refresh,
  } = useRequest((params: API.getVisualListByGroupParams) => getVisualListByGroup(params), {
    manual: true,
  });

  const handleOnRemoveGroup = ({ name, uuid }: GroupItem) => {
    modal.confirm({
      title: `确定要删除${name}吗？`,
      width: 600,
      content: `项目分组中包含 ${groupItems?.length} 个数据看板，删除后将被移入默认分组中，请谨慎处理。`,
      onOk: () =>
        removeGroup({ uuid: uuid }).then(() =>
          getGroupList().then(() => {
            setActiveGroup('VROOT');
          }),
        ),
    });
  };

  const getGroupName = (key: string) => {
    const group = groupList?.find((group: any) => group.uuid === key);

    return group?.name;
  };

  useEffect(() => {
    getGroupItems({ uuid: activeGroup });
  }, [activeGroup]);

  useEffect(() => {
    if (groupDetail) {
      groupFormRef.current?.setFieldsValue({ name: groupDetail.name });
    } else {
      groupFormRef.current?.setFieldsValue({ name: '' });
    }
  }, [groupDetail]);

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard
          headerBordered
          title="项目分组"
          colSpan="270px"
          extra={
            <Button
              key="add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setConfig({ open: true, title: '新建项目分组', type: 'new' });
              }}
            >
              新建
            </Button>
          }
          headStyle={{ paddingInline: 16 }}
          bodyStyle={{ paddingInline: 16 }}
        >
          <ProList<any>
            toolBarRender={false}
            onRow={(record: GroupItem) => {
              return {
                onClick: () => {
                  setActiveGroup(record.uuid);
                },
              };
            }}
            rowKey="uuid"
            headerTitle={false}
            dataSource={groupList}
            rowClassName={(item: GroupItem) => (item?.uuid === activeGroup ? 'active-group' : '')}
            metas={{
              title: {
                dataIndex: 'name',
                render: (dom) => {
                  return <div className="w-[120px] truncate">{dom}</div>;
                },
              },
              avatar: {
                render: () => <FolderOpenOutlined className="pl-[10px]" />,
              },
              actions: {
                render: (dom, entity) =>
                  entity?.uuid === 'VROOT' ? null : (
                    <Space size="middle">
                      <Tooltip title="重命名分组">
                        <a
                          key="edit"
                          onClick={() => {
                            setConfig({ open: true, title: '编辑项目分组', type: 'edit' });
                            getGroupDetail({ uuid: entity.uuid });
                          }}
                        >
                          <EditOutlined />
                        </a>
                      </Tooltip>
                      <Tooltip title="删除分组">
                        <a key="remove" onClick={() => handleOnRemoveGroup(entity)}>
                          <DeleteOutlined />
                        </a>
                      </Tooltip>
                    </Space>
                  ),
              },
            }}
          />
        </ProCard>

        <ProCard title={getGroupName(activeGroup)}>
          <GroupDetail list={groupItems} activeGroup={activeGroup} reload={refresh} />
        </ProCard>
      </ProCard>
      <ModalForm
        formRef={groupFormRef}
        title={groupConfig.title}
        open={groupConfig.open}
        onOpenChange={(visible) => setConfig({ ...groupConfig, open: visible })}
        modalProps={{ destroyOnClose: true }}
        onFinish={async (values) => {
          if (groupConfig.type === 'new') {
            createGroup({ type: DEFAULT_TYPE, name: values?.name }).then((value: any) => {
              setActiveGroup(value?.gid);
              setConfig(defaultCofig);
              getGroupList();
            });
          } else {
            updateGroup({
              type: DEFAULT_TYPE,
              uuid: groupDetail?.uuid || '',
              name: values.name,
            }).then(() => {
              setConfig(defaultCofig);
              getGroupList();
            });
          }
        }}
        layout="horizontal"
        width="30%"
      >
        <ProFormText width="md" name="name" label="分组名称" placeholder="请输入分组名称" />
      </ModalForm>
    </PageContainer>
  );
};

export default Screen;
