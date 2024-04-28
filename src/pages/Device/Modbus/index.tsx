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
import { SheetType } from '@/utils/enum';
import { inRange } from '@/utils/redash';
import { modbusDataTypeOptions } from './enum';
import { ModbusDataSheetItem, ModbusDataSheetProps, removeParams, UpdateParams } from './typings';
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

  const [title, setTitle] = useState<string>('点位表配置');
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
      setTitle(record?.name ? `设备 ${record?.name} - 点位表配置` : '点位表配置'),
  });

  const columns: ProColumns<Partial<ModbusDataSheetItem>>[] = [
    {
      title: formatMessage({ id: 'table.index' }),
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      render: (text, record, index) => <IndexBorder serial={index} />,
    },
    {
      title: '从设备地址',
      dataIndex: 'slaverId',
      valueType: 'digit',
      width: 100,
      fieldProps: {
        style: { width: '100%' },
        placeholder: '请输入从设备地址',
      },
      formItemProps: {
        rules: [
          { required: true, message: '请输入从设备地址' },
          { max: 255, type: 'integer', message: '从设备地址 在 1-255 之间' },
          { min: 1, type: 'integer', message: '从设备地址 在 1-255 之间' },
        ],
      },
    },
    {
      title: '数据标签',
      dataIndex: 'tag',
      ellipsis: true,
      formItemProps: {
        rules: [{ required: true, message: '请输入数据标签' }],
      },
      fieldProps: {
        placeholder: '请输入数据标签',
      },
    },
    {
      title: '数据别名',
      dataIndex: 'alias',
      ellipsis: true,
      formItemProps: {
        rules: [{ required: true, message: '请输入数据别名' }],
      },
      fieldProps: {
        placeholder: '请输入数据别名',
      },
    },
    {
      title: 'Modbus 功能',
      dataIndex: 'function',
      valueType: 'select',
      width: 150,
      valueEnum: funcEnum,
      renderFormItem: (_, { record }) => (
        <ProFormSelect
          noStyle
          fieldProps={{
            allowClear: false,
            placeholder: '请选择 Modbus 功能',
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
          rules={[{ required: true, message: '请选择 Modbus 功能' }]}
        />
      ),
    },
    {
      title: '数据类型（字节序）',
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
              placeholder: '请选择数据类型和字节序',
              onChange: (value: any) => {
                const dataType = value?.[0];

                editorFormRef.current?.setRowData?.(record?.uuid as string, {
                  quantity: ['SHORT', 'USHORT', 'RAW', 'UTF8'].includes(dataType) ? 1 : 2,
                  weight: dataType === 'UTF8' ? 0 : 1,
                });
              },
              options,
            }}
            rules={[{ required: true, message: '请选择数据类型和字节序' }]}
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
      title: '起始地址',
      dataIndex: 'address',
      valueType: 'digit',
      width: 80,
      fieldProps: {
        style: { width: '100%' },
        placeholder: '请输入起始地址',
      },
      formItemProps: {
        rules: [
          { required: true, message: '请输入起始地址' },
          { min: 0, type: 'integer', message: '起始地址范围在 0-65535 之间' },
          { max: 65535, type: 'integer', message: '起始地址范围在 0-65535 之间' },
        ],
      },
    },
    {
      title: '读取数量',
      dataIndex: 'quantity',
      valueType: 'digit',
      width: 100,
      formItemProps: {
        rules: [
          { required: true, message: '请输入读取数量' },
          { min: 1, type: 'integer', message: '读取数量范围在 1-256 之间' },
          { max: 256, type: 'integer', message: '读取数量范围在 1-256 之间' },
        ],
      },
      renderFormItem: (_, { record }) => (
        <ProFormDigit
          noStyle
          disabled={!['RAW', 'UTF8'].includes(record?.type?.[0])}
          fieldProps={{ style: { width: '100%' }, placeholder: '请输入读取数量' }}
        />
      ),
    },

    {
      title: '权重系数',
      dataIndex: 'weight',
      valueType: 'digit',
      formItemProps: {
        rules: [
          { required: true, message: '请输入权重系数' },
          {
            validator: (_, value) => {
              if (inRange(value, -0.0001, 100000)) {
                return Promise.resolve();
              }
              return Promise.reject('值必须在 -0.0001 到 100000 范围内');
            },
          },
        ],
      },
      renderFormItem: (_, { record }) => {
        const dataType = record?.type?.[0];

        return (
          <ProFormText
            noStyle
            disabled={['RAW', 'BYTE', 'UTF8'].includes(dataType)}
            fieldProps={{ placeholder: '请输入权重系数' }}
          />
        );
      },
    },
    {
      title: <UnitTitle title="采集频率" />,
      dataIndex: 'frequency',
      valueType: 'digit',
      width: 120,
      fieldProps: {
        style: { width: '100%' },
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
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      width: 150,
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
              title="确定要删除此点位？"
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
              <Dropdown
                menu={{
                  items: [{ key: 'error', label: '查看异常' }],
                  onClick: () => {
                    modal.error({
                      title: '点位异常信息',
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
      {polling ? '停止刷新' : '开始刷新'}
    </Button>,
    <Upload
      key="upload"
      accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      showUploadList={false}
      beforeUpload={(file) => {
        modal.confirm({
          title: '导入点位表',
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
        导入点位表
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
          title: '批量删除点位',
          content: '此操作会一次性删除多个点位，请谨慎处理!',
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
      导出点位表
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
        rootClassName="sheet-table"
        recordCreatorProps={{
          position: 'top',
          creatorButtonText: '添加点位',
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
            <span>点位表配置</span>
            <span className="text-[12px] opacity-[.8] pl-[5px] font-normal">
              (横向滚动查看更多)
            </span>
          </>
        }
      />
      <ProTable
        rowKey="uuid"
        columns={columns}
        rootClassName="sheet-table"
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
