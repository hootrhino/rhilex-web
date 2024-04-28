import { message } from '@/components/PopupHack';
import {
  deleteSchemaDel,
  getSchemaDetail,
  getSchemaList,
  postSchemaCreate,
  putSchemaUpdate,
} from '@/services/rulex/shujumoxing';
import { cn } from '@/utils/utils';
import { DeleteOutlined, EditOutlined, FolderOpenOutlined } from '@ant-design/icons';
import type { ActionType, ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText, ProList } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Popconfirm, Space, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';

type SchemaItem = {
  uuid: string;
  name: string;
  description?: string;
};

type ActiveSchema = Omit<SchemaItem, 'description'>;

type SchemaListProps = ModalFormProps & {
  changeOpen: (value: boolean) => void;
  activeItem: ActiveSchema;
  changeActiveItem: (item: ActiveSchema) => void;
};

const SchemaList = ({ open, changeOpen, activeItem, changeActiveItem }: SchemaListProps) => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const [initialValue, setInitialValue] = useState<Partial<SchemaItem>>();

  // 详情
  const { run: getDetail } = useRequest(
    (params: API.getSchemaDetailParams) => getSchemaDetail(params),
    {
      manual: true,
    },
  );

  // 删除模型
  const { run: remove } = useRequest(
    (params: API.deleteSchemaDelParams) => deleteSchemaDel(params),
    {
      manual: true,
      onSuccess: () => {
        message.success(formatMessage({ id: 'message.success.remove' }));
        actionRef.current?.reload();
      },
    },
  );

  useEffect(() => {
    if (initialValue) {
      formRef.current?.setFieldsValue(initialValue);
    }
  }, [initialValue]);

  return (
    <>
      <ProList<Partial<SchemaItem>>
        actionRef={actionRef}
        rowKey="uuid"
        headerTitle={false}
        request={async () => {
          const { data } = await getSchemaList();

          const defaultActiveItem = data?.[0];
          changeActiveItem({
            uuid: defaultActiveItem?.uuid || '',
            name: defaultActiveItem?.name || '',
          });
          return Promise.resolve({
            data,
            success: true,
          });
        }}
        toolBarRender={false}
        onRow={({ uuid, name }: Partial<SchemaItem>) => {
          return {
            onClick: () => changeActiveItem({ uuid: uuid || '', name: name || '' }),
          };
        }}
        rowClassName={({ uuid }: Partial<SchemaItem>) =>
          uuid === activeItem.uuid ? 'active-group' : ''
        }
        metas={{
          title: {
            dataIndex: 'name',
            render: (dom, { name }) => (
              <Tooltip title={name}>
                <div className="w-[120px] truncate">{name}</div>
              </Tooltip>
            ),
          },
          description: {
            dataIndex: 'description',
            render: (dom, { description }) => {
              return (
                <Tooltip title={description ? description : ''}>
                  <div className={cn('w-[150px] truncate ', !description && 'hidden')}>
                    {description}
                  </div>
                </Tooltip>
              );
            },
          },
          avatar: {
            render: () => <FolderOpenOutlined className="pl-[10px]" />,
          },
          actions: {
            render: (dom, { uuid }) => (
              <Space size="middle">
                <Tooltip title="重命名模型">
                  <a
                    key="edit"
                    onClick={() => {
                      if (!uuid) return;
                      changeOpen(true);
                      getDetail({ uuid }).then((values) => setInitialValue(values));
                    }}
                  >
                    <EditOutlined />
                  </a>
                </Tooltip>
                <Tooltip title="删除模型">
                  <Popconfirm
                    title="确定要删除此数据模型？"
                    onConfirm={() => uuid && remove({ uuid })}
                  >
                    <a key="remove">
                      <DeleteOutlined />
                    </a>
                  </Popconfirm>
                </Tooltip>
              </Space>
            ),
          },
        }}
      />
      <ModalForm
        open={open}
        title={initialValue?.uuid ? '更新数据模型' : '新建数据模型'}
        formRef={formRef}
        width="30%"
        layout="horizontal"
        labelCol={{ span: 3 }}
        onOpenChange={(visible) => changeOpen(visible)}
        modalProps={{
          destroyOnClose: true,
          maskClosable: false,
          afterOpenChange(open) {
            if (!open) {
              setInitialValue({});
            }
          },
        }}
        onFinish={async (values) => {
          let info = formatMessage({ id: 'message.success.new' });
          if (initialValue?.uuid) {
            info = formatMessage({ id: 'message.success.update' });
            await putSchemaUpdate({ ...values, uuid: initialValue?.uuid });
          } else {
            await postSchemaCreate(values);
          }
          changeOpen(false);
          message.success(info);
          actionRef.current?.reload();
        }}
      >
        <ProFormText
          name="name"
          label="名称"
          placeholder="请输入数据模型名称"
          rules={[{ required: true, message: '请输入数据模型名称' }]}
        />
        <ProFormText
          name="description"
          label={formatMessage({ id: 'table.desc' })}
          placeholder="请输入数据模型描述"
        />
      </ModalForm>
    </>
  );
};

export default SchemaList;
