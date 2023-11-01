import { getInendsDetail } from '@/services/rulex/shuruziyuanguanli';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Drawer, DrawerProps } from 'antd';
import omit from 'lodash/omit';
import { useEffect } from 'react';
import { useRequest } from 'umi';
import { modeEnum, stateEnum, typeEnum } from './columns';

type DetailProps = DrawerProps & {
  uuid: string;
};

const columnsMap: Record<string, ProDescriptionsItemProps<Record<string, any>>[]> = {
  COMMON: [
    {
      title: '资源名称',
      dataIndex: 'name',
    },
    {
      title: '资源类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: typeEnum,
    },
    {
      title: '资源状态',
      dataIndex: 'state',
      valueEnum: stateEnum,
    },
    {
      title: '备注信息',
      dataIndex: 'description',
    },
  ],
  GENERIC_IOT_HUB: [
    {
      title: '主机地址',
      dataIndex: 'host',
      copyable: true,
    },
    {
      title: '服务端口',
      dataIndex: 'port',
    },
    {
      title: '模式',
      dataIndex: 'mode',
      valueEnum: modeEnum,
    },
    {
      title: '产品 ID',
      dataIndex: 'productId',
      copyable: true,
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
    },
    {
      title: '客户端 ID',
      dataIndex: 'clientId',
    },
    {
      title: '用户名称',
      dataIndex: 'username',
    },
    {
      title: '用户密码',
      dataIndex: 'password',
      valueType: 'password',
    },
  ],
  DEFAULT_TYPE: [
    {
      title: '主机地址',
      dataIndex: 'host',
      copyable: true,
    },
    {
      title: '服务端口',
      dataIndex: 'port',
    },
    {
      title: '主题',
      dataIndex: 'topic',
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
        title="基本信息"
        dataSource={omit(data, 'config')}
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
        dataSource={data?.config}
        loading={loading}
      />
    </Drawer>
  );
};

export default Detail;
