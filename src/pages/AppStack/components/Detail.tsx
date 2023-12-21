import LogTable from '@/components/LogTable';
import { getAppDetail } from '@/services/rulex/qingliangyingyong';
import { boolEnum } from '@/utils/enum';
import { filterLogByTopic } from '@/utils/utils';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Drawer, Tag } from 'antd';
import type { DrawerProps } from 'antd';
import { AppStackItem, appStateEnum } from '..';

type DetailProps = DrawerProps & {
  uuid: string;
  type: 'detail' | 'log';
};

const Detail = ({ uuid, type, ...props }: DetailProps) => {
  const { appConsoleData } = useModel('useWebsocket');

  const columns: ProDescriptionsItemProps<AppStackItem>[] = [
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
        <Tag color={boolEnum[autoStart]?.color}>{boolEnum[autoStart]?.text}</Tag>
      ),
    },
    {
      title: 'APP 状态',
      dataIndex: 'appState',
      renderText: (appState) => (
        <Tag icon={appStateEnum[appState]?.icon} color={appStateEnum[appState]?.color}>
          {appStateEnum[appState]?.text}
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
      title: '备注',
      dataIndex: 'description',
    },
  ];

  return (
    <Drawer
      title={type === 'detail' ? '轻量应用详情' : '轻量应用日志'}
      placement="right"
      width={type === 'detail' ? '35%' : '40%'}
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
        <LogTable
          options={false}
          logData={filterLogByTopic(appConsoleData, `app/console/${uuid}`)}
        />
      )}
    </Drawer>
  );
};

export default Detail;
