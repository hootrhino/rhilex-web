import { message, modal } from '@/components/PopupHack';
import { IconFont } from '@/utils/utils';
import { DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { Button, Popconfirm, Tag, Upload } from 'antd';
import omit from 'lodash/omit';
import { useRef, useState } from 'react';
import { blockTypeEnum, defaultBlocksConfig } from '../SchemaForm/initialValue';

import {
  deleteS1200DataSheetDelIds,
  getS1200DataSheetList,
  postS1200DataSheetSheetImport,
  postS1200DataSheetUpdate,
} from '@/services/rulex/ximenzidianweiguanli';
import '../index.less';

export type PlcSheetItem = {
  uuid?: string;
  tag: string;
  alias: string;
  type: string;
  frequency: number;
  address: number;
  start: number;
  size: number;
  status: number;
  lastFetchTime: number;
  value: string;
};

type removeParams = {
  device_uuid: string;
  uuids: string[];
};

type UpdateParams = Omit<PlcSheetItem, 'status' | 'lastFetchTime' | 'value'> & {
  device_uuid?: string;
};

const PlcSheet = () => {
  const { deviceId } = useParams();
  const actionRef = useRef<ActionType>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly Partial<PlcSheetItem>[]>([]);
  const [hide, setHide] = useState<boolean>(false);

  const disabled = selectedRowKeys?.length === 0;

  const handleOnReset = () => {
    actionRef.current?.reload();
    setSelectedRowKeys([]);
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
  const { run: update } = useRequest(
    (params: Partial<UpdateParams>[]) => postS1200DataSheetUpdate(params),
    {
      manual: true,
      onSuccess: () => {
        handleOnReset();
        setEditableRowKeys([]);
        message.success('更新成功');
      },
    },
  );

  // 批量更新
  const handleOnBatchUpdate = () => {
    const updateData = dataSource?.filter(
      (row) => row?.uuid && selectedRowKeys.includes(row?.uuid),
    );
    update(updateData);
  };

  // 单个更新
  const handleOnSave = async (rowKey: RecordKey, data: Partial<PlcSheetItem>) => {
    let params = {
      ...omit(data, ['index', 'status', 'lastFetchTime', 'value']),
      device_uuid: deviceId,
    };

    if (params?.type === 'MB') {
      params = {
        ...omit(params, ['address']),
      };
    }

    if (rowKey === 'new') {
      params = {
        ...omit(params, ['uuid']),
      };

      update([params]);
      // 新增
    } else {
      // 编辑
      update([params]);
    }
  };

  // 批量删除
  const handleOnBatchDelete = () => {
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
    (file: File) => postS1200DataSheetSheetImport({ device_uuid: deviceId || '' }, file),
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
      render: (index) => {
        return (
          <div className="text-[12px] text-[#fff] rounded-full w-[18px] h-[18px] bg-[#979797]">
            {index}
          </div>
        );
      },
    },
    {
      title: '数据标签',
      dataIndex: 'tag',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
      fieldProps: () => {
        return {
          placeholder: '请输入数据标签',
        };
      },
    },
    {
      title: '数据别名',
      dataIndex: 'alias',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
      fieldProps: () => {
        return {
          placeholder: '请输入数据别名',
        };
      },
    },
    {
      title: '块类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: blockTypeEnum,
      width: 85,
      fieldProps: (_, config) => {
        return {
          style: { width: '100%' },
          onSelect: (value: string) => {
            if (config.entity?.uuid && editableKeys.includes(config.entity.uuid)) {
              setHide(value === 'MB' ? true : false);
            }
          },
          placeholder: '请选择块类型',
        };
      },
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: (
        <div>
          采集频率<span className="text-[12px] opacity-[.8] pl-[5px] font-normal">(毫秒)</span>
        </div>
      ),
      dataIndex: 'frequency',
      valueType: 'digit',
      width: 120,
      fieldProps: () => {
        return {
          style: { width: '100%' },
          placeholder: '请输入采集频率',
        };
      },
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '块地址',
      dataIndex: 'address',
      valueType: 'digit',
      hideInForm: hide,
      hideInTable: hide,
      fieldProps: () => {
        return {
          style: { width: '100%' },
          placeholder: '请输入块地址',
        };
      },
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '起始地址',
      dataIndex: 'start',
      valueType: 'digit',
      fieldProps: () => {
        return {
          style: { width: '100%' },
          placeholder: '请输入起始地址',
        };
      },
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: (
        <div>
          采集长度<span className="text-[12px] opacity-[.8] pl-[5px] font-normal">(字节)</span>
        </div>
      ),
      dataIndex: 'size',
      valueType: 'digit',
      width: 120,
      fieldProps: () => {
        return {
          style: { width: '100%' },
          placeholder: '请输入采集长度',
        };
      },
      formItemProps: () => {
        return {
          rules: [
            { required: true, message: '此项为必填项' },
            { max: 255, type: 'integer', message: '从设备 ID 在 1-255 之间' },
            { min: 1, type: 'integer', message: '从设备 ID 在 1-255 之间' },
          ],
        };
      },
    },
    {
      title: '最新值',
      dataIndex: 'value',
      editable: false,
    },
    {
      title: '点位状态',
      dataIndex: 'status',
      editable: false,
      width: 80,
      renderText(_, record) {
        if (!record?.status) return '-';
        const isSuccess = record?.status === 1;
        return <Tag color={isSuccess ? 'success' : 'error'}>{isSuccess ? '正常' : '异常'}</Tag>;
      },
    },
    {
      title: '采集时间',
      dataIndex: 'lastFetchTime',
      valueType: 'dateTime',
      editable: false,
    },
    {
      title: '操作',
      valueType: 'option',
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
            if (deviceId && record?.uuid) {
              remove({ device_uuid: deviceId, uuids: [record?.uuid] });
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

  return (
    <EditableProTable<Partial<PlcSheetItem>>
      controlled
      rowKey="uuid"
      actionRef={actionRef}
      columns={columns}
      value={dataSource}
      onChange={setDataSource}
      rootClassName="sheet-table"
      recordCreatorProps={{
        position: 'top',
        creatorButtonText: '添加点位',
        record: () => ({
          ...defaultBlocksConfig,
          uuid: 'new',
        }),
      }}
      rowSelection={{
        selectedRowKeys: selectedRowKeys,
        onChange: (keys) => {
          setSelectedRowKeys(keys);
        },
      }}
      toolBarRender={() => [
        <Upload
          key="upload"
          accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          showUploadList={false}
          onChange={async ({ file }) => {
            if (file.status === 'done' && file.originFileObj) {
              upload(file.originFileObj);
            }
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
      ]}
      request={async ({ current = 1, pageSize = 10 }) => {
        const { data } = await getS1200DataSheetList({
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
      }}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: handleOnSave,
        onChange: setEditableRowKeys,
      }}
    />
  );
};

export default PlcSheet;
