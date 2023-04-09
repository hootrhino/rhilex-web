import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef } from 'react';

type Item = {
  [key: string]: any;
};

const AppStack = () => {
  const actionRef = useRef<ActionType>();

  // 删除
  const handleDelete = () => {};

  const columns: ProColumns<Item>[] = [
    {
      title: 'APP 名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: 'APP 版本',
      dataIndex: 'version',
    },
    {
      title: '是否自启',
      dataIndex: 'autoStart',
      width: 100,
      valueEnum: {
        true: { text: '是', status: 'Success' },
        false: { text: '否', status: 'Error' },
      },
    },
    {
      title: '描述信息',
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
        <a key="edit">编辑</a>,
        <Popconfirm
          title="你确定要删除该应用?"
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
        // request={async () => {
        //   const res = await getDevices();

        //   return Promise.resolve({
        //     data: (res as any)?.data,
        //     success: true,
        //   });
        // }}
        dataSource={[]}
        search={false}
        pagination={false}
        toolBarRender={() => [
          <Button
            key="new"
            type="primary"
            icon={<PlusOutlined />}
            // onClick={() => history.push('/devices/new')}
          >
            新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default AppStack;
