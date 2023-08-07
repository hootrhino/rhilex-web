import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FolderOpenOutlined,
  FundProjectionScreenOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard, ProList } from '@ant-design/pro-components';
import type { MenuProps } from 'antd';
import { Badge, Button, Dropdown, Image, Space, Tooltip } from 'antd';
import { useState } from 'react';

import { cn } from '@/utils/utils';
import { Link } from '@umijs/max';
import './index.less';

type GroupItem = {
  key: string;
  name: string;
};

type ScreenItem = {
  key: string;
  name: string;
  img?: string;
  status?: string;
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
      name: '陕西省货运指数大屏',
      img: 'https://img.alicdn.com/imgextra/i4/O1CN011A1YqV1D2POgg2Sda_!!6000000000158-2-tps-616-345.png',
      status: '已发布',
    },
    {
      key: 'screen2',
      name: '工业设备资产状态监控',
      img: 'https://img.alicdn.com/imgextra/i4/O1CN01rv4TUP1SlUXFqr9zV_!!6000000002287-2-tps-560-318.png',
      status: '未发布',
    },
    {
      key: 'screen3',
      name: '2021年五一假期全国旅游市场观测',
      img: 'https://img.alicdn.com/imgextra/i4/O1CN01CDzXBZ1MDFHDovjMG_!!6000000001400-2-tps-560-316.png',
      status: '已发布',
    },
    {
      key: 'screen4',
      name: '智能工厂监控',
      img: 'https://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/1084d7bb3280a49a2b0c7be914925cd9.png',
      status: '未发布',
    },
    {
      key: 'screen5',
      name: '地区新能源业务展示大屏',
      img: 'https://img.alicdn.com/imgextra/i3/O1CN01rAJNR223jKPwKPdMz_!!6000000007291-2-tps-560-316.png',
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
  const [preview, setPreview] = useState<boolean>(false);
  const [actionType, setType] = useState<'edit' | 'preview'>('preview');
  const [previewKey, setKey] = useState<string>('');

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
                      <a
                        key="edit"
                        onClick={() => {
                          // TODO 重命名
                          console.log(row);
                        }}
                      >
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
          <div className="flex flex-wrap items-center">
            <div className="min-w-[240px] w-[22.8%] mr-[2%] mb-[24px] h-max rounded">
              <div
                className="flex justify-center items-center py-[27%]"
                style={{ border: '1px solid #e6e6e6' }}
              >
                <Button type="primary" icon={<PlusOutlined />}>
                  <Link to="/screen-mgt/screen/new" target="_blank">
                    创建大屏
                  </Link>
                </Button>
              </div>
            </div>
            {screenData[actionGroup]?.map((item: ScreenItem) => (
              <div
                key={item?.key}
                className={cn(
                  'min-w-[240px] w-[22.8%] h-max border-transparent hover:border-blue-500 border-solid border-2 mr-[2%] mb-[24px] rounded bg-[#ededed]',
                )}
              >
                <Image
                  width="100%"
                  alt="缩略图"
                  src={item?.img}
                  preview={{
                    visible: actionType === 'preview' && preview && previewKey === item?.key,
                    onVisibleChange: (value) => setPreview(value),
                    mask: (
                      <Space align="center">
                        <Button
                          type="primary"
                          icon={<EditOutlined />}
                          onClick={() => setType('edit')}
                        >
                          编辑
                        </Button>
                        <Button
                          icon={<EyeOutlined />}
                          onClick={() => {
                            setType('preview');
                            setKey(item?.key);
                          }}
                        >
                          预览
                        </Button>
                      </Space>
                    ),
                  }}
                />
                <div className="flex justify-between h-[32px]">
                  <Space className="pl-[5px]">
                    <FundProjectionScreenOutlined />
                    <p className="w-[150px] truncate p-0 m-0">{item?.name}</p>
                  </Space>
                  <Space className="pr-[5px]">
                    <Badge
                      status={item?.status === '未发布' ? 'warning' : 'success'}
                      text={item?.status}
                    />
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
