import IndexBorder from '@/components/IndexBorder';
import PageContainer from '@/components/PageContainer';
import StateTag, { StateType } from '@/components/StateTag';
import { getInendsClients, getInendsDetail } from '@/services/rulex/shuruziyuanguanli';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';

type SubDeviceItem = {
  ip?: string;
  status?: boolean;
  properties: { observe: boolean; version: string };
};

const SubDeviceList = () => {
  const { inendId } = useParams();

  // 获取资源详情
  const { data: inendsDetail } = useRequest(() => getInendsDetail({ uuid: inendId || '' }), {
    ready: !!inendId,
    refreshDeps: [inendId],
  });

  const columns: ProColumns<SubDeviceItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 80,
      render: (_text, _record, index) => <IndexBorder serial={index} />,
    },
    {
      title: '设备 IP',
      dataIndex: 'ip',
    },
    {
      title: '设备状态',
      dataIndex: 'status',
      renderText: (status) => status && <StateTag state={status} type={StateType.DEVICE} />,
    },
    {
      title: '设备属性',
      dataIndex: 'properties',
      renderText: (properties) => (
        <pre className="json-code">
          <code>{JSON.stringify(properties)}</code>
        </pre>
      ),
    },
  ];

  return (
    <PageContainer backUrl={`/inends/list`} title={`资源 ${inendsDetail?.name || ''} - 子设备列表`}>
      <ProTable
        rowKey="ip"
        columns={columns}
        options={false}
        search={false}
        request={async ({ current = 1, pageSize = 10 }) => {
          const { data } = await getInendsClients({ uuid: inendId || '', current, size: pageSize });

          return Promise.resolve({
            data: data.records,
            success: true,
            total: data.total,
          });
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          hideOnSinglePage: true,
        }}
      />
    </PageContainer>
  );
};

export default SubDeviceList;
