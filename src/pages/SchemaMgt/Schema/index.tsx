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
import { history, useIntl, useRequest } from '@umijs/max';
import { Popconfirm, Space, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { ActiveSchema, SchemaItem } from '..';

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
            published: defaultActiveItem?.published || false,
          });
          return Promise.resolve({
            data,
            success: true,
          });
        }}
        toolBarRender={false}
        onRow={({ uuid, name, published }: Partial<SchemaItem>) => {
          return {
            onClick: () =>
              changeActiveItem({
                uuid: uuid || '',
                name: name || '',
                published: published || false,
              }),
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
            render: (_dom, { uuid }) => {
              return uuid ? (
                <Tooltip title={uuid}>
                  <a
                    className={cn('w-[150px] truncate cursor-pointer', !uuid && 'hidden')}
                    onClick={() => history.push('/data-center')}
                  >
                    {uuid}
                  </a>
                </Tooltip>
              ) : (
                ''
              );
            },
          },
          avatar: {
            render: () => <FolderOpenOutlined className="pl-[10px]" />,
          },
          actions: {
            render: (_dom, { uuid }) => (
              <Space size="middle">
                <Tooltip title={formatMessage({ id: 'schemaMgt.tooltip.update' })}>
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
                <Tooltip title={formatMessage({ id: 'schemaMgt.tooltip.remove' })}>
                  <Popconfirm
                    title={formatMessage({ id: 'schemaMgt.popconfirm.remove' })}
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
        title={
          initialValue?.uuid
            ? formatMessage({ id: 'schemaMgt.modal.title.schema.update' })
            : formatMessage({ id: 'schemaMgt.modal.title.schema.new' })
        }
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
          label={formatMessage({ id: 'schemaMgt.form.title.schemaName' })}
          placeholder={formatMessage({ id: 'schemaMgt.form.placeholder.schemaName' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'schemaMgt.form.placeholder.schemaName' }),
            },
          ]}
        />
        <ProFormText
          name="description"
          label={formatMessage({ id: 'table.desc' })}
          placeholder={formatMessage({ id: 'placeholder.desc' })}
        />
      </ModalForm>
    </>
  );
};

export default SchemaList;
