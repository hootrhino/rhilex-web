import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  FolderOpenOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProCard,
  ProFormText,
  ProList,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tag, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { message } from '@/components/PopupHack';
import type { DeviceGroupItem } from '@/models/useGroup';
import { deleteDevices } from '@/services/rulex/shebeiguanli';
import { history, useModel, useRequest } from '@umijs/max';
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

type DeviceConfig = {
  uuid: string;
  open: boolean;
};

type GroupFormParams = {
  name: string;
};

const defaultGroupConfig = {
  type: 'new',
  open: false,
  title: '新建设备分组',
};

const defaultDeviceConfig = {
  uuid: '',
  open: false,
};

const Devices = () => {
  const actionRef = useRef<ActionType>();
  const groupFormRef = useRef<ProFormInstance>();

  const { run: getDeviceList, data: deviceList, groupList, getGroupList } = useModel('useDevice');
  const {
    remove: removeGroup,
    create: createGroup,
    update: updateGroup,
    getDetail: getGroupDetail,
    detail: groupDetail,
    activeGroupKey,
    setActiveGroupKey,
  } = useModel('useGroup');
  const [activeGroupName, setActiveGroupName] = useState<string>('默认分组');
  const [groupConfig, setGroupConfig] = useState<GroupConfig>(defaultGroupConfig);
  const [detailConfig, setDeviceConfig] = useState<DeviceConfig>(defaultDeviceConfig);

  const handleOnUpdateGroupName = (id: string) => {
    getGroupList().then((groups) => {
      const activeGroup = groups?.find((group) => group.uuid === id);
      setActiveGroupName(activeGroup?.name || '');
    });
  };

  // 新增编辑设备分组
  const handleOnFinish = async ({ name }: GroupFormParams) => {
    try {
      const type = 'DEVICE';

      if (groupConfig.type === 'new') {
        // 新增
        createGroup({ name, type }).then((value: any) => {
          handleOnUpdateGroupName(value?.gid);
          setActiveGroupKey(value?.gid);
        });
      } else {
        // 编辑
        if (!groupDetail?.uuid) return;
        updateGroup({ uuid: groupDetail?.uuid, type: groupDetail?.type || type, name }).then(
          () => groupDetail.uuid && handleOnUpdateGroupName(groupDetail.uuid),
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
      actionRef.current?.reload();
      message.success('删除成功');
    },
  });

  const renderState = (state: number) => {
    const valueEnum = {
      0: { text: '停止', color: 'default', icon: <MinusCircleOutlined /> },
      1: { text: '启用', color: 'success', icon: <CheckCircleOutlined /> },
      2: { text: '故障', color: 'error', icon: <CloseCircleOutlined /> },
    };

    return (
      <Tag icon={valueEnum[state].icon} color={valueEnum[state].color}>
        {valueEnum[state].text}
      </Tag>
    );
  };

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
      valueEnum: {
        GENERIC_SNMP: '通用SNMP协议采集',
        USER_G776: '通用串口DTU',
        GENERIC_PROTOCOL: '通用串口协议',
        GENERIC_MODBUS: '通用Modbus Master',
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 120,
      valueEnum: {
        0: { text: '停止', status: 'Default' },
        1: { text: '启用', status: 'Success' },
        2: { text: '故障', status: 'Error' },
      },
      renderText: (state) => renderState(state),
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
      render: (_, { uuid }) => [
        <a key="rule" onClick={() => history.push(`/device/${uuid}/rule`)}>
          规则配置
        </a>,
        <a key="detail" onClick={() => setDeviceConfig({ open: true, uuid })}>
          详情
        </a>,
        <a key="edit" onClick={() => history.push(`/device/edit/${uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="你确定要删除该设备?"
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
                    setActiveGroupName(record?.name || '');
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
                                  setActiveGroupName('默认分组');
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
          <ProCard title={activeGroupName}>
            <ProTable
              rowKey="uuid"
              actionRef={actionRef}
              columns={columns}
              dataSource={deviceList}
              search={false}
              pagination={false}
              toolBarRender={() => [
                <Button
                  key="new"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => history.push('/device/new')}
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
