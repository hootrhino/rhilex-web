import IndexBorder from '@/components/IndexBorder';
import PageContainer from '@/components/PageContainer';
import { message, modal } from '@/components/PopupHack';
import StateTag, { StateType } from '@/components/StateTag';
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
import { useParams, useRequest } from '@umijs/max';
import { Button, Popconfirm, Space, Tooltip, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_TITLE } from './enum';
import { removeParams, SnmpDataSheetItem, SnmpOidsSheetProps, UpdateParams } from './typings';
import UploadRule from './UploadRule';

const defaultSnmpConfig = {
  oid: '',
  tag: '',
  alias: '',
  frequency: 1000,
};

const SnmpOidsSheet = ({ type = SheetType.LIST, uuid }: SnmpOidsSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<SnmpDataSheetItem>>();
  const { deviceId } = useParams();

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
      setTitle(record?.name ? `设备 ${record?.name} - ${DEFAULT_TITLE}` : DEFAULT_TITLE),
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
      message.success('删除成功');
    },
  });

  // 更新
  const { run: update } = useRequest((params: UpdateParams) => postSnmpOidsSheetUpdate(params), {
    manual: true,
    onSuccess: () => {
      handleOnReset();
      message.success('更新成功');
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
        message.success('上传成功');
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
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      render: (text, record, index) => <IndexBorder serial={index} />,
    },
    {
      title: '对象标识符',
      dataIndex: 'oid',
      ellipsis: true,
      fieldProps: {
        placeholder: '请输入对象标识符',
      },
      formItemProps: {
        rules: [{ required: true, message: '请输入对象标识符' }],
      },
    },
    {
      title: '数据标签',
      dataIndex: 'tag',
      ellipsis: true,
      fieldProps: {
        placeholder: '请输入数据标签',
      },
      formItemProps: {
        rules: [{ required: true, message: '请输入数据标签' }],
      },
    },
    {
      title: '数据别名',
      dataIndex: 'alias',
      fieldProps: {
        placeholder: '请输入数据别名',
      },
      formItemProps: {
        rules: [{ required: true, message: '请输入数据别名' }],
      },
    },
    {
      title: '采集频率',
      dataIndex: 'frequency',
      valueType: 'digit',
      width: 100,
      fieldProps: {
        placeholder: '请输入采集频率',
      },
      formItemProps: {
        rules: [{ required: true, message: '请输入采集频率' }],
      },
    },
    {
      title: '最新值',
      dataIndex: 'value',
      editable: false,
      ellipsis: true,
    },
    {
      title: '点位状态',
      dataIndex: 'status',
      width: 80,
      editable: false,
      renderText: (_, record) => <StateTag state={record?.status || 0} type={StateType.POINT} />,
    },
    {
      title: '采集时间',
      dataIndex: 'lastFetchTime',
      valueType: 'dateTime',
      editable: false,
      ellipsis: true,
    },
    {
      title: '操作',
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
              <Tooltip title="以当前行为模板新建一行数据">
                <a>复制</a>
              </Tooltip>
            </EditableProTable.RecordCreator>
            <a
              key="editable"
              onClick={() => {
                if (!record?.uuid) return;
                action?.startEditable?.(record?.uuid);
              }}
            >
              编辑
            </a>
            <Popconfirm
              title="确定要删除此对象?"
              onConfirm={() => {
                if (deviceId && record?.uuid) {
                  remove({ device_uuid: deviceId, uuids: [record?.uuid] });
                }
              }}
              okText="是"
              cancelText="否"
              key="remove"
            >
              <a>删除</a>
            </Popconfirm>
            {record?.status === 0 && (
              <a
                key="error"
                onClick={() => {
                  modal.error({
                    title: '对象异常信息',
                    content: <div className="flex flex-wrap">{record?.errMsg}</div>,
                    okText: '关闭',
                  });
                }}
              >
                查看异常
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
      {polling ? '停止刷新' : '开始刷新'}
    </Button>,
    <Upload
      key="upload"
      accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      showUploadList={false}
      beforeUpload={(file) => {
        modal.confirm({
          title: '导入对象列表',
          width: '50%',
          content: <UploadRule fileName={file?.name} />,
          onOk: () => deviceId && upload(deviceId, file),
          okText: '确定',
          cancelText: '取消',
        });
        return Upload.LIST_IGNORE;
      }}
    >
      <Button type="primary" icon={<DownloadOutlined />}>
        导入对象列表
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
      批量更新
    </Button>,
    <Button
      key="batch-remove"
      danger
      icon={<DeleteOutlined />}
      disabled={disabled}
      onClick={() =>
        modal.confirm({
          title: '批量删除对象',
          content: '此操作会一次性删除多个对象，需谨慎操作',
          onOk: handleOnBatchRemove,
          okText: '确定',
          cancelText: '取消',
        })
      }
    >
      批量删除
    </Button>,
    <Button
      key="download"
      icon={<UploadOutlined />}
      onClick={() =>
        (window.location.href = `/api/v1/modbus_data_sheet/sheetExport?device_uuid=${deviceId}`)
      }
    >
      导出对象列表
    </Button>,
  ];

  return type === SheetType.LIST ? (
    <PageContainer title={title} backUrl="/device/list">
      <EditableProTable<Partial<SnmpDataSheetItem>>
        controlled
        rowKey="uuid"
        actionRef={actionRef}
        editableFormRef={editorFormRef}
        columns={columns}
        polling={polling}
        rootClassName="sheet-table"
        recordCreatorProps={{
          position: 'top',
          creatorButtonText: '添加对象',
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
        rootClassName="sheet-table"
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
        }}
        toolBarRender={false}
        options={false}
        search={false}
      />
    </>
  );
};

export default SnmpOidsSheet;
