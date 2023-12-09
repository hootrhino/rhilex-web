import { IconFont } from '@/utils/utils';
import { DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';
import { defaultRegistersConfig, funcEnum } from '../SchemaForm/initialValue';

type ModbusSheetItem = {
  uuid?: string;
  tag: string;
  alias: string;
  function: number;
  frequency: number;
  slaverId: number;
  address: number;
  quantity: number;
};

const ModbusSheet = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly ModbusSheetItem[]>([]);

  const columns: ProColumns<ModbusSheetItem>[] = [
    {
      title: '数据标签',
      dataIndex: 'tag',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
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
    },
    {
      title: '采集频率（毫秒）',
      dataIndex: 'frequency',
      valueType: 'digit',
      fieldProps: () => {
        return {
          style: { width: '100%' },
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
      fieldProps: () => {
        return {
          style: { width: '100%' },
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
      fieldProps: () => {
        return {
          style: { width: '100%' },
        };
      },
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
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
            uuid: 'copy',
          }}
        >
          <a>复制此项到末尾</a>
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
        <a
          key="delete"
          onClick={() => {
            // TODO 删除
            setDataSource(dataSource.filter((item) => item.uuid !== record.uuid));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <EditableProTable<ModbusSheetItem>
      rowKey="uuid"
      recordCreatorProps={{
        position: 'bottom',
        creatorButtonText: '添加点位',
        record: () => ({
          ...defaultRegistersConfig,
          uuid: 'new',
        }),
      }}
      toolBarRender={() => [
        <Button key="upload" type="primary" icon={<DownloadOutlined />}>
          导入点位表
        </Button>,
        <Button
          key="batch-update"
          type="primary"
          icon={<IconFont type="icon-batch-create" className="text-[16px]" />}
        >
          批量更新
        </Button>,
        <Button key="batch-remove" danger icon={<DeleteOutlined />}>
          批量删除
        </Button>,
        <Button key="download" icon={<UploadOutlined />}>
          导出点位表
        </Button>,
      ]}
      columns={columns}
      request={async () => ({
        data: [],
        total: 3,
        success: true,
      })}
      value={dataSource}
      onChange={setDataSource}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          // TODO 保存
          console.log(rowKey, data, row);
        },
        onChange: setEditableRowKeys,
      }}
    />
  );
};

export default ModbusSheet;
