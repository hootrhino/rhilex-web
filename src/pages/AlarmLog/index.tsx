import { message } from '@/components/PopupHack';
import PageContainer from '@/components/ProPageContainer';
import {
  deleteAlarmLogDel,
  getAlarmLogDetail,
  getAlarmLogList,
} from '@/services/rhilex/yujingzhongxin';
import { defaultPagination } from '@/utils/constant';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions, ProTable } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Button, Modal, Popconfirm } from 'antd';
import { useRef, useState } from 'react';

type AlarmItem = {
  uuid?: string;
  source?: string;
  type?: string;
  event?: string;
  ts?: number;
  summary?: string;
  info?: string;
};

const AlarmLog = () => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>('');

  // 删除
  const { run: remove } = useRequest(
    (params: API.deleteAlarmLogDelParams) => deleteAlarmLogDel(params),
    {
      manual: true,
      onSuccess: () => {
        message.success(formatMessage({ id: 'message.success.remove' }));
        actionRef.current?.reload();
      },
    },
  );

  const handleOnClose = () => {
    setOpen(false);
    setActiveKey('');
  };

  const columns: ProColumns<AlarmItem>[] = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
    },
    {
      title: formatMessage({ id: 'table.title.type' }),
      dataIndex: 'type',
    },
    {
      title: formatMessage({ id: 'alarm.table.title.event' }),
      dataIndex: 'event',
    },
    {
      title: formatMessage({ id: 'alarm.table.title.summary' }),
      dataIndex: 'summary',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'alarm.table.title.info' }),
      dataIndex: 'info',
      hideInTable: true,
    },
    {
      title: formatMessage({ id: 'alarm.table.title.ts' }),
      dataIndex: 'ts',
      valueType: 'dateTime',
    },
    {
      title: formatMessage({ id: 'table.title.option' }),
      width: 150,
      key: 'option',
      hideInDescriptions: true,
      valueType: 'option',
      render: (_, { uuid }) => [
        <a
          key="detail"
          onClick={() => {
            if (!uuid) return;
            setActiveKey(uuid);
            setOpen(true);
          }}
        >
          {formatMessage({ id: 'button.detail' })}
        </a>,

        <Popconfirm
          title={formatMessage({ id: 'alarm.popconfirm.title.remove' })}
          onConfirm={() => uuid && remove({ uuid })}
          okText={formatMessage({ id: 'button.yes' })}
          cancelText={formatMessage({ id: 'button.no' })}
          key="remove"
        >
          <a>{formatMessage({ id: 'button.remove' })}</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="uuid"
        search={false}
        actionRef={actionRef}
        columns={columns}
        rootClassName="stripe-table"
        request={async ({
          current = defaultPagination.defaultCurrent,
          pageSize = defaultPagination.defaultPageSize,
        }) => {
          const { data } = await getAlarmLogList({ current, size: pageSize });

          return Promise.resolve({
            data: data.records,
            total: data.total || 0,
            success: true,
          });
        }}
      />
      <Modal
        destroyOnClose
        title={formatMessage({ id: 'alarm.modal.title.detail' })}
        open={open}
        width="50%"
        onCancel={handleOnClose}
        maskClosable={false}
        footer={
          <Button type="primary" onClick={handleOnClose}>
            {formatMessage({ id: 'button.close' })}
          </Button>
        }
      >
        <ProDescriptions
          columns={columns as ProDescriptionsItemProps<Record<string, any>, AlarmItem>[]}
          request={async () => {
            const { data } = await getAlarmLogDetail({ uuid: activeKey });
            return Promise.resolve({
              success: true,
              data,
            });
          }}
        />
      </Modal>
    </PageContainer>
  );
};

export default AlarmLog;
