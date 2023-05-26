import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';

import { postPluginService } from '@/services/rulex/chajianguanli';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { useParams } from 'umi';

type Item = Record<string, any>;

const Detail = () => {
  const { id } = useParams();

  const handleOffLine = () => {
    // TODO
  };

  const columns: ProColumns<Item>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      ellipsis: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '客户端地址',
      dataIndex: 'remote',
    },
    {
      title: 'Clean Session',
      dataIndex: 'cleanSession',
      renderText: (cleanSession) => (
        <Tag
          icon={cleanSession ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          color={cleanSession ? 'success' : 'error'}
        >
          {cleanSession === true ? 'true' : 'false'}
        </Tag>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 80,
      fixed: 'right',
      key: 'option',
      render: () => [
        <a key="offline" onClick={() => handleOffLine()}>
          下线
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        columns={columns}
        request={async () => {
          const { data } = await postPluginService({ uuid: id || '', name: 'clients' });

          return Promise.resolve({
            data,
            success: true,
          });
        }}
        search={false}
        pagination={false}
      />
    </PageContainer>
  );
};

export default Detail;
