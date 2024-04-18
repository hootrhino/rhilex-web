import { Table } from 'antd';

const dataSource = [
  {
    tag: 'a1',
    alias: 'a1',
    function: 3,
    frequency: 1000,
    slaverId: 1,
    address: 0,
    quantity: 2,
    type: 'FLOAT',
    order: 'DCBA',
    weight: 1,
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
  {
    title: 'type',
    dataIndex: 'type',
  },
  {
    title: 'order',
    dataIndex: 'order',
  },
  {
    title: 'weight',
    dataIndex: 'weight',
  },
];

type UploadRuleProps = {
  fileName: string;
};

const UploadRule = ({ fileName }: UploadRuleProps) => {
  return (
    <>
      <div className="mb-[12px]">您应当确保上传的点位表必须遵守一定表头格式，例如：</div>
      <Table bordered dataSource={dataSource} columns={columns} pagination={false} size="small" />
      <div className="mt-[24px]">
        文件格式不正确可能会导致上传失败，您确定要上传
        <span className="px-[5px] font-bold">{fileName}</span>文件吗？
      </div>
    </>
  );
};

export default UploadRule;
