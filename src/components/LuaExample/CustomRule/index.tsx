import { message } from '@/components/PopupHack';
import {
  deleteUserluaDel,
  getUserluaListByGroup,
  postUserluaCreate,
  putUserluaUpdate,
} from '@/services/rulex/yonghudingyiluamoban';
import { DEFAULT_GROUP_KEY_LUA_TPL } from '@/utils/constant';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import type { TplItem } from '../CommonRule/ExampleItem';
import UpdateForm from './Update';

const CustomRule = () => {
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState<boolean>(false);
  const [tplId, setTplId] = useState<string>('');

  const handleOnFinish = async (values: any) => {
    const params = {
      ...values,
      gid: DEFAULT_GROUP_KEY_LUA_TPL,
      type: 'function',
    };
    if (tplId) {
      // 编辑
      await putUserluaUpdate({ ...params, uuid: tplId });
      message.success('更新成功');
    } else {
      // 新增
      await postUserluaCreate({
        ...params,
        variables: params.variables?.map((val: any) => ({ ...val, value: '' })),
      });
      message.success('新建成功');
    }
    actionRef.current?.reload();
    return true;
  };

  return (
    <>
      <ProList<TplItem>
        rowKey="uuid"
        showActions="hover"
        headerTitle="自定义规则示例"
        className="custom-rule-wrapper"
        actionRef={actionRef}
        request={async () => {
          const { data } = await getUserluaListByGroup({ uuid: DEFAULT_GROUP_KEY_LUA_TPL });

          return Promise.resolve({
            data: data || [],
            success: true,
          });
        }}
        toolBarRender={() => {
          return [
            <Button
              key="add"
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => {
                setOpen(true);
                setTplId('');
              }}
            >
              新建
            </Button>,
          ];
        }}
        metas={{
          title: {
            dataIndex: 'label',
            title: '规则名称',
          },
          description: {
            dataIndex: 'detail',
          },
          actions: {
            render: (_, row) => [
              <a
                onClick={() => {
                  setOpen(true);
                  setTplId(row?.uuid || '');
                }}
                key="edit"
              >
                编辑
              </a>,
              <Popconfirm
                title="确定要删除此规则？"
                onConfirm={async () => {
                  if (!row?.uuid) return;
                  await deleteUserluaDel({ uuid: row.uuid });
                  actionRef.current?.reload();
                  message.success('删除成功');
                }}
                key="remove"
              >
                <a>删除</a>
              </Popconfirm>,
            ],
          },
        }}
      />
      <UpdateForm open={open} onOpenChange={setOpen} tplId={tplId} onFinish={handleOnFinish} />
    </>
  );
};

export default CustomRule;
