import IndexBorder from '@/components/IndexBorder';
import { message, modal } from '@/components/PopupHack';
import UnitTitle from '@/components/UnitTitle';
import {
  deleteModbusDataSheetDelIds,
  getModbusDataSheetList,
  postModbusDataSheetSheetImport,
  postModbusDataSheetUpdate,
} from '@/services/rulex/Modbusdianweiguanli';
import { IconFont } from '@/utils/utils';
import {
  DeleteOutlined,
  DownloadOutlined,
  LoadingOutlined,
  ReloadOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProFormCascader,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Popconfirm, Tooltip, Upload } from 'antd';
import omit from 'lodash/omit';
import { useEffect, useRef, useState } from 'react';
import { funcEnum } from '../enum';
import UploadRule from './UploadRule';

import StateTag from '@/components/StateTag';
import { getDevicesPointErrMsg } from '@/services/rulex/shebeiguanli';
import inRange from 'lodash/inRange';
import { modbusDataTypeOptions } from './enum';

const defaultModbusConfig = {
  tag: '',
  alias: '',
  function: 3,
  frequency: 1000,
  slaverId: 1,
  address: 0,
  quantity: 1,
  dataType: ['RAW', 'DCBA'],
  weight: 1,
};

export type ModbusSheetItem = {
  uuid?: string;
  id?: number;
  created_at?: string;
  tag: string;
  alias: string;
  function: number;
  frequency: number;
  slaverId: number;
  address: number;
  quantity: number;
  status: number;
  lastFetchTime: number;
  value: string;
  type: string;
  order: string;
  weight: number;
  [key: string]: any;
};

type removeParams = {
  device_uuid: string;
  uuids: string[];
};

type Point = Partial<ModbusSheetItem> & {
  device_uuid?: string;
};

type UpdateParams = {
  device_uuid: string;
  modbus_data_points: Point[];
};

type ModbusSheetProps = {
  deviceUuid: string;
  readOnly?: boolean;
};

const ModbusSheet = ({ deviceUuid, readOnly }: ModbusSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<ModbusSheetItem>>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editableRows, setEditableRows] = useState<Partial<ModbusSheetItem>[]>([]);
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
        message.success('删除成功');
      },
    },
  );

  // 更新点位表
  const { run: update } = useRequest((params: UpdateParams) => postModbusDataSheetUpdate(params), {
    manual: true,
    onSuccess: () => {
      handleOnReset();
      message.success('更新成功');
    },
  });

  const formatUpdateParams = (params: Partial<ModbusSheetItem>) => {
    let newParams = {
      ...omit(params, ['dataType']),
      type: params?.dataType?.[0],
      order: params?.dataType?.[1],
      weight: Number(params?.weight),
    };

    return newParams;
  };

  // 批量更新
  const handleOnBatchUpdate = () => {
    const updateData = editableRows?.map((item) => formatUpdateParams(item));
    update({ device_uuid: deviceUuid, modbus_data_points: updateData });
  };

  // 单个更新
  const handleOnSave = async (rowKey: RecordKey, data: Partial<ModbusSheetItem>) => {
    let params = formatUpdateParams(data);

    if (rowKey === 'new') {
      params = {
        ...omit(params, ['uuid']),
        device_uuid: deviceUuid,
      } as any;
    }

    update({ device_uuid: deviceUuid, modbus_data_points: [params] });
  };

  // 批量删除
  const handleOnBatchDelete = () => {
    const uuids = selectedRowKeys as string[];
    if (uuids && deviceUuid) {
      const params = {
        device_uuid: deviceUuid,
        uuids,
      };
      remove(params);
    }
  };

  // 导入点位表
  const { run: upload } = useRequest(
    (file: File) => postModbusDataSheetSheetImport({ device_uuid: deviceUuid }, file),
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

  // 查看异常弹窗
  const { run: getErrorMsg } = useRequest(
    (params: API.getDevicesPointErrMsgParams) => getDevicesPointErrMsg(params),
    {
      manual: true,
      onSuccess: (res) =>
        modal.error({
          title: '点位异常信息',
          content: <div className="flex flex-wrap">{res}</div>,
        }),
    },
  );

  const columns: ProColumns<Partial<ModbusSheetItem>>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      render: (text, record, index) => <IndexBorder serial={index} />,
    },
    {
      title: '从设备 ID',
      dataIndex: 'slaverId',
      valueType: 'digit',
      width: 80,
      hideInSearch: true,
      fieldProps: {
        style: { width: '100%' },
        placeholder: '请输入从设备 ID',
      },
      formItemProps: {
        rules: [
          { required: true, message: '此项为必填项' },
          { max: 255, type: 'integer', message: '从设备 ID 在 1-255 之间' },
          { min: 1, type: 'integer', message: '从设备 ID 在 1-255 之间' },
        ],
      },
    },
    {
      title: '数据标签',
      dataIndex: 'tag',
      ellipsis: true,
      hideInSearch: true,
      formItemProps: {
        rules: [{ required: true, message: '此项为必填项' }],
      },
      fieldProps: {
        placeholder: '请输入数据标签',
      },
    },
    {
      title: '数据别名',
      dataIndex: 'alias',
      ellipsis: true,
      hideInSearch: true,
      formItemProps: {
        rules: [{ required: true, message: '此项为必填项' }],
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
      hideInSearch: true,
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
                  dataType: ['BYTE', 'A'],
                  quantity: 1,
                });
              } else {
                editorFormRef.current?.setRowData?.(record?.uuid as string, {
                  dataType: ['RAW', 'DCBA'],
                  weight: 1,
                });
              }
            },
          }}
          valueEnum={funcEnum}
          rules={[{ required: true, message: '此项为必填项' }]}
        />
      ),
    },
    {
      title: '数据类型（字节序）',
      dataIndex: 'dataType',
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
                const type = value?.[0];

                editorFormRef.current?.setRowData?.(record?.uuid as string, {
                  quantity: ['SHORT', 'USHORT', 'RAW', 'UTF8'].includes(type) ? 1 : 2,
                  weight: type === 'UTF8' ? 0 : 1,
                });
              },
              options,
            }}
            rules={[{ required: true, message: '此项为必填项' }]}
          />
        );
      },
      render: (_, { type, order }) => {
        const currentType = modbusDataTypeOptions?.find((item) => item?.value === type);
        const typeLabel = currentType?.label?.split('（')?.[0];

        return typeLabel && order ? (
          <>
            {typeLabel}（{order}）
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
      hideInSearch: true,
      fieldProps: {
        style: { width: '100%' },
        placeholder: '请输入起始地址',
      },
      formItemProps: {
        rules: [
          { required: true, message: '此项为必填项' },
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
      hideInSearch: true,
      formItemProps: {
        rules: [
          { required: true, message: '此项为必填项' },
          { min: 1, type: 'integer', message: '读取数量范围在 1-256 之间' },
          { max: 256, type: 'integer', message: '读取数量范围在 1-256 之间' },
        ],
      },
      renderFormItem: (_, { record }) => (
        <ProFormDigit
          noStyle
          disabled={!['RAW', 'UTF8'].includes(record?.dataType?.[0])}
          fieldProps={{ style: { width: '100%' }, placeholder: '请输入读取数量' }}
        />
      ),
    },

    {
      title: '权重系数',
      dataIndex: 'weight',
      valueType: 'digit',
      hideInSearch: true,
      formItemProps: {
        rules: [
          { required: true, message: '此项为必填项' },
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
        const type = record?.dataType?.[0];

        return (
          <ProFormText
            noStyle
            disabled={['RAW', 'BYTE', 'UTF8'].includes(type)}
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
      hideInSearch: true,
      fieldProps: {
        style: { width: '100%' },
        placeholder: '请输入采集频率',
      },
      formItemProps: {
        rules: [{ required: true, message: '此项为必填项' }],
      },
    },
    {
      title: '最新值',
      dataIndex: 'value',
      editable: false,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '点位状态',
      dataIndex: 'status',
      width: 80,
      editable: false,
      hideInSearch: true,
      renderText: (_, record) => <StateTag state={record?.status || 0} type="point" />,
    },
    {
      title: '采集时间',
      dataIndex: 'lastFetchTime',
      valueType: 'dateTime',
      editable: false,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      hideInTable: readOnly,
      render: (text, record, _, action) => {
        return (
          <>
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
              title="确定要删除该点位?"
              onConfirm={() => {
                if (deviceUuid && record?.uuid) {
                  remove({ device_uuid: deviceUuid, uuids: [record?.uuid] });
                }
              }}
              okText="是"
              cancelText="否"
              key="remove"
            >
              <a>删除</a>
            </Popconfirm>
            {record?.status === 0 && (
              <a key="error" onClick={() => record?.uuid && getErrorMsg({ uuid: record.uuid })}>
                查看异常
              </a>
            )}
          </>
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
          onOk: () => upload(file),
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
          content: '该操作会一次性删除多个点位，请谨慎处理!',
          onOk: handleOnBatchDelete,
        })
      }
    >
      批量删除
    </Button>,
    <Button
      key="download"
      icon={<UploadOutlined />}
      onClick={() => (window.location.href = '/api/v1/modbus_data_sheet/sheetExport')}
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

  return (
    <EditableProTable<Partial<ModbusSheetItem>>
      controlled
      rowKey="uuid"
      actionRef={actionRef}
      editableFormRef={editorFormRef}
      columns={columns}
      polling={polling}
      rootClassName="sheet-table"
      recordCreatorProps={
        readOnly
          ? false
          : {
              position: 'top',
              creatorButtonText: '添加点位',
              record: () => ({
                ...defaultModbusConfig,
                uuid: 'new',
              }),
            }
      }
      rowSelection={
        readOnly
          ? false
          : {
              selectedRowKeys: selectedRowKeys,
              onChange: setSelectedRowKeys,
            }
      }
      toolBarRender={readOnly ? false : () => toolBar}
      request={async ({ current = 1, pageSize = 10 }) => {
        const { data } = await getModbusDataSheetList({
          device_uuid: deviceUuid,
          current,
          size: pageSize,
        });

        return Promise.resolve({
          data: data?.records?.map((item) => ({ ...item, dataType: [item?.type, item?.order] })),
          total: data?.total,
          success: true,
        });
      }}
      pagination={{
        defaultPageSize: 10,
        hideOnSinglePage: true,
      }}
      options={readOnly ? false : {}}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: handleOnSave,
        onChange: setEditableRowKeys,
        onValuesChange: (record, dataSource) => {
          setEditableRows(dataSource);
        },
      }}
      search={readOnly ? false : { labelWidth: 150 }}
      scroll={{ x: readOnly ? 1200 : undefined }}
    />
  );
};

export default ModbusSheet;
