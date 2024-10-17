import { message } from '@/components/PopupHack';

import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';

import {
  deleteBacnetipDataSheetDelIds,
  getBacnetipDataSheetList,
  postBacnetipDataSheetSheetImport,
  postBacnetipDataSheetUpdate,
} from '@/services/rhilex/bacnetdianweiguanli';
import { defaultPagination } from '@/utils/constant';
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
  uuid: 'bacnetUploadData',
  bacnetDeviceId: 1,
  tag: 'tag1',
  alias: 'tag1',
  objectType: ObjectType.AI,
  objectId: 1,
};

export type UpdateParams = {
  device_uuid: string;
  data_points: Point[];
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
      title: formatMessage({ id: 'device.form.title.id' }),
      dataIndex: 'bacnetDeviceId',
      valueType: 'digit',
      width: 100,
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'device.form.placeholder.id' }) }],
      },
      fieldProps: {
        style: { width: '100%' },
        placeholder: formatMessage({ id: 'device.form.placeholder.id' }),
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.objectType' }),
      dataIndex: 'objectType',
      valueType: 'select',
      width: 150,
      hideInTable: type === SheetType.DETAIL,
      valueEnum: ObjectTypeOption,
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'device.form.placeholder.objectType' }),
          },
        ],
      },
      fieldProps: {
        allowClear: false,
        placeholder: formatMessage({ id: 'device.form.placeholder.objectType' }),
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.objectId' }),
      dataIndex: 'objectId',
      width: 150,
      hideInTable: type === SheetType.DETAIL,
      valueType: 'digit',
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'device.form.placeholder.objectId' }),
          },
          {
            min: 0,
            message: formatMessage({ id: 'device.form.rules.bacnet.objectId' }),
            type: 'integer',
          },
          {
            max: 4194303,
            message: formatMessage({ id: 'device.form.rules.bacnet.objectId' }),
            type: 'integer',
          },
        ],
      },
      fieldProps: {
        allowClear: false,
        placeholder: formatMessage({ id: 'device.form.placeholder.objectId' }),
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
      request={async ({
        current = defaultPagination.defaultCurrent,
        pageSize = defaultPagination.defaultPageSize,
      }) => {
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
          update({ device_uuid: deviceUuid, data_points: data });
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
