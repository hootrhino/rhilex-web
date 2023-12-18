import StateTag from '@/components/StateTag';
import { getInendsDetail } from '@/services/rulex/shuruziyuanguanli';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Drawer, DrawerProps } from 'antd';
import omit from 'lodash/omit';
import { useRequest } from 'umi';
import { eventEnum, modeEnum, typeEnum } from './initialValue';

type DetailProps = DrawerProps & {
  uuid: string;
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { data, loading } = useRequest(() => getInendsDetail({ uuid }), {
    ready: !!uuid,
    refreshDeps: [uuid],
  });

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
        renderText: (state) => <StateTag state={state} />,
      },
      {
        title: '备注',
        dataIndex: 'description',
      },
    ],
    GENERIC_IOT_HUB: [
      {
        title: '服务地址',
        dataIndex: 'host',
        copyable: true,
      },
      {
        title: '端口',
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
    INTERNAL_EVENT: [
      {
        title: '事件类型',
        dataIndex: 'type',
        valueEnum: eventEnum,
      },
    ],
    DEFAULT_TYPE: [
      {
        title: '服务地址',
        dataIndex: 'host',
        copyable: true,
      },
      {
        title: '端口',
        dataIndex: 'port',
      },
      {
        title: '主题',
        dataIndex: 'topic',
        hideInDescriptions: data?.type !== 'NATS_SERVER',
      },
    ],
  };

  return (
    <Drawer title="资源详情" placement="right" width="30%" {...props}>
      <ProDescriptions
        column={1}
        columns={columnsMap['COMMON']}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 80 }}
        title="基本信息"
        dataSource={omit(data, 'config')}
        loading={loading}
      />
      {data?.type && Object.keys(typeEnum).includes(data?.type) && (
        <ProDescriptions
          column={1}
          columns={
            columnsMap[
              ['INTERNAL_EVENT', 'GENERIC_IOT_HUB'].includes(data?.type)
                ? data?.type
                : 'DEFAULT_TYPE'
            ]
          }
          labelStyle={{ justifyContent: 'flex-end', minWidth: 80 }}
          title="资源配置"
          dataSource={data?.config}
          loading={loading}
        />
      )}
    </Drawer>
  );
};

export default Detail;
