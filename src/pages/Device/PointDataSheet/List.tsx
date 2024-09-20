import { message, modal } from '@/components/PopupHack';
import { defaultPagination } from '@/utils/constant';
import {
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
  LoadingOutlined,
  ReloadOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { EditableProTableProps } from '@ant-design/pro-components';
import { EditableProTable, PageContainer } from '@ant-design/pro-components';
import { history, useIntl, useParams } from '@umijs/max';
import { Button, Dropdown, Popconfirm, Space, Tooltip, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { DeviceType } from '../enum';
import { defaultConfig, defaultUploadData } from './initialValue';
import { DataType, ValueType } from './typings';
import UploadSheetConfirm from './UploadModal';

type PointDataSheetTableProps = EditableProTableProps<DataType, ValueType> & {
  deviceType: DeviceType;
  deviceName: string;
};

const POLLING_INTERVAL = 3000;

const PointDataSheetTablePage = ({
  columns,
  deviceType,
  deviceName,
  ...props
}: PointDataSheetTableProps) => {
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [polling, setPolling] = useState<number>(POLLING_INTERVAL);
  const [stopPolling, setStopPolling] = useState<boolean>(false);

  const disabled = selectedRowKeys?.length === 0;
  const hasEditabledItem = editableKeys.length > 0;

  // 刷新
  const handleOnPolling = () => {
    if (polling) {
      setPolling(0);
      setStopPolling(true);
      return;
    }
    setPolling(POLLING_INTERVAL);
    setStopPolling(false);
  };

  const handleOnOnlyOneEdit = () => {
    message.warning(formatMessage({ id: 'device.message.onlyOneEdit' }));
  };

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
          content: (
            <UploadSheetConfirm
              fileName={file?.name}
              initialValue={defaultUploadData[deviceType]}
            />
          ),
          // TODO onOk: () => upload(file),
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
      key="batch-remove"
      danger
      icon={<DeleteOutlined />}
      disabled={disabled}
      onClick={() =>
        modal.confirm({
          title: formatMessage({ id: 'device.modal.title.remove.batchSheet' }),
          content: formatMessage({ id: 'device.modal.content.remove.batchSheet' }),
          onOk: () => {
            // TODO handleOnBatchRemove
          },
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
      onClick={() => {
        // TODO download
      }}
    >
      {formatMessage({ id: 'device.button.export.sheet' })}
    </Button>,
  ];

  const formatColumns =
    columns &&
    columns.concat([
      {
        title: formatMessage({ id: 'table.title.option' }),
        valueType: 'option',
        width: 150,
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
                disabled={hasEditabledItem}
                title={formatMessage({ id: 'device.modal.title.remove.sheet' })}
                onConfirm={() => {
                  // TODO remove([record?.uuid])
                }}
                okText={formatMessage({ id: 'button.yes' })}
                cancelText={formatMessage({ id: 'button.no' })}
                key="remove"
              >
                <a onClick={() => hasEditabledItem && handleOnOnlyOneEdit()}>
                  {formatMessage({ id: 'button.remove' })}
                </a>
              </Popconfirm>

              {record?.status === 0 && (
                <Dropdown
                  menu={{
                    items: [{ key: 'error', label: formatMessage({ id: 'button.error' }) }],
                    onClick: () => {
                      if (hasEditabledItem) {
                        handleOnOnlyOneEdit();
                      } else {
                        modal.error({
                          title: formatMessage({ id: 'device.title.modal.error.sheet' }),
                          content: <div className="flex flex-wrap">{record?.errMsg}</div>,
                          okText: formatMessage({ id: 'button.close' }),
                        });
                      }
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
    ]);

  useEffect(() => {
    if (editableKeys.length > 0) {
      // 正在操作
      setPolling(0);
      return;
    } else {
      setPolling(stopPolling ? 0 : POLLING_INTERVAL);
    }
  }, [editableKeys]);

  return (
    <PageContainer
      title={formatMessage(
        {
          id: `device.title.${
            deviceType === DeviceType.GENERIC_SNMP ? 'snmpOidList' : 'sheetList'
          }`,
        },
        { name: deviceName },
      )}
      onBack={() => history.push('/device/list')}
    >
      <EditableProTable<DataType>
        controlled
        columns={formatColumns}
        polling={polling}
        scroll={{ x: 1200 }}
        rootClassName="stripe-table"
        recordCreatorProps={{
          position: 'top',
          creatorButtonText: formatMessage({ id: 'device.button.new.sheet' }),
          record: () => ({
            ...defaultConfig[deviceType],
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
          type: 'single',
          editableKeys,
          onSave: async () => {
            // TODO handleOnSave
          },
          onChange: setEditableRowKeys,
          actionRender: (_row, _config, defaultDom) => [defaultDom.save, defaultDom.cancel],
        }}
        onValuesChange={(values, record) => {
          // TODO 处理 modbus 依赖
          console.log(values, record);
        }}
        {...props}
      />
    </PageContainer>
  );
};

export default PointDataSheetTablePage;
