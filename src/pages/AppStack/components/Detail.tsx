import LogTable from '@/components/LogTable';
// import { LogItem } from '@/models/useWebsocket';
import { getAppDetail } from '@/services/rulex/qingliangyingyong';
import { MinusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Drawer, DrawerProps, Tag } from 'antd';

type DetailProps = DrawerProps & {
  uuid: string;
  type: 'detail' | 'log';
};

const Detail = ({ uuid, type, ...props }: DetailProps) => {
  const columns: ProDescriptionsItemProps<Record<string, any>>[] = [
    {
      title: 'APP 名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: 'APP 版本',
      dataIndex: 'version',
    },
    {
      title: '是否自启',
      dataIndex: 'autoStart',
      renderText: (autoStart) => (
        <Tag color={autoStart ? 'success' : 'error'}>{autoStart ? '开启' : '关闭'}</Tag>
      ),
    },
    {
      title: 'APP 状态',
      dataIndex: 'appState',
      renderText: (appState) => (
        <Tag
          icon={appState === 1 ? <SyncOutlined spin /> : <MinusCircleOutlined />}
          color={appState === 1 ? 'processing' : 'default'}
        >
          {appState === 1 ? '正在运行' : '已结束'}
        </Tag>
      ),
    },
    {
      title: '脚本类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        lua: 'LUA 脚本',
      },
    },
    {
      title: 'Lua 源码',
      dataIndex: 'luaSource',
      valueType: 'code',
    },
    {
      title: '备注信息',
      dataIndex: 'description',
    },
  ];

  return (
    <Drawer
      title={type === 'detail' ? '轻量应用详情' : '轻量应用日志'}
      placement="right"
      width="50%"
      {...props}
    >
      {type === 'detail' ? (
        <ProDescriptions
          column={1}
          columns={columns}
          labelStyle={{ justifyContent: 'flex-end', minWidth: 80 }}
          request={async () => {
            const res = await getAppDetail({ uuid });

            return Promise.resolve({
              success: true,
              data: {
                ...res?.data,
              },
            });
          }}
        />
      ) : (
        <LogTable topic={`app/console/${uuid}`} options={false} />
      )}
    </Drawer>
  );
};

export default Detail;
