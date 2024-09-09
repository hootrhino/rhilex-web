import { message } from '@/components/PopupHack';
import UnitValue from '@/components/UnitValue';
import {
  deleteMbusMasterSheetDelIds,
  getMbusMasterSheetList,
  postMbusMasterSheetSheetImport,
  postMbusMasterSheetUpdate,
} from '@/services/rhilex/mBusMasterdianweiguanli';
import { defaultPagination } from '@/utils/constant';
import { SheetType } from '@/utils/enum';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import DataSheet from '../DataSheet';
import { DataSheetItem, Point, removeParams } from '../DataSheet/typings';
import { MBusDeviceType, mBusDeviceTypeOptions } from './enum';

const defaultMbusConfig = {
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

export type MbusMasterDataSheetProps = {
  uuid?: string;
  type: SheetType;
};

type MbusPoint = Point & {
  slaverId?: string;
  type?: string;
  frequency?: number;
  dataLength?: number;
  manufacturer?: string;
};

export type UpdateParams = {
  device_uuid: string;
  mbus_data_points: MbusPoint[];
};

const MbusMasterDataSheet = ({ uuid, type = SheetType.LIST }: MbusMasterDataSheetProps) => {
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();
  const actionRef = useRef<ActionType>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

  const [deviceUuid, setDeviceId] = useState<string>();

  // 删除点位表
  const { run: remove } = useRequest(
    (params: removeParams) => deleteMbusMasterSheetDelIds(params),
    {
      manual: true,
      onSuccess: () => {
        actionRef.current?.reload();
        message.success(formatMessage({ id: 'message.success.remove' }));
      },
    },
  );

  // 更新点位表
  const { run: update } = useRequest((params: UpdateParams) => postMbusMasterSheetUpdate(params), {
    manual: true,
    onSuccess: () => {
      actionRef.current?.reload();
      editorFormRef.current?.setRowData?.('new', { ...defaultMbusConfig, uuid: 'new' });
      message.success(formatMessage({ id: 'message.success.update' }));
    },
  });

  // 导入点位表
  const { run: upload } = useRequest(
    (file: File) => postMbusMasterSheetSheetImport({ device_uuid: deviceUuid || '' }, file),
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
    (window.location.href = `/api/v1/mbus_master_sheet/sheetExport?device_uuid=${deviceId}`);

  // 获取列表
  const handleOnRequest = async ({
    current = defaultPagination.defaultCurrent,
    pageSize = defaultPagination.defaultPageSize,
  }) => {
    const { data } = await getMbusMasterSheetList({
      device_uuid: deviceUuid,
      current,
      size: pageSize,
    });

    return Promise.resolve({
      data: data?.records,
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
      title: formatMessage({ id: 'device.form.title.frequency' }),
      dataIndex: 'frequency',
      valueType: 'digit',
      width: 150,
      hideInTable: type === SheetType.DETAIL,
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
      hideInTable: type === SheetType.DETAIL,
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
      params={{ deviceUuid }}
      request={handleOnRequest}
      defaultConfig={defaultMbusConfig}
      defaultUploadData={defaultUploadData}
      type={type}
      scroll={{ x: 1200 }}
      upload={(file: File) => deviceUuid && upload(file)}
      download={handleOnDownload}
      update={(data: Point[]) => {
        if (!deviceUuid || !data) return;

        update({ device_uuid: deviceUuid, mbus_data_points: data });
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

export default MbusMasterDataSheet;
