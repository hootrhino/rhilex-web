import IndexBorder from '@/components/IndexBorder';
import { message } from '@/components/PopupHack';
import {
  deleteSchemaDel,
  getSchemaDetail,
  getSchemaList,
  postSchemaCreate,
  putSchemaUpdate,
} from '@/services/rulex/shujumoxing';
import { DeleteOutlined, EditOutlined, FolderOpenOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProCard,
  ProFormText,
  ProList,
  ProTable,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { rwEnum, typeEnum, updateMessage } from './enum';
import PropertyForm from './PropertyForm';

type Rule = {
  defaultValue?: number;
  max?: number;
  min?: number;
  round?: number;
  trueLabel?: string;
  falseLabel?: string;
};

type Property = {
  label?: string;
  name?: string;
  type?: string;
  rw?: string;
  unit?: string;
  rule: Rule;
  description?: string;
};

export type SchemaItem = {
  uuid: string;
  name: string;
  schema: {
    iotProperties?: Property[];
  };
};

export type ActiveSchema = Omit<SchemaItem, 'schema'>;

const Schema = () => {
  const formRef = useRef<ProFormInstance>();
  const [activeSchema, setActiveSchema] = useState<ActiveSchema>({
    uuid: '',
    name: '',
  });
  const [propertyData, setPropertyData] = useState<Property[]>([]);
  // left
  const [open, setOpen] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState<Partial<SchemaItem>>();
  // right
  const [openProperty, setOpenProperty] = useState<boolean>(false);

  // 物模型列表
  const { data, refresh } = useRequest(() => getSchemaList(), {
    onSuccess: (res) => {
      const { uuid = '', name = '' } = res?.[0];
      setActiveSchema({ uuid, name });
    },
  });

  // 删除物模型
  const { run: remove } = useRequest(
    (params: API.deleteSchemaDelParams) => deleteSchemaDel(params),
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功');
        refresh();
      },
    },
  );

  // 更新物模型
  const handleOnUpdate = async (values: SchemaItem, type: 'new' | 'edit' | 'remove') => {
    try {
      if (['remove', 'edit'].includes(type)) {
        await putSchemaUpdate(values);
        if (type === 'edit') {
          setOpen(false);
        }
      } else {
        // 新建
        await postSchemaCreate(values);
        setOpen(false);
      }

      refresh();
      message.success(updateMessage[type || 'new']);
      return true;
    } catch (error) {
      return false;
    }
  };

  // 详情
  const { data: detail, run: getDetail } = useRequest(
    (params: API.getSchemaDetailParams) => getSchemaDetail(params),
    {
      manual: true,
    },
  );

  const columns: ProColumns<Property>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
      render: (text, record, index) => <IndexBorder serial={index} />,
    },
    {
      title: '名称',
      dataIndex: 'label',
      ellipsis: true,
    },
    {
      title: '标志符',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '数据类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: typeEnum,
      width: 100,
    },
    {
      title: '单位',
      dataIndex: 'unit',
      width: 100,
    },
    {
      title: '读写',
      dataIndex: 'rw',
      valueType: 'select',
      valueEnum: rwEnum,
      width: 80,
    },
    {
      title: '数据定义',
      dataIndex: 'rule',
      ellipsis: true,
      renderText: (rule) => rule && JSON.stringify(rule),
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      render: (_, { name }) => [
        <a key="edit">编辑</a>,
        <Popconfirm
          title="确定要删除该属性？"
          onConfirm={async () => {
            // 删除属性
            const newProperties = propertyData?.filter((property) => property.name !== name);
            const newData = {
              ...activeSchema,
              schema: {
                iotProperties: newProperties,
              },
            };
            handleOnUpdate(newData, 'remove');
          }}
          okText="是"
          cancelText="否"
          key="remove"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  useEffect(() => {
    const filterData = data?.find((item) => item.uuid === activeSchema.uuid);
    setPropertyData(filterData?.schema?.iotProperties as Property[]);
  }, [activeSchema]);

  useEffect(() => {
    if (initialValue) {
      formRef.current?.setFieldsValue({ name: initialValue.name });
    }
  }, [initialValue]);

  return (
    <>
      <PageContainer>
        <ProCard split="vertical">
          <ProCard
            colSpan="300px"
            title="物模型列表"
            extra={
              <Button
                key="add"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setOpen(true)}
              >
                新建物模型
              </Button>
            }
          >
            <ProList<Partial<SchemaItem>>
              rowKey="uuid"
              headerTitle={false}
              dataSource={data}
              toolBarRender={false}
              onRow={({ uuid, name }: Partial<SchemaItem>) => {
                return {
                  onClick: () => setActiveSchema({ uuid: uuid || '', name: name || '' }),
                };
              }}
              rowClassName={({ uuid }: Partial<SchemaItem>) =>
                uuid === activeSchema.uuid ? 'active-group' : ''
              }
              metas={{
                title: {
                  dataIndex: 'name',
                  render: (dom) => <div className="w-[120px] truncate">{dom}</div>,
                },
                avatar: {
                  render: () => <FolderOpenOutlined className="pl-[10px]" />,
                },
                actions: {
                  render: (dom, { uuid }) => (
                    <Space size="middle">
                      <Tooltip title="重命名物模型">
                        <a
                          key="edit"
                          onClick={() => {
                            if (!uuid) return;
                            setOpen(true);
                            getDetail({ uuid }).then((values) => setInitialValue(values));
                          }}
                        >
                          <EditOutlined />
                        </a>
                      </Tooltip>
                      <Tooltip title="删除物模型">
                        <Popconfirm
                          title="确定要删除该物模型？"
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
          </ProCard>
          <ProCard title={`${activeSchema.name}-属性列表`}>
            <ProTable
              rowKey="name"
              columns={columns}
              search={false}
              pagination={false}
              dataSource={propertyData}
              toolBarRender={() => [
                <Button
                  key="new-property"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setOpenProperty(true)}
                >
                  新增属性
                </Button>,
              ]}
            />
          </ProCard>
        </ProCard>
      </PageContainer>
      <ModalForm
        open={open}
        title={initialValue?.uuid ? '更新物模型' : '新建物模型'}
        formRef={formRef}
        width="30%"
        layout="horizontal"
        onOpenChange={(visible) => setOpen(visible)}
        modalProps={{
          destroyOnClose: true,
          maskClosable: false,
          afterOpenChange(open) {
            if (!open) {
              setInitialValue({});
            }
          },
        }}
        onFinish={async (value) => {
          let params = {
            ...value,
            schema: { iotProperties: [] },
          };
          if (initialValue?.uuid) {
            params = {
              ...params,
              uuid: initialValue?.uuid,
            };
          }

          handleOnUpdate(params, initialValue?.uuid ? 'edit' : 'new');
        }}
      >
        <ProFormText
          name="name"
          label="物模型名称"
          placeholder="请输入物模型名称"
          rules={[{ required: true, message: '请输入物模型名称' }]}
        />
      </ModalForm>
      <PropertyForm
        activeSchema={activeSchema}
        open={openProperty}
        onOpenChange={(visible) => setOpenProperty(visible)}
      />
    </>
  );
};

export default Schema;
