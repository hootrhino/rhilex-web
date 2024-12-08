import {
  deleteS1200DataSheetDelIds,
  getS1200DataSheetList,
  postS1200DataSheetSheetImport,
  postS1200DataSheetUpdate,
} from '@/services/rhilex/ximenzidianweiguanli';
import { omit } from '@/utils/redash';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { ProFormCascader, ProFormText } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRef } from 'react';
import { ByteOrder, PLCDataType, plcDataTypeOptions } from './enum';

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
import { defaultPagination } from '@/utils/constant';
import { inRange } from '@/utils/redash';

const defaultConfig = {
  type: [PLCDataType.FLOAT32, ByteOrder.DCBA],
  siemensAddress: '',
  frequency: 1000,
  weight: 1,
};

const defaultUploadData = {
  address: 'DB4900.DBD1000',
  tag: 'R0',
  alias: '新砂轮直径（mm）',
  type: PLCDataType.FLOAT32,
  order: ByteOrder.ABCD,
  weight: 1,
  frequency: 1000,
};

type PlcPoint = Point & { weight: number };

const PlcDataSheet = ({ isDetail = false }: BaseDataSheetProps) => {
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();

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
      title: formatMessage({ id: 'device.form.title.siemensAddress' }),
      dataIndex: 'siemensAddress',
      width: 150,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'device.form.placeholder.siemensAddress' }),
          },
        ],
      },
      fieldProps: {
        placeholder: formatMessage({ id: 'device.form.placeholder.siemensAddress' }),
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.dataType' }),
      dataIndex: 'type',
      renderFormItem: () => (
        <ProFormCascader
          noStyle
          fieldProps={{
            allowClear: false,
            popupClassName: 'plc-data-type-cascader',
            placeholder: formatMessage({ id: 'device.form.placeholder.dataType' }),
            options: plcDataTypeOptions,
          }}
          rules={[
            { required: true, message: formatMessage({ id: 'device.form.placeholder.dataType' }) },
          ]}
        />
      ),
      render: (_, { dataType, dataOrder }) => {
        const currentType = plcDataTypeOptions?.find((item) => item?.value === dataType);
        const typeLabel = currentType?.label?.split('（')?.[0];

        return typeLabel && dataOrder ? (
          <>
            {typeLabel}（{dataOrder}）
          </>
        ) : (
          '-'
        );
      },
      search: {
        // 格式化搜索值
        transform: (value) => ({
          dataType: value[0],
          dataOrder: value[1],
        }),
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.weight' }),
      dataIndex: 'weight',
      valueType: 'digit',
      width: 100,
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.weight' }) },
          {
            validator: (_, value) => {
              if (inRange(value, -0.0001, 100000)) {
                return Promise.resolve();
              }
              return Promise.reject(formatMessage({ id: 'device.form.rules.weight' }));
            },
          },
        ],
      },
      renderFormItem: (_, { record }) => {
        const type = record?.type?.[0];

        return (
          <ProFormText
            noStyle
            disabled={[PLCDataType.BYTE, PLCDataType.I, PLCDataType.Q].includes(type)}
            fieldProps={{ placeholder: formatMessage({ id: 'device.form.placeholder.weight' }) }}
          />
        );
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.frequency' }),
      dataIndex: 'frequency',
      valueType: 'digit',
      width: 120,
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
      scroll={{ x: 1500 }}
      isDetail={isDetail}
      request={async ({
        current = defaultPagination.defaultCurrent,
        pageSize = defaultPagination.defaultPageSize,
      }) => {
        const { data } = await getS1200DataSheetList({
          device_uuid: deviceId || '',
          current,
          size: pageSize,
        });

        return Promise.resolve({
          data: data?.records?.map((item) => ({
            ...item,
            type: [item?.dataType, item?.dataOrder],
          })),
          total: data?.total,
          success: true,
        });
      }}
      defaultConfig={defaultConfig}
      defaultUploadData={defaultUploadData}
      upload={async ({ file, ...params }: UploadParams) => {
        await postS1200DataSheetSheetImport({ ...params }, file);
      }}
      update={async (values: UpdateParams<PlcPoint>) => {
        const points = values.data_points?.map((item) => formatUpdateParams(item));
        await postS1200DataSheetUpdate({ ...values, data_points: points });
        editorFormRef.current?.setRowData?.('new', { ...defaultConfig, uuid: 'new' });
      }}
      remove={async (params: removeParams) => {
        await deleteS1200DataSheetDelIds(params);
      }}
    />
  );
};

export default PlcDataSheet;
