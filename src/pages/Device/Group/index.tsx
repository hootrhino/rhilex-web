import { message, modal } from '@/components/PopupHack';
import {
  deleteGroupDel,
  getGroupDetail,
  postGroupCreate,
  putGroupUpdate,
} from '@/services/rulex/fenzuguanli';
import { DeleteOutlined, EditOutlined, FolderOpenOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText, ProList } from '@ant-design/pro-components';
import { getIntl, getLocale, useIntl, useRequest } from '@umijs/max';
import { Space, Tooltip } from 'antd';
import { useEffect, useRef } from 'react';

export enum GroupModalType {
  EDIT = 'edit',
  NEW = 'new',
}

export type GroupConfig = {
  open: boolean;
  title: string;
  type: GroupModalType;
};

export type GroupItem = {
  uuid: string;
  name: string;
  type: string;
  [key: string]: any;
};

type createGroupParams = {
  name: string;
  type: string;
};

type updateGroupParams = createGroupParams & {
  uuid: string;
};

type GroupListProps = {
  dataSource: any[];
  activeGroup: string;
  itemCount: number;
  config: GroupConfig;
  groupRoot: string;
  groupType: string;
  onReset: () => void;
  onRefresh: () => void;
  updateActiveGroup: (key: string) => void;
  updateConfig: (values: GroupConfig) => void;
};

export const DEFAULT_CONFIG: GroupConfig = {
  open: false,
  type: GroupModalType.NEW,
  title: getIntl(getLocale()).formatMessage({ id: 'device.modal.title.group.new' }),
};

const GroupList = ({
  dataSource,
  activeGroup,
  itemCount,
  config,
  groupRoot,
  groupType,
  onReset,
  onRefresh,
  updateActiveGroup,
  updateConfig,
}: GroupListProps) => {
  const groupFormRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const { type, ...params } = config;

  // 分组详情
  const { run: getDetail, data: groupDetail } = useRequest(
    (params: API.getGroupDetailParams) => getGroupDetail(params),
    {
      manual: true,
    },
  );

  // 新建分组
  const { run: createGroup } = useRequest((params: createGroupParams) => postGroupCreate(params), {
    manual: true,
    onSuccess: () => message.success(formatMessage({ id: 'message.success.new' })),
  });

  // 更新分组
  const { run: updateGroup } = useRequest((params: updateGroupParams) => putGroupUpdate(params), {
    manual: true,
    onSuccess: () => message.success(formatMessage({ id: 'message.success.update' })),
  });

  // 新建&编辑
  const handleOnFinish = async ({ name }: { name: string }) => {
    if (type === 'new') {
      createGroup({ type: groupType, name }).then((value: any) => {
        updateActiveGroup(value?.gid);
        onRefresh();
      });
    } else {
      updateGroup({
        type: groupType,
        uuid: groupDetail?.uuid || '',
        name,
      }).then(() => {
        onRefresh();
      });
    }
  };

  // 删除分组
  const { run: removeGroup } = useRequest(
    (params: API.deleteGroupDelParams) => deleteGroupDel(params),
    {
      manual: true,
      onSuccess: () => message.success(formatMessage({ id: 'message.success.remove' })),
    },
  );

  const handleOnRemoveGroup = (uuid: string) => {
    modal.confirm({
      title: formatMessage({ id: 'device.modal.title.group.remove' }),
      width: 600,
      content: formatMessage({ id: 'device.modal.content.group.remove' }, { count: itemCount }),
      onOk: () => removeGroup({ uuid: uuid }).then(() => onReset()),
      okText: formatMessage({ id: 'button.ok' }),
      cancelText: formatMessage({ id: 'button.cancel' }),
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
      <ProList<GroupItem>
        rowKey="uuid"
        headerTitle={false}
        dataSource={dataSource}
        toolBarRender={false}
        onRow={({ uuid }: GroupItem) => {
          return {
            onClick: () => {
              updateActiveGroup(uuid);
            },
          };
        }}
        rowClassName={({ uuid }: GroupItem) => (uuid === activeGroup ? 'active-group' : '')}
        metas={{
          title: {
            dataIndex: 'name',
            render: (dom) => <div className="w-[120px] truncate">{dom}</div>,
          },
          avatar: {
            render: () => <FolderOpenOutlined className="pl-[10px]" />,
          },
          actions: {
            render: (_dom, { uuid }) =>
              uuid === groupRoot ? null : (
                <Space size="middle">
                  <Tooltip title={formatMessage({ id: 'device.tooltip.group.edit' })}>
                    <a
                      key="edit"
                      onClick={() => {
                        updateConfig({
                          open: true,
                          title: formatMessage({ id: 'device.modal.title.group.edit' }),
                          type: GroupModalType.EDIT,
                        });
                        getDetail({ uuid });
                      }}
                    >
                      <EditOutlined />
                    </a>
                  </Tooltip>
                  <Tooltip title={formatMessage({ id: 'device.tooltip.group.remove' })}>
                    <a key="remove" onClick={() => handleOnRemoveGroup(uuid)}>
                      <DeleteOutlined />
                    </a>
                  </Tooltip>
                </Space>
              ),
          },
        }}
      />
      <ModalForm
        {...params}
        formRef={groupFormRef}
        onOpenChange={(visible) => updateConfig({ ...config, open: visible })}
        modalProps={{ destroyOnClose: true }}
        onFinish={handleOnFinish}
        layout="horizontal"
        width="30%"
      >
        <ProFormText
          width="md"
          name="name"
          label={formatMessage({ id: 'device.form.title.group.name' })}
          placeholder={formatMessage({ id: 'device.form.placeholder.group.name' })}
        />
      </ModalForm>
    </>
  );
};

export default GroupList;
