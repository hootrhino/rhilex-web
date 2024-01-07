import IndexBorder from '@/components/IndexBorder';
import { message } from '@/components/PopupHack';
import {
  deleteSchemaPropertiesDel,
  getSchemaPropertiesDetail,
  getSchemaPropertiesList,
  postSchemaPropertiesCreate,
  putSchemaPropertiesUpdate,
} from '@/services/rulex/shujumoxing';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { rwEnum, typeEnum } from '../enum';
import PropertyForm from './UpdateForm';
import UnitTitle from '@/components/UnitTitle';

type Rule = {
  defaultValue?: string;
  max?: number;
  min?: number;
  round?: number;
  trueLabel?: string;
  falseLabel?: string;
};

export type Property = {
  uuid?: string;
  schemaId: string;
  label: string;
  name: string;
  type: string;
  rw: string;
  unit: string;
  rule: Rule;
  description?: string;
  value?: string;
};

type PropertyListProps = {
  schemaId: string;
};
export const getBaseColumns = (readOnly?: boolean) => {
  const baseColumns: ProColumns<Partial<Property>>[] = [
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
      hideInTable: readOnly,
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
      hideInTable: readOnly,
      renderText: (rule) => rule && JSON.stringify(rule),
    },
    {
      title: '当前值',
      dataIndex: 'value',
      ellipsis: true,
      hideInTable: !readOnly,
      render: (dom, {value, unit}) => value ? <UnitTitle title={value} unit={unit}  /> : '-'
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
    },
  ];

  return baseColumns;
};

const PropertyList = ({ schemaId }: PropertyListProps) => {
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState<Partial<Property>>({});

  // 详情
  const { run: getDetail } = useRequest(
    (params: API.getSchemaPropertiesDetailParams) => getSchemaPropertiesDetail(params),
    {
      manual: true,
    },
  );

  // 删除属性
  const { run: remove } = useRequest(
    (params: API.deleteSchemaPropertiesDelParams) => deleteSchemaPropertiesDel(params),
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功');
        actionRef.current?.reload();
      },
    },
  );

  const columns: ProColumns<Partial<Property>>[] = getBaseColumns().concat([
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      render: (_, { uuid }) => [
        <a
          key="edit"
          onClick={() => {
            if (!uuid) return;
            setOpen(true);
            getDetail({ uuid }).then((values) => setInitialValue(values));
          }}
        >
          编辑
        </a>,
        <Popconfirm
          title="确定要删除该属性？"
          onConfirm={() => uuid && schemaId && remove({ uuid, schemaId })}
          okText="是"
          cancelText="否"
          key="remove"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ]);

  return (
    <>
      <ProTable
        actionRef={actionRef}
        rowKey="uuid"
        columns={columns}
        search={false}
        params={{ schema_uuid: schemaId }}
        request={async ({ current, pageSize, ...keyword }) => {
          const { data } = await getSchemaPropertiesList({ current, size: pageSize, ...keyword });

          return Promise.resolve({
            data: data?.records || [],
            total: data?.total || 0,
            success: true,
          });
        }}
        pagination={{
          defaultPageSize: 10,
          hideOnSinglePage: true,
        }}
        toolBarRender={() => [
          <Button
            key="new-property"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
            disabled={!schemaId}
          >
            新增属性
          </Button>,
        ]}
      />
      <PropertyForm
        open={open}
        onOpenChange={(visible) => setOpen(visible)}
        initialValue={initialValue}
        onFinish={async (values) => {
          let info = '新增成功';
          let params = {
            ...values,
            unit: values?.unit || '',
            rule: values?.rule || {},
            schemaId,
          };
          if (initialValue?.uuid) {
            info = '更新成功';
            await putSchemaPropertiesUpdate({ ...params, uuid: initialValue.uuid } as any);
          } else {
            await postSchemaPropertiesCreate(params as any);
          }
          setOpen(false);
          message.success(info);
          actionRef.current?.reload();
        }}
        modalProps={{
          destroyOnClose: true,
          maskClosable: false,
          afterOpenChange(open) {
            if (!open) {
              setInitialValue({});
            }
          },
        }}
      />
    </>
  );
};

export default PropertyList;
