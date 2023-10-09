import { message, modal } from '@/components/PopupHack';
import {
  deleteGroup,
  getGroupDetail,
  getGroupList,
  getGroupVisuals,
  postGroupCreate,
  putGroupUpdate,
} from '@/services/rulex/fenzuguanli';
import { DeleteOutlined, EditOutlined, FolderOpenOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProCard,
  ProFormText,
  ProList,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Space, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import GroupDetail from './components/GroupDetail';
import './index.less';

export type GroupItem = {
  uuid: string;
  name: string;
  type: string;
  [key: string]: any;
};

type GroupConfig = {
  open: boolean;
  type: 'new' | 'edit';
  title: string;
};

const Screen = () => {
  const groupFormRef = useRef<ProFormInstance>();
  const [activeGroup, setActiveGroup] = useState<string>('ROOT');
  const [groupConfig, setConfig] = useState<GroupConfig>({
    open: false,
    type: 'new',
    title: '新建项目分组',
  });

  // 获取分组列表
  const { data, run } = useRequest(() => getGroupList({}));

  // 获取分组详情
  const { data: detail, run: getDetail } = useRequest(
    (params: API.getGroupDetailParams) => getGroupDetail(params),
    {
      manual: true,
    },
  );

  // 查询分组下的元素
  const {
    data: groupItems,
    run: getGroupItems,
    refresh,
  } = useRequest((params: API.getGroupVisualsParams) => getGroupVisuals(params), {
    manual: true,
  });

  // 删除分组
  const handleOnRemoveGroup = (params: GroupItem) => {
    modal.confirm({
      title: `确定要删除${params.name}分组吗？`,
      content: `项目分组中包含 ${groupItems.length} 个数据看板，删除后将被移入未分组中，请谨慎处理。`,
      onOk: async () => {
        await deleteGroup({ uuid: params.key });
        message.success('成功删除该项目分组');
      },
    });
  };

  // 创建&编辑分组
  const handleOnGroup = async (values: { name: string }) => {
    if (groupConfig.type === 'new') {
      await postGroupCreate({ ...values, type: 'VISUAL' });
      message.success('项目分组创建成功');
    } else {
      await putGroupUpdate({ ...values, uuid: detail?.uuid || '', type: detail?.type || 'VISUAL' });
      message.success('项目分组创建成功');
    }

    run();
    return true;
  };

  const getGroupName = (key: string) => {
    const group = data?.find((group) => group.uuid === key);

    return group?.name;
  };

  useEffect(() => {
    getGroupItems({ uuid: activeGroup });
  }, [activeGroup]);

  useEffect(() => {
    if (detail) {
      groupFormRef.current?.setFieldsValue({ name: detail.name });
    } else {
      groupFormRef.current?.setFieldsValue({ name: '' });
    }
  }, [detail]);

  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard
          headerBordered
          title="项目分组"
          colSpan="270px"
          extra={
            <Button
              size="small"
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
            dataSource={data}
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
                render: (dom, entity) => (
                  <Space size="middle">
                    <Tooltip title="重命名分组">
                      <a
                        key="edit"
                        onClick={() => {
                          setConfig({ open: true, title: '编辑项目分组', type: 'edit' });
                          getDetail({ uuid: entity.uuid });
                        }}
                      >
                        <EditOutlined />
                      </a>
                    </Tooltip>
                    <Tooltip title="删除分组">
                      <a key="delete" onClick={() => handleOnRemoveGroup(entity)}>
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
          <GroupDetail list={groupItems} group={data as GroupItem[]} reload={refresh} />
        </ProCard>
      </ProCard>
      <ModalForm
        formRef={groupFormRef}
        title={groupConfig.title}
        open={groupConfig.open}
        onOpenChange={(visible) => setConfig({ ...groupConfig, open: visible })}
        modalProps={{ destroyOnClose: true }}
        onFinish={handleOnGroup}
        layout="horizontal"
        width="30%"
      >
        <ProFormText width="md" name="name" label="分组名称" placeholder="请输入分组名称" />
      </ModalForm>
    </PageContainer>
  );
};

export default Screen;
