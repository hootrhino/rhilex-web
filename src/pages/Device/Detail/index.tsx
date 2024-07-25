import HeadersDetail from '@/components/HttpHeaders/Detail';
import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { SheetType } from '@/utils/enum';
import { flatten, omit } from '@/utils/redash';
import { getName } from '@/utils/utils';
import { getLocale, history, useIntl, useModel, useRequest } from '@umijs/max';
import { Drawer, DrawerProps } from 'antd';
import { useEffect } from 'react';
import type { DeviceItem } from '..';
import BacnetIPSheet from '../BacnetIP';
import BacnetRouterSheet from '../BacnetRouter';
import { baseColumns, typeConfigColumns } from '../Columns';
import { DeviceType } from '../enum';
import ModbusSheet from '../Modbus';
import PlcSheet from '../Plc';
import SnmpOidsSheet from '../Snmp';

type DetailProps = DrawerProps & {
  uuid: string;
};

const Detail = ({ uuid, open, ...props }: DetailProps) => {
  const {
    run: getPort,
    data: portList,
    setDetailConfig,
    getDetail: getPortDetail,
  } = useModel('usePort');
  const { product } = useModel('useSystem');
  const { formatMessage } = useIntl();

  const labelWidth = getLocale() === 'en-US' ? 150 : 100;

  const { data: detail, run: getDetail } = useRequest(
    (params: API.getDevicesDetailParams) => getDevicesDetail(params),
    {
      manual: true,
    },
  );

  const { type = DeviceType.GENERIC_UART_PROTOCOL, config } = detail || {};

  const renderDescription = (data: Record<string, any>[]) => {
    return data?.map((item, index) => {
      let formatColumns = item.columns;
      if (item?.key === 'portConfig') {
        formatColumns = item?.columns?.map((c: any) => ({
          ...c,
          render: (_: any, { portUuid }: DeviceItem) => (
            <a
              onClick={(e) => {
                history.push('/port');
                setDetailConfig({ open: true, uuid: portUuid });
                getPortDetail({ uuid: portUuid });
                if (props?.onClose) {
                  props.onClose(e);
                }
              }}
            >
              {getName(portList || [], portUuid)}
            </a>
          ),
        }));
      }
      return (
        <ProDescriptions
          key={`description-${index}`}
          title={item?.title}
          dataSource={config}
          columns={formatColumns}
          column={3}
          labelWidth={labelWidth}
        />
      );
    });
  };

  const formatColumns = (sourceColumns: any[]) => {
    const formatData = sourceColumns
      ?.map((item) => (item?.valueType === 'dependency' && detail ? item?.columns(detail) : item))
      ?.filter((item) => item);

    return flatten(formatData);
  };

  useEffect(() => {
    if (uuid && open) {
      getDetail({ uuid });
      getPort();
    }
  }, [uuid, open]);

  return (
    <Drawer
      open={open}
      title={formatMessage({ id: 'device.title.detail' })}
      placement="right"
      width="50%"
      destroyOnClose
      maskClosable={false}
      {...props}
    >
      <>
        <ProDescriptions
          title={formatMessage({ id: 'device.title.base' })}
          dataSource={detail && omit(detail, ['config'])}
          columns={formatColumns(baseColumns(product)) as EnhancedProDescriptionsItemProps[]}
          column={3}
          labelWidth={labelWidth}
        />
        {detail && type && Object.keys(DeviceType).includes(type) && (
          <>
            {typeConfigColumns[type]?.map((item: any, index: number) => {
              if (item.valueType === 'dependency') {
                return renderDescription(item?.columns(detail));
              } else {
                let column = 3;
                switch (item?.key) {
                  case 'http':
                    column = 1;
                    break;
                  case 'camera':
                    column = 2;
                    break;
                  default:
                    column = 3;
                    break;
                }

                return (
                  <ProDescriptions
                    key={`description-${index}`}
                    title={item?.title}
                    dataSource={detail.config}
                    columns={item?.columns && formatColumns(item?.columns)}
                    column={column}
                    labelWidth={labelWidth}
                  />
                );
              }
            })}

            {type === DeviceType.GENERIC_HTTP_DEVICE && (
              <HeadersDetail data={config?.httpConfig?.headers} />
            )}
            {type === DeviceType.GENERIC_MODBUS_MASTER && (
              <ModbusSheet uuid={detail?.uuid} type={SheetType.DETAIL} />
            )}
            {type === DeviceType.SIEMENS_PLC && (
              <PlcSheet uuid={detail?.uuid} type={SheetType.DETAIL} />
            )}
            {type === DeviceType.GENERIC_SNMP && (
              <SnmpOidsSheet uuid={detail?.uuid} type={SheetType.DETAIL} />
            )}
            {type === DeviceType.GENERIC_BACNET_IP && (
              <BacnetIPSheet uuid={detail?.uuid} type={SheetType.DETAIL} />
            )}
            {type === DeviceType.BACNET_ROUTER_GW && (
              <BacnetRouterSheet uuid={detail?.uuid} type={SheetType.DETAIL} />
            )}
          </>
        )}
      </>
    </Drawer>
  );
};

export default Detail;
