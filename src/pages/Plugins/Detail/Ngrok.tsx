import { postPlugwareService } from '@/services/rulex/chajianguanli';
import { MinusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import { getIntl, getLocale } from '@umijs/max';
import { Tag } from 'antd';

const intl = getIntl(getLocale());

const columns = [
  {
    title: intl.formatMessage({ id: 'plugin.table.title.running' }),
    dataIndex: 'running',
    renderText: (running: boolean) => (
      <Tag
        icon={running ? <SyncOutlined spin /> : <MinusCircleOutlined />}
        color={running ? 'processing' : 'default'}
      >
        {running
          ? intl.formatMessage({ id: 'status.running' })
          : intl.formatMessage({ id: 'status.stop' })}
      </Tag>
    ),
  },
  {
    title: intl.formatMessage({ id: 'plugin.table.title.serverAddr' }),
    dataIndex: 'server_addr',
  },
  {
    title: intl.formatMessage({ id: 'plugin.table.title.serverEndpoint' }),
    dataIndex: 'server_endpoint',
  },
  {
    title: intl.formatMessage({ id: 'plugin.table.title.domain' }),
    dataIndex: 'domain',
  },
  {
    title: intl.formatMessage({ id: 'plugin.table.title.localSchema' }),
    dataIndex: 'local_schema',
  },
  {
    title: intl.formatMessage({ id: 'plugin.table.title.localHost' }),
    dataIndex: 'local_host',
  },
  {
    title: intl.formatMessage({ id: 'plugin.table.title.localPort' }),
    dataIndex: 'local_port',
  },
  {
    title: intl.formatMessage({ id: 'plugin.table.title.authToken' }),
    dataIndex: 'auth_token',
  },
];

const NgrokDetail = () => {
  return (
    <ProDescriptions
      labelStyle={{ minWidth: 80, justifyContent: 'flex-end', paddingRight: 10 }}
      request={async () => {
        const { data } = await postPlugwareService({
          uuid: 'NGROKC',
          name: 'get_config',
          args: '',
        });

        return Promise.resolve({
          success: true,
          data,
        });
      }}
      columns={columns}
      column={1}
    />
  );
};

export default NgrokDetail;
