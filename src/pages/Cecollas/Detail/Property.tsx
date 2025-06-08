import { ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';

type PropertyProps = {
  data: Record<string, any>[];
};

const Property = ({ data }: PropertyProps) => {
  const { formatMessage } = useIntl();

  const columns = [
    {
      title: formatMessage({ id: 'cecollas.table.title.id' }),
      dataIndex: 'id',
    },
    {
      title: formatMessage({ id: 'cecollas.table.title.propertyName' }),
      dataIndex: 'name',
    },
    {
      title: formatMessage({ id: 'cecollas.table.title.type' }),
      dataIndex: 'type',
    },
    {
      title: formatMessage({ id: 'cecollas.table.title.mode' }),
      dataIndex: 'mode',
      renderText: (mode: string) =>
        formatMessage({ id: `cecollas.mode.${mode === 'r' ? 'readOnly' : 'readWrite'}` }),
    },
    {
      title: formatMessage({ id: 'cecollas.table.title.mapping' }),
      dataIndex: 'mapping',
      ellipsis: true,
      renderText: (mapping: Record<string, any>[]) => (mapping ? JSON.stringify(mapping) : '-'),
    },
  ];

  return (
    <ProTable
      rowKey="id"
      headerTitle={<div className="hidden">{formatMessage({ id: 'cecollas.title.property' })}</div>}
      search={false}
      pagination={false}
      options={false}
      rootClassName="stripe-table"
      dataSource={data}
      columns={columns}
    />
  );
};

export default Property;
