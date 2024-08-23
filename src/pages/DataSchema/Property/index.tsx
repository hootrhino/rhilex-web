import { message, modal } from '@/components/PopupHack';
import {
  deleteSchemaPropertiesDel,
  getSchemaPropertiesDetail,
  getSchemaPropertiesList,
  postSchemaFix,
  postSchemaPropertiesCreate,
  postSchemaPublish,
  putSchemaPropertiesUpdate,
} from '@/services/rulex/shujumoxing';
import { defaultPagination } from '@/utils/constant';
import { isEmpty } from '@/utils/redash';
import {
  ExclamationCircleFilled,
  PlusOutlined,
  RedoOutlined,
  SendOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useModel, useRequest } from '@umijs/max';
import type { DescriptionsProps } from 'antd';
import { Button, Descriptions, Popconfirm, Tooltip } from 'antd';
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
    title: <FormattedMessage id="schemaMgt.form.title.name" />,
    dataIndex: 'label',
    ellipsis: true,
  },
  {
    title: <FormattedMessage id="schemaMgt.form.title.id" />,
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
    width: 100,
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
  const [total, setTotal] = useState<number>(0);

  // 详情
  const { run: getDetail } = useRequest(
    (params: API.getSchemaPropertiesDetailParams) => getSchemaPropertiesDetail(params),
    {
      manual: true,
      onSuccess: (res) => setInitialValue(res),
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

  // 发布 || 重置
  const handleOnPublish = () => {
    const isPubulished = activeSchema.published;
    const formatKey = isPubulished ? 'fix' : 'publish';

    modal.confirm({
      icon: <ExclamationCircleFilled />,
      title: formatMessage({
        id: `schemaMgt.modal.title.property.${formatKey}`,
      }),
      content: formatMessage({
        id: `schemaMgt.modal.content.property.${formatKey}`,
      }),
      okText: formatMessage({ id: 'button.ok' }),
      cancelText: formatMessage({ id: 'button.cancel' }),
      onOk: async () => {
        const params = { uuid: activeSchema.uuid };

        if (isPubulished) {
          await postSchemaFix(params);
          message.success(formatMessage({ id: 'message.success.reset' }));
        } else {
          await postSchemaPublish(params);
          message.success(formatMessage({ id: 'schemaMgt.message.success.publish' }));
        }
        getSchemaList();
        actionRef.current?.reload();
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
            getDetail({ uuid });
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
    // {
    //   key: 'defaultValue',
    //   label: formatMessage({ id: 'schemaMgt.form.title.defaultValue' }),
    // },
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
          // case 'defaultValue':
          //   children = data?.defaultValue?.toString() || '-';
          //   break;
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
            return Promise.resolve({
              data: data?.records || [],
              total: data?.total || 0,
              success: true,
            });
          } else {
            return Promise.resolve({
              data: [],
              total: 0,
              success: true,
            });
          }
        }}
        onDataSourceChange={(d) => setTotal(d.length)}
        pagination={defaultPagination}
        expandable={{
          expandedRowRender,
          indentSize: 0,
          rowExpandable: (record) => !isEmpty(record?.rule),
        }}
        toolBarRender={() => [
          <Tooltip
            title={total === 0 ? formatMessage({ id: 'schemaMgt.tooltip.publish' }) : ''}
            key="publish-property"
          >
            <Button
              ghost
              type="primary"
              icon={activeSchema.published ? <RedoOutlined /> : <SendOutlined />}
              onClick={handleOnPublish}
              disabled={!activeSchema.uuid || total === 0}
            >
              {activeSchema.published
                ? formatMessage({ id: 'button.reset' })
                : formatMessage({ id: 'schemaMgt.button.publish' })}
            </Button>
          </Tooltip>,
          <Button
            key="new-property"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
            disabled={!activeSchema.uuid || activeSchema.published}
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
            rule:
              {
                ...values?.rule,
                defaultValue: '0',
              } || {},
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
