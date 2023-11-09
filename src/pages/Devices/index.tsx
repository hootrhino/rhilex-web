import { DeleteOutlined, EditOutlined, FolderOpenOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProCard,
  ProFormText,
  ProList,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { message } from '@/components/PopupHack';
import StateTag from '@/components/StateTag';
import type { DeviceGroupItem } from '@/models/useGroup';
import { deleteDevices } from '@/services/rulex/shebeiguanli';
import { history, useModel, useRequest } from '@umijs/max';
import { typeEnum } from './components/columns';
import Detail from './components/Detail';

export type DeviceItem = {
  name: string;
  type: string;
  state: number;
  description: string;
  config: Record<string, any>;
  [key: string]: any;
};

type GroupConfig = {
  type: string;
  open: boolean;
  title: string;
};

// type DeviceConfig = {
//   uuid: string;
//   open: boolean;
// };

type GroupFormParams = {
  name: string;
};

const defaultGroupConfig = {
  type: 'new',
  open: false,
  title: '新建设备分组',
};

// const defaultDeviceConfig = {
//   uuid: '',
//   open: false,
// };

const Devices = () => {
  const groupFormRef = useRef<ProFormInstance>();

  const {
    run: getDeviceList,
    data: deviceList,
    groupList,
    getGroupList,
    detailConfig,
    setDeviceConfig,
  } = useModel('useDevice');
  const {
    remove: removeGroup,
    create: createGroup,
    update: updateGroup,
    getDetail: getGroupDetail,
    detail: groupDetail,
  } = useModel('useGroup');

  const [groupConfig, setGroupConfig] = useState<GroupConfig>(defaultGroupConfig);
  // const [detailConfig, setDeviceConfig] = useState<DeviceConfig>(defaultDeviceConfig);
  const [activeGroupKey, setActiveGroupKey] = useState<string>('DROOT');

  const getGroupName = (key: string) => {
    const group = groupList?.find((group: any) => group.uuid === key);

    return group?.name || '';
  };

  // 新增编辑设备分组
  const handleOnFinish = async ({ name }: GroupFormParams) => {
    try {
      const type = 'DEVICE';

      if (groupConfig.type === 'new') {
        // 新增
        createGroup({ name, type }).then((value: any) => {
          setActiveGroupKey(value?.gid);
          getGroupList();
        });
      } else {
        // 编辑
        if (!groupDetail?.uuid) return;
        updateGroup({ uuid: groupDetail?.uuid, type: groupDetail?.type || type, name }).then(() =>
          getGroupList(),
        );
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  // 删除设备
  const { run: remove } = useRequest((params: API.deleteDevicesParams) => deleteDevices(params), {
    manual: true,
    onSuccess: () => {
      getDeviceList({ uuid: activeGroupKey });
      message.success('删除成功');
    },
  });

  const columns: ProColumns<DeviceItem>[] = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueEnum: typeEnum,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 120,
      renderText: (state) => (state ? <StateTag state={state} /> : '-'),
    },
    {
      title: '备注',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      width: 180,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, { uuid, gid }) => [
        <a key="rule" onClick={() => history.push(`/device/${gid}/${uuid}/rule`)}>
          规则配置
        </a>,
        <a key="detail" onClick={() => setDeviceConfig({ open: true, uuid })}>
          详情
        </a>,
        <a key="edit" onClick={() => history.push(`/device/${gid}/edit/${uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="确定要删除该设备?"
          onConfirm={() => remove({ uuid })}
          okText="是"
          cancelText="否"
          key="remove"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  useEffect(() => {
    if (activeGroupKey) {
      getDeviceList({ uuid: activeGroupKey });
    }
  }, [activeGroupKey]);

  useEffect(() => {
    if (!groupDetail) return;
    groupFormRef.current?.setFieldsValue({ name: groupDetail.name });
  }, [groupDetail]);

  return (
    <>
      <PageContainer>
        <ProCard split="vertical">
          <ProCard
            headerBordered
            title="设备分组"
            colSpan="270px"
            extra={
              <Button
                key="add"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setGroupConfig({ open: true, title: '新建设备分组', type: 'new' });
                }}
              >
                新建
              </Button>
            }
            headStyle={{ paddingInline: 16 }}
            bodyStyle={{ paddingInline: 16 }}
          >
            <ProList<DeviceGroupItem>
              toolBarRender={false}
              onRow={(record: DeviceGroupItem) => {
                return {
                  onClick: () => {
                    if (!record?.uuid) return;
                    setActiveGroupKey(record?.uuid);
                  },
                };
              }}
              rowKey="uuid"
              headerTitle={false}
              dataSource={groupList}
              rowClassName={(item: DeviceGroupItem) =>
                item?.uuid === activeGroupKey ? 'active-group' : ''
              }
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
                    entity.uuid === 'DROOT' ? null : (
                      <Space size="middle">
                        <Tooltip title="重命名分组">
                          <a
                            key="edit"
                            onClick={() => {
                              setGroupConfig({ open: true, title: '编辑设备分组', type: 'edit' });
                              if (entity?.uuid) {
                                getGroupDetail({ uuid: entity.uuid });
                              }
                            }}
                          >
                            <EditOutlined />
                          </a>
                        </Tooltip>
                        <Tooltip title="删除分组">
                          <Popconfirm
                            title="确定删除该分组吗"
                            onConfirm={() => {
                              if (!entity.uuid) return;
                              removeGroup({ uuid: entity.uuid }).then(() =>
                                getGroupList().then(() => {
                                  setActiveGroupKey('DROOT');
                                }),
                              );
                            }}
                          >
                            <a key="remove">
                              <DeleteOutlined key="remove" />
                            </a>
                          </Popconfirm>
                        </Tooltip>
                      </Space>
                    ),
                },
              }}
            />
          </ProCard>
          <ProCard title={getGroupName(activeGroupKey)}>
            <ProTable
              rowKey="uuid"
              columns={columns}
              dataSource={deviceList as DeviceItem[]}
              search={false}
              pagination={false}
              toolBarRender={() => [
                <Button
                  key="new"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => history.push(`/device/${activeGroupKey}/new`)}
                >
                  新建
                </Button>,
              ]}
            />
          </ProCard>
        </ProCard>
      </PageContainer>
      <Detail {...detailConfig} onClose={() => setDeviceConfig({ ...detailConfig, open: false })} />
      <ModalForm
        formRef={groupFormRef}
        title={groupConfig.title}
        open={groupConfig.open}
        onOpenChange={(visible) => setGroupConfig({ ...groupConfig, open: visible })}
        modalProps={{ destroyOnClose: true, maskClosable: false }}
        onFinish={handleOnFinish}
        layout="horizontal"
        width="30%"
      >
        <ProFormText width="md" name="name" label="分组名称" placeholder="请输入设备分组名称" />
      </ModalForm>
    </>
  );
};

export default Devices;
