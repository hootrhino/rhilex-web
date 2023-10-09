import { cn, IconFont } from '@/utils/utils';
import {
  EditOutlined,
  EyeOutlined,
  FundProjectionScreenOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Badge, Button, Dropdown, Image, Space } from 'antd';

import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useRef, useState } from 'react';
import defaultImg from './images/default.png';
import screenImg2 from './images/screen2.png';
import screenImg3 from './images/screen3.png';
import screenImg4 from './images/screen4.png';
import screenImg5 from './images/screen5.png';

type ScreenItem = {
  key: string;
  name: string;
  img?: string;
  status?: string;
};

type GroupDetailProps = React.HTMLAttributes<HTMLDivElement> & {
  activeKey: string;
  data: ScreenItem[];
};

type EditType = 'new' | 'rename' | 'moveToGroup';

const screenData = {
  other: [
    {
      key: 'screen1',
      name: '陕西省货运指数大屏',
      img: defaultImg,
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
    label: '重命名',
    key: 'rename',
  },
  {
    label: '移动到项目分组',
    key: 'moveToGroup',
  },
  {
    label: '删除',
    key: 'remove',
  },
];

const GroupDetail = ({ activeKey, ...props }: GroupDetailProps) => {
  const formRef = useRef<ProFormInstance>();
  const [open, setOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(false);
  const [previewKey, setKey] = useState<string>('');
  const [actionType, setType] = useState<'edit' | 'preview'>('preview');

  const [editType, setEditType] = useState<EditType>('new');

  const getModalTitle = () => {
    let title = '创建大屏';
    switch (editType) {
      case 'new':
        title = '创建大屏';
        break;
      case 'rename':
        title = '重命名';
        break;
      case 'moveToGroup':
        title = '移动到项目分组';
        break;

      default:
        break;
    }

    return title;
  };

  // TODO 创建大屏
  const handleOnCreate = async (values: { name: string; group: string }) => {
    console.log(values);
    // TODO 跳转编辑页面
    const id = '1111';
    window.open(`/screen-mgt/screen/edit/${id}`, '_blank');
    return true;
  };

  const handleOnMenu = (info: MenuInfo, key: string) => {
    // TODO menu
    console.log(key);
    if (['rename', 'moveToGroup'].includes(info.key)) {
      // 重命名
      setOpen(true);
      setEditType(info.key as EditType);
    }
    console.log(info);
  };

  return (
    <>
      <div className="flex flex-wrap items-center" {...props}>
        <div className="min-w-[240px] w-[22.8%] mr-[2%] mb-[24px] h-max rounded">
          <div className="flex justify-center items-center py-[27%] border border-solid border-[#e6e6e6]">
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
              创建大屏
            </Button>
          </div>
        </div>
        {screenData[activeKey]?.map((item: ScreenItem) => (
          <div
            key={item?.key}
            className={cn(
              'min-w-[240px] w-[22.8%] h-max mr-[2%] mb-[24px] rounded bg-[#ededed] border border-solid border-[#e6e6e6] hover:border-[#1f6aff]',
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
                      size="small"
                      icon={<EyeOutlined />}
                      onClick={() => {
                        setType('preview');
                        setKey(item?.key);
                      }}
                    >
                      预览
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => {
                        setType('edit');
                        window.open(`/screen-mgt/screen/edit/${item.key}`, '_blank');
                      }}
                    >
                      编辑
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      icon={
                        <IconFont
                          type="icon-publish"
                          onClick={() => {
                            // TODO 发布
                          }}
                        />
                      }
                    >
                      发布
                    </Button>
                  </Space>
                ),
              }}
            />
            <div className="flex justify-between h-[32px]">
              <Space className="pl-[5px]">
                <FundProjectionScreenOutlined />
                <p className="w-[120px] truncate p-0 m-0">{item?.name}</p>
              </Space>
              <Space className="px-[5px]">
                <Badge
                  status={item?.status === '未发布' ? 'warning' : 'success'}
                  text={item?.status}
                  className="whitespace-nowrap"
                />
                <Dropdown
                  menu={{ items, onClick: (info) => handleOnMenu(info, item.key) }}
                  trigger={['click']}
                >
                  <MoreOutlined style={{ color: '#1677FF' }} />
                </Dropdown>
              </Space>
            </div>
          </div>
        ))}
      </div>
      <ModalForm
        formRef={formRef}
        title={getModalTitle()}
        open={open}
        onOpenChange={(visible) => setOpen(visible)}
        onFinish={handleOnCreate}
        layout="horizontal"
        width="30%"
        modalProps={{ maskClosable: false }}
      >
        {['new', 'rename'].includes(editType) && (
          <ProFormText
            width="md"
            name="name"
            label={editType === 'new' ? '大屏名称' : '请输入新的大屏名称'}
            placeholder={editType === 'new' ? '请输入大屏名称' : '请输入新的大屏名称'}
            rules={[{ required: true, message: '大屏名称不能为空' }]}
          />
        )}
        {['new', 'moveToGroup'].includes(editType) && (
          <ProFormSelect
            width="md"
            name="group"
            label={editType === 'new' ? '项目分组' : '请选择目标项目分组'}
            placeholder={editType === 'new' ? '请选择项目分组' : '请选择目标项目分组'}
            options={[{ label: '未分组', value: 'other' }]}
            rules={[{ required: true, message: '项目分组不能为空' }]}
          />
        )}
      </ModalForm>
    </>
  );
};

export default GroupDetail;
