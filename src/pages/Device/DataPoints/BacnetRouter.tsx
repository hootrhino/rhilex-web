import DataSheet from '@/components/DataSheet';
import type {
  BaseDataSheetProps,
  DataSheetItem,
  Point,
  removeParams,
  UpdateParams,
  UploadParams,
} from '@/components/DataSheet/typings';
import {
  deleteBacnetRouterSheetDelIds,
  getBacnetRouterSheetList,
  postBacnetRouterSheetSheetImport,
  postBacnetRouterSheetUpdate,
} from '@/services/rhilex/bacnetRoutermoshi';
import { defaultPagination } from '@/utils/constant';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRef } from 'react';
import { ObjectType, ObjectTypeOption } from './enum';

type BACnetPoint = Point & {
  objectType?: string;
  objectId?: number;
};

const defaultConfig = {
  objectType: ObjectType.AI,
  objectId: 1,
};

const defaultUploadData = {
  objectType: ObjectType.AI,
  objectId: 1,
};

const BacnetRouterDataSheet = ({ uuid }: BaseDataSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

  const columns: ProColumns<Partial<DataSheetItem>>[] = [
    {
      title: formatMessage({ id: 'device.form.title.objectId' }),
      dataIndex: 'objectId',
      width: 150,
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
    {
      title: formatMessage({ id: 'device.form.title.objectType' }),
      dataIndex: 'objectType',
      valueType: 'select',
      width: 150,
      valueEnum: ObjectTypeOption,
      hideInTable: !!uuid,
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
        const { data } = await getBacnetRouterSheetList({
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
      upload={async ({ file, ...params }: UploadParams) => {
        await postBacnetRouterSheetSheetImport({ ...params }, file);
      }}
      update={async (values: UpdateParams<BACnetPoint>) => {
        await postBacnetRouterSheetUpdate(values);
        editorFormRef.current?.setRowData?.('new', { ...defaultConfig, uuid: 'new' });
      }}
      remove={async (params: removeParams) => {
        await deleteBacnetRouterSheetDelIds(params);
      }}
    />
  );
};

export default BacnetRouterDataSheet;
