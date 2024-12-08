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
  deleteMbusMasterSheetDelIds,
  getMbusMasterSheetList,
  postMbusMasterSheetSheetImport,
  postMbusMasterSheetUpdate,
} from '@/services/rhilex/mBusMasterdianweiguanli';
import { defaultPagination } from '@/utils/constant';
import { inRange } from '@/utils/redash';
import {
  type ActionType,
  type EditableFormInstance,
  type ProColumns,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRef } from 'react';
import { MBusDeviceType, mBusDeviceTypeOptions } from './enum';

const defaultConfig = {
  slaverId: '1',
  type: MBusDeviceType.HEAT_METER,
  frequency: 1000,
  dataLength: 1,
  manufacturer: '',
  weight: 1,
};

const defaultUploadData = {
  frequency: 1000,
  slaverId: '1',
  dataLength: 1,
  manufacturer: '',
  type: MBusDeviceType.HEAT_METER,
  weight: 1,
};

type MbusPoint = Point & {
  slaverId?: string;
  type?: string;
  frequency?: number;
  dataLength?: number;
  manufacturer?: string;
  weight: number;
};

const MbusMasterDataSheet = ({ uuid, isDetail = false }: BaseDataSheetProps) => {
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();
  const actionRef = useRef<ActionType>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

  // 获取列表
  const handleOnRequest = async ({
    current = defaultPagination.defaultCurrent,
    pageSize = defaultPagination.defaultPageSize,
  }) => {
    const { data } = await getMbusMasterSheetList({
      device_uuid: deviceId || uuid,
      current,
      size: pageSize,
    });

    return Promise.resolve({
      data: data?.records,
      total: data?.total,
      success: true,
    });
  };

  const columns: ProColumns<Partial<DataSheetItem>>[] = [
    {
      title: formatMessage({ id: 'device.form.title.slaverId' }),
      dataIndex: 'slaverId',
      width: 100,
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'device.form.rules.slaverId' }) }],
      },
    },
    {
      title: formatMessage({ id: 'form.title.type' }),
      dataIndex: 'type',
      width: 120,
      valueEnum: mBusDeviceTypeOptions,
      fieldProps: {
        allowClear: false,
        placeholder: formatMessage({ id: 'form.placeholder.type' }),
      },
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'form.placeholder.type' }) }],
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
      width: 150,
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
    {
      title: formatMessage({ id: 'device.form.title.dataLength' }),
      dataIndex: 'dataLength',
      valueType: 'digit',
      width: 120,
      fieldProps: {
        style: { width: '100%' },
        placeholder: formatMessage({ id: 'device.form.placeholder.dataLength' }),
      },
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.dataLength' }) },
        ],
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.manufacturer' }),
      dataIndex: 'manufacturer',
      width: 150,
      fieldProps: {
        placeholder: formatMessage({ id: 'device.form.placeholder.manufacturer' }),
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'device.form.placeholder.manufacturer' }),
          },
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
      request={handleOnRequest}
      defaultConfig={defaultConfig}
      defaultUploadData={defaultUploadData}
      scroll={{ x: 1200 }}
      isDetail={isDetail}
      upload={async ({ file, ...params }: UploadParams) => {
        await postMbusMasterSheetSheetImport({ ...params }, file);
      }}
      update={async (values: UpdateParams<MbusPoint>) => {
        const points = values.data_points?.map((item) => ({
          ...item,
          weight: Number(item.weight),
        }));
        await postMbusMasterSheetUpdate({ ...values, data_points: points });
        editorFormRef.current?.setRowData?.('new', { ...defaultConfig, uuid: 'new' });
      }}
      remove={async (params: removeParams) => {
        await deleteMbusMasterSheetDelIds(params);
      }}
    />
  );
};

export default MbusMasterDataSheet;
