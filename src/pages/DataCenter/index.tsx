import PageContainer from '@/components/PageContainer';
import { getDataCenterSchemaList } from '@/services/rulex/shujuzhongxin';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';

type DataCenterItem = {
  uuid?: string;
  name?: string;
  local_path?: string;
  net_addr?: string;
  create_ts?: number;
  size?: number;
  store_path?: string;
  description?: string;
  [key: string]: any;
};

const DataCenter = () => {
  const columns: ProColumns<DataCenterItem>[] = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '本地路径',
      dataIndex: 'local_path',
      ellipsis: true,
    },
    {
      title: '协议交互地址',
      dataIndex: 'net_addr',
      ellipsis: true,
    },
    {
      title: '存储地址',
      dataIndex: 'store_path',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_ts',
      valueType: 'dateTime',
    },
    {
      title: '备注',
      dataIndex: 'description',
      ellipsis: true,
      renderText: (description: string) => description || '-',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 100,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a key="detail" onClick={() => history.push(`/data-center/${uuid}`)}>
          详情
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="uuid"
        columns={columns}
        request={async () => {
          const { data } = await getDataCenterSchemaList();

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

export default DataCenter;
