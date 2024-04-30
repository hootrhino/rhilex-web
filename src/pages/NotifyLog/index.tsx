import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import StateTag, { StateType } from '@/components/StateTag';
import { putNotifyClear, putNotifyRead } from '@/services/rulex/zhanneitongzhi';
import { ClearOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Button } from 'antd';
import { useEffect } from 'react';

export type NotifyLogItem = {
  uuid: string;
  type: string;
  event: string;
  ts: number;
  summary: string;
  info: string;
  status: number;
};

const NotifyLog = () => {
  const { refresh, data, run } = useModel('useNotify');
  const { formatMessage } = useIntl();

  const handleOnSuccess = () => {
    refresh();
    message.success('设置成功');
  };

  // 已读
  const { run: read } = useRequest((params: API.putNotifyReadParams) => putNotifyRead(params), {
    manual: true,
    onSuccess: () => handleOnSuccess(),
  });

  // 全部已读
  const { run: clear } = useRequest(() => putNotifyClear(), {
    manual: true,
    onSuccess: () => handleOnSuccess(),
  });

  const columns: ProColumns<Partial<NotifyLogItem>>[] = [
    {
      title: '事件',
      dataIndex: 'event',
    },
    {
      title: '类型',
      dataIndex: 'type',
      renderText: (type: string) => <StateTag state={type || 'INFO'} type={StateType.NOTICE} />,
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
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      key: 'option',
      width: 80,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a key="read" onClick={() => uuid && read({ uuid })}>
          已读
        </a>,
      ],
    },
  ];

  useEffect(() => {
    run();
  }, []);

  return (
    <>
      <PageContainer>
        <ProTable
          rowKey="uuid"
          columns={columns}
          search={false}
          pagination={false}
          dataSource={data}
          options={{ reload: refresh }}
          toolBarRender={() => [
            <Button type="primary" key="clear" onClick={clear} icon={<ClearOutlined />}>
              全部已读
            </Button>,
          ]}
          expandable={{
            expandedRowRender: ({ info }: any) => (
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
