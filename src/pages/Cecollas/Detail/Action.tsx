import { ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';

type ActionProps = {
  data: Record<string, any>[];
};

const Action = ({ data }: ActionProps) => {
  const { formatMessage } = useIntl();

  const columns = [
    {
      title: formatMessage({ id: 'cecollas.table.title.id' }),
      dataIndex: 'id',
    },
    {
      title: formatMessage({ id: 'cecollas.table.title.actionName' }),
      dataIndex: 'name',
    },
    {
      title: formatMessage({ id: 'cecollas.table.title.input' }),
      dataIndex: 'input',
      ellipsis: true,
      renderText: (input: Record<string, any>[]) => (input ? JSON.stringify(input) : '-'),
    },
    {
      title: formatMessage({ id: 'cecollas.table.title.output' }),
      dataIndex: 'output',
      ellipsis: true,
      renderText: (input: Record<string, any>[]) => (input ? JSON.stringify(input) : '-'),
    },
  ];

  return (
    <ProTable
      rowKey="id"
      headerTitle={<div className="hidden">行为列表</div>}
      search={false}
      pagination={false}
      options={false}
      rootClassName="stripe-table"
      dataSource={data}
      columns={columns}
    />
  );
};

export default Action;
