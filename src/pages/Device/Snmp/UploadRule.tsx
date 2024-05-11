import { getIntl, getLocale } from '@umijs/max';
import { Table } from 'antd';

const dataSource = [
  {
    oid: '.1.3.6.1.2.1.1.1.0',
    tag: 'Total Processes',
    alias: '线程总数',
    frequency: 1000,
  },
];

const columns = [
  {
    title: 'oid',
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
    title: 'frequency',
    dataIndex: 'frequency',
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
