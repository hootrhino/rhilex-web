import { getNotifyList, putNotifyClear } from '@/services/rulex/zhanneitongzhi';
import { DeleteOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Tag } from 'antd';
import { useRef } from 'react';

export type NotifyLogItem = {
  uuid: string;
  type: string;
  event: string;
  ts: number;
  summary: string;
  info: string;
};

export const typeEnum = {
  info: {
    text: '信息',
    color: 'processing',
  },
  error: {
    text: '错误',
    color: 'error',
  },
  warning: {
    text: '报警',
    color: 'warning',
  },
};

const NotifyLog = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Partial<NotifyLogItem>>[] = [
    {
      title: '类型',
      dataIndex: 'type',
      renderText: (type: string) => <Tag color={typeEnum[type].color}>{typeEnum[type].text}</Tag>,
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

  const { run: clear } = useRequest(() => putNotifyClear(), {
    manual: true,
  });

  return (
    <>
      <PageContainer>
        <ProTable
          rowKey="uuid"
          actionRef={actionRef}
          columns={columns}
          search={false}
          pagination={false}
          request={async () => {
            const { data } = await getNotifyList();

            return Promise.resolve({
              data,
              success: true,
            });
          }}
          toolBarRender={() => [
            <Button type="primary" key="clear" onClick={clear} icon={<DeleteOutlined />}>
              一键清空
            </Button>,
          ]}
        />
      </PageContainer>
    </>
  );
};

export default NotifyLog;
