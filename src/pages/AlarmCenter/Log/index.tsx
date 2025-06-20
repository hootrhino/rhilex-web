import { message, modal } from '@/components/PopupHack';
import { getDevicesList } from '@/services/rhilex/shebeiguanli';
import {
  deleteAlarmLogClear,
  deleteAlarmLogDel,
  getAlarmLogDetail,
  getAlarmLogList,
  getAlarmRuleList,
} from '@/services/rhilex/yujingzhongxin';
import { defaultPagination } from '@/utils/constant';
import { DeleteOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Link, useIntl, useRequest } from '@umijs/max';
import { Button, Modal, Popconfirm, Tag } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

type AlarmItem = {
  uuid?: string;
  source?: string;
  eventType?: string;
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

  // 清空日志
  const { run: clear } = useRequest(() => deleteAlarmLogClear(), {
    manual: true,
    onSuccess: () => {
      message.success(formatMessage({ id: 'message.success.clear' }));
      actionRef.current?.reload();
    },
  });

  // 获取设备列表
  const { data: allDeviceData } = useRequest(() => getDevicesList({ current: 1, size: 999 }), {
    formatResult: (res) => res?.data?.records,
  });

  const { data: rules } = useRequest(() => getAlarmRuleList({ current: 1, size: 999 }), {
    formatResult: (res) => res.data.records,
  });

  const handleOnClose = () => {
    setOpen(false);
    setActiveKey('');
  };

  const columns: ProColumns<AlarmItem>[] = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
      search: false,
      ellipsis: true,
      width: 150,
    },
    {
      title: formatMessage({ id: 'alarm.table.title.ruleId' }),
      dataIndex: 'ruleId',
      valueType: 'select',
      width: 150,
      fieldProps: {
        placeholder: formatMessage({ id: 'alarm.form.placeholder.ruleId' }),
        options: rules?.map((item) => ({
          label: item.name,
          value: item.uuid,
        })),
      },
      renderText: (ruleId) => {
        if (!ruleId) return '-';

        const rule = rules?.find((item) => item.uuid === ruleId);
        return rule ? <Link to={`/alarm/rule/detail/${ruleId}`}>{rule.name}</Link> : ruleId;
      },
    },
    {
      title: formatMessage({ id: 'alarm.table.title.source' }),
      dataIndex: 'source',
      search: false,
      width: 150,
      renderText: (source) => {
        const includesDevice = allDeviceData?.map((device) => device.uuid).includes(source);
        const matchDevice = allDeviceData?.find((device) => device.uuid === source);
        const result = includesDevice ? (
          <Link to={`/device/${matchDevice?.gid}/detail/${source}`}>{matchDevice?.name}</Link>
        ) : (
          source
        );

        return result || '-';
      },
    },
    {
      title: formatMessage({ id: 'alarm.table.title.eventType' }),
      dataIndex: 'eventType',
      search: false,
      ellipsis: true,
      renderText: (eventType) => {
        return eventType ? <Tag color="processing">{eventType}</Tag> : '-';
      },
    },
    {
      title: formatMessage({ id: 'alarm.table.title.summary' }),
      dataIndex: 'summary',
      search: false,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'alarm.table.title.info' }),
      dataIndex: 'info',
      hideInTable: true,
      search: false,
      valueType: 'jsonCode',
    },
    {
      title: formatMessage({ id: 'alarm.table.title.ts' }),
      dataIndex: 'ts',
      search: false,
      ellipsis: true,
      width: 180,
      renderText: (ts) => (ts ? dayjs(ts).format('YYYY-MM-DD HH:mm:ss') : '-'),
    },
    {
      title: formatMessage({ id: 'table.title.option' }),
      width: 100,
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
    <>
      <ProTable
        rowKey="uuid"
        actionRef={actionRef}
        columns={columns}
        rootClassName="stripe-table"
        pagination={defaultPagination}
        request={async ({
          current = defaultPagination.defaultCurrent,
          pageSize = defaultPagination.defaultPageSize,
          ruleId,
        }) => {
          const params = {
            current,
            size: pageSize,
            ruleId,
          };
          const { data } = await getAlarmLogList(params);

          return Promise.resolve({
            data: data.records,
            total: data.total || 0,
            success: true,
          });
        }}
        toolBarRender={() => [
          <Button
            ghost
            danger
            type="primary"
            icon={<DeleteOutlined />}
            key="clear"
            onClick={() =>
              modal.confirm({
                title: formatMessage({ id: 'alarm.modal.title.clear' }),
                onOk: clear,
                okText: formatMessage({ id: 'button.ok' }),
                cancelText: formatMessage({ id: 'button.cancel' }),
              })
            }
          >
            {formatMessage({ id: 'alarm.button.clear' })}
          </Button>,
        ]}
      />
      <Modal
        destroyOnClose
        title={formatMessage({ id: 'alarm.modal.title.detail' })}
        open={open}
        width="40%"
        styles={{ body: { height: 600, overflowY: 'scroll' } }}
        onCancel={handleOnClose}
        maskClosable={false}
        footer={
          <Button type="primary" onClick={handleOnClose}>
            {formatMessage({ id: 'button.close' })}
          </Button>
        }
      >
        <ProDescriptions
          column={1}
          labelStyle={{ width: 100, justifyContent: 'end' }}
          rootClassName="alarm-log-detail"
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
    </>
  );
};

export default AlarmLog;
