import { message } from '@/components/PopupHack';
import UnitValue from '@/components/UnitValue';
import {
  deleteUserProtocolSheetDelIds,
  getUserProtocolSheetList,
  postUserProtocolSheetSheetImport,
  postUserProtocolSheetUpdate,
} from '@/services/rhilex/yonghuzidingyixieyidianweiguanli';
import { defaultPagination } from '@/utils/constant';
import { SheetType } from '@/utils/enum';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';
import type { Rule } from 'antd/es/form';
import { useEffect, useRef, useState } from 'react';
import DataSheet from '../DataSheet';
import type { DataSheetItem, Point, removeParams } from '../DataSheet/typings';

const defaultConfig = {
  command: '',
  tag: '',
  alias: '',
  frequency: 1000,
};

const defaultUploadData = {
  uuid: 'uploadData',
  command: '010300000002CC40B',
  tag: 'device1',
  alias: '风机1',
  frequency: 1000,
};

export type UpdateParams = {
  device_uuid: string;
  data_points: Point[];
};

export type UserProtocolDataSheetProps = {
  uuid?: string;
  type: SheetType;
};

const UserProtocolDataSheet = ({ uuid, type = SheetType.LIST }: UserProtocolDataSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();
  const [deviceUuid, setDeviceId] = useState<string>();

  // 删除点位表
  const { run: remove } = useRequest(
    (params: removeParams) => deleteUserProtocolSheetDelIds(params),
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
    (params: UpdateParams) => postUserProtocolSheetUpdate(params),
    {
      manual: true,
      onSuccess: () => {
        actionRef.current?.reload();
        editorFormRef.current?.setRowData?.('new', { ...defaultConfig, uuid: 'new' });
        message.success(formatMessage({ id: 'message.success.update' }));
      },
    },
  );

  // 导入点位表
  const { run: upload } = useRequest(
    (file: File) => postUserProtocolSheetSheetImport({ device_uuid: deviceUuid || '' }, file),
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
    (window.location.href = `/api/v1/user_protocol_sheet/sheetExport?device_uuid=${deviceId}`);

  useEffect(() => {
    setDeviceId(deviceId || uuid);
  }, [uuid]);

  const columns: ProColumns<Partial<DataSheetItem>>[] = [
    {
      title: formatMessage({ id: 'device.form.title.command' }),
      dataIndex: 'command',
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'device.form.placeholder.command' }) },
          {
            validator: (_rule: Rule, value: string) => {
              if (value && value.length > 64) {
                return Promise.reject(formatMessage({ id: 'device.form.rules.command' }));
              }
              return Promise.resolve();
            },
          },
        ],
      },
      fieldProps: {
        placeholder: formatMessage({ id: 'device.form.placeholder.command' }),
      },
    },
    {
      title: formatMessage({ id: 'device.form.title.frequency' }),
      dataIndex: 'frequency',
      valueType: 'digit',
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
        const { data } = await getUserProtocolSheetList({
          device_uuid: deviceUuid || '',
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
      type={type}
      upload={(file: File) => deviceUuid && upload(file)}
      download={handleOnDownload}
      update={(data: Point[]) => {
        if (deviceUuid && data) {
          update({ device_uuid: deviceUuid, data_points: data });
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

export default UserProtocolDataSheet;
