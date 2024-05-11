import { getIntl, getLocale } from '@umijs/max';
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
      <div className="mb-[12px]">
        {getIntl(getLocale()).formatMessage({ id: 'device.modal.title.upload' })}
      </div>
      <Table bordered dataSource={dataSource} columns={columns} pagination={false} size="small" />
      <div className="mt-[24px]">
        {getIntl(getLocale()).formatMessage({ id: 'device.modal.content.upload' })}
        <span className="px-[5px] font-bold">{fileName}</span>？
      </div>
    </>
  );
};

export default UploadRule;
