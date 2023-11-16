import StateTag from '@/components/StateTag';
import type { ProDescriptionsItemProps, ProDescriptionsProps } from '@ant-design/pro-components';
import { ProDescriptions, ProSkeleton, ProTable } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Drawer, DrawerProps, Tag } from 'antd';
import omit from 'lodash/omit';
import { useEffect } from 'react';
import { funcEnum, modeEnum, typeEnum } from './SchemaForm/columns';

type DetailProps = DrawerProps & {
  uuid: string;
};

type EnhancedProDescriptionsProps = ProDescriptionsProps & {
  show?: boolean;
};

const EnhancedProDescriptions = ({
  labelStyle = { justifyContent: 'flex-end', minWidth: 130 },
  loading = false,
  column = 3,
  ...props
}: EnhancedProDescriptionsProps) => {
  return <ProDescriptions labelStyle={labelStyle} loading={loading} column={column} {...props} />;
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { groupList, detailLoading, detail, getDetail: getDeviceDetail } = useModel('useDevice');
  const {
    run: getPort,
    data: portList,
    setDetailConfig,
    getDetail: getPortDetail,
  } = useModel('usePort');

  const deviceType = detail?.type;
  const mode = detail?.config?.commonConfig?.mode;

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
        renderText: (value) => {
          const group = groupList?.find((item) => item?.uuid === value);

          return group?.name;
        },
      },
      {
        title: '设备状态',
        dataIndex: 'state',
        renderText: (state) => <StateTag state={state} />,
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
        hideInDescriptions: deviceType !== 'GENERIC_PROTOCOL',
      },
      {
        title: '采集频率（毫秒）',
        dataIndex: 'frequency',
        hideInDescriptions: deviceType !== 'GENERIC_MODBUS',
      },
      {
        title: '是否启动轮询',
        dataIndex: 'autoRequest',
        hideInDescriptions: deviceType !== 'GENERIC_MODBUS',
        renderText: (autoRequest) => (
          <Tag color={autoRequest ? 'success' : 'error'}>{autoRequest ? '开启' : '关闭'}</Tag>
        ),
      },
      {
        title: '是否解析 AIS 报文',
        dataIndex: 'parseAis',
        hideInDescriptions: deviceType !== 'GENERIC_AIS_RECEIVER',
        renderText: (parseAis) => (
          <Tag color={parseAis ? 'process' : 'default'}>{parseAis ? '解析' : '不解析'}</Tag>
        ),
      },
      {
        title: '主机序列号',
        dataIndex: 'gwsn',
        hideInDescriptions: deviceType !== 'GENERIC_AIS_RECEIVER',
      },
      {
        title: '工作模式',
        dataIndex: 'mode',
        valueEnum: modeEnum,
      },
    ],
    HOST: [
      {
        title: '超时时间（毫秒）',
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
    REGISTERS: [
      {
        title: '数据标签',
        dataIndex: 'tag',
      },
      {
        title: '数据别名',
        dataIndex: 'alias',
      },
      {
        title: 'Modbus 功能',
        dataIndex: 'function',
        valueEnum: funcEnum,
      },
      {
        title: '从设备 ID',
        dataIndex: 'slaverId',
      },
      {
        title: '起始地址',
        dataIndex: 'address',
      },
      {
        title: '读取数量',
        dataIndex: 'quantity',
      },
    ],
  };

  const getPortName = () => {
    const port = portList?.find((item) => item?.uuid === detail?.config?.portUuid);

    return port ? port.name : '-';
  };

  useEffect(() => {
    if (uuid) {
      getDeviceDetail({ uuid });
      getPort();
    }
  }, [uuid]);

  return (
    <Drawer title="设备详情" placement="right" width="50%" destroyOnClose {...props}>
      {detailLoading ? (
        <ProSkeleton type="descriptions" />
      ) : (
        <>
          <EnhancedProDescriptions
            title="基本信息"
            dataSource={omit(detail, 'config')}
            columns={columnsMap['BASE']}
            loading={detailLoading}
          />
          {deviceType && Object.keys(typeEnum).includes(deviceType) && (
            <>
              <EnhancedProDescriptions
                title="通用信息"
                dataSource={detail?.config?.commonConfig}
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
                        const portId = detail?.config?.portUuid;
                        history.push('/port');
                        setDetailConfig({ open: true, uuid: portId });
                        getPortDetail({ uuid: portId });
                      }}
                    >
                      {getPortName()}
                    </a>
                  </ProDescriptions.Item>
                </ProDescriptions>
              )}

              {mode === 'TCP' && (
                <EnhancedProDescriptions
                  title="TCP 配置"
                  dataSource={detail?.config?.hostConfig}
                  columns={columnsMap['HOST']}
                />
              )}
              {deviceType === 'GENERIC_MODBUS' && detail?.config?.registers?.length > 0 && (
                <>
                  <ProDescriptions title="寄存器配置" />
                  <ProTable
                    rowKey="id"
                    columns={columnsMap['REGISTERS']}
                    dataSource={detail?.config?.registers}
                    search={false}
                    pagination={false}
                    options={false}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </Drawer>
  );
};

export default Detail;
