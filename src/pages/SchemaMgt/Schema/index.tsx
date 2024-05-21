import { message } from '@/components/PopupHack';
import {
  deleteSchemaDel,
  getSchemaDetail,
  postSchemaCreate,
  putSchemaUpdate,
} from '@/services/rulex/shujumoxing';
import { cn, IconFont } from '@/utils/utils';
import { CheckOutlined, CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText, ProList } from '@ant-design/pro-components';
import { history, useIntl, useModel, useRequest } from '@umijs/max';
import { Popconfirm, Space, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import type { SchemaItem } from '..';

type SchemaListProps = ModalFormProps & {
  changeOpen: (value: boolean) => void;
};

const SchemaList = ({ open, changeOpen }: SchemaListProps) => {
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const {
    activeSchema,
    schemaList,
    run: getSchemaList,
    setActiveSchema,
    refresh,
  } = useModel('useSchema');
  const { setKey } = useModel('useDataCenter');
  const [initialValue, setInitialValue] = useState<Partial<SchemaItem>>();
  const [copied, setCopied] = useState<string>('');

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
        refresh();
      },
    },
  );

  useEffect(() => {
    if (initialValue) {
      formRef.current?.setFieldsValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    getSchemaList();
  }, []);

  return (
    <>
      <ProList<Partial<SchemaItem>>
        rowKey="uuid"
        headerTitle={false}
        dataSource={schemaList}
        toolBarRender={false}
        showActions="hover"
        onRow={({ uuid, name, published }: Partial<SchemaItem>) => {
          return {
            onClick: () =>
              setActiveSchema({
                uuid: uuid || '',
                name: name || '',
                published: published || false,
              }),
          };
        }}
        rowClassName={({ uuid }: Partial<SchemaItem>) =>
          uuid === activeSchema.uuid ? 'active-group' : ''
        }
        metas={{
          title: {
            dataIndex: 'name',
            render: (_dom, { name }) => (
              <Tooltip title={name}>
                <div className="w-[160px] truncate">{name}</div>
              </Tooltip>
            ),
          },
          description: {
            dataIndex: 'description',
            render: (_dom, { uuid, published }) => {
              return (
                uuid && (
                  <Space>
                    <Tooltip title={formatMessage({ id: 'schemaMgt.tooltip.copy' })}>
                      <CopyToClipboard
                        key={uuid}
                        text={uuid}
                        onCopy={(text, result) => {
                          setCopied(result ? text : '');
                          setTimeout(() => {
                            setCopied('');
                          }, 1500);
                        }}
                      >
                        {copied === uuid ? (
                          <CheckOutlined style={{ color: '#52c41a' }} />
                        ) : (
                          <CopyOutlined
                            style={{ color: '#1677ff' }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                      </CopyToClipboard>
                    </Tooltip>
                    <Tooltip title={uuid}>
                      <div
                        className={cn(
                          'w-[130px] truncate',
                          !uuid && 'hidden',
                          published ? 'cursor-pointer text-[#1677ff]' : 'cursor-not-allowed',
                        )}
                        onClick={() => {
                          if (!published) return;
                          history.push('/data-center');
                          setKey(uuid);
                        }}
                      >
                        {uuid}
                      </div>
                    </Tooltip>
                  </Space>
                )
              );
            },
          },
          avatar: {
            render: (_dom, { published }) =>
              published ? (
                <IconFont type="icon-schema-published" className="pl-[10px]" />
              ) : (
                <IconFont type={`icon-schema`} className="pl-[10px]" />
              ),
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
          refresh();
        }}
      >
        <ProFormText
          name="name"
          labelCol={{ span: 4 }}
          label={formatMessage({ id: 'schemaMgt.form.title.name' })}
          placeholder={formatMessage({ id: 'schemaMgt.form.placeholder.name' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'schemaMgt.form.placeholder.name' }),
            },
          ]}
        />
        <ProFormText
          name="description"
          labelCol={{ span: 4 }}
          label={formatMessage({ id: 'table.desc' })}
          placeholder={formatMessage({ id: 'placeholder.desc' })}
        />
      </ModalForm>
    </>
  );
};

export default SchemaList;
