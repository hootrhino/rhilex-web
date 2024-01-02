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
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProFormCascader, ProFormSelect } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Popconfirm, Tag, Upload } from 'antd';
import omit from 'lodash/omit';
import { useRef, useState } from 'react';
import { cascaderOptions } from './enum';
import UploadRule from './UploadRule';

import { statusEnum } from '@/utils/enum';
import '../index.less';

const defaultPlcConfig = {
  tag: '',
  type: 'Int',
  alias: '',
  order: 'ABCD',
  address: '',
};

export type PlcSheetItem = {
  uuid?: string;
  tag: string;
  alias: string;
  type: string;
  address: string;
  status: number;
  lastFetchTime: number;
  value: string;
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

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly Partial<PlcSheetItem>[]>([]);
  const [type, setType] = useState<string>();

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
  const { run: update } = useRequest((params: UpdateParams) => postS1200DataSheetUpdate(params), {
    manual: true,
    onSuccess: () => {
      handleOnReset();
      setEditableRowKeys([]);
      message.success('更新成功');
    },
  });

  // 批量更新
  const handleOnBatchUpdate = () => {
    const updateData = dataSource?.filter(
      (row) => row?.uuid && selectedRowKeys.includes(row?.uuid),
    );
    update({ device_uuid: deviceUuid, siemens_data_points: updateData });
  };

  // 单个更新
  const handleOnSave = async (rowKey: RecordKey, data: Partial<PlcSheetItem>) => {
    let params = {
      ...omit(data, ['index', 'status', 'lastFetchTime', 'value']),
      device_uuid: deviceUuid,
    };

    // if (params?.type === 'MB') {
    //   params = {
    //     ...omit(params, ['address']),
    //   };
    // }

    if (rowKey === 'new') {
      params = {
        ...omit(params, ['uuid']),
      };
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
      hideInSearch: true,
      formItemProps: { rules: [{ required: true, message: '此项为必填项' }] },
      fieldProps: { placeholder: '请输入数据别名' },
    },
    {
      title: '数据类型',
      dataIndex: 'type',
      renderFormItem: (item, { type, ...rest }) => {
        if (type === 'form') {
          return (
            <ProFormSelect
              {...rest}
              options={cascaderOptions?.map((item) => omit(item, 'children'))}
              noStyle
              fieldProps={{ placeholder: '请选择数据类型', onChange: (value) => setType(value) }}
            />
          );
        }

        return (
          <ProFormCascader
            {...rest}
            fieldProps={{
              placeholder: '请选择数据类型',
              options: cascaderOptions,
            }}
          />
        );
      },
      formItemProps: { rules: [{ required: true, message: '此项为必填项' }] },
      // search: {
      //   // 格式化搜索值
      //   transform: (value) => {
      //     return {
      //       startTime: value[0],
      //       endTime: value[1],
      //     };
      //   },
      // },
    },
    {
      title: '字节序',
      dataIndex: 'order',
      valueType: 'select',
      hideInSearch: true,
      fieldProps: {
        options: cascaderOptions?.find((item) => item.value === type)?.children || [],
        placeholder: '请选择字节序',
      },
      formItemProps: { rules: [{ required: true, message: '此项为必填项' }] },
    },
    {
      title: '地址',
      dataIndex: 'address',
      hideInSearch: true,
      formItemProps: { rules: [{ required: true, message: '此项为必填项' }] },
      fieldProps: {
        placeholder: '请输入地址',
      },
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
      renderText(_, record) {
        return (
          <Tag color={statusEnum[record?.status || 0]?.color}>
            {statusEnum[record?.status || 0]?.text}
          </Tag>
        );
      },
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
      columns={columns}
      value={dataSource}
      onChange={setDataSource}
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
      request={async ({ current = 1, pageSize = 10 }) => {
        const { data } = await getS1200DataSheetList({
          device_uuid: deviceUuid,
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
      options={readOnly ? false : {}}
      search={readOnly ? false : {}}
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
