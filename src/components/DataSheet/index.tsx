import IndexBorder from '@/components/IndexBorder';
import { message, modal } from '@/components/PopupHack';
import {
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
  ExceptionOutlined,
  FileSyncOutlined,
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
import ProTag, { StatusType } from '@/components/ProTag';
import { DeviceType } from '@/pages/Device/enum';
import { getDevicesDetail } from '@/services/rhilex/shebeiguanli';
import { defaultPagination, DEVICE_LIST } from '@/utils/constant';
import { omit } from '@/utils/redash';
import type { ItemType } from 'antd/es/menu/interface';
import type { MenuInfo } from 'rc-menu/lib/interface';
import UploadSheetConfirm from './ConfirmModal';
import type { DataSheetItem, DataSheetProps, DataSheetValue } from './typings';
import UpdateRegister from './UpdateRegister';

const POLLING_INTERVAL = 3000;

const downloadType = {
  [DeviceType.GENERIC_SNMP]: 'snmp_oids_sheet',
  [DeviceType.SIEMENS_PLC]: 's1200_data_sheet',
  [DeviceType.GENERIC_MODBUS_MASTER]: 'modbus_master_sheet',
  [DeviceType.GENERIC_MBUS_EN13433_MASTER]: 'mbus_master_sheet',
  [DeviceType.GENERIC_BACNET_IP]: 'bacnetip_data_sheet',
  [DeviceType.BACNET_ROUTER_GW]: 'bacnet_router_sheet',
  [DeviceType.DLT6452007_MASTER]: 'dlt6452007_master_sheet',
  [DeviceType.CJT1882004_MASTER]: 'cjt1882004_master_sheet',
  [DeviceType.SZY2062016_MASTER]: 'szy2062016_master_sheet',
  [DeviceType.GENERIC_USER_PROTOCOL]: 'user_protocol_sheet',
};

const isValidArrayType = (array: any[]): array is DataSheetValue[] => {
  return array.every((item) => ['boolean', 'string', 'number'].includes(typeof item));
};

const DataSheet = ({
  columns,
  defaultConfig,
  defaultUploadData,
  remove,
  update,
  upload,
  isDetail,
  ...props
}: DataSheetProps) => {
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

  const [title, setTitle] = useState<string>(formatMessage({ id: 'device.title.sheet' }));
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [polling, setPolling] = useState<number>(POLLING_INTERVAL);
  const [stopPolling, setStopPolling] = useState<boolean>(false);
  const [updateRegisterData, setRegisterData] = useState<{
    open: boolean;
    data?: Partial<DataSheetItem>;
  }>({ open: false });

  const disabled = selectedRowKeys?.length === 0;
  const hasEditabledItem = editableKeys.length > 0;

  const deviceType = localStorage.getItem('deviceType') || '';

  const handleOnReset = () => {
    setSelectedRowKeys([]);
    setEditableRowKeys([]);
  };

  const handleOnReload = () => {
    props?.actionRef.current.reload();
  };

  // 单个更新
  const handleOnSave = async (rowKey: RecordKey, data: Partial<DataSheetItem>) => {
    let dataPoints = [data];

    if (rowKey === 'new') {
      dataPoints = [
        {
          ...omit(dataPoints[0], ['uuid']),
          device_uuid: deviceId,
        },
      ];
    }

    update({ device_uuid: deviceId, data_points: dataPoints });
    handleOnReload();
    handleOnReset();

    message.success(formatMessage({ id: 'message.success.update' }));
  };

  // 删除
  const handleOnRemove = (uuids: React.Key[]) => {
    try {
      if (!deviceId && uuids.length === 0) return;
      const params = {
        device_uuid: deviceId,
        uuids,
      };
      remove(params);
      handleOnReload();

      message.success(formatMessage({ id: 'message.success.remove' }));
    } catch (error) {
      console.log(error);
    }
  };

  // 批量删除
  const handleOnBatchRemove = () => {
    handleOnRemove(selectedRowKeys);
    handleOnReset();
  };

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

  // 设备详情
  const { run } = useRequest((params: API.getDevicesDetailParams) => getDevicesDetail(params), {
    manual: true,
    onSuccess: (record) => {
      const isSnmp = record.type === DeviceType.GENERIC_SNMP;

      setTitle(
        record?.name
          ? formatMessage(
              { id: `device.title.${isSnmp ? 'snmpOidList' : 'sheetList'}` },
              { name: record?.name },
            )
          : formatMessage({ id: `device.title.${isSnmp ? 'oid' : 'sheet'}` }),
      );
    },
  });

  const handleOnOnlyOneEdit = () => {
    message.warning(formatMessage({ id: 'device.message.onlyOneEdit' }));
  };

  // 导入
  const handleOnUpload = (file: File) => {
    if (!deviceId) return;

    const params = {
      device_uuid: deviceId,
      file,
    };

    upload(params);
    handleOnReload();
    message.success(formatMessage({ id: 'message.success.upload' }));
  };

  // 导出点位表
  const handleOnDownload = () =>
    (window.location.href = `/api/v1/${downloadType[deviceType]}/sheetExport?device_uuid=${deviceId}`);

  // Dropdown Menu
  const getMenu = ({ status }: Partial<DataSheetItem>) => {
    let menus: ItemType[] = [];

    if (status === 0) {
      menus = [
        ...menus,
        {
          key: 'exception-detail',
          label: formatMessage({ id: 'button.error' }),
          icon: <ExceptionOutlined />,
        },
      ];
    }
    if (deviceType === DeviceType.GENERIC_MODBUS_MASTER) {
      menus = [
        ...menus,
        {
          key: 'update-register',
          label: formatMessage({ id: 'device.button.update.register' }),
          icon: <FileSyncOutlined />,
        },
      ];
    }
    return menus;
  };

  const handleOnMenu = ({ key }: MenuInfo, record: Partial<DataSheetItem>) => {
    if (hasEditabledItem) {
      handleOnOnlyOneEdit();
    } else {
      switch (key) {
        case 'exception-detail':
          modal.error({
            title: formatMessage({ id: 'common.title.exception' }),
            content: <div className="break-words">{record?.errMsg}</div>,
            okText: formatMessage({ id: 'button.close' }),
          });
          break;
        case 'update-register':
          setRegisterData({ open: true, data: record });
          break;
      }
    }
  };

  const baseColumns: ProColumns<Partial<DataSheetItem>>[] = [
    {
      title: formatMessage({ id: 'table.title.index' }),
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      render: (_text, _record, index) => <IndexBorder serial={index} />,
    },
    {
      title: formatMessage({ id: 'device.form.title.status' }),
      dataIndex: 'status',
      width: 80,
      editable: false,
      hideInTable: !!deviceId,
      renderText: (_, record) => <ProTag type={StatusType.POINT}>{record?.status || 0}</ProTag>,
    },
    {
      title: formatMessage({ id: 'device.form.title.tag' }),
      dataIndex: 'tag',
      ellipsis: true,
      width: 100,
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'device.form.placeholder.tag' }) }],
      },
      fieldProps: {
        placeholder: formatMessage({ id: 'device.form.placeholder.tag' }),
      },
    },
    {
      title: formatMessage({ id: 'form.title.alias' }),
      dataIndex: 'alias',
      ellipsis: true,
      width: 100,
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'form.placeholder.alias' }) }],
      },
      fieldProps: {
        placeholder: formatMessage({ id: 'form.placeholder.alias' }),
      },
    },
    ...columns,
    {
      title: formatMessage({ id: 'device.form.title.value' }),
      dataIndex: 'value',
      editable: false,
      ellipsis: true,
      render: (_text, record) => {
        if (!Array.isArray(record.value) || !isValidArrayType(record.value)) {
          return '0';
        }
        const isBooleanArray = (record.value as DataSheetValue[])?.every(
          (item: DataSheetValue) => typeof item === 'boolean',
        );
        const formatValue = isBooleanArray
          ? record.value.map((item) => item.toString())
          : record.value;

        return formatValue?.join(',');
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.status' }),
      dataIndex: 'status',
      width: 100,
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
      title: formatMessage({ id: 'table.title.option' }),
      valueType: 'option',
      width: 150,
      hideInTable: isDetail,
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
              onConfirm={() => record?.uuid && handleOnRemove([record?.uuid])}
              okText={formatMessage({ id: 'button.yes' })}
              cancelText={formatMessage({ id: 'button.no' })}
              key="remove"
            >
              <a onClick={() => hasEditabledItem && handleOnOnlyOneEdit()}>
                {formatMessage({ id: 'button.remove' })}
              </a>
            </Popconfirm>

            <Dropdown
              menu={{
                items: getMenu(record),
                onClick: (info: MenuInfo) => handleOnMenu(info, record),
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <DownOutlined />
              </a>
            </Dropdown>
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
          content: (
            <UploadSheetConfirm
              fileName={file?.name}
              initialValue={{
                uuid: 'uploadData',
                tag: 'tag1',
                alias: 'tag1',
                ...defaultUploadData,
              }}
            />
          ),
          onOk: () => handleOnUpload(file),
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
          onOk: handleOnBatchRemove,
          okText: formatMessage({ id: 'button.ok' }),
          cancelText: formatMessage({ id: 'button.cancel' }),
        })
      }
    >
      {formatMessage({ id: 'device.button.remove.bulk' })}
    </Button>,
    <Button key="download" icon={<UploadOutlined />} onClick={handleOnDownload}>
      {formatMessage({ id: 'device.button.export.sheet' })}
    </Button>,
  ];

  useEffect(() => {
    if (editableKeys.length > 0) {
      // 正在操作
      setPolling(0);
      return;
    } else {
      setPolling(stopPolling ? 0 : POLLING_INTERVAL);
    }
  }, [editableKeys]);

  useEffect(() => {
    if (deviceId) {
      run({ uuid: deviceId });
    }
  }, [deviceId]);

  return !isDetail ? (
    <>
      <PageContainer title={title} onBack={() => history.push(DEVICE_LIST)}>
        <EditableProTable<Partial<DataSheetItem>>
          controlled
          columns={baseColumns}
          polling={polling}
          rootClassName="stripe-table"
          recordCreatorProps={{
            position: 'top',
            creatorButtonText: formatMessage({ id: 'device.button.new.sheet' }),
            record: () => ({
              uuid: 'new',
              tag: '',
              alias: '',
              ...defaultConfig,
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
            onSave: handleOnSave,
            onChange: setEditableRowKeys,
            actionRender: (_row, _config, defaultDom) => [defaultDom.save, defaultDom.cancel],
          }}
          {...props}
        />
      </PageContainer>
      <UpdateRegister
        open={updateRegisterData.open}
        onOpenChange={(visible: boolean) =>
          setRegisterData({ open: visible, data: visible ? updateRegisterData.data : undefined })
        }
        data={{
          uuid: deviceId as string,
          tag: updateRegisterData.data?.tag as string,
          pointId: updateRegisterData.data?.uuid as string,
        }}
        dataType={updateRegisterData.data?.dataType}
      />
    </>
  ) : (
    <>
      <ProDescriptions
        title={formatMessage({
          id: `device.title.${deviceType === DeviceType.GENERIC_SNMP ? 'oid' : 'sheet'}`,
        })}
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
