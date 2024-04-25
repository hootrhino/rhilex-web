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
      <div className="mb-[12px]">你应当确保上传的点位表必须遵守一定表头格式，例如：</div>
      <Table bordered dataSource={dataSource} columns={columns} pagination={false} size="small" />
      <div className="mt-[24px]">
        文件格式不正确可能会导致上传失败，你确定要上传
        <span className="px-[5px] font-bold">{fileName}</span>？
      </div>
    </>
  );
};

export default UploadRule;
