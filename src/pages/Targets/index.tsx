import { useRef } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { history } from 'umi';

import { deleteOutends, getOutends } from '@/services/rulex/shuchuziyuanguanli';

export type Item = {
  name: string;
  type: string;
  state: number;
  description: string;
  uuid: string;
  [key: string]: any;
};

const Targets = () => {
  const actionRef = useRef<ActionType>();

  // 删除
  const handleOnDelete = async (values: API.deleteOutendsParams) => {
    try {
      await deleteOutends(values);
      actionRef?.current?.reload();
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
      valueType: 'option',
      key: 'option',
      width: 100,
      fixed: 'right',
      render: (_, record) => [
        <a key="edit" onClick={() => history.push(`/outends/edit/${record.uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="确定要删除该目标？"
          onConfirm={() => handleOnDelete({ uuid: record.uuid })}
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
            const res = await getOutends();

            return Promise.resolve({
              data: (res as any)?.data,
              success: true,
            });
          }}
          search={false}
          pagination={false}
          toolBarRender={() => [
            <Button type="primary" key="primary" onClick={() => history.push('/outends/new')}>
              <PlusOutlined /> 新建
            </Button>,
          ]}
        />
      </PageContainer>
    </>
  );
};

export default Targets;
