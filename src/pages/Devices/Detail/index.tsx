import StateTag from '@/components/StateTag';
import type { ProDescriptionsItemProps, ProDescriptionsProps } from '@ant-design/pro-components';
import { ProDescriptions, ProSkeleton } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Drawer, DrawerProps, Tag } from 'antd';
import omit from 'lodash/omit';
import { useEffect } from 'react';
import { modeEnum, typeEnum } from '../SchemaForm/initialValue';
import ModbusTable from './ModbusTable';
import { getGroupName } from '@/utils/utils';

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

  const { type, config } = detail || { type: '' };
  const { commonConfig, hostConfig, portUuid } = config || { registers: [] };
  const mode = commonConfig?.mode;

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
        renderText: (value) => getGroupName(groupList || [], value),
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
        hideInDescriptions: type !== 'GENERIC_PROTOCOL',
      },
      {
        title: '采集频率（毫秒）',
        dataIndex: 'frequency',
        hideInDescriptions: type !== 'GENERIC_MODBUS',
      },
      {
        title: '是否启动轮询',
        dataIndex: 'autoRequest',
        hideInDescriptions: type !== 'GENERIC_MODBUS',
        renderText: (autoRequest) => (
          <Tag color={autoRequest ? 'success' : 'error'}>{autoRequest ? '开启' : '关闭'}</Tag>
        ),
      },
      {
        title: '是否解析 AIS 报文',
        dataIndex: 'parseAis',
        hideInDescriptions: type !== 'GENERIC_AIS_RECEIVER',
        renderText: (parseAis) => (
          <Tag color={parseAis ? 'process' : 'default'}>{parseAis ? '解析' : '不解析'}</Tag>
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
  };

  const getPortName = () => {
    const port = portList?.find((item) => item?.uuid === portUuid);

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
          {type && Object.keys(typeEnum).includes(type) && (
            <>
              <EnhancedProDescriptions
                title="通用信息"
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
                      {getPortName()}
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
              {type === 'GENERIC_MODBUS' && (
                <>
                  <ProDescriptions title="点位表配置" />
                  <ModbusTable />
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
