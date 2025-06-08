import DataSheet from '@/components/DataSheet';
import type {
  BaseDataSheetProps,
  DataSheetItem,
  removeParams,
  UpdateParams,
  UploadParams,
} from '@/components/DataSheet/typings';
import UnitValue from '@/components/UnitValue';
import {
  deleteDlt6452007MasterSheetDelIds,
  getDlt6452007MasterSheetList,
  postDlt6452007MasterSheetSheetImport,
  postDlt6452007MasterSheetUpdate,
} from '@/services/rhilex/dlt6452007Dianweiguanli';
import { defaultPagination } from '@/utils/constant';
import { inRange } from '@/utils/redash';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import type { Rule } from 'antd/es/form';
import { useRef } from 'react';

const defaultConfig = {
  meterId: '',
  frequency: 1000,
  weight: 1,
};

const defaultUploadData = {
  meterId: '100023669245',
  frequency: 1000,
  weight: 1,
};

const DLTDataSheet = ({ isDetail = false }: BaseDataSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

  const columns: ProColumns<Partial<DataSheetItem>>[] = [
    {
      title: formatMessage({ id: 'device.form.title.id' }),
      dataIndex: 'meterId',
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.id' }) },
          {
            validator: (_rule: Rule, value: string) => {
              if (isNaN(Number(value))) {
                return Promise.reject(formatMessage({ id: 'device.form.rules.meterId.number' }));
              }
              if (value && value.length !== 12) {
                return Promise.reject(formatMessage({ id: 'device.form.rules.meterId.len' }));
              }
              return Promise.resolve();
            },
          },
        ],
      },
      fieldProps: {
        placeholder: formatMessage({ id: 'device.form.placeholder.id' }),
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.weight' }),
      dataIndex: 'weight',
      width: 140,
      formItemProps: {
        rules: [
          {
            validator: (_, value) => {
              if (!value) {
                return Promise.reject(formatMessage({ id: 'device.form.placeholder.weight' }));
              }

              if (value && !inRange(value, -0.0001, 100000)) {
                return Promise.reject(formatMessage({ id: 'device.form.rules.weight' }));
              }

              return Promise.resolve();
            },
          },
        ],
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.frequency' }),
      dataIndex: 'frequency',
      valueType: 'digit',
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
      isDetail={isDetail}
      request={async ({
        current = defaultPagination.defaultCurrent,
        pageSize = defaultPagination.defaultPageSize,
      }) => {
        const { data } = await getDlt6452007MasterSheetList({
          device_uuid: deviceId || '',
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
        await postDlt6452007MasterSheetSheetImport({ ...params }, file);
      }}
      update={async (values: UpdateParams) => {
        const points = values.data_points?.map((item) => ({
          ...item,
          weight: Number(item.weight),
        }));
        await postDlt6452007MasterSheetUpdate({ ...values, data_points: points });
        editorFormRef.current?.setRowData?.('new', { ...defaultConfig, uuid: 'new' });
      }}
      remove={async (params: removeParams) => {
        await deleteDlt6452007MasterSheetDelIds(params);
      }}
    />
  );
};

export default DLTDataSheet;
