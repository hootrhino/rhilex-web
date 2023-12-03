import { BellOutlined, GithubFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Badge, Popover, Tag } from 'antd';
import Avatar from './AvatarDropdown';

import { typeEnum } from '@/pages/NotifyLog';
import { getNotifyHeader } from '@/services/rulex/zhanneitongzhi';
import { ProList } from '@ant-design/pro-components';
import './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const content = (
    <ProList
      rowKey="uuid"
      headerTitle="站内日志通知"
      pagination={false}
      footer={
        <div className="cursor-pointer" onClick={() => history.push('/notify-log')}>
          查看更多
        </div>
      }
      request={async () => {
        const { data } = await getNotifyHeader();

        return Promise.resolve({
          data,
          success: true,
        });
      }}
      metas={{
        title: {
          dataIndex: 'summary',
        },
        description: {
          dataIndex: 'ts',
        },
        subTitle: {
          render: (_, { type }) => {
            return type && <Tag color={typeEnum[type].color}>{typeEnum[type].text}</Tag>;
          },
        },
      }}
      className="notification-list"
    />
  );

  return (
    <div className="flex justify-end items-center">
      <span
        className="cursor-pointer px-[12px] transition-all duration-300 hover:bg-[#32393F]"
        onClick={() => {
          window.open('http://www.hootrhino.com');
        }}
      >
        <QuestionCircleOutlined style={{ color: '#fff', fontSize: 16, verticalAlign: 'middle' }} />
      </span>
      <Popover content={content} trigger="hover" arrow={false} rootClassName="notification-popver">
        <span className="inline cursor-pointer transition-all duration-300 px-[8px]">
          <Badge count={11} className="shadow-none text-[16px]">
            <BellOutlined
              style={{ color: '#fff', fontSize: 16, padding: 4, verticalAlign: 'middle' }}
            />
          </Badge>
        </span>
      </Popover>

      <Avatar />
      <GithubFilled
        style={{
          fontSize: 20,
          color: 'rgba(255, 255, 255, 0.95)',
        }}
        className="cursor-pointer pl-[12px] pr-[12px] h-[56px] hover:bg-[#32393F]"
        onClick={() => window.open('https://github.com/hootrhino')}
      />
    </div>
  );
};
export default GlobalHeaderRight;
