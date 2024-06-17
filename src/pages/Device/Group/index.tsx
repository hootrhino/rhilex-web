import { message, modal } from '@/components/PopupHack';
import {
  deleteGroupDel,
  getGroupDetail,
  postGroupCreate,
  putGroupUpdate,
} from '@/services/rulex/fenzuguanli';
import { getDevicesGroup } from '@/services/rulex/shebeiguanli';
import { DEFAULT_GROUP_KEY_DEVICE, GROUP_TYPE_DEVICE } from '@/utils/constant';
import { DeleteOutlined, EditOutlined, FolderOpenOutlined } from '@ant-design/icons';
import type { ActionType, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText, ProList } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
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

export const DEFAULT_CONFIG: GroupConfig = {
  open: false,
  type: GroupModalType.NEW,
  title: 'device.modal.title.group.new',
};

const GroupList = () => {
  const groupFormRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
  const { groupConfig, activeGroupKey, setTitle, setActiveGroupKey, setGroupConfig } =
    useModel('useDevice');
  const { type, title, ...params } = groupConfig;

  // 分组详情
  const { run: getDetail, data: groupDetail } = useRequest(
    (params: API.getGroupDetailParams) => getGroupDetail(params),
    {
      manual: true,
      onSuccess: () => {
        setGroupConfig({
          open: true,
          title: 'device.modal.title.group.edit',
          type: GroupModalType.EDIT,
        });
      },
    },
  );

  // 新建分组
  const { run: createGroup } = useRequest((params: createGroupParams) => postGroupCreate(params), {
    manual: true,
    onSuccess: (res: any) => {
      setActiveGroupKey(res?.gid);
      setGroupConfig(DEFAULT_CONFIG);
      actionRef.current?.reload();
      message.success(formatMessage({ id: 'message.success.new' }));
    },
  });

  // 更新分组
  const { run: updateGroup } = useRequest((params: updateGroupParams) => putGroupUpdate(params), {
    manual: true,
    onSuccess: () => {
      setGroupConfig(DEFAULT_CONFIG);
      actionRef.current?.reload();
      message.success(formatMessage({ id: 'message.success.update' }));
    },
  });

  // 新建&编辑
  const handleOnFinish = async ({ name }: { name: string }) => {
    if (type === 'new') {
      createGroup({ type: GROUP_TYPE_DEVICE, name });
    } else {
      updateGroup({
        type: GROUP_TYPE_DEVICE,
        uuid: groupDetail?.uuid || '',
        name,
      });
    }
  };

  // 删除分组
  const { run: removeGroup } = useRequest(
    (params: API.deleteGroupDelParams) => deleteGroupDel(params),
    {
      manual: true,
      onSuccess: () => {
        actionRef.current?.reload();
        setActiveGroupKey(DEFAULT_GROUP_KEY_DEVICE);
        message.success(formatMessage({ id: 'message.success.remove' }));
      },
    },
  );

  const handleOnRemoveGroup = (uuid: string) => {
    modal.confirm({
      title: formatMessage({ id: 'device.modal.title.group.remove' }),
      width: 600,
      content: formatMessage({ id: 'device.modal.content.group.remove' }),
      onOk: () => removeGroup({ uuid: uuid }),
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
        actionRef={actionRef}
        rowKey="uuid"
        headerTitle={false}
        toolBarRender={false}
        request={async () => {
          const { data } = await getDevicesGroup();

          return Promise.resolve({
            data: data as GroupItem[],
            success: true,
          });
        }}
        onRow={({ uuid, name }: GroupItem) => {
          return {
            onClick: () => {
              setActiveGroupKey(uuid);
              setTitle(name);
            },
          };
        }}
        rowClassName={({ uuid }: GroupItem) => (uuid === activeGroupKey ? 'active-group' : '')}
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
              uuid === DEFAULT_GROUP_KEY_DEVICE ? null : (
                <Space size="middle">
                  <Tooltip title={formatMessage({ id: 'device.tooltip.group.edit' })}>
                    <a key="edit" onClick={() => getDetail({ uuid })}>
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
        title={formatMessage({ id: title })}
        onOpenChange={(visible) => setGroupConfig({ ...groupConfig, open: visible })}
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
