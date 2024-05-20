import IndexBorder from '@/components/IndexBorder';
import PageContainer from '@/components/PageContainer';
import { message, modal } from '@/components/PopupHack';
import StateTag, { StateType } from '@/components/StateTag';
import UploadSheetConfirm from '@/components/UploadSheetConfirm';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import {
  deleteSnmpOidsSheetDelIds,
  getSnmpOidsSheetList,
  postSnmpOidsSheetSheetImport,
  postSnmpOidsSheetUpdate,
} from '@/services/rulex/snmpdianweiguanli';
import { SheetType } from '@/utils/enum';
import { omit } from '@/utils/redash';
import { IconFont } from '@/utils/utils';
import {
  DeleteOutlined,
  DownloadOutlined,
  LoadingOutlined,
  ReloadOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { getIntl, getLocale, history, useIntl, useParams, useRequest } from '@umijs/max';
import { Button, Popconfirm, Space, Tooltip, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { removeParams, SnmpDataSheetItem, SnmpOidsSheetProps, UpdateParams } from './typings';

const defaultSnmpConfig = {
  oid: '',
  tag: '',
  alias: '',
  frequency: 1000,
};

const defaultUploadData = {
  oid: '.1.3.6.1.2.1.1.1.0',
  tag: 'Total Processes',
  alias: '线程总数',
  frequency: 1000,
};

const DEFAULT_TITLE = getIntl(getLocale()).formatMessage({ id: 'device.title.oid' });

const SnmpOidsSheet = ({ type = SheetType.LIST, uuid }: SnmpOidsSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<SnmpDataSheetItem>>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

  const [title, setTitle] = useState<string>(DEFAULT_TITLE);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [editableRows, setEditableRows] = useState<Partial<SnmpDataSheetItem>[]>([]);
  const [polling, setPolling] = useState<number>(3000);
  const [stopPolling, setStopPolling] = useState<boolean>(false);

  const disabled = selectedRowKeys?.length === 0;

  // 设备详情
  const { run } = useRequest((params: API.getDevicesDetailParams) => getDevicesDetail(params), {
    manual: true,
    onSuccess: (record) =>
      setTitle(
        record?.name
          ? formatMessage({ id: 'device.title.oidList' }, { name: record?.name })
          : DEFAULT_TITLE,
      ),
  });

  const handleOnReset = () => {
    actionRef.current?.reload();
    editorFormRef.current?.setRowData?.('new', { ...defaultSnmpConfig, uuid: 'new' });
    setSelectedRowKeys([]);
    setEditableRows([]);
    setEditableRowKeys([]);
  };

  // 删除
  const { run: remove } = useRequest((params: removeParams) => deleteSnmpOidsSheetDelIds(params), {
    manual: true,
    onSuccess: () => {
      handleOnReset();
      message.success(formatMessage({ id: 'message.success.remove' }));
    },
  });

  // 更新
  const { run: update } = useRequest((params: UpdateParams) => postSnmpOidsSheetUpdate(params), {
    manual: true,
    onSuccess: () => {
      handleOnReset();
      message.success(formatMessage({ id: 'message.success.update' }));
    },
  });

  const formatUpdateParams = (params: Partial<SnmpDataSheetItem>) => {
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
      update({ device_uuid: deviceId, snmp_oids: updateData });
    }
  };

  // 单个更新
  const handleOnSave = async (rowKey: RecordKey, data: Partial<SnmpDataSheetItem>) => {
    let params = formatUpdateParams(data);

    if (rowKey === 'new') {
      params = {
        ...omit(params, ['uuid']),
        device_uuid: deviceId,
      } as any;
    }
    if (deviceId && params) {
      update({ device_uuid: deviceId, snmp_oids: [params] });
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

  // 导入
  const { run: upload } = useRequest(
    (id: string, file: File) => postSnmpOidsSheetSheetImport({ device_uuid: id }, file),
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

  const columns: ProColumns<Partial<SnmpDataSheetItem>>[] = [
    {
      title: formatMessage({ id: 'table.index' }),
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      render: (text, record, index) => <IndexBorder serial={index} />,
    },
    {
      title: formatMessage({ id: 'device.form.title.oid' }),
      dataIndex: 'oid',
      ellipsis: true,
      fieldProps: {
        placeholder: formatMessage({ id: 'device.form.placeholder.oid' }),
      },
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'device.form.placeholder.oid' }) }],
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.tag' }),
      dataIndex: 'tag',
      ellipsis: true,
      fieldProps: {
        placeholder: formatMessage({ id: 'device.form.placeholder.tag' }),
      },
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'device.form.placeholder.tag' }) }],
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.alias' }),
      dataIndex: 'alias',
      fieldProps: {
        placeholder: formatMessage({ id: 'device.form.placeholder.alias' }),
      },
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.alias' }) },
        ],
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.frequency' }),
      dataIndex: 'frequency',
      valueType: 'digit',
      width: 100,
      fieldProps: {
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
      width: 200,
      hideInTable: type === SheetType.DETAIL,
      render: (text, record, _, action) => {
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
              title={formatMessage({ id: 'device.modal.title.remove.oid' })}
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
              <a
                key="error"
                onClick={() => {
                  modal.error({
                    title: formatMessage({ id: 'device.title.modal.error.oid' }),
                    content: <div className="flex flex-wrap">{record?.errMsg}</div>,
                    okText: formatMessage({ id: 'button.close' }),
                  });
                }}
              >
                {formatMessage({ id: 'button.error' })}
              </a>
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
          title: formatMessage({ id: 'device.modal.title.upload.confirm.oid' }),
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
        {formatMessage({ id: 'device.button.import.oid' })}
      </Button>
    </Upload>,
    <Button
      key="bulk-update"
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
      key="bulk-remove"
      danger
      icon={<DeleteOutlined />}
      disabled={disabled}
      onClick={() =>
        modal.confirm({
          title: formatMessage({ id: 'device.modal.title.remove.batchOid' }),
          content: formatMessage({ id: 'device.modal.content.remove.batchOid' }),
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
      {formatMessage({ id: 'device.button.export.oid' })}
    </Button>,
  ];

  return type === SheetType.LIST ? (
    <PageContainer title={title} onBack={() => history.push('/device/list')}>
      <EditableProTable<Partial<SnmpDataSheetItem>>
        controlled
        rowKey="uuid"
        actionRef={actionRef}
        editableFormRef={editorFormRef}
        columns={columns}
        polling={polling}
        rootClassName="stripe-table"
        recordCreatorProps={{
          position: 'top',
          creatorButtonText: formatMessage({ id: 'device.button.new.object' }),
          record: () => ({
            ...defaultSnmpConfig,
            uuid: 'new',
          }),
        }}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        toolBarRender={() => toolBar}
        params={{ deviceId }}
        request={async ({ current = 1, pageSize = 10 }) => {
          const { data } = await getSnmpOidsSheetList({
            device_uuid: deviceId,
            current,
            size: pageSize,
          });

          return Promise.resolve({
            data: data?.records,
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
          onValuesChange: (record, dataSource) => {
            setEditableRows(dataSource);
          },
        }}
      />
    </PageContainer>
  ) : (
    <>
      <ProDescriptions title={DEFAULT_TITLE} />
      <ProTable
        rowKey="uuid"
        columns={columns}
        rootClassName="stripe-table"
        request={async ({ current = 1, pageSize = 10 }) => {
          const { data } = await getSnmpOidsSheetList({
            device_uuid: uuid,
            current,
            size: pageSize,
          });

          return Promise.resolve({
            data: data?.records,
            total: data?.total,
            success: true,
          });
        }}
        pagination={{
          defaultPageSize: 10,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
        toolBarRender={false}
        options={false}
        search={false}
      />
    </>
  );
};

export default SnmpOidsSheet;
