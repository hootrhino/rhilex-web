import { message } from '@/components/PopupHack';
import UnitValue from '@/components/UnitValue';
import {
  deleteModbusMasterSheetDelIds,
  getModbusMasterSheetList,
  postModbusMasterSheetSheetImport,
  postModbusMasterSheetUpdate,
} from '@/services/rulex/modbusMasterdianweiguanli';
import { defaultPagination } from '@/utils/constant';
import { FormItemType, SheetType } from '@/utils/enum';
import { inRange, omit } from '@/utils/redash';
import { validateFormItem } from '@/utils/utils';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import {
  ProFormCascader,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';
import type { Rule } from 'antd/es/form';
import { useEffect, useRef, useState } from 'react';
import DataSheet from '../DataSheet';
import { DataSheetItem, Point, removeParams } from '../DataSheet/typings';
import { funcEnum } from '../enum';
import { defaultQuantity, modbusDataTypeOptions } from './enum';

const defaultModbusConfig = {
  tag: '',
  alias: '',
  function: 3,
  frequency: 1000,
  slaverId: 1,
  address: 0,
  quantity: 1,
  type: ['RAW', 'DCBA'],
  weight: 1,
};

const defaultUploadData = {
  uuid: 'modbusUploadData',
  tag: 'a1',
  alias: 'a1',
  function: 3,
  frequency: 1000,
  slaverId: 1,
  address: 0,
  quantity: 2,
  type: 'FLOAT',
  order: 'DCBA',
  weight: 1,
};

export type ModbusMasterDataSheetProps = {
  uuid?: string;
  type: SheetType;
};

type ModbusPoint = Point & {
  dataType: string;
  dataOrder: string;
  weight: number;
};

export type UpdateParams = {
  device_uuid: string;
  modbus_data_points: ModbusPoint[];
};

const ModbusMasterDataSheet = ({ uuid, type = SheetType.LIST }: ModbusMasterDataSheetProps) => {
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();
  const actionRef = useRef<ActionType>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

  const [deviceUuid, setDeviceId] = useState<string>();

  const formatUpdateParams = (params: Partial<DataSheetItem>) => {
    let newParams = {
      ...omit(params, ['type']),
      dataType: params?.type?.[0],
      dataOrder: params?.type?.[1],
      weight: Number(params?.weight),
    };

    return newParams;
  };

  // 删除点位表
  const { run: remove } = useRequest(
    (params: removeParams) => deleteModbusMasterSheetDelIds(params),
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
    (params: UpdateParams) => postModbusMasterSheetUpdate(params),
    {
      manual: true,
      onSuccess: () => {
        actionRef.current?.reload();
        editorFormRef.current?.setRowData?.('new', { ...defaultModbusConfig, uuid: 'new' });
        message.success(formatMessage({ id: 'message.success.update' }));
      },
    },
  );

  // 导入点位表
  const { run: upload } = useRequest(
    (file: File) => postModbusMasterSheetSheetImport({ device_uuid: deviceUuid || '' }, file),
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
    (window.location.href = `/api/v1/modbus_master_sheet/sheetExport?device_uuid=${deviceId}`);

  // 获取列表
  const handleOnRequest = async ({
    current = defaultPagination.defaultCurrent,
    pageSize = defaultPagination.defaultPageSize,
  }) => {
    const { data } = await getModbusMasterSheetList({
      device_uuid: deviceUuid,
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

  useEffect(() => {
    setDeviceId(deviceId || uuid);
  }, [uuid]);

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
      hideInTable: type === SheetType.DETAIL,
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
      hideInTable: type === SheetType.DETAIL,
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
              placeholder: formatMessage({ id: 'device.form.placeholder.dataType' }),
              onChange: (value: any) => {
                const dataType = value?.[0];

                editorFormRef.current?.setRowData?.(record?.uuid as string, {
                  quantity: Number(defaultQuantity[dataType]),
                  weight: dataType === 'UTF8' ? 0 : 1,
                });
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
      hideInTable: type === SheetType.DETAIL,
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
      hideInTable: type === SheetType.DETAIL,
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.quantity' }) },
          { min: 1, type: 'integer', message: formatMessage({ id: 'device.form.rules.quantity' }) },
          {
            max: 256,
            type: 'integer',
            message: formatMessage({ id: 'device.form.rules.quantity' }),
          },
        ],
      },
      renderFormItem: () => (
        <ProFormDigit
          noStyle
          disabled={true}
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
      hideInTable: type === SheetType.DETAIL,
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
      hideInTable: type === SheetType.DETAIL,
      fieldProps: {
        style: { width: '100%' },
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
      params={{ deviceUuid }}
      request={handleOnRequest}
      defaultConfig={defaultModbusConfig}
      defaultUploadData={defaultUploadData}
      type={type}
      scroll={{ x: 1200 }}
      upload={(file: File) => deviceUuid && upload(file)}
      download={handleOnDownload}
      update={(data: Point[]) => {
        const points = data?.map((item) => formatUpdateParams(item));
        if (!deviceUuid || !points) return;

        update({ device_uuid: deviceUuid, modbus_data_points: points });
      }}
      remove={(uuids: string[]) => {
        if (!deviceUuid || !uuids) return;
        const params = {
          device_uuid: deviceUuid,
          uuids,
        };
        remove(params);
      }}
    />
  );
};

export default ModbusMasterDataSheet;
