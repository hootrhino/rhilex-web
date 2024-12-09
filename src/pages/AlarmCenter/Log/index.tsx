import { message } from '@/components/PopupHack';
import { getDevicesList } from '@/services/rhilex/shebeiguanli';
import {
  deleteAlarmLogDel,
  getAlarmLogDetail,
  getAlarmLogList,
  getAlarmRuleList,
} from '@/services/rhilex/yujingzhongxin';
import { defaultPagination } from '@/utils/constant';
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Link, useIntl, useRequest } from '@umijs/max';
import { Button, Modal, Popconfirm, Tag } from 'antd';
import { useRef, useState } from 'react';

enum LogType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

type AlarmItem = {
  uuid?: string;
  source?: string;
  type?: string;
  event?: string;
  ts?: number;
  summary?: string;
  info?: string;
};

const typeTag = {
  [LogType.INFO]: {
    color: 'processing',
    icon: <InfoCircleOutlined />,
  },
  [LogType.WARNING]: {
    color: 'warning',
    icon: <ExclamationCircleOutlined />,
  },
  [LogType.ERROR]: {
    color: 'error',
    icon: <CloseCircleOutlined />,
  },
  [LogType.FATAL]: {
    color: 'error',
    icon: <WarningOutlined />,
  },
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

  // 获取设备列表
  const { data: allDeviceData } = useRequest(() => getDevicesList({ current: 1, size: 999 }), {
    formatResult: (res) => res?.data?.records,
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
    },
    {
      title: formatMessage({ id: 'table.title.type' }),
      dataIndex: 'type',
      search: false,
      renderText: (type) => {
        const matchType = Object.keys(LogType).includes(type);
        return type ? (
          <Tag
            color={matchType ? typeTag[type].color : 'default'}
            icon={matchType ? typeTag[type].icon : ''}
          >
            {type}
          </Tag>
        ) : (
          '-'
        );
      },
    },
    {
      title: formatMessage({ id: 'alarm.table.title.event' }),
      dataIndex: 'event',
      search: false,
      ellipsis: true,
      renderText: (event) => event || '-',
    },
    {
      title: formatMessage({ id: 'alarm.table.title.ruleId' }),
      dataIndex: 'ruleId',
      fieldProps: { placeholder: formatMessage({ id: 'alarm.form.placeholder.ruleId' }) },
      request: async () => {
        const { data } = await getAlarmRuleList({ current: 1, size: 999 });

        return data?.records?.map((item) => ({
          label: item.name,
          value: item.uuid,
        }));
      },
    },
    {
      title: formatMessage({ id: 'alarm.table.title.source' }),
      dataIndex: 'source',
      search: false,
      renderText: (source) => {
        const includesDevice = allDeviceData?.map((device) => device.uuid).includes(source);
        const matchDevice = allDeviceData?.find((device) => device.uuid === source);

        return includesDevice ? (
          <Link to={`/device/${matchDevice?.gid}/detail/${source}`}>{matchDevice?.name}</Link>
        ) : (
          source
        );
      },
    },
    {
      title: formatMessage({ id: 'alarm.table.title.summary' }),
      dataIndex: 'summary',
      hideInTable: true,
      search: false,
    },
    {
      title: formatMessage({ id: 'alarm.table.title.info' }),
      dataIndex: 'info',
      hideInTable: true,
      search: false,
    },
    {
      title: formatMessage({ id: 'alarm.table.title.ts' }),
      dataIndex: 'ts',
      valueType: 'dateTime',
      search: false,
      ellipsis: true,
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
      />
      <Modal
        destroyOnClose
        title={formatMessage({ id: 'alarm.modal.title.detail' })}
        open={open}
        width="35%"
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
