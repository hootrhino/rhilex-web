import IndexBorder from '@/components/IndexBorder';
import PageContainer from '@/components/PageContainer';
import { message, modal } from '@/components/PopupHack';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import {
  deleteS1200DataSheetDelIds,
  getS1200DataSheetList,
  postS1200DataSheetSheetImport,
  postS1200DataSheetUpdate,
} from '@/services/rulex/ximenzidianweiguanli';
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
import {
  EditableProTable,
  ProDescriptions,
  ProFormCascader,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { Button, Dropdown, Popconfirm, Space, Tooltip, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { plcDataTypeOptions } from './enum';

import StateTag, { StateType } from '@/components/StateTag';
import UnitTitle from '@/components/UnitTitle';
import UploadSheetConfirm from '@/components/UploadSheetConfirm';
import { SheetType } from '@/utils/enum';
import { inRange } from '@/utils/redash';
import type { PlcSheetItem, PlcSheetProps, removeParams, UpdateParams } from './typings';

const defaultPlcConfig = {
  tag: '',
  alias: '',
  type: ['FLOAT', 'DCBA'],
  siemensAddress: '',
  frequency: 1000,
  weight: 1,
};

const defaultUploadData = {
  address: 'DB4900.DBD1000',
  tag: 'R0',
  alias: '新砂轮直径（mm）',
  type: 'FLOAT',
  order: 'ABCD',
  weight: 1,
  frequency: 1000,
};

const PlcDataSheet = ({ uuid, type = SheetType.LIST }: PlcSheetProps) => {
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();
  const [title, setTitle] = useState<string>(formatMessage({ id: 'device.title.sheet' }));
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<PlcSheetItem>>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [editableRows, setEditableRows] = useState<Partial<PlcSheetItem>[]>([]);
  const [polling, setPolling] = useState<number>(3000);
  const [stopPolling, setStopPolling] = useState<boolean>(false);

  const disabled = selectedRowKeys?.length === 0;

  const handleOnReset = () => {
    actionRef.current?.reload();
    editorFormRef.current?.setRowData?.('new', { ...defaultPlcConfig, uuid: 'new' });
    setSelectedRowKeys([]);
    setEditableRows([]);
    setEditableRowKeys([]);
  };

  // 删除点位表
  const { run: remove } = useRequest((params: removeParams) => deleteS1200DataSheetDelIds(params), {
    manual: true,
    onSuccess: () => {
      handleOnReset();
      message.success(formatMessage({ id: 'message.success.remove' }));
    },
  });

  // 更新点位表
  const { run: update } = useRequest((params: UpdateParams) => postS1200DataSheetUpdate(params), {
    manual: true,
    onSuccess: () => {
      handleOnReset();
      message.success(formatMessage({ id: 'message.success.update' }));
    },
  });

  const formatUpdateParams = (params: Partial<PlcSheetItem>) => {
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
      update({ device_uuid: deviceId, siemens_data_points: updateData });
    }
  };

  // 单个更新
  const handleOnSave = async (rowKey: RecordKey, data: Partial<PlcSheetItem>) => {
    let params = formatUpdateParams(data);

    if (rowKey === 'new') {
      params = {
        ...omit(params, ['uuid']),
        device_uuid: deviceId,
      } as any;
    }
    if (deviceId && params) {
      update({ device_uuid: deviceId, siemens_data_points: [params] });
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
    (id: string, file: File) => postS1200DataSheetSheetImport({ device_uuid: id }, file),
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

  const columns: ProColumns<Partial<PlcSheetItem>>[] = [
    {
      title: formatMessage({ id: 'table.index' }),
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      render: (text, record, index) => <IndexBorder serial={index} />,
    },
    {
      title: formatMessage({ id: 'device.form.title.siemensAddress' }),
      dataIndex: 'siemensAddress',
      width: 150,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'device.form.placeholder.siemensAddress' }),
          },
        ],
      },
      fieldProps: {
        placeholder: formatMessage({ id: 'device.form.placeholder.siemensAddress' }),
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.tag' }),
      dataIndex: 'tag',
      width: 120,
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'device.form.placeholder.tag' }) }],
      },
      fieldProps: { placeholder: formatMessage({ id: 'device.form.placeholder.tag' }) },
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
      fieldProps: { placeholder: formatMessage({ id: 'device.form.placeholder.alias' }) },
    },
    {
      title: formatMessage({ id: 'device.form.title.dataType' }),
      dataIndex: 'type',
      width: 150,
      renderFormItem: () => (
        <ProFormCascader
          noStyle
          fieldProps={{
            allowClear: false,
            placeholder: formatMessage({ id: 'device.form.placeholder.dataType' }),
            options: plcDataTypeOptions,
          }}
          rules={[
            { required: true, message: formatMessage({ id: 'device.form.placeholder.dataType' }) },
          ]}
        />
      ),
      render: (_, { dataType, dataOrder }) => {
        const currentType = plcDataTypeOptions?.find((item) => item?.value === dataType);
        const typeLabel = currentType?.label?.split('（')?.[0];

        return typeLabel && dataOrder ? (
          <>
            {typeLabel}（{dataOrder}）
          </>
        ) : (
          '-'
        );
      },
      search: {
        // 格式化搜索值
        transform: (value) => ({
          dataType: value[0],
          dataOrder: value[1],
        }),
      },
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
        const type = record?.type?.[0];

        return (
          <ProFormText
            noStyle
            disabled={['RAW', 'BYTE', 'I', 'Q'].includes(type)}
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
      editable: false,
      width: 80,
      renderText: (_, record) => <StateTag state={record?.status || 0} type={StateType.POINT} />,
    },
    {
      title: formatMessage({ id: 'device.form.title.lastFetchTime' }),
      dataIndex: 'lastFetchTime',
      valueType: 'dateTime',
      editable: false,
    },
    {
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      hideInTable: type === SheetType.DETAIL,
      width: 150,
      render: (text, record, _, action) => {
        return (
          <Space>
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
        (window.location.href = `/api/v1/s1200_data_sheet/sheetExport?device_uuid=${deviceId}`)
      }
    >
      {formatMessage({ id: 'device.button.export.sheet' })}
    </Button>,
  ];

  return type === SheetType.LIST ? (
    <PageContainer title={title} onBack={() => history.push('/device/list')}>
      <EditableProTable<Partial<PlcSheetItem>>
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
            ...defaultPlcConfig,
            uuid: 'new',
          }),
        }}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: (keys) => {
            setSelectedRowKeys(keys);
          },
        }}
        toolBarRender={() => toolBar}
        request={async ({ current = 1, pageSize = 10, ...keyword }) => {
          const { data } = await getS1200DataSheetList({
            device_uuid: deviceId,
            current,
            size: pageSize,
            ...keyword,
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
          onValuesChange: (record, dataSource) => {
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
        request={async ({ current = 1, pageSize = 10, ...keyword }) => {
          const { data } = await getS1200DataSheetList({
            device_uuid: uuid,
            current,
            size: pageSize,
            ...keyword,
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
        scroll={{ x: 1100 }}
      />
    </>
  );
};

export default PlcDataSheet;
