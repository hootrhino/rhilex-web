import { PageContainer, ProTable } from '@ant-design/pro-components';

import { getDrivers } from '@/services/rulex/qudongguanli';

const Drives = () => {
  const columns = [
    {
      title: '驱动名称',
      dataIndex: 'name',
    },
    {
      title: '驱动类型',
      dataIndex: 'type',
    },
    {
      title: '驱动信息',
      dataIndex: 'description',
      ellipsis: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="uuid"
        columns={columns}
        request={async () => {
          const res = await getDrivers();

          return Promise.resolve({
            data: (res as any)?.data,
            success: true,
          });
        }}
        search={false}
        pagination={false}
      />
    </PageContainer>
  );
};

export default Drives;
