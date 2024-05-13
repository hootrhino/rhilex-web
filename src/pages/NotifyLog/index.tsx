import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import StateTag, { StateType } from '@/components/StateTag';
import { putNotifyClear, putNotifyRead } from '@/services/rulex/zhanneitongzhi';
import { CalendarOutlined, SettingOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Checkbox, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';
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
    message.success(formatMessage({ id: 'notifyLog.message.success' }));
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

  useEffect(() => {
    run();
  }, []);

  return (
    <>
      <PageContainer header={{ title: formatMessage({ id: 'menu.notifyLog' }) }}>
        <ProList<NotifyLogItem>
          rowKey="uuid"
          toolBarRender={() => {
            return [
              <Button type="primary" key="clear" onClick={clear} icon={<SettingOutlined />}>
                {formatMessage({ id: 'notifyLog.button.clear' })}
              </Button>,
            ];
          }}
          dataSource={data as NotifyLogItem[]}
          metas={{
            title: {
              dataIndex: 'event',
            },
            avatar: {
              render: (_dom, { uuid }) => (
                <Tooltip title={formatMessage({ id: 'notifyLog.tooltip.clear' })}>
                  <Checkbox onChange={() => uuid && read({ uuid })} />
                </Tooltip>
              ),
            },
            subTitle: {
              render: (_dom, { type }) => {
                return <StateTag state={type || 'INFO'} type={StateType.NOTICE} />;
              },
            },
            description: {
              dataIndex: 'info',
            },
            actions: {
              render: (_dom, { ts }) => {
                return (
                  <Space>
                    <CalendarOutlined />
                    <span>{dayjs(ts).format('YYYY-MM-DD HH:mm:ss')}</span>
                  </Space>
                );
              },
            },
          }}
        />
      </PageContainer>
    </>
  );
};

export default NotifyLog;
