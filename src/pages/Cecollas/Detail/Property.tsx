import { ProTable } from '@ant-design/pro-components';

type PropertyProps = {
  data: Record<string, any>[];
};

const Property = ({ data }: PropertyProps) => {
  const columns = [
    {
      title: '字段名',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '读写模式',
      dataIndex: 'mode',
      renderText: (mode: string) => (mode === 'r' ? '只读' : '读写'),
    },
    {
      title: '其他',
      dataIndex: 'mapping',
      valueType: 'jsonCode',
    },
  ];

  return (
    <ProTable
      headerTitle={<div className="hidden">属性列表</div>}
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
