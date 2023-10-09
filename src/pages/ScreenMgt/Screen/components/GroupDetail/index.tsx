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

import { deleteVisual, postVisualCreate, putVisualCreate } from '@/services/rulex/dapingguanli';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useRef, useState } from 'react';
import { GroupItem } from '../..';
import defaultImg from './images/default.png';
// import screenImg2 from './images/screen2.png';
// import screenImg3 from './images/screen3.png';
// import screenImg4 from './images/screen4.png';
// import screenImg5 from './images/screen5.png';
import { message } from '@/components/PopupHack';
import { useRequest } from '@umijs/max';

type ScreenItem = {
  uuid: string;
  name: string;
  thumbnail: string;
  status: string;
};

type GroupDetailProps = React.HTMLAttributes<HTMLDivElement> & {
  list: ScreenItem[];
  group: GroupItem[];
  reload: () => void;
};

type EditType = 'new' | 'rename' | 'moveToGroup';

type Update = {
  gid: string;
  name: string;
  type: string;
  content: string;
  thumbnail: string;
};

// const screenData = {
//   other: [
//     {
//       key: 'screen1',
//       name: '陕西省货运指数大屏',
//       img: defaultImg,
//       status: '已发布',
//     },
//     {
//       key: 'screen2',
//       name: '工业设备资产状态监控',
//       img: screenImg2,
//       status: '未发布',
//     },
//     {
//       key: 'screen3',
//       name: '2021年五一假期全国旅游市场观测',
//       img: screenImg3,
//       status: '已发布',
//     },
//     {
//       key: 'screen4',
//       name: '智能工厂监控',
//       img: screenImg4,
//       status: '未发布',
//     },
//     {
//       key: 'screen5',
//       name: '地区新能源业务展示大屏',
//       img: screenImg5,
//       status: '未发布',
//     },
//   ],
// };

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

const GroupDetail = ({ group, reload, list, ...props }: GroupDetailProps) => {
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

  // 创建大屏
  const { run: create } = useRequest((params: Update) => postVisualCreate(params), {
    manual: true,
    onSuccess: (data) => {
      setOpen(false);
      reload();
      window.open(`/screen-mgt/screen/edit/${data?.uuid}`, '_blank');
    },
  });

  // 更新大屏
  const { run: update } = useRequest(
    (params: Update & { uuid: string }) => putVisualCreate(params),
    {
      manual: true,
      onSuccess: () => {
        message.success('更新成功');
      },
    },
  );

  const handleOnFinish = async (values: { name: string; gid: string }) => {
    if (editType === 'new') {
      create({ ...values, type: 'BUILDIN', content: '', thumbnail: '' });
    } else {
      update({ ...values, type: 'BUILDIN', content: '', uuid: '', thumbnail: '' });
    }
  };

  // 删除
  const { run: remove } = useRequest((uuid: string) => deleteVisual({ uuid }), {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
    },
  });

  const handleOnMenu = (info: MenuInfo, key: string) => {
    if (['rename', 'moveToGroup'].includes(info.key)) {
      // 重命名
      setOpen(true);
    } else {
      // 删除
      remove(key);
    }
    setEditType(info.key as EditType);
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
        {list?.map((item: ScreenItem) => (
          <div
            key={item?.uuid}
            className={cn(
              'min-w-[240px] w-[22.8%] h-max mr-[2%] mb-[24px] rounded bg-[#ededed] border border-solid border-[#e6e6e6] hover:border-[#1f6aff]',
            )}
          >
            <Image
              width="100%"
              alt="缩略图"
              src={item?.thumbnail ? item?.thumbnail : defaultImg}
              preview={{
                visible: actionType === 'preview' && preview && previewKey === item?.uuid,
                onVisibleChange: (value) => setPreview(value),
                mask: (
                  <Space align="center">
                    <Button
                      size="small"
                      icon={<EyeOutlined />}
                      onClick={() => {
                        setType('preview');
                        setKey(item?.uuid);
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
                        window.open(`/screen-mgt/screen/edit/${item.uuid}`, '_blank');
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
                  menu={{ items, onClick: (info) => handleOnMenu(info, item.uuid) }}
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
        onFinish={handleOnFinish}
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
            name="gid"
            label={editType === 'new' ? '项目分组' : '请选择目标项目分组'}
            placeholder={editType === 'new' ? '请选择项目分组' : '请选择目标项目分组'}
            options={group?.map((item) => ({ label: item?.name, value: item.uuid }))}
            rules={[{ required: true, message: '项目分组不能为空' }]}
          />
        )}
      </ModalForm>
    </>
  );
};

export default GroupDetail;
