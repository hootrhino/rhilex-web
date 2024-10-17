import UnitValue from '@/components/UnitValue';
import {
  deleteMbusMasterSheetDelIds,
  getMbusMasterSheetList,
  postMbusMasterSheetSheetImport,
  postMbusMasterSheetUpdate,
} from '@/services/rhilex/mBusMasterdianweiguanli';
import { defaultPagination } from '@/utils/constant';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRef } from 'react';
import DataSheet from '../DataSheet';
import {
  BaseDataSheetProps,
  DataSheetItem,
  Point,
  removeParams,
  UpdateParams,
  UploadParams,
} from '../DataSheet/typings';
import { MBusDeviceType, mBusDeviceTypeOptions } from './enum';

const defaultConfig = {
  slaverId: '1',
  type: MBusDeviceType.HEAT_METER,
  tag: '',
  alias: '',
  frequency: 1000,
  dataLength: 1,
  manufacturer: '',
};

const defaultUploadData = {
  uuid: 'mbusUploadData',
  tag: 'a1',
  alias: 'a1',
  frequency: 1000,
  slaverId: '1',
  dataLength: 1,
  manufacturer: '',
  type: MBusDeviceType.HEAT_METER,
};

type MbusPoint = Point & {
  slaverId?: string;
  type?: string;
  frequency?: number;
  dataLength?: number;
  manufacturer?: string;
};

const MbusMasterDataSheet = ({ uuid }: BaseDataSheetProps) => {
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
      hideInTable: !!uuid,
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
      title: formatMessage({ id: 'device.form.title.frequency' }),
      dataIndex: 'frequency',
      valueType: 'digit',
      width: 150,
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
    {
      title: formatMessage({ id: 'device.form.title.dataLength' }),
      dataIndex: 'dataLength',
      valueType: 'digit',
      width: 120,
      hideInTable: !!uuid,
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
      hideInTable: !!uuid,
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
      downloadKey="mbus_master_sheet"
      scroll={{ x: 1200 }}
      upload={async ({ file, ...params }: UploadParams) => {
        await postMbusMasterSheetSheetImport({ ...params }, file);
      }}
      update={async (values: UpdateParams<MbusPoint>) => {
        await postMbusMasterSheetUpdate(values);
        editorFormRef.current?.setRowData?.('new', { ...defaultConfig, uuid: 'new' });
      }}
      remove={async (params: removeParams) => {
        await deleteMbusMasterSheetDelIds(params);
      }}
    />
  );
};

export default MbusMasterDataSheet;
