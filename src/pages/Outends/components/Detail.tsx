import { getOutendsDetail } from '@/services/rulex/shuchuziyuanguanli';
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
      title: '目标名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '目标类型',
      dataIndex: 'type',
      valueEnum: {
        MONGO_SINGLE: 'MongoDB',
        MQTT: 'MQTT Broker',
        UDP_TARGET: 'UDP Server',
      },
    },
    {
      title: '目标状态',
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
  MONGO_SINGLE: [
    {
      title: 'MongoDB URL',
      dataIndex: ['config', 'mongoUrl'],
      copyable: true,
    },
    {
      title: 'MongoDB 数据库',
      dataIndex: ['config', 'database'],
    },
    {
      title: 'MongoDB 集合',
      dataIndex: ['config', 'collection'],
    },
  ],
  MQTT: [
    {
      title: '服务地址',
      dataIndex: ['config', 'host'],
      copyable: true,
    },
    {
      title: '服务端口',
      dataIndex: ['config', 'port'],
    },
    {
      title: '客户端 ID',
      dataIndex: ['config', 'clientId'],
    },
    {
      title: '连接账户',
      dataIndex: ['config', 'username'],
    },
    {
      title: '连接密码',
      dataIndex: ['config', 'password'],
    },
    {
      title: '上报 TOPIC',
      dataIndex: ['config', 'pubTopic'],
    },
  ],
  UDP_TARGET: [
    {
      title: '服务地址',
      dataIndex: ['config', 'host'],
      copyable: true,
    },
    {
      title: '服务端口',
      dataIndex: ['config', 'port'],
    },
  ],
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { data, run, loading } = useRequest(() => getOutendsDetail({ uuid }), {
    manual: true,
    formatResult: (res) => res?.data,
  });

  useEffect(() => {
    if (uuid) {
      run();
    }
  }, [uuid]);

  return (
    <Drawer title="目标详情" placement="right" width="40%" {...props}>
      <ProDescriptions
        column={1}
        columns={columnsMap['COMMON']}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 130 }}
        title="通用信息"
        dataSource={data}
        loading={loading}
      />
      <ProDescriptions
        column={1}
        columns={data?.type ? columnsMap[data?.type] : []}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 130 }}
        title="目标配置"
        dataSource={data}
        loading={loading}
      />
    </Drawer>
  );
};

export default Detail;
