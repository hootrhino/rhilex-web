import { message, modal } from '@/components/PopupHack';
import { DeleteOutlined, EditOutlined, FolderOpenOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProCard,
  ProFormText,
  ProList,
} from '@ant-design/pro-components';
import { Button, Space, Tooltip } from 'antd';
import { useRef, useState } from 'react';
import GroupDetail from './components/GroupDetail';
import './index.less';

type GroupItem = {
  key: string;
  name: string;
};

const groupData = [
  {
    key: 'other',
    name: '未分组',
  },
];

const Screen = () => {
  const groupFormRef = useRef<ProFormInstance>();
  const [activeGroup, setActiveGroup] = useState<string>('other');
  const [open, setOpen] = useState<boolean>(false);
  const [groupDetail, setGroupDetail] = useState<GroupItem>();

  const getGroupName = (key: string) => {
    const group = groupData.find((group) => group.key === key);

    return group?.name;
  };

  // TODO 获取分组列表
  // TODO 获取分组详情
  // 删除分组
  const handleOnRemoveGroup = (removeItem: GroupItem) => {
    modal.confirm({
      title: `确定要删除${removeItem.name}分组吗？`,
      content: '项目分组中包含0个数据看板，删除后将被移入未分组中，请谨慎处理。',
      onOk: () => {
        // TODO 删除分组
        message.success('成功删除该项目分组');
      },
    });
  };

  // 创建&编辑分组
  const handleOnGroup = async (values: { group: string }) => {
    // TODO 创建&编辑分组
    console.log(values);
    message.success('项目分组创建成功');
    return true;
  };

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
                setOpen(true);
                setGroupDetail(undefined);
                groupFormRef.current?.setFieldsValue({ group: '' });
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
                  setActiveGroup(record.key);
                },
              };
            }}
            rowKey="key"
            headerTitle={false}
            dataSource={groupData}
            rowClassName={(item: GroupItem) => (item?.key === activeGroup ? 'active-group' : '')}
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
                          setOpen(true);
                          setGroupDetail(entity);
                          groupFormRef.current?.setFieldsValue({ group: entity.name });
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
          <GroupDetail activeKey={activeGroup} />
        </ProCard>
      </ProCard>
      <ModalForm
        formRef={groupFormRef}
        title={groupDetail ? '编辑项目分组' : '新建项目分组'}
        open={open}
        onOpenChange={(visible) => setOpen(visible)}
        onFinish={handleOnGroup}
        layout="horizontal"
        width="30%"
      >
        <ProFormText width="md" name="group" label="分组名称" placeholder="请输入分组名称" />
      </ModalForm>
    </PageContainer>
  );
};

export default Screen;
