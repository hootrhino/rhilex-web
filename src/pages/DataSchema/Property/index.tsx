import { message, modal } from '@/components/PopupHack';
import {
  deleteSchemaPropertiesDel,
  getSchemaPropertiesDetail,
  getSchemaPropertiesList,
  postSchemaFix,
  postSchemaPublish,
} from '@/services/rhilex/shujumoxing';
import { defaultPagination } from '@/utils/constant';
import { isEmpty } from '@/utils/redash';
import {
  ExclamationCircleFilled,
  PlusOutlined,
  RedoOutlined,
  SendOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import type { DescriptionsProps } from 'antd';
import { Button, Descriptions, Popconfirm, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { Property } from '../typings';
import CustomPropertyForm from './CustomForm';
import { dataDefineItems, ruleFilterData, rwOption, Type, typeOption } from './enum';
import QuickPropertyForm from './QuickForm';

const PropertyList = () => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
  const { run: getSchemaList, activeSchema } = useModel('useSchema');
  const [open, setOpen] = useState<boolean>(false);
  const [openQuick, setOpenQuick] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState<Property>({});
  const [total, setTotal] = useState<number>(0);

  const disabledAdd = !activeSchema.uuid || activeSchema.published;

  // 详情
  const { run: getDetail, data: detail } = useRequest(
    (params: API.getSchemaPropertiesDetailParams) => getSchemaPropertiesDetail(params),
    {
      manual: true,
    },
  );

  // 刷新
  const handleOnReload = () => {
    actionRef.current?.reload();
  };

  // 删除属性
  const { run: remove } = useRequest(
    (params: API.deleteSchemaPropertiesDelParams) => deleteSchemaPropertiesDel(params),
    {
      manual: true,
      onSuccess: () => {
        message.success(formatMessage({ id: 'message.success.remove' }));
        handleOnReload();
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
        handleOnReload();
      },
    });
  };

  const columns: ProColumns<Property>[] = [
    {
      title: formatMessage({ id: 'form.title.name' }),
      dataIndex: 'label',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'schemaMgt.form.title.id' }),
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'form.title.type' }),
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: typeOption,
      width: 100,
    },
    {
      title: formatMessage({ id: 'schemaMgt.form.title.unit' }),
      dataIndex: 'unit',
      width: 100,
    },
    {
      title: formatMessage({ id: 'schemaMgt.form.title.rw' }),
      dataIndex: 'rw',
      valueType: 'select',
      valueEnum: rwOption,
      width: 100,
    },
    {
      title: formatMessage({ id: 'table.title.desc' }),
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'table.title.option' }),
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
  ];

  const expandedRowRender = (record: Property) => {
    const type = record?.type || Type.STRING;
    const data = record?.rule;

    const ruleItems = dataDefineItems
      .filter((r) => ruleFilterData[type].includes(r.key))
      .map((item) => {
        let children = data?.[item.key];
        switch (item.key) {
          case 'range':
            children = `${data?.min} ~ ${data?.max}`;
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

  const toolBarRender = [
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
      ghost
      key="new-property"
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => {
        setInitialValue({});
        setOpen(true);
      }}
      disabled={disabledAdd}
    >
      {formatMessage({ id: 'schemaMgt.button.new.custom' })}
    </Button>,
    <Button
      key="custom-property"
      type="primary"
      icon={<ThunderboltOutlined />}
      onClick={() => setOpenQuick(true)}
      disabled={disabledAdd}
    >
      {formatMessage({ id: 'schemaMgt.button.new.quick' })}
    </Button>,
  ];

  useEffect(() => {
    setInitialValue(detail ? detail : {});
  }, [detail]);

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
        toolBarRender={() => toolBarRender}
      />
      <CustomPropertyForm
        open={open}
        onOpenChange={(visible) => setOpen(visible)}
        initialValue={initialValue}
        reload={handleOnReload}
      />
      <QuickPropertyForm
        open={openQuick}
        onOpenChange={(open) => setOpenQuick(open)}
        reload={handleOnReload}
      />
    </>
  );
};

export default PropertyList;
