import { BellOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { history, useIntl, useModel } from '@umijs/max';
import { Badge, Popover } from 'antd';
import dayjs from 'dayjs';
import ProTag, { StatusType } from '../ProTag';

const NoticeIcon = () => {
  const { formatMessage } = useIntl();
  const { data } = useModel('useNotify');

  const content = (
    <ProList
      rowKey="uuid"
      pagination={false}
      dataSource={data?.records || []}
      footer={
        data?.total && data?.total > 5 ? (
          <div className="cursor-pointer" onClick={() => history.push('/notification')}>
            <a>{formatMessage({ id: 'component.button.more' })}</a>
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
          render: (_, { type }) => <ProTag type={StatusType.NOTICE}>{type || 'DEFAULT'}</ProTag>
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
