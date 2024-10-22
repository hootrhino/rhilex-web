import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRef } from 'react';

import {
  deleteBacnetipDataSheetDelIds,
  getBacnetipDataSheetList,
  postBacnetipDataSheetSheetImport,
  postBacnetipDataSheetUpdate,
} from '@/services/rhilex/bacnetdianweiguanli';
import { defaultPagination } from '@/utils/constant';
import DataSheet from '../DataSheet';
import type {
  BaseDataSheetProps,
  DataSheetItem,
  Point,
  removeParams,
  UpdateParams,
  UploadParams,
} from '../DataSheet/typings';
import { ObjectType, ObjectTypeOption } from './enum';

type BACnetPoint = Point & {
  bacnetDeviceId?: number;
  objectType?: string;
  objectId?: number;
};

const defaultConfig = {
  bacnetDeviceId: 1,
  objectType: ObjectType.AI,
  objectId: 1,
};

const defaultUploadData = {
  bacnetDeviceId: 1,
  objectType: ObjectType.AI,
  objectId: 1,
};

const BacnetDataSheet = ({ uuid }: BaseDataSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

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
      hideInTable: !!uuid,
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
      hideInTable: !!uuid,
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
      request={async ({
        current = defaultPagination.defaultCurrent,
        pageSize = defaultPagination.defaultPageSize,
      }) => {
        const deviceUuid = deviceId || uuid || '';
        const { data } = await getBacnetipDataSheetList({
          device_uuid: deviceUuid,
          current,
          size: pageSize,
        });

        return Promise.resolve({
          data: data?.records || [],
          total: data?.total,
          success: true,
        });
      }}
      defaultConfig={defaultConfig}
      defaultUploadData={defaultUploadData}
      downloadKey="bacnetip_data_sheet"
      upload={async ({ file, ...params }: UploadParams) => {
        await postBacnetipDataSheetSheetImport({ ...params }, file);
      }}
      update={async (values: UpdateParams<BACnetPoint>) => {
        await postBacnetipDataSheetUpdate(values);
        editorFormRef.current?.setRowData?.('new', { ...defaultConfig, uuid: 'new' });
      }}
      remove={async (params: removeParams) => {
        await deleteBacnetipDataSheetDelIds(params);
      }}
    />
  );
};

export default BacnetDataSheet;
