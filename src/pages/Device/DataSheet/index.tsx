import IndexBorder from '@/components/IndexBorder';
import { modal } from '@/components/PopupHack';
import { IconFont } from '@/utils/utils';
import {
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
  LoadingOutlined,
  ReloadOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { Button, Dropdown, Popconfirm, Space, Tooltip, Upload } from 'antd';
import { useEffect, useState } from 'react';

import PageContainer from '@/components/ProPageContainer';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { SheetType } from '@/utils/enum';

import ProTag, { StatusType } from '@/components/ProTag';
import { defaultPagination } from '@/utils/constant';
import { omit } from '@/utils/redash';
import UploadSheetConfirm from './ConfirmModal';
import type { DataSheetItem, DataSheetProps } from './typings';

const DataSheet = ({
  type = SheetType.LIST,
  columns,
  defaultConfig,
  defaultUploadData,
  remove,
  update,
  upload,
  download,
  ...props
}: DataSheetProps) => {
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

  const [title, setTitle] = useState<string>(formatMessage({ id: 'device.title.sheet' }));
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editableRows, setEditableRows] = useState<Partial<DataSheetItem>[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [polling, setPolling] = useState<number>(3000);
  const [stopPolling, setStopPolling] = useState<boolean>(false);

  const disabled = selectedRowKeys?.length === 0;

  const handleOnReset = () => {
    setSelectedRowKeys([]);
    setEditableRows([]);
    setEditableRowKeys([]);
  };

  // 批量更新
  const handleOnBatchUpdate = () => {
    if (deviceId && editableRows) {
      update(editableRows);
      handleOnReset();
    }
  };

  // 单个更新
  const handleOnSave = async (rowKey: RecordKey, data: Partial<DataSheetItem>) => {
    let params = data;

    if (rowKey === 'new') {
      params = {
        ...omit(params, ['uuid']),
        device_uuid: deviceId,
      } as any;
    }
    update([params]);
    handleOnReset();
  };

  // 批量删除
  const handleOnBatchRemove = () => {
    remove(selectedRowKeys);
    handleOnReset();
  };

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

  const baseColumns: ProColumns<Partial<DataSheetItem>>[] = [
    {
      title: formatMessage({ id: 'table.index' }),
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      render: (_text, _record, index) => <IndexBorder serial={index} />,
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
    ...columns,
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
      renderText: (_, record) => <ProTag type={StatusType.POINT}>{record?.status || 0}</ProTag>,
    },
    {
      title: formatMessage({ id: 'device.form.title.lastFetchTime' }),
      dataIndex: 'lastFetchTime',
      valueType: 'dateTime',
      editable: false,
      ellipsis: true,
      width: 160,
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
              onConfirm={() => remove([record?.uuid])}
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
          width: '60%',
          content: <UploadSheetConfirm fileName={file?.name} initialValue={defaultUploadData} />,
          onOk: () => upload(file),
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
    <Button key="download" icon={<UploadOutlined />} onClick={download}>
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
      <EditableProTable<Partial<DataSheetItem>>
        controlled
        columns={baseColumns}
        polling={polling}
        rootClassName="stripe-table"
        recordCreatorProps={{
          position: 'top',
          creatorButtonText: formatMessage({ id: 'device.button.new.sheet' }),
          record: () => ({
            ...defaultConfig,
            uuid: 'new',
          }),
        }}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        toolBarRender={() => toolBar}
        pagination={defaultPagination}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: handleOnSave,
          onChange: setEditableRowKeys,
          onValuesChange: (_record, dataSource) => {
            setEditableRows(dataSource);
          },
        }}
        {...props}
      />
    </PageContainer>
  ) : (
    <>
      <ProDescriptions
        title={
          <>
            <span>{formatMessage({ id: 'device.title.sheet' })}</span>
            {props?.scroll && (
              <span className="text-[12px] opacity-[.8] pl-[5px] font-normal">
                ({formatMessage({ id: 'device.tips.scroll' })})
              </span>
            )}
          </>
        }
      />
      <ProTable
        columns={baseColumns}
        rootClassName="stripe-table"
        options={false}
        search={false}
        toolBarRender={false}
        pagination={defaultPagination}
        {...props}
      />
    </>
  );
};

export default DataSheet;
