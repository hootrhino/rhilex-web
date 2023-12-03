import { DeleteOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';

const typeEnum = {
  info: {
    text: '信息',
    color: 'processing'
  },
  error: {
    text: '错误',
    color: 'error'
  },
  warning: {
    text: '报警',
    color: 'warning'
  }
}

const NotifyLog = () => {
  const columns = [
    {
      title: '类型',
      dataIndex: 'type',
      renderText: (type: string) => <Tag color={typeEnum[type].color}>{typeEnum[type].text}</Tag>
    },
    {
      title: '事件',
      dataIndex: 'event',
    },
    {
      title: '时间',
      dataIndex: 'ts',
    },
    {
      title: '概览',
      dataIndex: 'summary',
      ellipsis: true,
    },
  ];

  return (
    <>
      <PageContainer>
        <ProTable
          rowKey="uuid"
          columns={columns}
          dataSource={[]}
          search={false}
          pagination={false}
          toolBarRender={() => [
            <Button
              type="primary"
              key="clear"
              onClick={() => {
                // TODO 一键清空
              }}
              icon={<DeleteOutlined />}
            >
              一键清空
            </Button>,
          ]}
          options={{
            reload: () => {
              // TODO reload
            },
          }}
        />
      </PageContainer>
    </>
  );
};

export default NotifyLog;
