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
import { useIntl } from '@umijs/max';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import type { TplItem } from '../CommonRule/ExampleItem';
import UpdateForm from './Update';

const CustomRule = () => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
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
      message.success(formatMessage({ id: 'message.success.update' }));
    } else {
      // 新建
      await postUserluaCreate({
        ...params,
        variables: params.variables?.map((val: any) => ({ ...val, value: '' })),
      });
      message.success(formatMessage({ id: 'message.success.new' }));
    }
    actionRef.current?.reload();
    return true;
  };

  return (
    <>
      <ProList<TplItem>
        rowKey="uuid"
        showActions="hover"
        headerTitle={formatMessage({ id: 'component.title.customRule' })}
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
              {formatMessage({ id: 'button.new' })}
            </Button>,
          ];
        }}
        metas={{
          title: {
            dataIndex: 'label',
            title: formatMessage({ id: 'component.form.title.rule' }),
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
                {formatMessage({ id: 'button.edit' })}
              </a>,
              <Popconfirm
                title={formatMessage({ id: 'component.modal.title.removeRule' })}
                onConfirm={async () => {
                  if (!row?.uuid) return;
                  await deleteUserluaDel({ uuid: row.uuid });
                  actionRef.current?.reload();
                  message.success(formatMessage({ id: 'message.success.remove' }));
                }}
                key="remove"
              >
                <a>{formatMessage({ id: 'button.remove' })}</a>
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
