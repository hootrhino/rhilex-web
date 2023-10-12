import { cn, IconFont } from '@/utils/utils';
import { useEffect, useState } from 'react';

import { message } from '@/components/PopupHack';
import type { GroupItem } from '@/pages/ScreenMgt/Screen';
import { Update } from '@/pages/ScreenMgt/Screen/components/GroupDetail';
import { putVisualUpdate } from '@/services/rulex/dapingguanli';
import { history, useModel, useParams, useRequest } from '@umijs/max';
import { Input } from 'antd';
import ConfirmModal from '../components/ConfirmModal';
import Tooltip from '../components/Tooltip';
import './index.less';

type ToolBarProps = {
  refresh: () => void;
};

const ToolBar = ({ refresh }: ToolBarProps) => {
  const {
    collapseRightPanel,
    setCollapseRightPanel,
    detail,
    getDetail,
    groupList,
    getGroupList,
    setActiveGroup,
  } = useModel('useEditor');
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [groupName, setGroupName] = useState<string>('');
  const { uuid } = useParams();

  const { run: update } = useRequest(
    (params: Update & { uuid: string }) => putVisualUpdate(params),
    {
      manual: true,
      onSuccess: () => {
        if (uuid) {
          getDetail({ uuid });
        }
        message.success('更新成功');
      },
    },
  );

  useEffect(() => {
    if (uuid) {
      getDetail({ uuid });
    }
  }, [uuid]);

  useEffect(() => {
    if (detail) {
      const group = groupList?.find((item: GroupItem) => item?.uuid === detail.gid);

      setGroupName(group?.name);
      setName(detail.name);
    }
  }, [detail]);

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <>
      <div
        className={cn(
          'toolbar-container',
          'editor-shadow-outer-b',
          'editor-box-shadow-3',
          'w-full h-[60px] bg-[#1f1f1f] fixed top-0 z-[99] pb-[1px]',
        )}
      >
        <div className="w-full h-full px-[24px] flex">
          <div className="h-full flex-1">
            <div className="h-full flex items-center mr-[20px]">
              <img alt="logo" src="/logo.png" className="h-[28px] w-[45px]" />
              <div className="ml-[12px] flex flex-col">
                <div
                  className="text-[#fff] truncate max-w-[140px] cursor-pointer hover:underline"
                  onClick={() => setOpen(true)}
                >
                  {detail?.name}
                </div>
                <div className="text-[#7a7a7a] text-base truncate max-w-[160px]">
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => history.push('/screen-mgt/screen/list')}
                  >
                    默认工作空间
                  </span>{' '}
                  /{' '}
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => {
                      history.push('/screen-mgt/screen/list');
                      setActiveGroup(detail.gid);
                    }}
                  >
                    {groupName}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full flex-1">
            <div className="flex justify-end items-center h-full">
              <Tooltip title="刷新画布">
                <div
                  className="flex justify-center items-center bg-[#474747] w-[24px] h-[24px] ml-[12px] rounded-[4px] cursor-pointer hover:bg-[#565656]"
                  onClick={() => {
                    refresh();

                    console.log('reload');
                  }}
                >
                  <IconFont type="icon-reload-active" />
                </div>
              </Tooltip>
              <Tooltip title="关闭右侧面板">
                <div
                  className="flex justify-center items-center bg-[#474747] w-[24px] h-[24px] mx-[12px] rounded-[4px] cursor-pointer hover:bg-[#565656]"
                  onClick={() => setCollapseRightPanel(!collapseRightPanel)}
                >
                  <IconFont
                    type={collapseRightPanel ? 'icon-right-panel-active' : 'icon-right-panel'}
                  />
                </div>
              </Tooltip>
              <Tooltip title="生成快照">
                <div
                  className="flex justify-center items-center bg-[#474747] w-[66px] h-[24px] mr-[12px] rounded-[4px] cursor-pointer hover:bg-[#565656]"
                  onClick={() => {
                    // TODO 生成快照
                  }}
                >
                  <IconFont type="icon-snapshot" className="text-[14px]" />
                  <span className="pl-[5px] text-base text-[#dbdbdb]">快照</span>
                </div>
              </Tooltip>
              <div
                className="flex justify-center items-center bg-[#474747] w-[66px] h-[24px] mr-[12px] rounded-[4px] cursor-pointer hover:bg-[#565656]"
                onClick={() => {
                  // TODO 预览
                }}
              >
                <IconFont type="icon-preview" className="text-[14px]" />
                <span className="pl-[5px] text-base text-[#dbdbdb]">预览</span>
              </div>
              <div
                className="flex justify-center items-center bg-[#1F6AFF] w-[66px] h-[24px] rounded-[4px] cursor-pointer hover:bg-[#4281ff]"
                onClick={() => {
                  // TODO 发布
                }}
              >
                <IconFont type="icon-publish" className="text-[14px]" />
                <span className="pl-[5px] text-base text-[#fff]">发布</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        title="修改大屏名称"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          update({ ...detail, name });
          setOpen(false);
        }}
      >
        <div className="text-[#ADADAD] mb-[10px]">请输入新的大屏名称</div>

        <Input
          size="middle"
          rootClassName="edit-input"
          value={name}
          onChange={(e) => setName(e.target?.value)}
        />
      </ConfirmModal>
    </>
  );
};

export default ToolBar;
