import UnitValue from '@/components/UnitValue';
import {
  deleteCjt1882004MasterSheetDelIds,
  getCjt1882004MasterSheetList,
  postCjt1882004MasterSheetSheetImport,
  postCjt1882004MasterSheetUpdate,
} from '@/services/rhilex/cjt18832004Dianweiguanli';
import { defaultPagination } from '@/utils/constant';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import type { Rule } from 'antd/es/form';
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
  meterId: '',
  frequency: 1000,
};

const defaultUploadData = {
  meterId: '100023669245',
  tag: 'meter1',
  alias: 'meter1',
  frequency: 1000,
};

const CJTDataSheet = ({ uuid }: BaseDataSheetProps) => {
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
        const { data } = await getCjt1882004MasterSheetList({
          device_uuid: deviceId || uuid,
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
      downloadKey="cjt1882004_master_sheet"
      upload={async ({ file, ...params }: UploadParams) => {
        await postCjt1882004MasterSheetSheetImport({ ...params }, file);
      }}
      update={async (values: UpdateParams) => {
        await postCjt1882004MasterSheetUpdate(values);
        editorFormRef.current?.setRowData?.('new', { ...defaultConfig, uuid: 'new' });
      }}
      remove={async (params: removeParams) => {
        await deleteCjt1882004MasterSheetDelIds(params);
      }}
    />
  );
};

export default CJTDataSheet;
