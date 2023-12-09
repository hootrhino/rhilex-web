import { IconFont } from '@/utils/utils';
import { DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import {useState } from 'react';
import { blockTypeEnum, defaultBlocksConfig } from '../SchemaForm/initialValue';

type PlcSheetItem = {
  uuid?: string;
  tag: string;
  type: string;
  frequency: number;
  address: number;
  start: number;
  size: number;
};

const PlcSheet = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly PlcSheetItem[]>([]);
  const [hide, setHide] = useState<boolean>(false);

  const columns: ProColumns<PlcSheetItem>[] = [
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
      title: '块类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: blockTypeEnum,
      fieldProps: (_, config) => {
        return {
          onSelect: (value: string) => {
            if (config.entity?.uuid && editableKeys.includes(config.entity.uuid)) {
              setHide(value === 'MB' ? true : false)
            }
          }
        };
      },
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
      title: '块地址',
      dataIndex: 'address',
      valueType: 'digit',
      hideInForm: hide,
      hideInTable: hide,
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
      title: '起始地址',
      dataIndex: 'start',
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
      title: '采集长度（字节）',
      dataIndex: 'size',
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
    <EditableProTable<PlcSheetItem>
      rowKey="uuid"
      recordCreatorProps={{
        position: 'bottom',
        creatorButtonText: '添加点位',
        record: () => ({
          ...defaultBlocksConfig,
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

export default PlcSheet;
