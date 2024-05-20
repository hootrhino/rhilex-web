import IndexBorder from '@/components/IndexBorder';
import { message, modal } from '@/components/PopupHack';
import {
  deleteModbusDataSheetDelIds,
  getModbusDataSheetList,
  postModbusDataSheetSheetImport,
  postModbusDataSheetUpdate,
} from '@/services/rulex/moddianweiguanli';
import { omit } from '@/utils/redash';
import { IconFont } from '@/utils/utils';
import {
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
  LoadingOutlined,
  ReloadOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProTable } from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { Button, Dropdown, Popconfirm, Space, Tooltip, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';

import PageContainer from '@/components/PageContainer';
import StateTag, { StateType } from '@/components/StateTag';
import UploadSheetConfirm from '@/components/UploadSheetConfirm';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { SheetType } from '@/utils/enum';
import { ObjectType } from './enum';
import type {
  BacnetDataSheetItem,
  BacnetDataSheetProps,
  removeParams,
  UpdateParams,
} from './typings';

const defaultBacnetConfig = {
  bacnetDeviceId: 1,
  tag: '',
  alias: '',
  objectType: ObjectType.AI,
  objectId: 1,
};

const defaultUploadData = {
  bacnetDeviceId: 1,
  tag: 'tag1',
  alias: 'tag1',
  objectType: ObjectType.AI,
  objectId: 1,
};

const BacnetDataSheet = ({ uuid, type = SheetType.LIST }: BacnetDataSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<BacnetDataSheetItem>>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

  const [title, setTitle] = useState<string>(formatMessage({ id: 'device.title.sheet' }));
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editableRows, setEditableRows] = useState<Partial<BacnetDataSheetItem>[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [polling, setPolling] = useState<number>(3000);
  const [stopPolling, setStopPolling] = useState<boolean>(false);

  const disabled = selectedRowKeys?.length === 0;

  const handleOnReset = () => {
    actionRef.current?.reload();
    editorFormRef.current?.setRowData?.('new', { ...defaultBacnetConfig, uuid: 'new' });
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

  const formatUpdateParams = (params: Partial<BacnetDataSheetItem>) => {
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
      update({ device_uuid: deviceId, points: updateData });
    }
  };

  // 单个更新
  const handleOnSave = async (rowKey: RecordKey, data: Partial<BacnetDataSheetItem>) => {
    let params = formatUpdateParams(data);

    if (rowKey === 'new') {
      params = {
        ...omit(params, ['uuid']),
        device_uuid: deviceId,
      } as any;
    }
    if (deviceId && params) {
      update({ device_uuid: deviceId, points: [params] });
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

  const columns: ProColumns<Partial<BacnetDataSheetItem>>[] = [
    {
      title: formatMessage({ id: 'table.index' }),
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      render: (_text, _record, index) => <IndexBorder serial={index} />,
    },
    {
      title: '设备 ID',
      dataIndex: 'bacnetDeviceId',
      valueType: 'digit',
      width: 100,
      formItemProps: {
        rules: [{ required: true, message: '请输入设备 ID' }],
      },
      fieldProps: {
        style: { width: '100%' },
        placeholder: '请输入设备 ID',
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
      title: '对象类型',
      dataIndex: 'objectType',
      valueType: 'select',
      width: 150,
      valueEnum: ObjectType,
      formItemProps: {
        rules: [{ required: true, message: '请选择对象类型' }],
      },
      fieldProps: {
        allowClear: false,
        placeholder: '请选择对象类型',
      },
    },
    {
      title: '对象 ID',
      dataIndex: 'objectId',
      width: 150,
      valueType: 'digit',
      formItemProps: {
        rules: [
          { required: true, message: '请输入对象 ID' },
          { min: 0, message: '请输入有效的对象 ID，范围为 0-4194303', type: 'integer' },
          { max: 4194303, message: '请输入有效的对象 ID，范围为 0-4194303', type: 'integer' },
        ],
      },
      fieldProps: {
        allowClear: false,
        placeholder: '请输入对象 ID',
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
          content: <UploadSheetConfirm fileName={file?.name} initialValue={defaultUploadData} />,
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
      {formatMessage({ id: 'device.button.update.bulk' })}
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
      {formatMessage({ id: 'device.button.remove.bulk' })}
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
      <EditableProTable<Partial<BacnetDataSheetItem>>
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
            ...defaultBacnetConfig,
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
          showSizeChanger: false,
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
          showSizeChanger: false,
        }}
        options={false}
        search={false}
        toolBarRender={false}
      />
    </>
  );
};

export default BacnetDataSheet;
