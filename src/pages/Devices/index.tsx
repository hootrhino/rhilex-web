import { DeleteOutlined, EditOutlined, FolderOpenOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProCard,
  ProFormText,
  ProList,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { useRef, useState } from 'react';

import { message } from '@/components/PopupHack';
import { deleteDevices, getDevices } from '@/services/rulex/shebeiguanli';
import { history, useRequest } from '@umijs/max';
import Detail from './components/Detail';

export type DeviceItem = {
  name: string;
  type: string;
  state: number;
  description: string;
  config: Record<string, any>;
  [key: string]: any;
};

type DeviceGroupItem = {
  name: string;
  uuid?: string;
};

const Devices = () => {
  const actionRef = useRef<ActionType>();
  const groupFormRef = useRef<ProFormInstance>();
  const [activeGroup, setActiveGroup] = useState<string>('');
  const [groupConfig, setGroupConfig] = useState<{
    type: 'new' | 'edit';
    open: boolean;
    title: string;
  }>({
    type: 'new',
    open: false,
    title: '新建设备分组',
  });
  const [detailConfig, setDeviceConfig] = useState<{ uuid: string; open: boolean }>({
    uuid: '',
    open: false,
  });

  // TODO 获取分组列表

  // 删除设备
  const { run: remove } = useRequest((params: API.deleteDevicesParams) => deleteDevices(params), {
    manual: true,
    onSuccess: () => {
      actionRef.current?.reload();
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
    },
    {
      title: '信息',
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
                //size="small"
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
                    setActiveGroup(record?.uuid);
                  },
                };
              }}
              rowKey="uuid"
              headerTitle={false}
              dataSource={[]}
              rowClassName={(item: DeviceGroupItem) =>
                item?.uuid === activeGroup ? 'active-group' : ''
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
                  render: (dom, entity) => (
                    <Space size="middle">
                      <Tooltip title="重命名分组">
                        <a
                          key="edit"
                          onClick={() => {
                            setGroupConfig({ open: true, title: '编辑设备分组', type: 'edit' });
                            // TODO 获取详情
                            // getDetail({ uuid: entity.uuid });
                          }}
                        >
                          <EditOutlined />
                        </a>
                      </Tooltip>
                      <Tooltip title="删除分组">
                        <a
                          key="remove"
                          onClick={() => {
                            // TODO 删除分组
                            console.log(entity);
                          }}
                        >
                          <DeleteOutlined />
                        </a>
                      </Tooltip>
                    </Space>
                  ),
                },
              }}
            />
          </ProCard>
          <ProCard title="分组名称">
            <ProTable
              rowKey="uuid"
              actionRef={actionRef}
              columns={columns}
              request={async () => {
                const res = await getDevices();

                return Promise.resolve({
                  data: (res as any)?.data,
                  success: true,
                });
              }}
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
        modalProps={{ destroyOnClose: true }}
        onFinish={async (values) => {
          // TODO 新增编辑
          // groupConfig.type === 'new' ? create(values.name) : update(values.name)
          console.log(values);
        }}
        layout="horizontal"
        width="30%"
      >
        <ProFormText width="md" name="name" label="分组名称" placeholder="请输入设备分组名称" />
      </ModalForm>
    </>
  );
};

export default Devices;
