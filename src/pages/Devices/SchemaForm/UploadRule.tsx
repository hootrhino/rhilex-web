import { Table } from 'antd';

const dataSource = [
  {
    tag: '标签',
    alias: '别名',
    function: 3,
    frequency: 3000,
    slaverId: 1,
    address: 0,
    quantity: 1,
  },
];

const columns = [
  {
    title: 'tag',
    dataIndex: 'tag',
  },
  {
    title: 'alias',
    dataIndex: 'alias',
  },
  {
    title: 'function',
    dataIndex: 'function',
  },
  {
    title: 'frequency',
    dataIndex: 'frequency',
  },
  {
    title: 'slaverId',
    dataIndex: 'slaverId',
  },
  {
    title: 'address',
    dataIndex: 'address',
  },
  {
    title: 'quantity',
    dataIndex: 'quantity',
  },
];

const UploadRule = () => {
  return (
    <>
      <div className="mb-[12px]">您应当确保上传的点位表必须遵守一定表头格式，例如：</div>
      <Table bordered dataSource={dataSource} columns={columns} pagination={false} size="small" />
    </>
  );
};

export default UploadRule;
