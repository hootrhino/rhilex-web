import { BellOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Badge, Popover } from 'antd';
import dayjs from 'dayjs';
import StateTag from '../StateTag';

const NoticeIcon = () => {
  const { data } = useModel('useNotify');

  const content = (
    <ProList
      rowKey="uuid"
      headerTitle="站内日志通知"
      pagination={false}
      footer={
        data && data?.length > 0 ? (
          <div className="cursor-pointer" onClick={() => history.push('/notify-log')}>
            查看更多
          </div>
        ) : null
      }
      dataSource={data}
      metas={{
        title: {
          dataIndex: 'summary',
        },
        description: {
          render: (_, { ts }) => {
            return dayjs(ts).format('YYYY-MM-DD HH:mm:ss');
          },
        },
        subTitle: {
          render: (_, { type }) => <StateTag state={type || 'INFO'} type="notice" />,
        },
      }}
      className="notification-list"
    />
  );

  return (
    <Popover content={content} trigger="hover" arrow={false} rootClassName="notification-popver">
      <span className="inline cursor-pointer transition-all duration-300 px-[8px]">
        <Badge count={data?.length} rootClassName="notice-badge">
          <BellOutlined
            style={{ color: '#fff', fontSize: 16, padding: 4, verticalAlign: 'middle' }}
          />
        </Badge>
      </span>
    </Popover>
  );
};

export default NoticeIcon;
