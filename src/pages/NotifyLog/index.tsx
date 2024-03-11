import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import { getNotifyList, putNotifyClear, putNotifyRead } from '@/services/rulex/zhanneitongzhi';
import { ClearOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { Button, Tag } from 'antd';
import { useRef } from 'react';

export type NotifyLogItem = {
  uuid: string;
  type: string;
  event: string;
  ts: number;
  summary: string;
  info: string;
  status: number;
};

export const typeEnum = {
  INFO: {
    text: '信息',
    color: 'processing',
  },
  ERROR: {
    text: '错误',
    color: 'error',
  },
  WARNING: {
    text: '报警',
    color: 'warning',
  },
};

const NotifyLog = () => {
  const actionRef = useRef<ActionType>();
  const { refresh } = useModel('useNotify');

  const handleOnSuccess = () => {
    actionRef.current?.reload();
    refresh();
    message.success('设置成功');
  }

  // 已读
  const { run: read } = useRequest((params: API.putNotifyReadParams) => putNotifyRead(params), {
    manual: true,
    onSuccess: () => handleOnSuccess(),
  });

  // 全部已读
  const { run: clear } = useRequest(() => putNotifyClear(), {
    manual: true,
    onSuccess: () => handleOnSuccess()
  });

  const columns: ProColumns<Partial<NotifyLogItem>>[] = [
    {
      title: '事件',
      dataIndex: 'event',
    },
    {
      title: '类型',
      dataIndex: 'type',
      renderText: (type: string) => <Tag color={typeEnum[type].color}>{typeEnum[type].text}</Tag>,
    },
    {
      title: '概览',
      dataIndex: 'summary',
      ellipsis: true,
    },
    {
      title: '时间',
      dataIndex: 'ts',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 80,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a key="read" onClick={() => uuid && read({ uuid })}>
          设置已读
        </a>,
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
            <Button type="primary" key="clear" onClick={clear} icon={<ClearOutlined />}>
              全部已读
            </Button>,
          ]}
          expandable={{
            expandedRowRender: ({ info }) => (
              <>
                <div>日志详情:</div>
                <div>{info}</div>
              </>
            ),
          }}
        />
      </PageContainer>
    </>
  );
};

export default NotifyLog;
