import StateTag from '@/components/StateTag';
import { getOutendsDetail } from '@/services/rulex/shuchuziyuanguanli';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Drawer, DrawerProps } from 'antd';
import omit from 'lodash/omit';
import { useEffect } from 'react';
import { useRequest } from 'umi';

type DetailProps = DrawerProps & {
  uuid: string;
};

const columnsMap: Record<string, ProDescriptionsItemProps<Record<string, any>>[]> = {
  COMMON: [
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
      renderText: state => <StateTag state={state} />
    },
    {
      title: '备注',
      dataIndex: 'description',
    },
  ],
  MONGO_SINGLE: [
    {
      title: 'MongoDB URL',
      dataIndex: 'mongoUrl',
      copyable: true,
    },
    {
      title: 'MongoDB 数据库',
      dataIndex: 'database',
    },
    {
      title: 'MongoDB 集合',
      dataIndex: 'collection',
    },
  ],
  MQTT: [
    {
      title: '服务地址',
      dataIndex: 'host',
      copyable: true,
    },
    {
      title: '服务端口',
      dataIndex: 'port',
    },
    {
      title: '客户端 ID',
      dataIndex: 'clientId',
    },
    {
      title: '连接账户',
      dataIndex: 'username',
    },
    {
      title: '连接密码',
      dataIndex: 'password',
    },
    {
      title: '上报 TOPIC',
      dataIndex: 'pubTopic',
    },
  ],
  UDP_TARGET: [
    {
      title: '服务地址',
      dataIndex: 'host',
      copyable: true,
    },
    {
      title: '服务端口',
      dataIndex: 'port',
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
        title="基本信息"
        dataSource={omit(data, 'config')}
        loading={loading}
      />
      <ProDescriptions
        column={1}
        columns={data?.type ? columnsMap[data?.type] : []}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 130 }}
        title="目标配置"
        dataSource={data?.config}
        loading={loading}
      />
    </Drawer>
  );
};

export default Detail;
