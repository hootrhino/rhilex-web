import {
  DeleteOutlined,
  EditOutlined,
  FolderOpenOutlined,
  FundProjectionScreenOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard, ProList } from '@ant-design/pro-components';
import type { MenuProps } from 'antd';
import { Badge, Button, Dropdown, Space, Tooltip } from 'antd';
import { useState } from 'react';

import './index.less';

type GroupItem = {
  key: string;
  name: string;
};

type ScreenItem = {
  key: string;
  name: string;
  img: string;
  status: string;
};

const groupData = [
  {
    key: 'other',
    name: '未分组未分组未分组未分组',
  },
];

const screenData = {
  other: [
    {
      key: 'screen1',
      name: '测试大屏',
      img: 'https://img.alicdn.com/imgextra/i4/O1CN01QtqDmp1ZuNeUbxBjW_!!6000000003254-0-tps-576-324.jpg',
      status: '未发布',
    },
  ],
};

const items: MenuProps['items'] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

const Screen = () => {
  const [actionGroup, setActionGroup] = useState<string>('other');

  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard
          headerBordered
          title="项目分组"
          colSpan="270px"
          extra={
            <Button size="small" key="add" type="primary" icon={<PlusOutlined />}>
              新建
            </Button>
          }
          headStyle={{ paddingInline: 16 }}
          bodyStyle={{ paddingInline: 16 }}
        >
          <ProList<any>
            toolBarRender={false}
            onRow={(record: GroupItem) => {
              return {
                onMouseEnter: () => {
                  console.log(record);
                },
                onClick: () => {
                  setActionGroup(record.key);
                },
              };
            }}
            rowKey="key"
            headerTitle={false}
            dataSource={groupData}
            rowClassName={(item: GroupItem) => (item?.key === actionGroup ? 'active-group' : '')}
            metas={{
              title: {
                dataIndex: 'name',
                render: (dom) => {
                  return <div className="w-[120px] truncate">{dom}</div>;
                },
              },
              avatar: {
                render: () => <FolderOpenOutlined className="pl-[10px]" />,
              },
              actions: {
                render: (_, row) => (
                  <Space size="middle">
                    <Tooltip title="重命名分组">
                      <a key="edit" onClick={() => console.log(row)}>
                        <EditOutlined />
                      </a>
                    </Tooltip>
                    <Tooltip title="删除分组">
                      <a key="delete">
                        <DeleteOutlined />
                      </a>
                    </Tooltip>
                  </Space>
                ),
              },
            }}
          />
        </ProCard>
        <ProCard>
          <div className="min-h-[700px]">
            {screenData[actionGroup]?.map((item: ScreenItem) => (
              <div
                key={item?.key}
                className="min-w-[240px] w-[22.8%] border-transparent hover:border-blue-500 border-solid border-2"
              >
                <img alt="缩略图" src={item?.img} className="w-full" />
                <div className="flex justify-between h-[32px]">
                  <Space className="pl-[5px]">
                    <FundProjectionScreenOutlined />
                    <span>{item?.name}</span>
                  </Space>
                  <Space className="pr-[5px]">
                    <Badge status="warning" text={item?.status} />
                    <Dropdown menu={{ items }} trigger={['click']}>
                      <a onClick={(e) => e.preventDefault()}>
                        <MoreOutlined />
                      </a>
                    </Dropdown>
                  </Space>
                </div>
              </div>
            ))}
          </div>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default Screen;
