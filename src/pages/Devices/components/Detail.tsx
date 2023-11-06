import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import type { ProDescriptionsItemProps, ProDescriptionsProps } from '@ant-design/pro-components';
import { ProDescriptions, ProTable } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { Drawer, DrawerProps, Tag } from 'antd';
import omit from 'lodash/omit';
import { useEffect } from 'react';
import { funcEnum, modeEnum, typeEnum } from './columns';

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
  show = true,
  ...props
}: EnhancedProDescriptionsProps) => {
  return (
    show && <ProDescriptions labelStyle={labelStyle} loading={loading} column={column} {...props} />
  );
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { groupList } = useModel('useDevice');
  const {run: getPort, data: portList} = useModel('usePort');
  const { data, run: getDetail, loading } = useRequest(() => getDevicesDetail({ uuid }), {
    manual: true,
  });

  const deviceType = data?.type;
  const mode = data?.config?.commonConfig?.mode;
  const transport = data?.config?.commonConfig?.transport;

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
        valueEnum: typeEnum
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
        title: '备注',
        dataIndex: 'description',
      },
    ],
    COMMON: [
      {
        title: '采集频率（毫秒）',
        dataIndex: 'frequency',
        hideInDescriptions: deviceType === 'GENERIC_PROTOCOL',
      },
      {
        title: '通信形式',
        dataIndex: 'transport',
        hideInDescriptions: deviceType !== 'GENERIC_PROTOCOL',
      },
      {
        title: '超时时间（毫秒）',
        dataIndex: 'timeout',
        hideInDescriptions: deviceType !== 'GENERIC_MODBUS',
      },
      {
        title: '重试次数',
        dataIndex: 'retryTime',
        hideInDescriptions: deviceType !== 'GENERIC_PROTOCOL',
      },
      {
        title: '是否启动轮询',
        dataIndex: 'autoRequest',
        hideInDescriptions: deviceType === 'GENERIC_PROTOCOL',
        renderText: (autoRequest) => (
          <Tag color={autoRequest ? 'success' : 'error'}>{autoRequest ? '开启' : '关闭'}</Tag>
        ),
      },
      {
        title: '工作模式',
        dataIndex: 'mode',
        hideInDescriptions: deviceType !== 'GENERIC_MODBUS',
        valueEnum: modeEnum,
      },
    ],
    TCP: [
      {
        title: '服务地址',
        dataIndex: 'host',
      },
      {
        title: '服务端口',
        dataIndex: 'port',
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
        title: '服务端口',
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
    const port = portList?.find(item => item?.uuid === data?.config?.portUuid);

    return port ? port.name : '-';
  }

  useEffect(() => {
    if (uuid) {
      getDetail();
      getPort();
    }
  }, [uuid]);

  return (
    <Drawer title="设备详情" placement="right" width="50%" {...props}>
      <EnhancedProDescriptions
        title="基本信息"
        dataSource={omit(data, 'config')}
        columns={columnsMap['BASE']}
        loading={loading}
      />
      {deviceType && Object.keys(typeEnum).includes(deviceType) && (
        <>
          <EnhancedProDescriptions
            title="通用信息"
            dataSource={data?.config?.commonConfig}
            columns={columnsMap['COMMON']}
            loading={loading}
          />
          <ProDescriptions
            column={1}
            title="串口配置"
            labelStyle={{ justifyContent: 'flex-end', minWidth: 130 }}
          >
            <ProDescriptions.Item label="系统串口">
              <a href='/port'>{getPortName()}</a>
            </ProDescriptions.Item>
          </ProDescriptions>
          <EnhancedProDescriptions
            title="TCP 配置"
            dataSource={data?.config?.tcpConfig}
            columns={columnsMap['TCP']}
            loading={loading}
            show={deviceType === 'GENERIC_MODBUS' && mode === 'TCP'}
          />
          <EnhancedProDescriptions
            title="TCP 配置"
            dataSource={data?.config?.hostConfig}
            columns={columnsMap['HOST']}
            loading={loading}
            show={deviceType === 'GENERIC_PROTOCOL' && transport === 'rawtcp'}
          />
          {deviceType === 'GENERIC_MODBUS' && data?.config?.registers?.length > 0 && (
            <>
              <ProDescriptions title="寄存器配置" />
              <ProTable
                rowKey="id"
                columns={columnsMap['REGISTERS']}
                dataSource={data?.config?.registers}
                search={false}
                pagination={false}
                options={false}
                loading={loading}
              />
            </>
          )}
        </>
      )}
    </Drawer>
  );
};

export default Detail;
