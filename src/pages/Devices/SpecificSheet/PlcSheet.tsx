import IndexBorder from '@/components/IndexBorder';
import { message, modal } from '@/components/PopupHack';
import {
  deleteS1200DataSheetDelIds,
  getS1200DataSheetList,
  postS1200DataSheetSheetImport,
  postS1200DataSheetUpdate,
} from '@/services/rulex/ximenzidianweiguanli';
import { IconFont } from '@/utils/utils';
import { DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProFormCascader, ProFormText } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Popconfirm, Tag, Upload } from 'antd';
import omit from 'lodash/omit';
import { useRef, useState } from 'react';
import { plcDataTypeOptions } from './enum';
import UploadRule from './UploadRule';

import { statusEnum } from '@/utils/enum';
import inRange from 'lodash/inRange';
import '../index.less';

const defaultPlcConfig = {
  tag: '',
  alias: '',
  type: ['FLOAT', 'DCBA'],
  siemensAddress: '',
  frequency: 1000,
  weight: 1,
};

export type PlcSheetItem = {
  uuid?: string;
  tag: string;
  alias: string;
  frequency?: number;
  siemensAddress?: string;
  status: number;
  lastFetchTime: number;
  value: string;
  weight: number;
  [key: string]: any;
};

type removeParams = {
  device_uuid: string;
  uuids: string[];
};

type Point = Omit<PlcSheetItem, 'status' | 'lastFetchTime' | 'value'> & {
  device_uuid?: string;
};

type UpdateParams = {
  device_uuid: string;
  siemens_data_points: Partial<Point>[];
};

type PlcSheetProps = {
  deviceUuid: string;
  readOnly?: boolean;
};

const PlcSheet = ({ deviceUuid, readOnly }: PlcSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<PlcSheetItem>>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [editableRows, setEditableRows] = useState<Partial<PlcSheetItem>[]>([]);

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
      message.success('删除成功');
    },
  });

  // 更新点位表
  const { run: update } = useRequest((params: UpdateParams) => postS1200DataSheetUpdate(params), {
    manual: true,
    onSuccess: () => {
      handleOnReset();
      message.success('更新成功');
    },
  });

  const formatUpdateParams = (params: Partial<PlcSheetItem>) => {
    let newParams = {
      // ...omit(params, ['index', 'status', 'lastFetchTime', 'value', 'type']),
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
    update({ device_uuid: deviceUuid, siemens_data_points: updateData });
  };

  // 单个更新
  const handleOnSave = async (rowKey: RecordKey, data: Partial<PlcSheetItem>) => {
    let params = formatUpdateParams(data);

    if (rowKey === 'new') {
      params = {
        ...omit(params, ['uuid']),
        device_uuid: deviceUuid,
      } as any;
    }
    update({ device_uuid: deviceUuid, siemens_data_points: [params] });
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
    (file: File) => postS1200DataSheetSheetImport({ device_uuid: deviceUuid }, file),
    {
      manual: true,
      onSuccess: () => {
        message.success('上传成功');
        actionRef.current?.reload();
      },
    },
  );

  const columns: ProColumns<Partial<PlcSheetItem>>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      fixed: readOnly ? 'left' : false,
      render: (text, record, index) => <IndexBorder serial={index} />,
    },
    {
      title: '地址',
      dataIndex: 'siemensAddress',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
      formItemProps: { rules: [{ required: true, message: '此项为必填项' }] },
      fieldProps: {
        placeholder: '请输入地址',
      },
    },
    {
      title: '数据标签',
      dataIndex: 'tag',
      hideInSearch: true,
      width: 120,
      fixed: readOnly ? 'left' : false,
      formItemProps: { rules: [{ required: true, message: '此项为必填项' }] },
      fieldProps: { placeholder: '请输入数据标签' },
    },
    {
      title: '数据别名',
      dataIndex: 'alias',
      ellipsis: true,
      hideInSearch: true,
      formItemProps: { rules: [{ required: true, message: '此项为必填项' }] },
      fieldProps: { placeholder: '请输入数据别名' },
    },
    {
      title: '数据类型（字节序）',
      dataIndex: 'type',
      width: 150,
      renderFormItem: () => (
        <ProFormCascader
          noStyle
          fieldProps={{
            allowClear: false,
            placeholder: '请选择数据类型和字节序',
            options: plcDataTypeOptions,
          }}
          rules={[{ required: true, message: '此项为必填项' }]}
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
        const type = record?.type?.[0];

        return (
          <ProFormText
            noStyle
            disabled={['RAW', 'BYTE', 'I', 'Q'].includes(type)}
            fieldProps={{ placeholder: '请输入权重系数' }}
          />
        );
      },
    },
    {
      title: '采集频率',
      dataIndex: 'frequency',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '当前值',
      dataIndex: 'value',
      editable: false,
      hideInSearch: true,
    },
    {
      title: '点位状态',
      dataIndex: 'status',
      editable: false,
      hideInSearch: true,
      width: 80,
      renderText: (_, record) => (
        <Tag color={statusEnum[record?.status || 0]?.color}>
          {statusEnum[record?.status || 0]?.text}
        </Tag>
      ),
    },
    {
      title: '采集时间',
      dataIndex: 'lastFetchTime',
      valueType: 'dateTime',
      editable: false,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      hideInTable: readOnly,
      width: 150,
      render: (text, record, _, action) => [
        <EditableProTable.RecordCreator
          key="copy"
          record={{
            ...record,
            uuid: 'new',
          }}
        >
          <a>复制</a>
        </EditableProTable.RecordCreator>,
        <a
          key="editable"
          onClick={() => {
            if (!record?.uuid) return;
            action?.startEditable?.(record?.uuid);
          }}
        >
          编辑
        </a>,
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
        </Popconfirm>,
      ],
    },
  ];

  const toolBar = [
    <Upload
      key="upload"
      accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      showUploadList={false}
      beforeUpload={(file) => {
        modal.confirm({
          title: '导入点位表',
          width: '50%',
          content: <UploadRule fileName={file?.name} type="plc" />,
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
      onClick={() => (window.location.href = '/api/v1/s1200_data_sheet/sheetExport')}
    >
      导出点位表
    </Button>,
  ];

  return (
    <EditableProTable<Partial<PlcSheetItem>>
      controlled
      rowKey="uuid"
      actionRef={actionRef}
      editableFormRef={editorFormRef}
      columns={columns}
      rootClassName="sheet-table"
      recordCreatorProps={
        readOnly
          ? false
          : {
              position: 'top',
              creatorButtonText: '添加点位',
              record: () => ({
                ...defaultPlcConfig,
                uuid: 'new',
              }),
            }
      }
      rowSelection={
        readOnly
          ? false
          : {
              selectedRowKeys: selectedRowKeys,
              onChange: (keys) => {
                setSelectedRowKeys(keys);
              },
            }
      }
      toolBarRender={readOnly ? false : () => toolBar}
      request={async ({ current = 1, pageSize = 10, ...keyword }) => {
        const { data } = await getS1200DataSheetList({
          device_uuid: deviceUuid,
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
      }}
      options={readOnly ? false : {}}
      search={readOnly ? false : { labelWidth: 150 }}
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
  );
};

export default PlcSheet;
