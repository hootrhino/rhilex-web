import IndexBorder from '@/components/IndexBorder';
import ProDescriptions from '@/components/ProDescriptions';
import ProTag, { StatusType } from '@/components/ProTag';
import { getBacnetipDataSheetList } from '@/services/rhilex/bacnetdianweiguanli';
import { getBacnetRouterSheetList } from '@/services/rhilex/bacnetRoutermoshi';
import { getModbusMasterSheetList } from '@/services/rhilex/modbusMasterdianweiguanli';
import { getDevicesDetail } from '@/services/rhilex/shebeiguanli';
import { getSnmpOidsSheetList } from '@/services/rhilex/snmpdianweiguanli';
import { getS1200DataSheetList } from '@/services/rhilex/ximenzidianweiguanli';
import { defaultPagination } from '@/utils/constant';
import { SheetType } from '@/utils/enum';
import { pick } from '@/utils/redash';
import { ProTable } from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';
import { useEffect } from 'react';
import { DeviceType } from '../enum';
import { columnsMap } from './Columns';
import PointDataSheetTablePage from './List';
import { SheetColumnsType } from './typings';

type PointDataSheetProps = {
  type?: SheetType;
  deviceId?: string;
};

type DataSource = {
  records: Record<string, any>[];
  total: number;
};

const PointDataSheet = ({ type = SheetType.LIST, deviceId }: PointDataSheetProps) => {
  const { formatMessage } = useIntl();
  const { deviceId: deviceUuid } = useParams();

  // 获取设备详情
  const { run: getDeviceDetail, data: deviceDetail } = useRequest(
    (params: API.getDevicesDetailParams) => getDevicesDetail(params),
    {
      manual: true,
    },
  );

  // 获取点位表列表
  const requestTable = async ({
    current = defaultPagination.defaultCurrent,
    pageSize = defaultPagination.defaultPageSize,
    ...keyword
  }) => {
    const params: API.getBacnetRouterSheetListParams = {
      device_uuid: keyword.device_uuid,
      current,
      size: pageSize,
    };

    let dataSource: DataSource = {
      records: [],
      total: 0,
    };

    if (keyword.deviceType === DeviceType.GENERIC_MODBUS_MASTER) {
      const { data: modbusData } = await getModbusMasterSheetList(params);
      dataSource = { ...pick(modbusData, ['records', 'total']) };
    }
    if (keyword.deviceType === DeviceType.BACNET_ROUTER_GW) {
      const { data: bacnetRouterData } = await getBacnetRouterSheetList(params);
      dataSource = { ...pick(bacnetRouterData, ['records', 'total']) };
    }
    if (keyword.deviceType === DeviceType.GENERIC_BACNET_IP) {
      const { data: bacnetIPData } = await getBacnetipDataSheetList(params);
      dataSource = { ...pick(bacnetIPData, ['records', 'total']) };
    }
    if (keyword.deviceType === DeviceType.SIEMENS_PLC) {
      const { data: plcData } = await getS1200DataSheetList(params);
      dataSource = { ...pick(plcData, ['records', 'total']) };
    }
    if (keyword.deviceType === DeviceType.GENERIC_SNMP) {
      const { data: snmpData } = await getSnmpOidsSheetList(params);
      dataSource = { ...pick(snmpData, ['records', 'total']) };
    }

    console.log(keyword);
    return Promise.resolve({
      data: dataSource.records,
      total: dataSource.total,
      success: true,
    });
  };

  useEffect(() => {
    const uuid = deviceId || deviceUuid;

    if (uuid) {
      getDeviceDetail({ uuid });
    }
  }, [deviceId, deviceUuid]);

  const deviceColumns =
    (deviceDetail?.type && columnsMap(deviceDetail?.type as DeviceType, type)) || [];

  const baseColumns: SheetColumnsType[] = [
    {
      title: formatMessage({ id: 'table.title.index' }),
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      render: (_text, _record, index) => <IndexBorder serial={index} />,
    },
    {
      title: formatMessage({ id: 'device.form.title.status' }),
      dataIndex: 'status',
      width: 80,
      editable: false,
      hideInTable: type === SheetType.LIST,
      renderText: (_, record) => <ProTag type={StatusType.POINT}>{record?.status || 0}</ProTag>,
    },
    {
      title: formatMessage({ id: 'device.form.title.tag' }),
      dataIndex: 'tag',
      ellipsis: true,
      width: 100,
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'device.form.placeholder.tag' }) }],
      },
      fieldProps: {
        placeholder: formatMessage({ id: 'device.form.placeholder.tag' }),
      },
    },
    {
      title: formatMessage({ id: 'form.title.alias' }),
      dataIndex: 'alias',
      ellipsis: true,
      width: 100,
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'form.placeholder.alias' }) }],
      },
      fieldProps: {
        placeholder: formatMessage({ id: 'form.placeholder.alias' }),
      },
    },
    ...deviceColumns,
    {
      title: formatMessage({ id: 'device.form.title.value' }),
      dataIndex: 'value',
      editable: false,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'device.form.title.status' }),
      dataIndex: 'status',
      width: 100,
      editable: false,
      hideInTable: type === SheetType.DETAIL,
      renderText: (_, record) => <ProTag type={StatusType.POINT}>{record?.status || 0}</ProTag>,
    },
    {
      title: formatMessage({ id: 'device.form.title.lastFetchTime' }),
      dataIndex: 'lastFetchTime',
      valueType: 'dateTime',
      editable: false,
      ellipsis: true,
      width: 160,
    },
  ];

  return type === SheetType.LIST ? (
    <PointDataSheetTablePage
      columns={baseColumns}
      params={{ device_uuid: deviceId || deviceUuid, deviceType: deviceDetail?.type }}
      request={requestTable}
      deviceType={deviceDetail?.type as DeviceType}
      deviceName={deviceDetail?.name as string}
    />
  ) : (
    <>
      <ProDescriptions
        title={formatMessage({
          id: `device.title.${deviceDetail?.type === DeviceType.GENERIC_SNMP ? 'oid' : 'sheet'}`,
        })}
      />
      <ProTable
        rootClassName="stripe-table"
        options={false}
        search={false}
        toolBarRender={false}
        pagination={defaultPagination}
        columns={baseColumns}
        request={requestTable}
        params={{ device_uuid: deviceId, deviceType: deviceDetail?.type }}
      />
    </>
  );
};

export default PointDataSheet;
