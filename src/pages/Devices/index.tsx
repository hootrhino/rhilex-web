import { useRef } from 'react';

import { history } from 'umi';

import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';

import { message } from '@/components/PopupHack';
import { deleteDevices, getDevices } from '@/services/rulex/shebeiguanli';

export type Item = {
  name: string;
  type: string;
  state: number;
  description: string;
  config: Record<string, any>;
  [key: string]: any;
};

const Devices = () => {
  const actionRef = useRef<ActionType>();

  // 删除
  const handleDelete = async (value: API.deleteDevicesParams) => {
    try {
      await deleteDevices(value);
      actionRef.current?.reload();
      message.success('删除成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  const columns: ProColumns<Item>[] = [
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
      width: 120,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a key="edit" onClick={() => history.push(`/device/edit/${record.uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="你确定要删除该设备?"
          onConfirm={() => handleDelete({ uuid: record.uuid })}
          okText="是"
          cancelText="否"
          key="delete"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
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
    </PageContainer>
  );
};

export default Devices;
