import { message } from '@/components/PopupHack';
import {
  deleteS1200DataSheetDelIds,
  getS1200DataSheetList,
  postS1200DataSheetSheetImport,
  postS1200DataSheetUpdate,
} from '@/services/rulex/ximenzidianweiguanli';
import { omit } from '@/utils/redash';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { ProFormCascader, ProFormText } from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { plcDataTypeOptions } from './enum';

import UnitValue from '@/components/UnitValue';
import { defaultPagination } from '@/utils/constant';
import { SheetType } from '@/utils/enum';
import { inRange } from '@/utils/redash';
import DataSheet from '../DataSheet';
import type { DataSheetItem, Point, removeParams } from '../DataSheet/typings';

const defaultPlcConfig = {
  tag: '',
  alias: '',
  type: ['FLOAT32', 'DCBA'],
  siemensAddress: '',
  frequency: 1000,
  weight: 1,
};

const defaultUploadData = {
  uuid: 'plcUploadData',
  address: 'DB4900.DBD1000',
  tag: 'R0',
  alias: '新砂轮直径（mm）',
  type: 'FLOAT32',
  order: 'ABCD',
  weight: 1,
  frequency: 1000,
};

type PlcPoint = Point & { weight: number };

export type UpdateParams = {
  device_uuid: string;
  siemens_data_points: PlcPoint[];
};

export type PlcSheetProps = {
  type: SheetType;
  uuid?: string;
};

const PlcDataSheet = ({ uuid, type = SheetType.LIST }: PlcSheetProps) => {
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();
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
  const { run: remove } = useRequest((params: removeParams) => deleteS1200DataSheetDelIds(params), {
    manual: true,
    onSuccess: () => {
      actionRef.current?.reload();
      message.success(formatMessage({ id: 'message.success.remove' }));
    },
  });

  // 更新点位表
  const { run: update } = useRequest((params: UpdateParams) => postS1200DataSheetUpdate(params), {
    manual: true,
    onSuccess: () => {
      actionRef.current?.reload();
      editorFormRef.current?.setRowData?.('new', { ...defaultPlcConfig, uuid: 'new' });
      message.success(formatMessage({ id: 'message.success.update' }));
    },
  });

  // 导入点位表
  const { run: upload } = useRequest(
    (file: File) => postS1200DataSheetSheetImport({ device_uuid: deviceUuid || '' }, file),
    {
      manual: true,
      onSuccess: () => {
        message.success(formatMessage({ id: 'message.success.upload' }));
        actionRef.current?.reload();
      },
    },
  );

  // 导出点位表
  const handleOnDownload = () =>
    (window.location.href = `/api/v1/s1200_data_sheet/sheetExport?device_uuid=${deviceId}`);

  useEffect(() => {
    setDeviceId(deviceId || uuid);
  }, [uuid]);

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
      // width: 150,
      hideInTable: type === SheetType.DETAIL,
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
        const type = record?.type?.[0];

        return (
          <ProFormText
            noStyle
            disabled={['RAW', 'BYTE', 'I', 'Q'].includes(type)}
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
      request={async ({
        current = defaultPagination.defaultCurrent,
        pageSize = defaultPagination.defaultPageSize,
      }) => {
        const { data } = await getS1200DataSheetList({
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
      }}
      defaultConfig={defaultPlcConfig}
      defaultUploadData={defaultUploadData}
      type={type}
      scroll={{ x: 1200 }}
      upload={(file: File) => deviceUuid && upload(file)}
      download={handleOnDownload}
      update={(data: Point[]) => {
        const points = data?.map((item) => formatUpdateParams(item));
        if (deviceUuid && points) {
          update({ device_uuid: deviceUuid, siemens_data_points: points });
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

export default PlcDataSheet;
