import { message, modal } from '@/components/PopupHack';
import {
  deleteSchemaPropertiesDel,
  getSchemaPropertiesDetail,
  getSchemaPropertiesList,
  postSchemaPropertiesCreate,
  postSchemaPublish,
  putSchemaPropertiesUpdate,
} from '@/services/rulex/shujumoxing';
import { isEmpty } from '@/utils/redash';
import { ExclamationCircleFilled, PlusOutlined, SendOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useModel, useRequest } from '@umijs/max';
import type { DescriptionsProps } from 'antd';
import { Button, Descriptions, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { rwOption, Type, typeOption } from '../enum';
import PropertyForm from './UpdateForm';

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
  schemaId?: string;
  label?: string;
  name?: string;
  type?: string;
  rw?: string;
  unit?: string;
  rule?: Rule;
  description?: string;
  value?: string;
};

const baseColumns: ProColumns<Property>[] = [
  {
    title: <FormattedMessage id="schemaMgt.form.title.schemaName" />,
    dataIndex: 'label',
    ellipsis: true,
  },
  {
    title: <FormattedMessage id="schemaMgt.form.title.name" />,
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: <FormattedMessage id="schemaMgt.form.title.type" />,
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: typeOption,
    width: 100,
  },
  {
    title: <FormattedMessage id="schemaMgt.form.title.unit" />,
    dataIndex: 'unit',
    width: 100,
  },
  {
    title: <FormattedMessage id="schemaMgt.form.title.rw" />,
    dataIndex: 'rw',
    valueType: 'select',
    valueEnum: rwOption,
    width: 80,
  },
  {
    title: <FormattedMessage id="table.desc" />,
    dataIndex: 'description',
    ellipsis: true,
  },
];

const ruleFilterData = {
  [Type.STRING]: ['defaultValue', 'max'],
  [Type.INTEGER]: ['defaultValue', 'range'],
  [Type.FLOAT]: ['defaultValue', 'range', 'round'],
  [Type.BOOL]: ['defaultValue', 'trueLabel', 'falseLabel'],
  [Type.GEO]: ['defaultValue', 'latitude', 'longitude'],
};

const PropertyList = () => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
  const { run: getSchemaList, activeSchema } = useModel('useSchema');
  const [open, setOpen] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState<Property>({});
  const [disabledPublish, setDisabled] = useState<boolean>(true);

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
        message.success(formatMessage({ id: 'message.success.remove' }));
        actionRef.current?.reload();
      },
    },
  );

  // 发布
  const handleOnPublish = () => {
    modal.confirm({
      icon: <ExclamationCircleFilled />,
      title: formatMessage({ id: 'schemaMgt.modal.title.property.publish' }),
      content: formatMessage({ id: 'schemaMgt.modal.content.property.publish' }),
      okText: formatMessage({ id: 'button.ok' }),
      cancelText: formatMessage({ id: 'button.cancel' }),
      onOk: async () => {
        await postSchemaPublish({ uuid: activeSchema.uuid });
        getSchemaList();
        actionRef.current?.reload();
        message.success(formatMessage({ id: 'schemaMgt.message.success.publish' }));
      },
    });
  };

  const columns: ProColumns<Property>[] = baseColumns.concat([
    {
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      width: 100,
      render: (_, { uuid }) => [
        <a
          key="edit"
          onClick={() => {
            if (!uuid || activeSchema.published) return;
            setOpen(true);
            getDetail({ uuid }).then((values) => setInitialValue(values));
          }}
          className={
            activeSchema.published ? 'text-[#d9d9d9] cursor-not-allowed hover:text-[#d9d9d9]' : ''
          }
        >
          {formatMessage({ id: 'button.edit' })}
        </a>,
        <Popconfirm
          title={formatMessage({ id: 'schemaMgt.popconfirm.remove.property' })}
          onConfirm={() =>
            uuid &&
            activeSchema.uuid &&
            !activeSchema.published &&
            remove({ uuid, schemaId: activeSchema.uuid })
          }
          okText={formatMessage({ id: 'button.yes' })}
          cancelText={formatMessage({ id: 'button.no' })}
          key="remove"
        >
          <a
            className={
              activeSchema.published ? 'text-[#d9d9d9] cursor-not-allowed hover:text-[#d9d9d9]' : ''
            }
          >
            {formatMessage({ id: 'button.remove' })}
          </a>
        </Popconfirm>,
      ],
    },
  ]);

  const items = [
    {
      key: 'defaultValue',
      label: formatMessage({ id: 'schemaMgt.form.title.defaultValue' }),
    },
    {
      key: 'falseLabel',
      label: 'false',
    },
    {
      key: 'trueLabel',
      label: 'true',
    },
    {
      key: 'round',
      label: formatMessage({ id: 'schemaMgt.form.title.round' }),
    },
    {
      key: 'max',
      label: formatMessage({ id: 'schemaMgt.form.title.range.max' }),
    },
    {
      key: 'min',
      label: formatMessage({ id: 'schemaMgt.form.title.range.min' }),
    },
    {
      key: 'latitude',
      label: formatMessage({ id: 'schemaMgt.form.title.latitude' }),
    },
    {
      key: 'longitude',
      label: formatMessage({ id: 'schemaMgt.form.title.longitude' }),
    },
    {
      key: 'range',
      label: formatMessage({ id: 'schemaMgt.form.title.range' }),
    },
  ];

  const expandedRowRender = (record: Property) => {
    const type = record?.type || Type.STRING;
    const data = record?.rule;

    const ruleItems = items
      .filter((r) => ruleFilterData[type].includes(r.key))
      .map((item) => {
        let children = data?.[item.key];
        switch (item.key) {
          case 'range':
            children = `${data?.min} ~ ${data?.max}`;
            break;
          case 'defaultValue':
            children = data?.defaultValue?.toString() || '-';
            break;
          default:
            children = data?.[item.key];
        }
        return {
          ...item,
          children,
        };
      });

    return (
      <Descriptions
        title={formatMessage({ id: 'schemaMgt.title.card' })}
        items={ruleItems as DescriptionsProps['items']}
        column={4}
      />
    );
  };

  return (
    <>
      <ProTable
        actionRef={actionRef}
        rowKey="uuid"
        rootClassName="stripe-table"
        columns={columns}
        search={false}
        params={{ schema_uuid: activeSchema.uuid }}
        request={async ({ current, pageSize, ...keyword }) => {
          if (keyword?.schema_uuid) {
            const { data } = await getSchemaPropertiesList({ current, size: pageSize, ...keyword });
            setDisabled(data?.total === 0);
            return Promise.resolve({
              data: data?.records || [],
              total: data?.total || 0,
              success: true,
            });
          } else {
            setDisabled(true);
            return Promise.resolve({
              data: [],
              total: 0,
              success: true,
            });
          }
        }}
        pagination={{
          defaultPageSize: 10,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
        expandable={{
          expandedRowRender,
          indentSize: 0,
          rowExpandable: (record) => !isEmpty(record?.rule),
        }}
        toolBarRender={() => [
          <Button
            ghost
            key="publish-property"
            type="primary"
            icon={<SendOutlined />}
            onClick={handleOnPublish}
            disabled={activeSchema.published || disabledPublish}
          >
            {activeSchema.published
              ? formatMessage({ id: 'schemaMgt.button.published' })
              : formatMessage({ id: 'schemaMgt.button.publish' })}
          </Button>,
          <Button
            key="new-property"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
            disabled={!activeSchema.uuid}
          >
            {formatMessage({ id: 'button.new' })}
          </Button>,
        ]}
      />
      <PropertyForm
        open={open}
        onOpenChange={(visible) => setOpen(visible)}
        initialValue={initialValue}
        onFinish={async (values) => {
          let info = formatMessage({ id: 'message.success.new' });
          let params = {
            ...values,
            unit: values?.unit || '',
            rule: values?.rule || {},
            schemaId: activeSchema.uuid,
          };
          if (initialValue?.uuid) {
            info = formatMessage({ id: 'message.success.update' });
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
