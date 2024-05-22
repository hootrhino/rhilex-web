import { message } from '@/components/PopupHack';

import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';

import {
  deleteBacnetipDataSheetDelIds,
  getBacnetipDataSheetList,
  postBacnetipDataSheetSheetImport,
  postBacnetipDataSheetUpdate,
} from '@/services/rulex/bacnetdianweiguanli';
import { SheetType } from '@/utils/enum';
import DataSheet from '../DataSheet';
import type { DataSheetItem, Point, removeParams } from '../DataSheet/typings';
import { ObjectType, ObjectTypeOption } from './enum';

const defaultBacnetConfig = {
  bacnetDeviceId: 1,
  tag: '',
  alias: '',
  objectType: ObjectType.AI,
  objectId: 1,
};

const defaultUploadData = {
  bacnetDeviceId: 1,
  tag: 'tag1',
  alias: 'tag1',
  objectType: ObjectType.AI,
  objectId: 1,
};

export type UpdateParams = {
  device_uuid: string;
  points: Point[];
};

export type BacnetDataSheetProps = {
  uuid?: string;
  type: SheetType;
};

const BacnetDataSheet = ({ uuid, type = SheetType.LIST }: BacnetDataSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();
  const [deviceUuid, setDeviceId] = useState<string>();

  // 删除点位表
  const { run: remove } = useRequest(
    (params: removeParams) => deleteBacnetipDataSheetDelIds(params),
    {
      manual: true,
      onSuccess: () => {
        actionRef.current?.reload();
        message.success(formatMessage({ id: 'message.success.remove' }));
      },
    },
  );

  // 更新点位表
  const { run: update } = useRequest(
    (params: UpdateParams) => postBacnetipDataSheetUpdate(params),
    {
      manual: true,
      onSuccess: () => {
        actionRef.current?.reload();
        editorFormRef.current?.setRowData?.('new', { ...defaultBacnetConfig, uuid: 'new' });
        message.success(formatMessage({ id: 'message.success.update' }));
      },
    },
  );

  // 导入点位表
  const { run: upload } = useRequest(
    (file: File) => postBacnetipDataSheetSheetImport({ device_uuid: deviceUuid || '' }, file),
    {
      manual: true,
      onSuccess: () => {
        actionRef.current?.reload();
        message.success(formatMessage({ id: 'message.success.upload' }));
      },
    },
  );

  // 导出点位表
  const handleOnDownload = () =>
    (window.location.href = `/api/v1/bacnetip_data_sheet/sheetExport?device_uuid=${deviceId}`);

  useEffect(() => {
    setDeviceId(deviceId || uuid);
  }, [uuid]);

  const columns: ProColumns<Partial<DataSheetItem>>[] = [
    {
      title: '设备 ID',
      dataIndex: 'bacnetDeviceId',
      valueType: 'digit',
      width: 100,
      formItemProps: {
        rules: [{ required: true, message: '请输入设备 ID' }],
      },
      fieldProps: {
        style: { width: '100%' },
        placeholder: '请输入设备 ID',
      },
    },
    {
      title: '对象类型',
      dataIndex: 'objectType',
      valueType: 'select',
      width: 150,
      valueEnum: ObjectTypeOption,
      formItemProps: {
        rules: [{ required: true, message: '请选择对象类型' }],
      },
      fieldProps: {
        allowClear: false,
        placeholder: '请选择对象类型',
      },
    },
    {
      title: '对象 ID',
      dataIndex: 'objectId',
      width: 150,
      valueType: 'digit',
      formItemProps: {
        rules: [
          { required: true, message: '请输入对象 ID' },
          { min: 0, message: '请输入有效的对象 ID，范围为 0-4194303', type: 'integer' },
          { max: 4194303, message: '请输入有效的对象 ID，范围为 0-4194303', type: 'integer' },
        ],
      },
      fieldProps: {
        allowClear: false,
        placeholder: '请输入对象 ID',
      },
    },
  ];

  return (
    <DataSheet
      rowKey="uuid"
      editableFormRef={editorFormRef}
      actionRef={actionRef}
      columns={columns}
      params={{ deviceUuid }}
      request={async ({ current = 1, pageSize = 10 }) => {
        const { data } = await getBacnetipDataSheetList({
          device_uuid: deviceUuid || '',
          current,
          size: pageSize,
        });

        return Promise.resolve({
          data: data?.records || [],
          total: data?.total,
          success: true,
        });
      }}
      defaultConfig={defaultBacnetConfig}
      defaultUploadData={defaultUploadData}
      type={type}
      upload={(file: File) => deviceUuid && upload(file)}
      download={handleOnDownload}
      update={(data: Point[]) => {
        if (deviceUuid && data) {
          update({ device_uuid: deviceUuid, points: data });
        }
      }}
      remove={(uuids: string[]) => {
        if (deviceUuid && uuids) {
          const params = {
            device_uuid: deviceUuid,
            uuids,
          };
          remove(params);
        }
      }}
    />
  );
};

export default BacnetDataSheet;
