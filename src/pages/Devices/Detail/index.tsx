import HeadersDetail from '@/components/HttpHeaders/Detail';
import StateTag from '@/components/StateTag';
import UnitTitle from '@/components/UnitTitle';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { getSchemaList } from '@/services/rulex/shujumoxing';
import { boolEnum } from '@/utils/enum';
import { getName } from '@/utils/utils';
import type { ProDescriptionsItemProps, ProDescriptionsProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { history, useModel, useRequest } from '@umijs/max';
import { Drawer, DrawerProps, Tag } from 'antd';
import omit from 'lodash/omit';
import { useEffect } from 'react';
import ModbusSheet from '../SpecificSheet/ModbusSheet';
import PlcSheet from '../SpecificSheet/PlcSheet';
import { modeEnum, plcModelEnum, rackEnum, slotEnum, typeEnum } from '../UpdateForm/initialValue';

type DetailProps = DrawerProps & {
  uuid: string;
};

type EnhancedProDescriptionsProps = ProDescriptionsProps & {
  show?: boolean;
};

const parseAisEnum = {
  true: {
    text: '解析',
    color: 'processing',
  },
  false: {
    text: '不解析',
    color: 'default',
  },
};

const EnhancedProDescriptions = ({
  labelStyle = { justifyContent: 'flex-end', minWidth: 130 },
  loading = false,
  column = 3,
  ...props
}: EnhancedProDescriptionsProps) => {
  return <ProDescriptions labelStyle={labelStyle} loading={loading} column={column} {...props} />;
};

const Detail = ({ uuid, open, ...props }: DetailProps) => {
  const { groupList } = useModel('useDevice');
  const {
    run: getPort,
    data: portList,
    setDetailConfig,
    getDetail: getPortDetail,
  } = useModel('usePort');

  const { data: detail } = useRequest(() => getDevicesDetail({ uuid }), {
    //  manual: true,
    ready: !!uuid,
    refreshDeps: [uuid],
  });

  const { type = 'GENERIC_PROTOCOL', config } = detail || {};
  const { commonConfig, hostConfig, portUuid, httpConfig } = config || {};
  const { mode, model } = commonConfig || {};

  const columnsMap: Record<string, ProDescriptionsItemProps<Record<string, any>>[]> = {
    BASE: [
      {
        title: '设备名称',
        dataIndex: 'name',
        ellipsis: true,
      },
      {
        title: '设备类型',
        dataIndex: 'type',
        valueEnum: typeEnum,
      },
      {
        title: '设备分组',
        dataIndex: 'gid',
        renderText: (value) => getName(groupList || [], value),
      },
      {
        title: '设备状态',
        dataIndex: 'state',
        renderText: (state) => <StateTag state={state} />,
      },
      {
        title: '数据模型',
        dataIndex: 'schemaId',
        request: async () => {
          const { data } = await getSchemaList();

          return data?.map((item) => ({
            label: item?.name,
            value: item.uuid,
          }));
        },
      },
      {
        title: '备注',
        dataIndex: 'description',
      },
    ],
    COMMON: [
      {
        title: '重试次数',
        dataIndex: 'retryTime',
        hideInDescriptions: type !== 'GENERIC_PROTOCOL',
      },
      {
        title: '是否启动轮询',
        dataIndex: 'autoRequest',
        hideInDescriptions: !['GENERIC_MODBUS', 'SIEMENS_PLC', 'GENERIC_HTTP_DEVICE'].includes(
          type,
        ),
        renderText: (autoRequest) => (
          <Tag color={boolEnum[autoRequest]?.color}>{boolEnum[autoRequest]?.text}</Tag>
        ),
      },
      {
        title: '是否解析 AIS 报文',
        dataIndex: 'parseAis',
        hideInDescriptions: type !== 'GENERIC_AIS_RECEIVER',
        renderText: (parseAis) => (
          <Tag color={parseAisEnum[parseAis]?.color}>{parseAisEnum[parseAis]?.text}</Tag>
        ),
      },
      {
        title: '主机序列号',
        dataIndex: 'gwsn',
        hideInDescriptions: type !== 'GENERIC_AIS_RECEIVER',
      },
      {
        title: '工作模式',
        dataIndex: 'mode',
        valueEnum: modeEnum,
        hideInDescriptions: ['SIEMENS_PLC', 'GENERIC_HTTP_DEVICE'].includes(type),
      },
      {
        title: '型号',
        dataIndex: 'model',
        valueEnum: plcModelEnum,
        hideInDescriptions: type !== 'SIEMENS_PLC',
      },
      {
        title: 'PLC 地址',
        dataIndex: 'host',
        hideInDescriptions: type !== 'SIEMENS_PLC',
      },
      {
        title: <UnitTitle title="连接超时时间" />,
        dataIndex: 'timeout',

        hideInDescriptions: !['SIEMENS_PLC', 'GENERIC_HTTP_DEVICE'].includes(type),
      },
      {
        title: <UnitTitle title="心跳超时时间" />,
        dataIndex: 'idleTimeout',
        hideInDescriptions: type !== 'SIEMENS_PLC',
      },
      {
        title: '机架号',
        dataIndex: 'rack',
        valueEnum: rackEnum,
        hideInDescriptions: type !== 'SIEMENS_PLC' || model === 'S7200',
      },
      {
        title: '插槽号',
        dataIndex: 'slot',
        valueEnum: slotEnum,
        hideInDescriptions: type !== 'SIEMENS_PLC',
      },
      {
        title: <UnitTitle title="采集频率" />,
        dataIndex: 'frequency',
        hideInDescriptions: !['GENERIC_HTTP_DEVICE'].includes(type),
      },
    ],
    HOST: [
      {
        title: <UnitTitle title="超时时间" />,
        dataIndex: 'timeout',
      },
      {
        title: '服务地址',
        dataIndex: 'host',
      },
      {
        title: '端口',
        dataIndex: 'port',
      },
    ],
    HTTP: [
      {
        title: '请求地址',
        dataIndex: 'url',
      },
      {
        title: 'HTTP Headers',
        dataIndex: 'headers',
        renderText: (headers) => (Object.keys(headers)?.length > 0 ? <div /> : null),
      },
    ],
  };

  useEffect(() => {
    if (uuid && open) {
      // getDeviceDetail({ uuid });
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
          dataSource={omit(detail, 'config')}
          columns={columnsMap['BASE']}
        />
        {type && Object.keys(typeEnum).includes(type) && (
          <>
            <EnhancedProDescriptions
              title="通用配置"
              dataSource={commonConfig}
              columns={columnsMap['COMMON']}
            />
            {mode === 'UART' && (
              <ProDescriptions
                column={1}
                title="串口配置"
                labelStyle={{ justifyContent: 'flex-end', minWidth: 130 }}
              >
                <ProDescriptions.Item label="系统串口">
                  <a
                    onClick={() => {
                      history.push('/port');
                      setDetailConfig({ open: true, uuid: portUuid });
                      getPortDetail({ uuid: portUuid });
                    }}
                  >
                    {getName(portList || [], portUuid)}
                  </a>
                </ProDescriptions.Item>
              </ProDescriptions>
            )}
            {mode === 'TCP' && (
              <EnhancedProDescriptions
                title="TCP 配置"
                dataSource={hostConfig}
                columns={columnsMap['HOST']}
              />
            )}
            {type === 'GENERIC_HTTP_DEVICE' && (
              <EnhancedProDescriptions
                title="HTTP 配置"
                dataSource={httpConfig}
                columns={columnsMap['HTTP']}
                column={1}
              />
            )}
            {type === 'GENERIC_HTTP_DEVICE' && <HeadersDetail data={httpConfig?.headers} />}
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
