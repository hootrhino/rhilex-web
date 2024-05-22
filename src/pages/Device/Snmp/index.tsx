import { message } from '@/components/PopupHack';
import {
  deleteSnmpOidsSheetDelIds,
  getSnmpOidsSheetList,
  postSnmpOidsSheetSheetImport,
  postSnmpOidsSheetUpdate,
} from '@/services/rulex/snmpdianweiguanli';
import { SheetType } from '@/utils/enum';
import { omit } from '@/utils/redash';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import DataSheet from '../DataSheet';
import type { DataSheetItem, Point, removeParams } from '../DataSheet/typings';

const defaultSnmpConfig = {
  oid: '',
  tag: '',
  alias: '',
  frequency: 1000,
};

const defaultUploadData = {
  oid: '.1.3.6.1.2.1.1.1.0',
  tag: 'Total Processes',
  alias: '线程总数',
  frequency: 1000,
};

export type UpdateParams = {
  device_uuid: string;
  snmp_oids: Point[];
};

export type SnmpOidsSheetProps = {
  type: SheetType;
  uuid?: string;
};

const SnmpOidsSheet = ({ type = SheetType.LIST, uuid }: SnmpOidsSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();
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

  // 删除
  const { run: remove } = useRequest((params: removeParams) => deleteSnmpOidsSheetDelIds(params), {
    manual: true,
    onSuccess: () => {
      actionRef.current?.reload();
      message.success(formatMessage({ id: 'message.success.remove' }));
    },
  });

  // 更新
  const { run: update } = useRequest((params: UpdateParams) => postSnmpOidsSheetUpdate(params), {
    manual: true,
    onSuccess: () => {
      actionRef.current?.reload();
      editorFormRef.current?.setRowData?.('new', { ...defaultSnmpConfig, uuid: 'new' });
      message.success(formatMessage({ id: 'message.success.update' }));
    },
  });

  // 导入
  const { run: upload } = useRequest(
    (file: File) => postSnmpOidsSheetSheetImport({ device_uuid: deviceUuid || '' }, file),
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
    (window.location.href = `/api/v1/snmp_oids_sheet/sheetExport?device_uuid=${deviceId}`);

  useEffect(() => {
    setDeviceId(deviceId || uuid);
  }, [uuid]);

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
      fieldProps: {
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
      params={{ deviceUuid }}
      request={async ({ current = 1, pageSize = 10 }) => {
        const { data } = await getSnmpOidsSheetList({
          device_uuid: deviceId,
          current,
          size: pageSize,
        });

        return Promise.resolve({
          data: data?.records,
          total: data?.total,
          success: true,
        });
      }}
      defaultConfig={defaultSnmpConfig}
      defaultUploadData={defaultUploadData}
      type={type}
      upload={(file: File) => deviceUuid && upload(file)}
      download={handleOnDownload}
      update={(data: Point[]) => {
        const points = data?.map((item) => formatUpdateParams(item));
        if (deviceUuid && points) {
          update({ device_uuid: deviceUuid, snmp_oids: points });
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

export default SnmpOidsSheet;
