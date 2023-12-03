import { IconFont } from '@/utils/utils';
import { GithubFilled } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Badge, Popover, Tag } from 'antd';
import Avatar from './AvatarDropdown';

import { getNotifyHeader } from '@/services/rulex/zhanneitongzhi';
import { ProList } from '@ant-design/pro-components';
import './index.less';
import { typeEnum } from '@/pages/NotifyLog';

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
          render: (_, {type}) => {
            return type && <Tag color={typeEnum[type].color}>{typeEnum[type].text}</Tag>
          },
        },
      }}
      className="notification-list"
    />
  );

  return (
    <div className="flex justify-end items-center">
      <Popover content={content} trigger="hover" arrow={false} rootClassName="notification-popver">
        <Badge dot={true}>
          <IconFont type="icon-notification" className="text-[24px] cursor-pointer opacity-[0.8]" />
        </Badge>
      </Popover>
      <GithubFilled
        style={{
          fontSize: 24,
          color: 'rgba(255, 255, 255, 0.95)',
          height: 56,
          cursor: 'pointer',
          padding: '0 4px 0 12px',
        }}
        onClick={() => {
          const w = window.open('about:blank');
          if (!w) return;
          w.location.href = 'https://github.com/hootrhino';
        }}
      />
      <Avatar />
    </div>
  );
};
export default GlobalHeaderRight;
