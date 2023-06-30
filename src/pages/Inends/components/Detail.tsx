import { getInendsDetail } from '@/services/rulex/shuruziyuanguanli';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Drawer, DrawerProps } from 'antd';
import { useEffect } from 'react';
import { useRequest } from 'umi';

type DetailProps = DrawerProps & {
  uuid: string;
};

const columnsMap: Record<string, ProDescriptionsItemProps<Record<string, any>>[]> = {
  COMMON: [
    {
      title: 'UUID',
      dataIndex: 'uuid',
      copyable: true,
    },
    {
      title: '资源名称',
      dataIndex: 'name',
    },
    {
      title: '资源类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        COAP: 'COAP 协议支持',
        GENERIC_IOT_HUB: 'IoTHUB 平台支持',
        RULEX_UDP: 'UUDP 协议支持',
        HTTP: 'HTTP 协议支持',
        NATS_SERVER: 'Nats 中间件支持',
        GRPC: 'GRPC 协议支持',
      },
    },
    {
      title: '资源状态',
      dataIndex: 'state',
      valueEnum: {
        0: { text: '故障', status: 'Error' },
        1: { text: '启用', status: 'Success' },
        2: { text: '暂停', status: 'Default' },
        3: { text: '停止', status: 'Default' },
      },
    },
    {
      title: '备注信息',
      dataIndex: 'description',
    },
  ],
  GENERIC_IOT_HUB: [
    {
      title: '主机地址',
      dataIndex: ['config', 'host'],
      copyable: true,
    },
    {
      title: '服务端口',
      dataIndex: ['config', 'port'],
    },
    {
      title: '模式',
      dataIndex: ['config', 'mode'],
      valueEnum: {
        GW: '网关',
        DC: '直连',
      },
    },
    {
      title: '产品 ID',
      dataIndex: ['config', 'productId'],
      copyable: true,
    },
    {
      title: '设备名称',
      dataIndex: ['config', 'deviceName'],
    },
    {
      title: '客户端 ID',
      dataIndex: ['config', 'clientId'],
    },
    {
      title: '用户名称',
      dataIndex: ['config', 'username'],
    },
    {
      title: '用户密码',
      dataIndex: ['config', 'password'],
      valueType: 'password',
    },
  ],
  DEFAULT_TYPE: [
    {
      title: '主机地址',
      dataIndex: ['config', 'host'],
      copyable: true,
    },
    {
      title: '服务端口',
      dataIndex: ['config', 'port'],
    },
    {
      title: '主题',
      dataIndex: ['config', 'topic'],
    },
  ],
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { data, run, loading } = useRequest(() => getInendsDetail({ uuid }), {
    manual: true,
    formatResult: (res) => res?.data,
  });

  useEffect(() => {
    if (uuid) {
      run();
    }
  }, [uuid]);

  return (
    <Drawer title="资源详情" placement="right" width="40%" {...props}>
      <ProDescriptions
        column={1}
        columns={columnsMap['COMMON']}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 80 }}
        title="通用信息"
        dataSource={data}
        loading={loading}
      />
      <ProDescriptions
        column={1}
        columns={
          data?.type
            ? columnsMap[data?.type === 'GENERIC_IOT_HUB' ? data?.type : 'DEFAULT_TYPE']
            : []
        }
        labelStyle={{ justifyContent: 'flex-end', minWidth: 80 }}
        title="设备配置"
        dataSource={data}
        loading={loading}
      />
    </Drawer>
  );
};

export default Detail;
