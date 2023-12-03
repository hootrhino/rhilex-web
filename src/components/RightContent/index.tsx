import { IconFont } from '@/utils/utils';
import { GithubFilled } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Badge, List, Popover } from 'antd';
import Avatar from './AvatarDropdown';

import './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  const content = (
    <List
      header={<div>站内日志通知</div>}
      footer={
        data?.length > 0 ? (
          <div className="cursor-pointer" onClick={() => history.push('/notify-log')}>
            查看更多
          </div>
        ) : null
      }
      dataSource={data}
      className="min-w-[250px]"
      renderItem={(item) => (
        <List.Item style={{ paddingInline: 0, paddingTop: 4, paddingBottom: 4 }}>
          <List.Item.Meta
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications"
          />
        </List.Item>
      )}
    />
  );

  return (
    <div className="flex justify-end items-center">
      <Popover content={content} trigger="hover" arrow={false} rootClassName="notification-popver">
        <Badge dot={data?.length > 0 ? true : false}>
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
