import { useRef, useState } from 'react';

import { history } from 'umi';

import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';

import { message } from '@/components/PopupHack';
import { deleteInends, getInends } from '@/services/rulex/shuruziyuanguanli';
import Detail from './components/Detail';

export type Item = {
  name: string;
  type: string;
  state: number;
  description: string;
  config: Record<string, any>;
  uuid: string;
};

const Sources = () => {
  const actionRef = useRef<ActionType>();
  const [detailConfig, setConfig] = useState<{ uuid: string; open: boolean }>({
    uuid: '',
    open: false,
  });

  // 删除
  const handleDelete = async (values: API.deleteInendsParams) => {
    try {
      await deleteInends(values);
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
      valueEnum: {
        COAP: 'COAP 协议支持',
        GENERIC_IOT_HUB: 'IoTHUB 平台支持',
        RULEX_UDP: 'UUDP 协议支持',
        HTTP: 'HTTP 协议支持',
        NATS_SERVER: 'Nats 中间件支持',
        GRPC: 'GRPC 协议支持',
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      valueEnum: {
        0: { text: '故障', status: 'Error' },
        1: { text: '启用', status: 'Success' },
        2: { text: '暂停', status: 'Default' },
        3: { text: '停止', status: 'Default' },
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
      render: (_, { uuid }) => [
        <a key="detail" onClick={() => setConfig({ open: true, uuid })}>
          详情
        </a>,
        <a key="edit" onClick={() => history.push(`/inends/edit/${uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="你确定要删除该资源?"
          onConfirm={() => handleDelete({ uuid })}
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
    <>
      <PageContainer>
        <ProTable
          rowKey="uuid"
          actionRef={actionRef}
          columns={columns}
          request={async () => {
            const res = await getInends();

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
              onClick={() => history.push('/inends/new')}
            >
              新建
            </Button>,
          ]}
        />
      </PageContainer>
      <Detail {...detailConfig} onClose={() => setConfig({ ...detailConfig, open: false })} />
    </>
  );
};

export default Sources;
