import { message, modal } from '@/components/PopupHack';
import {
  deleteModbusDataSheetDelIds,
  getModbusDataSheetList,
  postModbusDataSheetSheetImport,
  postModbusDataSheetUpdate,
} from '@/services/rulex/Modbusdianweiguanli';
import { IconFont } from '@/utils/utils';
import { DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { Button, Popconfirm, Tag, Upload } from 'antd';
import omit from 'lodash/omit';
import { useRef, useState } from 'react';
import { defaultRegistersConfig, funcEnum } from '../SchemaForm/initialValue';

import '../index.less';
import UnitTitle from '@/components/UnitTitle';
import IndexBorder from '@/components/IndexBorder';

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
};

type removeParams = {
  device_uuid: string;
  uuids: string[];
};

type Point = Partial<ModbusSheetItem> & {
  device_uuid?: string;
}

type UpdateParams = {
  device_uuid: string;
  modbus_data_points: Point[]
};

const ModbusSheet = () => {
  const { deviceId } = useParams();
  const actionRef = useRef<ActionType>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly Partial<ModbusSheetItem>[]>([]);

  const disabled = selectedRowKeys?.length === 0;

  const handleOnReset = () => {
    actionRef.current?.reload();
    setSelectedRowKeys([]);
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
  const { run: update } = useRequest(
    (params: UpdateParams) => postModbusDataSheetUpdate(params),
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
    update({device_uuid: deviceId || '', modbus_data_points: updateData});
  };

  // 单个更新
  const handleOnSave = async (rowKey: RecordKey, data: Partial<ModbusSheetItem>) => {
    let params = {
      ...omit(data, ['index']),
      device_uuid: deviceId,
    };

    if (rowKey === 'new') {
      params = {
        ...omit(params, ['uuid']),
      };


    }
    update({device_uuid: deviceId || '', modbus_data_points: [params]});
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
    (file: File) => postModbusDataSheetSheetImport({ device_uuid: deviceId || '' }, file),
    {
      manual: true,
      onSuccess: () => {
        message.success('上传成功');
        actionRef.current?.reload();
      },
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
      title: 'Modbus 功能',
      dataIndex: 'function',
      valueType: 'select',
      valueEnum: funcEnum,
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
      fieldProps: () => {
        return {
          placeholder: '请选择 Modbus 功能',
        };
      },
    },
    {
      title: <UnitTitle title='采集频率' />,
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
      title: '从设备 ID',
      dataIndex: 'slaverId',
      valueType: 'digit',
      width: 100,
      fieldProps: () => {
        return {
          style: { width: '100%' },
          placeholder: '请输入从设备 ID',
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
      title: '起始地址',
      dataIndex: 'address',
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
      title: '读取数量',
      dataIndex: 'quantity',
      valueType: 'digit',
      width: 100,
      fieldProps: () => {
        return {
          style: { width: '100%' },
          placeholder: '请输入读取数量',
        };
      },
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
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
      width: 80,
      editable: false,
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
    <EditableProTable<Partial<ModbusSheetItem>>
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
          ...defaultRegistersConfig,
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
          onClick={() => (window.location.href = '/api/v1/modbus_data_sheet/sheetExport')}
        >
          导出点位表
        </Button>,
      ]}
      request={async ({ current = 1, pageSize = 10 }) => {
        const { data } = await getModbusDataSheetList({
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
        hideOnSinglePage: true
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

export default ModbusSheet;
