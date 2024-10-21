import HeadersDetail from '@/components/HttpHeaders/Detail';
import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import { getDevicesDetail } from '@/services/rhilex/shebeiguanli';
import { flatten, omit } from '@/utils/redash';
import { useIntl, useRequest } from '@umijs/max';
import { Drawer, DrawerProps } from 'antd';
import { useEffect } from 'react';
import BacnetIPSheet from '../BacnetIP';
import BacnetRouterSheet from '../BacnetRouter';
import CJTDataSheet from '../CJT1882004Master';
import { baseColumns, typeConfigColumns } from '../Columns';
import DLTDataSheet from '../DLT6452007Master';
import { DeviceType } from '../enum';
import MbusMasterDataSheet from '../MbusMaster';
import ModbusMasterDataSheet from '../ModbusMaster';
import PlcSheet from '../Plc';
import SnmpOidsSheet from '../Snmp';
import SZYDataSheet from '../SZY2062016Master';
import UserProtocolDataSheet from '../UserProtocol';

type DetailProps = DrawerProps & {
  uuid: string;
};

const Detail = ({ uuid, open, ...props }: DetailProps) => {
  const { formatMessage, locale } = useIntl();

  const labelWidth = locale === 'en-US' ? 150 : 100;

  // 获取设备详情
  const { data: detail, run: getDetail } = useRequest(
    (params: API.getDevicesDetailParams) => getDevicesDetail(params),
    {
      manual: true,
    },
  );

  const { type = DeviceType.GENERIC_UART_RW, config } = detail || {};

  const renderDescription = (data: Record<string, any>[]) =>
    data?.map((item, index) => (
      <ProDescriptions
        key={`description-${index}`}
        title={item?.title}
        dataSource={config}
        columns={item.columns}
        column={3}
        labelWidth={labelWidth}
        rootClassName="detail-descriptions"
      />
    ));

  const formatColumns = (sourceColumns: any[]) => {
    const formatData = sourceColumns
      ?.map((item) => (item?.valueType === 'dependency' && detail ? item?.columns(detail) : item))
      ?.filter((item) => item);

    return flatten(formatData);
  };

  useEffect(() => {
    if (uuid && open) {
      getDetail({ uuid });
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
          columns={formatColumns(baseColumns()) as EnhancedProDescriptionsItemProps[]}
          column={3}
          labelWidth={labelWidth}
          rootClassName="detail-descriptions"
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
                    rootClassName="detail-descriptions"
                  />
                );
              }
            })}

            {type === DeviceType.GENERIC_HTTP_DEVICE &&
              Object.keys(config?.httpConfig?.headers)?.length > 0 && (
                <HeadersDetail data={config?.httpConfig?.headers} />
              )}
            {/* TODO GENERIC_MODBUS_SLAVER 不需要在详情页展示寄存器 */}
            {type === DeviceType.GENERIC_SNMP && <SnmpOidsSheet uuid={detail?.uuid} />}
            {type === DeviceType.GENERIC_MODBUS_MASTER && (
              <ModbusMasterDataSheet uuid={detail?.uuid} />
            )}
            {type === DeviceType.GENERIC_MBUS_MASTER && <MbusMasterDataSheet uuid={detail?.uuid} />}
            {type === DeviceType.SIEMENS_PLC && <PlcSheet uuid={detail?.uuid} />}
            {type === DeviceType.GENERIC_BACNET_IP && <BacnetIPSheet uuid={detail?.uuid} />}
            {type === DeviceType.BACNET_ROUTER_GW && <BacnetRouterSheet uuid={detail?.uuid} />}
            {type === DeviceType.DLT6452007_MASTER && <DLTDataSheet uuid={detail?.uuid} />}
            {type === DeviceType.CJT1882004_MASTER && <CJTDataSheet uuid={detail?.uuid} />}
            {type === DeviceType.SZY2062016_MASTER && <SZYDataSheet uuid={detail?.uuid} />}
            {type === DeviceType.GENERIC_USER_PROTOCOL && (
              <UserProtocolDataSheet uuid={detail?.uuid} />
            )}
          </>
        )}
      </>
    </Drawer>
  );
};

export default Detail;
