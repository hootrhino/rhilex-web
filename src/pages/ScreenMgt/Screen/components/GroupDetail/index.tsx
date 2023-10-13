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

import { message } from '@/components/PopupHack';
import { deleteVisual, postVisualCreate, putVisualUpdate } from '@/services/rulex/dapingguanli';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useEffect, useRef, useState } from 'react';
import type { GroupItem } from '../..';
import defaultImg from './images/default.png';

type ScreenItem = {
  uuid: string;
  name: string;
  thumbnail: string;
  status: string;
};

type GroupDetailProps = React.HTMLAttributes<HTMLDivElement> & {
  list: ScreenItem[];
  activeGroup: string;
  reload: () => void;
};

type EditType = 'new' | 'rename' | 'moveToGroup';

export type Update = {
  gid: string;
  name: string;
  type: string;
  content: string;
  thumbnail: string;
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

const GroupDetail = ({ reload, list, activeGroup, ...props }: GroupDetailProps) => {
  const formRef = useRef<ProFormInstance>();
  const { detail, getDetail, groupList } = useModel('useEditor');

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

  const handleOnReset = (text: string) => {
    setOpen(false);
    reload();
    message.success(text);
  };

  // 创建大屏
  const { run: create } = useRequest((params: Update) => postVisualCreate(params), {
    manual: true,
    onSuccess: (data) => {
      handleOnReset('创建成功');
      window.open(`/screen-mgt/screen/edit/${data?.uuid}`, '_blank');
    },
  });

  // 更新大屏
  const { run: update } = useRequest(
    (params: Update & { uuid: string }) => putVisualUpdate(params),
    {
      manual: true,
      onSuccess: () => {
        handleOnReset('更新成功');
      },
    },
  );

  const handleOnFinish = async (values: { name: string; gid: string }) => {
    if (editType === 'new') {
      create({ ...values, type: 'BUILDIN', content: '', thumbnail: '' });
    } else {
      update({ ...detail, ...values });
    }
  };

  // 删除
  const { run: remove } = useRequest((params: API.deleteVisualParams) => deleteVisual(params), {
    manual: true,
    onSuccess: () => {
      handleOnReset('删除成功');
    },
  });

  const handleOnMenu = (info: MenuInfo, key: string) => {
    if (['rename', 'moveToGroup'].includes(info.key)) {
      // 重命名&移动分组
      getDetail({ uuid: key });
      setOpen(true);
    } else {
      // 删除
      remove({ uuid: key });
    }
    setEditType(info.key as EditType);
  };

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue({ name: detail.name, gid: detail.gid });
    }
  }, [detail]);

  return (
    <>
      <div className="flex flex-wrap items-center" {...props}>
        <div className="min-w-[240px] w-[22.8%] mr-[2%] mb-[24px] h-max rounded">
          <div className="flex justify-center items-center py-[27%] border border-solid border-[#e6e6e6]">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setOpen(true);
                setEditType('new');
                formRef.current?.setFieldsValue({ name: '', gid: activeGroup });
              }}
            >
              创建大屏
            </Button>
          </div>
        </div>
        {list?.map((item: ScreenItem) => (
          <div
            key={item?.uuid}
            className={cn(
              'min-w-[240px] w-[22.8%] min-h-[168px] h-max mr-[2%] mb-[24px] rounded bg-[#ededed] border border-solid border-[#e6e6e6] hover:border-[#1f6aff]',
            )}
          >
            <Image
              width="100%"
              alt="缩略图"
              src={item?.thumbnail ? item?.thumbnail : defaultImg}
              style={{ minHeight: 134 }}
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
                  status={item?.status ? 'success' : 'warning'}
                  text={item?.status ? '已发布' : '未发布'}
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
        initialValues={{ name: '', gid: activeGroup }}
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
            options={groupList?.map((item: GroupItem) => ({ label: item?.name, value: item.uuid }))}
            rules={[{ required: true, message: '项目分组不能为空' }]}
          />
        )}
      </ModalForm>
    </>
  );
};

export default GroupDetail;
