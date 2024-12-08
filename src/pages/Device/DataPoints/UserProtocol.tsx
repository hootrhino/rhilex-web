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
import {
  deleteUserProtocolSheetDelIds,
  getUserProtocolSheetList,
  postUserProtocolSheetSheetImport,
  postUserProtocolSheetUpdate,
} from '@/services/rhilex/yonghuzidingyixieyidianweiguanli';
import { defaultPagination } from '@/utils/constant';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import type { Rule } from 'antd/es/form';
import { useRef } from 'react';

const defaultConfig = {
  command: '',
  frequency: 1000,
};

const defaultUploadData = {
  command: '010300000002CC40B',
  tag: 'device1',
  alias: '风机1',
  frequency: 1000,
};

type UserProtocolPoint = Point & {
  command?: string;
  frequency?: number;
};

const UserProtocolDataSheet = ({ isDetail = false }: BaseDataSheetProps) => {
  const actionRef = useRef<ActionType>();
  const editorFormRef = useRef<EditableFormInstance<DataSheetItem>>();
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();

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
      isDetail={isDetail}
      request={async ({
        current = defaultPagination.defaultCurrent,
        pageSize = defaultPagination.defaultPageSize,
      }) => {
        const { data } = await getUserProtocolSheetList({
          device_uuid: deviceId || '',
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
      upload={async ({ file, ...params }: UploadParams) => {
        await postUserProtocolSheetSheetImport({ ...params }, file);
      }}
      update={async (values: UpdateParams<UserProtocolPoint>) => {
        await postUserProtocolSheetUpdate(values);
        editorFormRef.current?.setRowData?.('new', { ...defaultConfig, uuid: 'new' });
      }}
      remove={async (params: removeParams) => {
        await deleteUserProtocolSheetDelIds(params);
      }}
    />
  );
};

export default UserProtocolDataSheet;
