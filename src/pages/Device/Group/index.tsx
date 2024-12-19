import { message, modal } from '@/components/PopupHack';
import {
  deleteGroupDel,
  getGroupDetail,
  postGroupCreate,
  putGroupUpdate,
} from '@/services/rhilex/fenzuguanli';
import { getDevicesGroup } from '@/services/rhilex/shebeiguanli';
import { DEFAULT_GROUP_KEY_DEVICE, GROUP_TYPE_DEVICE } from '@/utils/constant';
import { generateRandomId } from '@/utils/utils';
import { DeleteOutlined, EditOutlined, FolderOpenOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ModalForm, ProFormText, ProList } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Form, Space, Tooltip } from 'antd';
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

type GroupProps = {
  config: GroupConfig;
  activeKey: string;
  changeActiveKey: (value: string) => void;
  changeConfig: (values: GroupConfig) => void;
  changeTitle: (value: string) => void;
};

export const DEFAULT_CONFIG: GroupConfig = {
  open: false,
  type: GroupModalType.NEW,
  title: 'device.modal.title.group.new',
};

const GroupList = ({
  config,
  activeKey,
  changeActiveKey,
  changeConfig,
  changeTitle,
}: GroupProps) => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
  const { type, title, open } = config;
  const [form] = Form.useForm();

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
    onSuccess: (res: any) => {
      changeActiveKey(res?.gid);
      changeConfig(DEFAULT_CONFIG);
      actionRef.current?.reload();
      message.success(formatMessage({ id: 'message.success.new' }));
    },
  });

  // 更新分组
  const { run: updateGroup } = useRequest((params: updateGroupParams) => putGroupUpdate(params), {
    manual: true,
    onSuccess: () => {
      changeConfig(DEFAULT_CONFIG);
      actionRef.current?.reload();
      message.success(formatMessage({ id: 'message.success.update' }));
    },
  });

  // 新建&编辑
  const handleOnFinish = async ({ name }: { name: string }) => {
    if (type === GroupModalType.NEW) {
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
        changeActiveKey(DEFAULT_GROUP_KEY_DEVICE);
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
    if (!activeKey) return;
    getDetail({ uuid: activeKey }).then((res) => changeTitle(res.name));
  }, [activeKey]);

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
              changeActiveKey(uuid);
              changeTitle(name);
            },
          };
        }}
        rowClassName={({ uuid }: GroupItem) => (uuid === activeKey ? 'bg-[#f0f0f0]' : '')}
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
                    <a
                      key="edit"
                      onClick={() => {
                        getDetail({ uuid }).then((res) => {
                          form.setFieldValue('name', res.name);
                          changeConfig({
                            open: true,
                            title: 'device.modal.title.group.edit',
                            type: GroupModalType.EDIT,
                          });
                        });
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
        open={open}
        form={form}
        title={formatMessage({ id: title })}
        onOpenChange={(visible) => changeConfig({ ...config, open: visible })}
        modalProps={{ destroyOnClose: true }}
        onFinish={handleOnFinish}
        layout="horizontal"
        width="30%"
        initialValues={{ name: `DEVICE_GROUP_${generateRandomId()}` }}
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
