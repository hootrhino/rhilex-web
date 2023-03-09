import { Link } from 'umi';

import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';

import { getPlugins } from '@/services/rulex/chajianguanli';

type Item = {};

const Plugins = () => {
  const columns: ProColumns<Item>[] = [
    {
      title: '插件名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '版本',
      dataIndex: 'version',
    },
    {
      title: '主页',
      dataIndex: 'homepage',
      ellipsis: true,
      renderText: (page) => <Link to={page}>{page}</Link>,
    },
    {
      title: '文档地址',
      dataIndex: 'helpLink',
      ellipsis: true,
      renderText: (address) => <Link to={address}>{address}</Link>,
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: '协议',
      dataIndex: 'license',
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="uuid"
        columns={columns}
        request={async () => {
          const res = await getPlugins();

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

export default Plugins;
