import { getSoftRouterDhcpClients } from '@/services/rhilex/luyoupeizhi';
import { ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';

const DHCPList = () => {
  const { formatMessage } = useIntl();

  const columns = [
    {
      title: formatMessage({ id: 'system.table.title.ipAddress' }),
      dataIndex: 'ip_address',
    },
    {
      title: formatMessage({ id: 'system.table.title.macAddress' }),
      dataIndex: 'mac_address',
    },
    {
      title: formatMessage({ id: 'system.table.title.hostname' }),
      dataIndex: 'hostname',
    },
  ];

  return (
    <ProTable
      columns={columns}
      search={false}
      pagination={false}
      options={false}
      request={async () => {
        const { data } = await getSoftRouterDhcpClients();
        return Promise.resolve({
          data,
          success: true,
        });
      }}
    />
  );
};

export default DHCPList;
