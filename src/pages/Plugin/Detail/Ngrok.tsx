import ProDescriptions from '@/components/ProDescriptions';
import ProTag, { StatusType } from '@/components/ProTag';
import { postPlugwareService } from '@/services/rulex/chajianguanli';
import { getIntl, getLocale } from '@umijs/max';
import { PluginName, PluginUUID } from '../enum';

const intl = getIntl(getLocale());

const columns = [
  {
    title: intl.formatMessage({ id: 'plugin.table.title.running' }),
    dataIndex: 'running',
    renderText: (running: boolean) => <ProTag type={StatusType.RUNNING}>{running}</ProTag>,
  },
  {
    title: intl.formatMessage({ id: 'plugin.table.title.serverAddr' }),
    dataIndex: 'server_addr',
    renderText: (server_addr: string) =>
      server_addr ? <a onClick={() => window.open(server_addr, '_blank')}>{server_addr}</a> : '-',
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
      columns={columns}
      request={async () => {
        const { data } = await postPlugwareService({
          uuid: PluginUUID.NGROKC,
          name: PluginName.CONFIG,
          args: '',
        });

        return Promise.resolve({
          success: true,
          data,
        });
      }}
    />
  );
};

export default NgrokDetail;
