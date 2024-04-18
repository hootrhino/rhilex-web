import HeadersDetail from '@/components/HttpHeaders/Detail';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { flatten, omit } from '@/utils/redash';
import { getName } from '@/utils/utils';
import type { ProDescriptionsItemProps, ProDescriptionsProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { history, useModel, useRequest } from '@umijs/max';
import { Drawer, DrawerProps } from 'antd';
import { useEffect } from 'react';
import type { DeviceItem } from '..';
import { baseColumns, typeConfigColumns } from '../columns';
import { DeviceType } from '../enum';
import ModbusSheet from '../Plc/ModbusSheet';
import PlcSheet from '../Plc/PlcSheet';

type DetailProps = DrawerProps & {
  uuid: string;
};

type EnhancedProDescriptionsProps = ProDescriptionsProps & {
  show?: boolean;
};

const EnhancedProDescriptions = ({
  labelStyle = { justifyContent: 'flex-end', minWidth: 135 },
  loading = false,
  column = 3,
  ...props
}: EnhancedProDescriptionsProps) => {
  return <ProDescriptions labelStyle={labelStyle} loading={loading} column={column} {...props} />;
};

const Detail = ({ uuid, open, ...props }: DetailProps) => {
  const {
    run: getPort,
    data: portList,
    setDetailConfig,
    getDetail: getPortDetail,
  } = useModel('usePort');

  const { data: detail, run: getDetail } = useRequest(
    (params: API.getDevicesDetailParams) => getDevicesDetail(params),
    {
      manual: true,
    },
  );

  const { type = 'GENERIC_PROTOCOL', config } = detail || {};

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
        <EnhancedProDescriptions
          key={`description-${index}`}
          title={item?.title}
          dataSource={config}
          columns={formatColumns}
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
      title="设备详情"
      placement="right"
      width="50%"
      destroyOnClose
      maskClosable={false}
      {...props}
    >
      <>
        <EnhancedProDescriptions
          title="基本配置"
          dataSource={detail && omit(detail, ['config'])}
          columns={formatColumns(baseColumns) as ProDescriptionsItemProps<Record<string, any>>[]}
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
                  <EnhancedProDescriptions
                    key={`description-${index}`}
                    title={item?.title}
                    dataSource={detail.config}
                    columns={item?.columns && formatColumns(item?.columns)}
                    column={column}
                  />
                );
              }
            })}

            {type === 'GENERIC_HTTP_DEVICE' && <HeadersDetail data={config?.httpConfig?.headers} />}
            {detail?.uuid && ['GENERIC_MODBUS', 'SIEMENS_PLC'].includes(type) && (
              <>
                <ProDescriptions
                  title={
                    <>
                      <span>点位表配置</span>
                      <span className="text-[12px] opacity-[.8] pl-[5px] font-normal">
                        (横向滚动查看更多)
                      </span>
                    </>
                  }
                />
                {type === 'GENERIC_MODBUS' ? (
                  <ModbusSheet deviceUuid={detail?.uuid} readOnly={true} />
                ) : (
                  <PlcSheet deviceUuid={detail?.uuid} readOnly={true} />
                )}
              </>
            )}
          </>
        )}
      </>
    </Drawer>
  );
};

export default Detail;
