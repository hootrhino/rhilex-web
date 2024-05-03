import { useIntl } from '@umijs/max';
import { Table } from 'antd';

const dataSource = [
  {
    address: 'DB4900.DBD1000',
    tag: 'R0',
    alias: '新砂轮直径（mm）',
    type: 'FLOAT',
    order: 'ABCD',
    weight: 1,
    frequency: 1000,
  },
];

const columns = [
  {
    title: 'address',
    dataIndex: 'address',
  },
  {
    title: 'tag',
    dataIndex: 'tag',
  },
  {
    title: 'alias',
    dataIndex: 'alias',
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
  {
    title: 'frequency',
    dataIndex: 'frequency',
  },
];

type UploadRuleProps = {
  fileName: string;
};

const UploadRule = ({ fileName }: UploadRuleProps) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <div className="mb-[12px]">{formatMessage({ id: 'device.modal.title.upload' })}</div>
      <Table bordered dataSource={dataSource} columns={columns} pagination={false} size="small" />
      <div className="mt-[24px]">
        {formatMessage({ id: 'device.modal.content.upload' })}
        <span className="px-[5px] font-bold">{fileName}</span>？
      </div>
    </>
  );
};

export default UploadRule;
