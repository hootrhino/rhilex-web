import { getSoftRouterDhcpClients } from '@/services/rulex/luyoupeizhi';
import { ProTable } from '@ant-design/pro-components';

const DHCPList = () => {
  const columns = [
    {
      title: 'IP 地址',
      dataIndex: 'ip_address',
    },
    {
      title: '设备 MAC',
      dataIndex: 'mac_address',
    },
    {
      title: '设备名称',
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
