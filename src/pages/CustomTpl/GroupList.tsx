import { modal } from '@/components/PopupHack';
import { DeleteOutlined, EditOutlined, FolderOpenOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText, ProList } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Space, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_TYPE } from '.';

type GroupItem = {
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

type GroupListProps = {
  dataSource: any[];
  activeGroup: string;
  tplCount: number;
  onReset: () => void;
  onRefresh: () => void;
  updateActiveGroup: (key: string) => void;
};

const defaultCofig = { open: false, type: 'new', title: '新建模板分组' };

const GroupList = ({
  dataSource,
  activeGroup,
  tplCount,
  onReset,
  onRefresh,
  updateActiveGroup,
}: GroupListProps) => {
  const {
    remove: removeGroup,
    create: createGroup,
    update: updateGroup,
    getDetail: getGroupDetail,
    detail: groupDetail,
  } = useModel('useGroup');
  const groupFormRef = useRef<ProFormInstance>();
  const [groupConfig, setConfig] = useState<GroupConfig>(defaultCofig);

  // 删除分组
  const handleOnRemoveGroup = ({ name, uuid }: GroupItem) => {
    modal.confirm({
      title: `确定要删除${name}吗？`,
      width: 600,
      content: `模板分组中包含 ${tplCount} 个模板，删除后将被移入默认分组中，请谨慎处理。`,
      onOk: () => removeGroup({ uuid: uuid }).then(() => onReset()),
    });
  };

  useEffect(() => {
    if (groupDetail) {
      groupFormRef.current?.setFieldsValue({ name: groupDetail.name });
    } else {
      groupFormRef.current?.setFieldsValue({ name: '' });
    }
  }, [groupDetail]);
  return (
    <>
      <ProList<any>
        toolBarRender={false}
        onRow={(record: GroupItem) => {
          return {
            onClick: () => {
              updateActiveGroup(record.uuid);
            },
          };
        }}
        rowKey="uuid"
        headerTitle={false}
        dataSource={dataSource}
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
                        setConfig({ open: true, title: '编辑模板分组', type: 'edit' });
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
      <ModalForm
        formRef={groupFormRef}
        title={groupConfig.title}
        open={groupConfig.open}
        onOpenChange={(visible) => setConfig({ ...groupConfig, open: visible })}
        modalProps={{ destroyOnClose: true }}
        onFinish={async (values) => {
          if (groupConfig.type === 'new') {
            createGroup({ type: DEFAULT_TYPE, name: values?.name }).then((value: any) => {
              updateActiveGroup(value?.gid);
              setConfig(defaultCofig);
              onRefresh();
            });
          } else {
            updateGroup({
              type: DEFAULT_TYPE,
              uuid: groupDetail?.uuid || '',
              name: values.name,
            }).then(() => {
              setConfig(defaultCofig);
              onRefresh();
            });
          }
        }}
        layout="horizontal"
        width="30%"
      >
        <ProFormText width="md" name="name" label="分组名称" placeholder="请输入分组名称" />
      </ModalForm>
    </>
  );
};

export default GroupList;
