import { getNotifyPageList } from '@/services/rulex/zhanneitongzhi';
import { BellOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { history, useIntl, useRequest } from '@umijs/max';
import { Badge, Popover } from 'antd';
import dayjs from 'dayjs';
import StateTag, { StateType } from '../StateTag';

const NoticeIcon = () => {
  const { formatMessage } = useIntl();
  const { data } = useRequest(() => getNotifyPageList({ current: 1, size: 5 }));

  const content = (
    <ProList
      rowKey="uuid"
      pagination={false}
      dataSource={data?.records || []}
      footer={
        data?.total && data?.total > 0 ? (
          <div className="cursor-pointer" onClick={() => history.push('/notify-log')}>
            {formatMessage({ id: 'component.button.more' })}
          </div>
        ) : null
      }
      metas={{
        title: {
          dataIndex: 'summary',
          render: (_, { summary }) => <div className="w-[180px] truncate">{summary}</div>,
        },
        description: {
          render: (_, { ts }) => {
            return dayjs(ts).format('YYYY-MM-DD HH:mm:ss');
          },
        },
        actions: {
          render: (_, { type }) => <StateTag state={type || 'DEFAULT'} type={StateType.NOTICE} />,
        },
      }}
      className="notification-list"
    />
  );

  return (
    <Popover
      title={formatMessage({ id: 'component.title.notify' })}
      content={content}
      trigger="hover"
      arrow={false}
      rootClassName="notification-popver"
    >
      <span className="inline cursor-pointer transition-all duration-300 px-[8px]">
        <Badge count={data?.total} rootClassName="notice-badge">
          <BellOutlined
            style={{ color: '#fff', fontSize: 16, padding: 4, verticalAlign: 'middle' }}
          />
        </Badge>
      </span>
    </Popover>
  );
};

export default NoticeIcon;
