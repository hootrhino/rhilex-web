import HeadersDetail from '@/components/HttpHeaders/Detail';
import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import PageContainer from '@/components/ProPageContainer';
import { getDevicesDetail } from '@/services/rhilex/shebeiguanli';
import { DEVICE_LIST } from '@/utils/constant';
import { flatten, omit } from '@/utils/redash';
import { ProCard } from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';
import { Divider } from 'antd';
import { Fragment, useEffect } from 'react';
import { baseColumns, typeConfigColumns } from '../Columns';
import DataPoints from '../DataPoints';
import { DeviceType } from '../enum';

const Detail = () => {
  const { formatMessage, locale } = useIntl();
  const { deviceId } = useParams();

  const labelWidth = locale === 'en-US' ? 150 : 100;

  // 获取设备详情
  const { data: detail, run: getDetail } = useRequest(
    (params: API.getDevicesDetailParams) => getDevicesDetail(params),
    {
      manual: true,
      onSuccess: (res) => localStorage.setItem('deviceType', res.type),
    },
  );

  const { type = DeviceType.GENERIC_UART_RW, config } = detail || {};

  const renderDescription = (data: Record<string, any>[]) =>
    data?.map((item, index) => (
      <Fragment key={`description-${index}`}>
        <ProDescriptions
          title={item?.title}
          dataSource={config}
          columns={item.columns}
          column={3}
          labelWidth={labelWidth}
          rootClassName="mb-[48px]"
        />
        <Divider />
      </Fragment>
    ));

  const formatColumns = (sourceColumns: any[]) => {
    const formatData = sourceColumns
      ?.map((item) => (item?.valueType === 'dependency' && detail ? item?.columns(detail) : item))
      ?.filter((item) => item);

    return flatten(formatData);
  };

  useEffect(() => {
    if (deviceId) {
      getDetail({ uuid: deviceId });
    }
  }, [deviceId]);

  return (
    <PageContainer
      title={`${detail?.name} - ${formatMessage({ id: 'device.title.detail' })}`}
      backUrl={DEVICE_LIST}
    >
      <ProCard>
        <ProDescriptions
          title={formatMessage({ id: 'common.title.base' })}
          dataSource={detail && omit(detail, ['config'])}
          columns={formatColumns(baseColumns()) as EnhancedProDescriptionsItemProps[]}
          column={3}
          labelWidth={labelWidth}
          rootClassName="mb-[48px]"
        />
        <Divider />
        {detail && type && Object.keys(DeviceType).includes(type) && (
          <>
            {typeConfigColumns[type]?.map((item: any, index: number) => {
              if (item.valueType === 'dependency') {
                return renderDescription(item?.columns(detail));
              } else {
                return (
                  <Fragment key={`description-${index}`}>
                    <ProDescriptions
                      title={item?.title}
                      dataSource={detail.config}
                      columns={item?.columns && formatColumns(item?.columns)}
                      column={item?.key === 'http' ? 1 : 3}
                      labelWidth={labelWidth}
                      rootClassName="mb-[48px]"
                    />
                    <Divider />
                  </Fragment>
                );
              }
            })}

            {type === DeviceType.GENERIC_HTTP_DEVICE &&
              config?.httpConfig?.headers &&
              Object.keys(config?.httpConfig?.headers)?.length > 0 && (
                <>
                  <HeadersDetail data={config?.httpConfig?.headers} />
                  <Divider />
                </>
              )}
            {/* TODO GENERIC_MODBUS_SLAVER 不需要在详情页展示寄存器 */}
            {[
              DeviceType.GENERIC_SNMP,
              DeviceType.GENERIC_MBUS_EN13433_MASTER,
              DeviceType.GENERIC_MODBUS_MASTER,
              DeviceType.SIEMENS_PLC,
              DeviceType.GENERIC_BACNET_IP,
              DeviceType.BACNET_ROUTER_GW,
              DeviceType.DLT6452007_MASTER,
              DeviceType.CJT1882004_MASTER,
              DeviceType.SZY2062016_MASTER,
              DeviceType.GENERIC_USER_PROTOCOL,
            ].includes(type as DeviceType) && <DataPoints isDetail />}
          </>
        )}
      </ProCard>
    </PageContainer>
  );
};

export default Detail;
