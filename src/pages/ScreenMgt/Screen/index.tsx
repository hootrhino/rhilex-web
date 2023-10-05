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
import screenImg1 from './images/screen1.png';
import screenImg2 from './images/screen2.png';
import screenImg3 from './images/screen3.png';
import screenImg4 from './images/screen4.png';
import screenImg5 from './images/screen5.png';

import { modal } from '@/components/PopupHack';
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
      img: screenImg1,
      status: '已发布',
    },
    {
      key: 'screen2',
      name: '工业设备资产状态监控',
      img: screenImg2,
      status: '未发布',
    },
    {
      key: 'screen3',
      name: '2021年五一假期全国旅游市场观测',
      img: screenImg3,
      status: '已发布',
    },
    {
      key: 'screen4',
      name: '智能工厂监控',
      img: screenImg4,
      status: '未发布',
    },
    {
      key: 'screen5',
      name: '地区新能源业务展示大屏',
      img: screenImg5,
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

  // 创建大屏
  const handleOnNew = () => {
    modal.info({
      content: '大屏编辑器正在开发中，敬请期待！',
    });
  };

  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard
          headerBordered
          title="项目分组"
          colSpan="270px"
          extra={
            <Button
              size="small"
              key="add"
              type="primary"
              icon={<PlusOutlined />}
              className="cursor-not-allowed"
            >
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
                render: () => (
                  <Space size="middle">
                    <Tooltip title="重命名分组">
                      <a key="edit" className="cursor-not-allowed">
                        <EditOutlined />
                      </a>
                    </Tooltip>
                    <Tooltip title="删除分组">
                      <a key="delete" className="cursor-not-allowed">
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
                <Button type="primary" icon={<PlusOutlined />} onClick={handleOnNew}>
                  {/* <Link to="/screen-mgt/screen/new" target="_blank">
                    创建大屏
                  </Link> */}
                  创建大屏
                </Button>
              </div>
            </div>
            {screenData[actionGroup]?.map((item: ScreenItem) => (
              <div
                key={item?.key}
                className={cn(
                  'min-w-[240px] w-[22.8%] h-max mr-[2%] mb-[24px] rounded bg-[#ededed]',
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
                          className="cursor-not-allowed"
                          // onClick={() => setType('edit')}
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
                      className="whitespace-nowrap"
                    />
                    <Dropdown menu={{ items }} trigger={['click']} disabled>
                      <MoreOutlined style={{ color: '#1677FF', cursor: 'not-allowed' }} />
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
