import {
  deleteSnmpOidsSheetDelIds,
  getSnmpOidsSheetList,
  postSnmpOidsSheetSheetImport,
  postSnmpOidsSheetUpdate,
} from '@/services/rhilex/snmpdianweiguanli';
import { defaultPagination } from '@/utils/constant';
import { omit } from '@/utils/redash';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRef } from 'react';
import DataSheet from '../DataSheet';
import type {
  BaseDataSheetProps,
  DataSheetItem,
  removeParams,
  UpdateParams,
  UploadParams,
} from '../DataSheet/typings';

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

const SnmpOidsSheet = ({ uuid }: BaseDataSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

  const formatUpdateParams = (params: Partial<DataSheetItem>) => {
    let newParams = {
      ...omit(params, ['type']),
      dataType: params?.type?.[0],
      dataOrder: params?.type?.[1],
      weight: Number(params?.weight),
    };

    return newParams;
  };

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
      width: 100,
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
      downloadKey="snmp_oids_sheet"
      upload={async ({ file, ...params }: UploadParams) => {
        await postSnmpOidsSheetSheetImport({ ...params }, file);
      }}
      update={async (values: UpdateParams) => {
        const points = values.data_points?.map((item) => formatUpdateParams(item));
        await postSnmpOidsSheetUpdate({ ...values, data_points: points });
        editorFormRef.current?.setRowData?.('new', { ...defaultConfig, uuid: 'new' });
      }}
      remove={async (params: removeParams) => {
        await deleteSnmpOidsSheetDelIds(params);
      }}
    />
  );
};

export default SnmpOidsSheet;
