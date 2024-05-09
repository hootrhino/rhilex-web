import IndexBorder from '@/components/IndexBorder';
import { message, modal } from '@/components/PopupHack';
import UnitTitle from '@/components/UnitTitle';
import {
  deleteModbusDataSheetDelIds,
  getModbusDataSheetList,
  postModbusDataSheetSheetImport,
  postModbusDataSheetUpdate,
} from '@/services/rulex/moddianweiguanli';
import { omit } from '@/utils/redash';
import { IconFont, validateFormItem } from '@/utils/utils';
import {
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
  LoadingOutlined,
  ReloadOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProDescriptions,
  ProFormCascader,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { Button, Dropdown, Popconfirm, Space, Tooltip, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { funcEnum } from '../enum';

import PageContainer from '@/components/PageContainer';
import StateTag, { StateType } from '@/components/StateTag';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { FormItemType, SheetType } from '@/utils/enum';
import { inRange } from '@/utils/redash';
import type { Rule } from 'antd/es/form';
import { defaultQuantity, modbusDataTypeOptions } from './enum';
import type {
  ModbusDataSheetItem,
  ModbusDataSheetProps,
  removeParams,
  UpdateParams,
} from './typings';
import UploadRule from './UploadRule';

const defaultModbusConfig = {
  tag: '',
  alias: '',
  function: 3,
  frequency: 1000,
  slaverId: 1,
  address: 0,
  quantity: 1,
  type: ['RAW', 'DCBA'],
  weight: 1,
};

const ModbusDataSheet = ({ uuid, type = SheetType.LIST }: ModbusDataSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<ModbusDataSheetItem>>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

  const [title, setTitle] = useState<string>(formatMessage({ id: 'device.title.sheet' }));
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editableRows, setEditableRows] = useState<Partial<ModbusDataSheetItem>[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [polling, setPolling] = useState<number>(3000);
  const [stopPolling, setStopPolling] = useState<boolean>(false);

  const disabled = selectedRowKeys?.length === 0;

  const handleOnReset = () => {
    actionRef.current?.reload();
    editorFormRef.current?.setRowData?.('new', { ...defaultModbusConfig, uuid: 'new' });
    setSelectedRowKeys([]);
    setEditableRows([]);
    setEditableRowKeys([]);
  };

  // 删除点位表
  const { run: remove } = useRequest(
    (params: removeParams) => deleteModbusDataSheetDelIds(params),
    {
      manual: true,
      onSuccess: () => {
        handleOnReset();
        message.success(formatMessage({ id: 'message.success.remove' }));
      },
    },
  );

  // 更新点位表
  const { run: update } = useRequest((params: UpdateParams) => postModbusDataSheetUpdate(params), {
    manual: true,
    onSuccess: () => {
      handleOnReset();
      message.success(formatMessage({ id: 'message.success.update' }));
    },
  });

  const formatUpdateParams = (params: Partial<ModbusDataSheetItem>) => {
    let newParams = {
      ...omit(params, ['type']),
      dataType: params?.type?.[0],
      dataOrder: params?.type?.[1],
      weight: Number(params?.weight),
    };

    return newParams;
  };

  // 批量更新
  const handleOnBatchUpdate = () => {
    const updateData = editableRows?.map((item) => formatUpdateParams(item));
    if (deviceId && updateData) {
      update({ device_uuid: deviceId, modbus_data_points: updateData });
    }
  };

  // 单个更新
  const handleOnSave = async (rowKey: RecordKey, data: Partial<ModbusDataSheetItem>) => {
    let params = formatUpdateParams(data);

    if (rowKey === 'new') {
      params = {
        ...omit(params, ['uuid']),
        device_uuid: deviceId,
      } as any;
    }
    if (deviceId && params) {
      update({ device_uuid: deviceId, modbus_data_points: [params] });
    }
  };

  // 批量删除
  const handleOnBatchRemove = () => {
    const uuids = selectedRowKeys as string[];
    if (uuids && deviceId) {
      const params = {
        device_uuid: deviceId,
        uuids,
      };
      remove(params);
    }
  };

  // 导入点位表
  const { run: upload } = useRequest(
    (id: string, file: File) => postModbusDataSheetSheetImport({ device_uuid: id }, file),
    {
      manual: true,
      onSuccess: () => {
        message.success(formatMessage({ id: 'message.success.upload' }));
        actionRef.current?.reload();
      },
    },
  );

  // 刷新
  const handleOnPolling = () => {
    if (polling) {
      setPolling(0);
      setStopPolling(true);
      return;
    }
    setPolling(3000);
    setStopPolling(false);
  };

  // 设备详情
  const { run } = useRequest((params: API.getDevicesDetailParams) => getDevicesDetail(params), {
    manual: true,
    onSuccess: (record) =>
      setTitle(
        record?.name
          ? formatMessage({ id: 'device.title.sheetList' }, { name: record?.name })
          : formatMessage({ id: 'device.title.sheet' }),
      ),
  });

  const columns: ProColumns<Partial<ModbusDataSheetItem>>[] = [
    {
      title: formatMessage({ id: 'table.index' }),
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      render: (_text, _record, index) => <IndexBorder serial={index} />,
    },
    {
      title: formatMessage({ id: 'device.form.title.slaverId' }),
      dataIndex: 'slaverId',
      valueType: 'digit',
      width: 100,
      fieldProps: {
        style: { width: '100%' },
        placeholder: formatMessage({ id: 'device.form.placeholder.slaverId' }),
      },
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.slaverId' }) },
          {
            max: 255,
            type: 'integer',
            message: formatMessage({ id: 'device.form.rules.slaverId' }),
          },
          { min: 1, type: 'integer', message: formatMessage({ id: 'device.form.rules.slaverId' }) },
        ],
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.tag' }),
      dataIndex: 'tag',
      ellipsis: true,
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'device.form.placeholder.tag' }) }],
      },
      fieldProps: {
        placeholder: formatMessage({ id: 'device.form.placeholder.tag' }),
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.alias' }),
      dataIndex: 'alias',
      ellipsis: true,
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.alias' }) },
        ],
      },
      fieldProps: {
        placeholder: formatMessage({ id: 'device.form.placeholder.alias' }),
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.func' }),
      dataIndex: 'function',
      valueType: 'select',
      width: 150,
      valueEnum: funcEnum,
      renderFormItem: (_, { record }) => (
        <ProFormSelect
          noStyle
          fieldProps={{
            allowClear: false,
            placeholder: formatMessage({ id: 'device.form.placeholder.func' }),
            onChange: (value) => {
              if (value === 1) {
                editorFormRef.current?.setRowData?.(record?.uuid as string, {
                  type: ['BYTE', 'A'],
                  quantity: 1,
                });
              } else {
                editorFormRef.current?.setRowData?.(record?.uuid as string, {
                  type: ['RAW', 'DCBA'],
                  weight: 1,
                });
              }
            },
          }}
          valueEnum={funcEnum}
          rules={[
            { required: true, message: formatMessage({ id: 'device.form.placeholder.func' }) },
          ]}
        />
      ),
    },
    {
      title: formatMessage({ id: 'device.form.title.dataType' }),
      dataIndex: 'type',
      width: 150,
      ellipsis: true,
      renderFormItem: (_, { record }) => {
        let options = modbusDataTypeOptions;

        if (record?.function === 1) {
          options = options?.filter((item) => item.value === 'BYTE');
        }
        if (record?.function === 2) {
          options = options?.filter((item) => !['BYTE', 'UTF8'].includes(item.value));
        }
        if (record?.function && [3, 4].includes(record.function)) {
          options = options?.filter((item) => item.value !== 'BYTE');
        }

        return (
          <ProFormCascader
            noStyle
            disabled={record?.function === 1}
            fieldProps={{
              allowClear: false,
              placeholder: formatMessage({ id: 'device.form.placeholder.dataType' }),
              onChange: (value: any) => {
                const dataType = value?.[0];

                editorFormRef.current?.setRowData?.(record?.uuid as string, {
                  quantity: Number(defaultQuantity[dataType]),
                  weight: dataType === 'UTF8' ? 0 : 1,
                });
              },
              options,
            }}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'device.form.placeholder.dataType' }),
              },
            ]}
          />
        );
      },
      render: (_, { dataType, dataOrder }) => {
        const currentType = modbusDataTypeOptions?.find((item) => item?.value === dataType);
        const typeLabel = currentType?.label?.split('（')?.[0];

        return typeLabel && dataOrder ? (
          <>
            {typeLabel}（{dataOrder}）
          </>
        ) : (
          '-'
        );
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.address' }),
      dataIndex: 'address',
      valueType: 'digit',
      width: 80,
      fieldProps: {
        style: { width: '100%' },
        placeholder: formatMessage({ id: 'device.form.placeholder.address' }),
      },
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.address' }) },
          {
            validator: (_rule: Rule, value: number) =>
              validateFormItem(value, FormItemType.ADDRESS),
          },
        ],
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.quantity' }),
      dataIndex: 'quantity',
      valueType: 'digit',
      width: 100,
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.quantity' }) },
          { min: 1, type: 'integer', message: formatMessage({ id: 'device.form.rules.quantity' }) },
          {
            max: 256,
            type: 'integer',
            message: formatMessage({ id: 'device.form.rules.quantity' }),
          },
        ],
      },
      renderFormItem: () => (
        <ProFormDigit
          noStyle
          disabled={true}
          fieldProps={{
            style: { width: '100%' },
            placeholder: formatMessage({ id: 'device.form.placeholder.quantity' }),
          }}
        />
      ),
    },

    {
      title: formatMessage({ id: 'device.form.title.weight' }),
      dataIndex: 'weight',
      valueType: 'digit',
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.weight' }) },
          {
            validator: (_, value) => {
              if (inRange(value, -0.0001, 100000)) {
                return Promise.resolve();
              }
              return Promise.reject(formatMessage({ id: 'device.form.rules.weight' }));
            },
          },
        ],
      },
      renderFormItem: (_, { record }) => {
        const dataType = record?.type?.[0];

        return (
          <ProFormText
            noStyle
            disabled={['RAW', 'UTF8'].includes(dataType)}
            fieldProps={{ placeholder: formatMessage({ id: 'device.form.placeholder.weight' }) }}
          />
        );
      },
    },
    {
      title: <UnitTitle title={formatMessage({ id: 'device.form.title.frequency' })} />,
      dataIndex: 'frequency',
      valueType: 'digit',
      width: 120,
      fieldProps: {
        style: { width: '100%' },
        placeholder: formatMessage({ id: 'device.form.placeholder.frequency' }),
      },
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.frequency' }) },
        ],
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.value' }),
      dataIndex: 'value',
      editable: false,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'device.form.title.status' }),
      dataIndex: 'status',
      width: 80,
      editable: false,
      renderText: (_, record) => <StateTag state={record?.status || 0} type={StateType.POINT} />,
    },
    {
      title: formatMessage({ id: 'device.form.title.lastFetchTime' }),
      dataIndex: 'lastFetchTime',
      valueType: 'dateTime',
      editable: false,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      width: 150,
      hideInTable: type === SheetType.DETAIL,
      render: (_text, record, _, action) => {
        return (
          <Space align="end">
            <EditableProTable.RecordCreator
              key="copy"
              record={{
                ...record,
                uuid: 'copy',
              }}
            >
              <Tooltip title={formatMessage({ id: 'device.tooltip.copy' })}>
                <a>{formatMessage({ id: 'button.copy' })}</a>
              </Tooltip>
            </EditableProTable.RecordCreator>
            <a
              key="editable"
              onClick={() => {
                if (!record?.uuid) return;
                action?.startEditable?.(record?.uuid);
              }}
            >
              {formatMessage({ id: 'button.edit' })}
            </a>
            <Popconfirm
              title={formatMessage({ id: 'device.modal.title.remove.sheet' })}
              onConfirm={() => {
                if (deviceId && record?.uuid) {
                  remove({ device_uuid: deviceId, uuids: [record?.uuid] });
                }
              }}
              okText={formatMessage({ id: 'button.yes' })}
              cancelText={formatMessage({ id: 'button.no' })}
              key="remove"
            >
              <a>{formatMessage({ id: 'button.remove' })}</a>
            </Popconfirm>
            {record?.status === 0 && (
              <Dropdown
                menu={{
                  items: [{ key: 'error', label: formatMessage({ id: 'button.error' }) }],
                  onClick: () => {
                    modal.error({
                      title: formatMessage({ id: 'device.title.modal.error.sheet' }),
                      content: <div className="flex flex-wrap">{record?.errMsg}</div>,
                    });
                  },
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <DownOutlined />
                </a>
              </Dropdown>
            )}
          </Space>
        );
      },
    },
  ];

  const toolBar = [
    <Button
      key="polling"
      type="primary"
      ghost={!polling}
      onClick={handleOnPolling}
      icon={polling ? <LoadingOutlined /> : <ReloadOutlined />}
    >
      {polling
        ? formatMessage({ id: 'device.button.nonPolling' })
        : formatMessage({ id: 'device.button.polling' })}
    </Button>,
    <Upload
      key="upload"
      accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      showUploadList={false}
      beforeUpload={(file) => {
        modal.confirm({
          title: formatMessage({ id: 'device.modal.title.upload.confirm' }),
          width: '50%',
          content: <UploadRule fileName={file?.name} />,
          onOk: () => deviceId && upload(deviceId, file),
          okText: formatMessage({ id: 'button.ok' }),
          cancelText: formatMessage({ id: 'button.cancel' }),
        });
        return Upload.LIST_IGNORE;
      }}
    >
      <Button type="primary" icon={<DownloadOutlined />}>
        {formatMessage({ id: 'device.button.import.sheet' })}
      </Button>
    </Upload>,
    <Button
      key="batch-update"
      type="primary"
      icon={
        <IconFont
          type={disabled ? 'icon-batch-create-disabled' : 'icon-batch-create'}
          className="text-[16px]"
        />
      }
      onClick={handleOnBatchUpdate}
      disabled={disabled}
    >
      {formatMessage({ id: 'device.button.update.batch' })}
    </Button>,
    <Button
      key="batch-remove"
      danger
      icon={<DeleteOutlined />}
      disabled={disabled}
      onClick={() =>
        modal.confirm({
          title: formatMessage({ id: 'device.modal.title.remove.batchSheet' }),
          content: formatMessage({ id: 'device.modal.content.remove.batchSheet' }),
          onOk: handleOnBatchRemove,
          okText: formatMessage({ id: 'button.ok' }),
          cancelText: formatMessage({ id: 'button.cancel' }),
        })
      }
    >
      {formatMessage({ id: 'device.button.remove.batch' })}
    </Button>,
    <Button
      key="download"
      icon={<UploadOutlined />}
      onClick={() =>
        (window.location.href = `/api/v1/modbus_data_sheet/sheetExport?device_uuid=${deviceId}`)
      }
    >
      {formatMessage({ id: 'device.button.export.sheet' })}
    </Button>,
  ];

  useEffect(() => {
    if (editableKeys.length > 0) {
      // 正在操作
      setPolling(0);
      return;
    } else {
      setPolling(stopPolling ? 0 : 3000);
    }
  }, [editableKeys]);

  useEffect(() => {
    if (deviceId) {
      run({ uuid: deviceId });
    }
  }, [deviceId]);

  return type === SheetType.LIST ? (
    <PageContainer title={title} onBack={() => history.push('/device/list')}>
      <EditableProTable<Partial<ModbusDataSheetItem>>
        controlled
        rowKey="uuid"
        actionRef={actionRef}
        editableFormRef={editorFormRef}
        columns={columns}
        polling={polling}
        rootClassName="stripe-table"
        recordCreatorProps={{
          position: 'top',
          creatorButtonText: formatMessage({ id: 'device.button.new.sheet' }),
          record: () => ({
            ...defaultModbusConfig,
            uuid: 'new',
          }),
        }}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        toolBarRender={() => toolBar}
        request={async ({ current = 1, pageSize = 10 }) => {
          const { data } = await getModbusDataSheetList({
            device_uuid: deviceId,
            current,
            size: pageSize,
          });

          return Promise.resolve({
            data: data?.records?.map((item) => ({
              ...item,
              type: [item?.dataType, item?.dataOrder],
            })),
            total: data?.total,
            success: true,
          });
        }}
        pagination={{
          defaultPageSize: 10,
          hideOnSinglePage: true,
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: handleOnSave,
          onChange: setEditableRowKeys,
          onValuesChange: (_record, dataSource) => {
            setEditableRows(dataSource);
          },
        }}
      />
    </PageContainer>
  ) : (
    <>
      <ProDescriptions
        title={
          <>
            <span>{formatMessage({ id: 'device.title.sheet' })}</span>
            <span className="text-[12px] opacity-[.8] pl-[5px] font-normal">
              ({formatMessage({ id: 'device.tips.scroll' })})
            </span>
          </>
        }
      />
      <ProTable
        rowKey="uuid"
        columns={columns}
        rootClassName="stripe-table"
        request={async ({ current = 1, pageSize = 10 }) => {
          const { data } = await getModbusDataSheetList({
            device_uuid: uuid,
            current,
            size: pageSize,
          });

          return Promise.resolve({
            data: data?.records?.map((item) => ({
              ...item,
              type: [item?.dataType, item?.dataOrder],
            })),
            total: data?.total,
            success: true,
          });
        }}
        pagination={{
          defaultPageSize: 10,
          hideOnSinglePage: true,
        }}
        options={false}
        search={false}
        scroll={{ x: 1200 }}
        toolBarRender={false}
      />
    </>
  );
};

export default ModbusDataSheet;
