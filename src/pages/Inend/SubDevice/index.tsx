import IndexBorder from '@/components/IndexBorder';
import PageContainer from '@/components/PageContainer';
import ProTag, { StatusType } from '@/components/ProTag';
import { getInendsClients, getInendsDetail } from '@/services/rulex/shuruziyuanguanli';
import { defaultPagination } from '@/utils/constant';
import type { ProColumns } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';

type SubDeviceItem = {
  ip?: string;
  status?: boolean;
  properties: { observe: boolean; version: string };
};

const SubDeviceList = () => {
  const { inendId } = useParams();
  const { formatMessage } = useIntl();

  // 获取资源详情
  const { data: inendsDetail } = useRequest(() => getInendsDetail({ uuid: inendId || '' }), {
    ready: !!inendId,
    refreshDeps: [inendId],
  });

  const columns: ProColumns<SubDeviceItem>[] = [
    {
      title: formatMessage({ id: 'table.index' }),
      dataIndex: 'index',
      valueType: 'index',
      width: 80,
      render: (_text, _record, index) => <IndexBorder serial={index} />,
    },
    {
      title: formatMessage({ id: 'inend.table.title.ip' }),
      dataIndex: 'ip',
    },
    {
      title: formatMessage({ id: 'inend.table.title.status' }),
      dataIndex: 'status',
      renderText: (status) => status && <ProTag type={StatusType.INEND}>{status}</ProTag>,
    },
    {
      title: formatMessage({ id: 'inend.table.title.properties' }),
      dataIndex: 'properties',
      renderText: (properties) => (
        <pre className="json-code">
          <code>{JSON.stringify(properties)}</code>
        </pre>
      ),
    },
  ];

  return (
    <PageContainer
      backUrl={`/inend/list`}
      title={formatMessage({ id: 'inend.title.subDevice' }, { name: inendsDetail?.name || '' })}
    >
      <ProCard>
        <ProTable
          rowKey="ip"
          columns={columns}
          options={false}
          search={false}
          request={async ({
            current = defaultPagination.defaultCurrent,
            pageSize = defaultPagination.defaultPageSize,
          }) => {
            const { data } = await getInendsClients({
              uuid: inendId || '',
              current,
              size: pageSize,
            });

            return Promise.resolve({
              data: data.records,
              success: true,
              total: data.total,
            });
          }}
          pagination={defaultPagination}
        />
      </ProCard>
    </PageContainer>
  );
};

export default SubDeviceList;
