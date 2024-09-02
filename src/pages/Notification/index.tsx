import { message, modal } from '@/components/PopupHack';
import PageContainer from '@/components/ProPageContainer';
import ProTag, { StatusType } from '@/components/ProTag';
import { getNotifyPageList, putNotifyClear, putNotifyRead } from '@/services/rhilex/zhanneitongzhi';
import { defaultPagination } from '@/utils/constant';
import { CalendarOutlined, ClearOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Popconfirm, Space } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';

export type NotificationItem = {
  uuid?: string;
  type?: string;
  event?: string;
  ts?: number;
  summary?: string;
  info?: string;
  status?: number;
};

const Notification = () => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
  const { refresh } = useModel('useNotify');

  const handleOnSuccess = () => {
    actionRef.current?.reload();
    refresh();
    message.success(formatMessage({ id: 'notification.message.success' }));
  };

  // 清除
  const { run: clear } = useRequest((params: API.putNotifyReadParams) => putNotifyRead(params), {
    manual: true,
    onSuccess: () => handleOnSuccess(),
  });

  // 全部清除
  const { run: clearAll } = useRequest(() => putNotifyClear(), {
    manual: true,
    onSuccess: () => handleOnSuccess(),
  });

  const toolBarRender = () => [
    <Button
      type="primary"
      key="clearAll"
      onClick={() =>
        modal.confirm({
          title: formatMessage({ id: 'notification.modal.title.clearAll' }),
          content: formatMessage({ id: 'notification.modal.content.clearAll' }),
          okText: formatMessage({ id: 'button.ok' }),
          cancelText: formatMessage({ id: 'button.cancel' }),
          onOk: clearAll,
        })
      }
      icon={<ClearOutlined />}
    >
      {formatMessage({ id: 'notification.button.clearAll' })}
    </Button>,
  ];

  const renderAction = (_dom: React.ReactNode, { ts, uuid }: NotificationItem) => [
    <Space key="time">
      <CalendarOutlined />
      <span>{dayjs(ts).format('YYYY-MM-DD HH:mm:ss')}</span>
    </Space>,
    <Popconfirm
      title={formatMessage({ id: 'notification.modal.title.clear' })}
      onConfirm={async () => uuid && clear({ uuid })}
      key="clear"
    >
      <a className="pl-[16px]">{formatMessage({ id: 'button.remove' })}</a>
    </Popconfirm>,
  ];

  return (
    <PageContainer header={{ title: formatMessage({ id: 'menu.notification' }) }}>
      <ProList<NotificationItem>
        rowKey="uuid"
        actionRef={actionRef}
        request={async ({ current = defaultPagination.defaultCurrent, pageSize = 8 }) => {
          const { data } = await getNotifyPageList({ current, size: pageSize });

          return Promise.resolve({
            data: data?.records || [],
            success: true,
            total: data?.total || 0,
          });
        }}
        metas={{
          title: {
            dataIndex: 'event',
          },
          subTitle: {
            render: (_dom, { type }) => (
              <ProTag type={StatusType.NOTICE}>{type || 'DEFAULT'}</ProTag>
            ),
          },
          description: {
            dataIndex: 'info',
          },
          actions: {
            render: renderAction,
          },
        }}
        toolBarRender={toolBarRender}
        pagination={{
          ...defaultPagination,
          defaultPageSize: 8,
        }}
      />
    </PageContainer>
  );
};

export default Notification;
