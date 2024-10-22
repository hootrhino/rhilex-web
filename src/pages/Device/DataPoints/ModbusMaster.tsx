import DataSheet from '@/components/DataSheet';
import {
  BaseDataSheetProps,
  DataSheetItem,
  Point,
  removeParams,
  UpdateParams,
  UploadParams,
} from '@/components/DataSheet/typings';
import UnitValue from '@/components/UnitValue';
import {
  deleteModbusMasterSheetDelIds,
  getModbusMasterSheetList,
  postModbusMasterSheetSheetImport,
  postModbusMasterSheetUpdate,
} from '@/services/rhilex/modbusMasterdianweiguanli';
import { defaultPagination } from '@/utils/constant';
import { FormItemType } from '@/utils/enum';
import { inRange, omit } from '@/utils/redash';
import { validateFormItem } from '@/utils/utils';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import {
  ProFormCascader,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import type { Rule } from 'antd/es/form';
import { useRef, useState } from 'react';
import { funcEnum } from '../enum';
import { modbusDataTypeOptions, Quantity } from './enum';

const defaultConfig = {
  function: 3,
  frequency: 1000,
  slaverId: 1,
  address: 0,
  quantity: Quantity['RAW'],
  type: ['RAW', 'DCBA'],
  weight: 1,
};

const defaultUploadData = {
  function: 3,
  frequency: 1000,
  slaverId: 1,
  address: 0,
  quantity: Quantity['FLOAT32'],
  type: 'FLOAT32',
  order: 'DCBA',
  weight: 1,
};

type ModbusPoint = Point & {
  dataType: string;
  dataOrder: string;
  weight: number;
};

const ModbusMasterDataSheet = ({ uuid }: BaseDataSheetProps) => {
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();
  const actionRef = useRef<ActionType>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();
  const [disabledQty, setDisabled] = useState<boolean>(false);

  const formatUpdateParams = (params: Partial<DataSheetItem>) => {
    let newParams = {
      ...omit(params, ['type']),
      dataType: params?.type?.[0],
      dataOrder: params?.type?.[1],
      weight: Number(params?.weight),
    };

    return newParams;
  };

  // 获取列表
  const handleOnRequest = async ({
    current = defaultPagination.defaultCurrent,
    pageSize = defaultPagination.defaultPageSize,
  }) => {
    const { data } = await getModbusMasterSheetList({
      device_uuid: deviceId || uuid,
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
  };

  const columns: ProColumns<Partial<DataSheetItem>>[] = [
    {
      title: formatMessage({ id: 'device.form.title.slaverId' }),
      dataIndex: 'slaverId',
      valueType: 'digit',
      width: 100,
      fieldProps: {
        style: { width: '100%' },
        placeholder: formatMessage({ id: 'device.form.placeholder.slaverId' }),
      },
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.slaverId' }) },
          {
            max: 255,
            type: 'integer',
            message: formatMessage({ id: 'device.form.rules.slaverId' }),
          },
          { min: 1, type: 'integer', message: formatMessage({ id: 'device.form.rules.slaverId' }) },
        ],
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.func' }),
      dataIndex: 'function',
      valueType: 'select',
      width: 150,
      hideInTable: !!uuid,
      valueEnum: funcEnum,
      renderFormItem: (_, { record }) => (
        <ProFormSelect
          noStyle
          fieldProps={{
            allowClear: false,
            placeholder: formatMessage({ id: 'device.form.placeholder.func' }),
            onChange: (value) => {
              if (value === 1) {
                editorFormRef.current?.setRowData?.(record?.uuid as string, {
                  type: ['BYTE', 'A'],
                  quantity: 1,
                });
              } else {
                editorFormRef.current?.setRowData?.(record?.uuid as string, {
                  type: ['RAW', 'DCBA'],
                  quantity: Quantity['RAW'],
                  weight: 1,
                });
              }
            },
          }}
          valueEnum={funcEnum}
          rules={[
            { required: true, message: formatMessage({ id: 'device.form.placeholder.func' }) },
          ]}
        />
      ),
    },
    {
      title: formatMessage({ id: 'device.form.title.dataType' }),
      dataIndex: 'type',
      width: 150,
      hideInTable: !!uuid,
      ellipsis: true,
      renderFormItem: (_, { record }) => {
        let options = modbusDataTypeOptions;

        if (record?.function === 1) {
          options = options?.filter((item) => item.value === 'BYTE');
        }
        if (record?.function === 2) {
          options = options?.filter((item) => !['BYTE', 'UTF8'].includes(item.value));
        }
        if (record?.function && [3, 4].includes(record.function)) {
          options = options?.filter((item) => item.value !== 'BYTE');
        }

        return (
          <ProFormCascader
            noStyle
            disabled={record?.function === 1}
            fieldProps={{
              allowClear: false,
              popupClassName: 'data-type-cascader',
              placeholder: formatMessage({ id: 'device.form.placeholder.dataType' }),
              onChange: (value: any) => {
                const dataType = value?.[0];

                editorFormRef.current?.setRowData?.(record?.uuid as string, {
                  quantity: Number(Quantity[dataType]),
                  weight: dataType === 'UTF8' ? 0 : 1,
                });
                setDisabled(dataType !== 'RAW');
              },
              options,
            }}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'device.form.placeholder.dataType' }),
              },
            ]}
          />
        );
      },
      render: (_, { dataType, dataOrder }) => {
        const currentType = modbusDataTypeOptions?.find((item) => item?.value === dataType);
        const typeLabel = currentType?.label?.split('（')?.[0];

        return typeLabel && dataOrder ? (
          <>
            {typeLabel}（{dataOrder}）
          </>
        ) : (
          '-'
        );
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.address' }),
      dataIndex: 'address',
      valueType: 'digit',
      width: 100,
      hideInTable: !!uuid,
      ellipsis: true,
      fieldProps: {
        style: { width: '100%' },
        placeholder: formatMessage({ id: 'device.form.placeholder.address' }),
      },
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.address' }) },
          {
            validator: (_rule: Rule, value: number) =>
              validateFormItem(value, FormItemType.ADDRESS),
          },
        ],
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.quantity' }),
      dataIndex: 'quantity',
      valueType: 'digit',
      width: 100,
      hideInTable: !!uuid,
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.quantity' }) },
          { min: 0, type: 'integer', message: formatMessage({ id: 'device.form.rules.quantity' }) },
          {
            max: 128,
            type: 'integer',
            message: formatMessage({ id: 'device.form.rules.quantity' }),
          },
        ],
      },
      renderFormItem: () => (
        <ProFormDigit
          noStyle
          disabled={disabledQty}
          fieldProps={{
            style: { width: '100%' },
            placeholder: formatMessage({ id: 'device.form.placeholder.quantity' }),
          }}
        />
      ),
    },

    {
      title: formatMessage({ id: 'device.form.title.weight' }),
      dataIndex: 'weight',
      valueType: 'digit',
      width: 80,
      hideInTable: !!uuid,
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
        const dataType = record?.type?.[0];

        return (
          <ProFormText
            noStyle
            disabled={['RAW', 'UTF8'].includes(dataType)}
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
      request={handleOnRequest}
      defaultConfig={defaultConfig}
      defaultUploadData={defaultUploadData}
      scroll={{ x: 1200 }}
      upload={async ({ file, ...params }: UploadParams) => {
        await postModbusMasterSheetSheetImport({ ...params }, file);
      }}
      update={async (values: UpdateParams<ModbusPoint>) => {
        const points = values.data_points?.map((item) => formatUpdateParams(item));
        await postModbusMasterSheetUpdate({ ...values, data_points: points });
        editorFormRef.current?.setRowData?.('new', { ...defaultConfig, uuid: 'new' });
      }}
      remove={async (params: removeParams) => {
        await deleteModbusMasterSheetDelIds(params);
      }}
    />
  );
};

export default ModbusMasterDataSheet;
