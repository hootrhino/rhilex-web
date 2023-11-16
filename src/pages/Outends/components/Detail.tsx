import StateTag from '@/components/StateTag';
import { getOutendsDetail } from '@/services/rulex/shuchuziyuanguanli';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Drawer, DrawerProps, Tag } from 'antd';
import omit from 'lodash/omit';
import { useEffect } from 'react';
import { useRequest } from 'umi';
import { allowPingEnum, modeEnum, typeEnum } from './initialValue';

type DetailProps = DrawerProps & {
  uuid: string;
};

const columnsMap: Record<string, ProDescriptionsItemProps<Record<string, any>>[]> = {
  COMMON: [
    {
      title: '资源名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '资源类型',
      dataIndex: 'type',
      valueEnum: typeEnum,
    },
    {
      title: '资源状态',
      dataIndex: 'state',
      renderText: (state) => <StateTag state={state} />,
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
      title: '主机地址',
      dataIndex: 'host',
      copyable: true,
    },
    {
      title: '端口',
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
      title: '超时时间（毫秒）',
      dataIndex: 'timeout',
    },
    {
      title: '主机地址',
      dataIndex: 'host',
      copyable: true,
    },
    {
      title: '端口',
      dataIndex: 'port',
    },
  ],
  TCP_TRANSPORT: [
    {
      title: '传输模式',
      dataIndex: 'dataMode',
      valueEnum: modeEnum,
    },
    {
      title: '开启心跳',
      dataIndex: 'allowPing',
      renderText: (allowPing) => (
        <Tag color={allowPing ? 'success' : 'error'}>{allowPingEnum[allowPing]}</Tag>
      ),
    },
    {
      title: '心跳包内容',
      dataIndex: 'pingPacket',
    },
    {
      title: '超时时间（毫秒）',
      dataIndex: 'timeout',
    },
    {
      title: '主机地址',
      dataIndex: 'host',
      copyable: true,
    },
    {
      title: '端口',
      dataIndex: 'port',
    },
  ],
  TDENGINE: [
    {
      title: 'FQDN',
      dataIndex: 'fqdn',
    },
    {
      title: '端口',
      dataIndex: 'port',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '数据库名',
      dataIndex: 'dbName',
    },
  ],
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { data, run, loading } = useRequest(() => getOutendsDetail({ uuid }), {
    manual: true,
    formatResult: (res) => {
      return res?.data;
    },
  });

  useEffect(() => {
    if (uuid) {
      run();
    }
  }, [uuid]);

  return (
    <Drawer title="资源详情" placement="right" width="30%" {...props}>
      <ProDescriptions
        column={1}
        columns={columnsMap['COMMON']}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 130 }}
        title="基本信息"
        dataSource={omit(data, 'config')}
        loading={loading}
      />
      {data?.type && Object.keys(typeEnum).includes(data?.type) && (
        <ProDescriptions
          column={1}
          columns={columnsMap[data?.type]}
          labelStyle={{ justifyContent: 'flex-end', minWidth: 130 }}
          title="资源配置"
          dataSource={data?.config}
          loading={loading}
        />
      )}
    </Drawer>
  );
};

export default Detail;
