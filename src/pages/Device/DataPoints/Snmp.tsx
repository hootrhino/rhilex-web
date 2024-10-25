import DataSheet from '@/components/DataSheet';
import type {
  BaseDataSheetProps,
  DataSheetItem,
  Point,
  removeParams,
  UpdateParams,
  UploadParams,
} from '@/components/DataSheet/typings';
import UnitValue from '@/components/UnitValue';
import {
  deleteSnmpOidsSheetDelIds,
  getSnmpOidsSheetList,
  postSnmpOidsSheetSheetImport,
  postSnmpOidsSheetUpdate,
} from '@/services/rhilex/snmpdianweiguanli';
import { defaultPagination } from '@/utils/constant';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRef } from 'react';

const defaultConfig = {
  oid: '',
  frequency: 1000,
};

const defaultUploadData = {
  oid: '.1.3.6.1.2.1.1.1.0',
  tag: 'Total Processes',
  alias: '线程总数',
  frequency: 1000,
};

type SnmpPoint = Point & { oid?: string; frequency?: number };

const SnmpOidsSheet = ({ uuid }: BaseDataSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

  const columns: ProColumns<Partial<DataSheetItem>>[] = [
    {
      title: formatMessage({ id: 'device.form.title.oid' }),
      dataIndex: 'oid',
      ellipsis: true,
      fieldProps: {
        placeholder: formatMessage({ id: 'device.form.placeholder.oid' }),
      },
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'device.form.placeholder.oid' }) }],
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.frequency' }),
      dataIndex: 'frequency',
      valueType: 'digit',
      hideInTable: !!uuid,
      fieldProps: {
        addonAfter: 'ms',
        placeholder: formatMessage({ id: 'device.form.placeholder.frequency' }),
      },
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.frequency' }) },
        ],
      },
      render: (_, { frequency }) => <UnitValue value={frequency} />,
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
        const { data } = await getSnmpOidsSheetList({
          device_uuid: deviceId || uuid,
          current,
          size: pageSize,
        });

        return Promise.resolve({
          data: data?.records,
          total: data?.total,
          success: true,
        });
      }}
      defaultConfig={defaultConfig}
      defaultUploadData={defaultUploadData}
      upload={async ({ file, ...params }: UploadParams) => {
        await postSnmpOidsSheetSheetImport({ ...params }, file);
      }}
      update={async (values: UpdateParams<SnmpPoint>) => {
        await postSnmpOidsSheetUpdate(values);
        editorFormRef.current?.setRowData?.('new', { ...defaultConfig, uuid: 'new' });
      }}
      remove={async (params: removeParams) => {
        await deleteSnmpOidsSheetDelIds(params);
      }}
    />
  );
};

export default SnmpOidsSheet;
