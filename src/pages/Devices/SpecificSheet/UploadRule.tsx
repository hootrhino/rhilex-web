import { Table } from 'antd';

const dataSource = {
  modbus: [
    {
      tag: '标签',
      alias: '别名',
      function: 3,
      frequency: 3000,
      slaverId: 1,
      address: 0,
      quantity: 1,
    },
  ],
  plc: [
    {
      tag: '标签',
      alias: '别名',
      type: 'DB',
      frequency: 1000,
      address: 1,
      start: 100,
      size: 16,
    },
  ],
};

const columnsMap = {
  modbus: [
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
  ],
  plc: [
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
      title: 'frequency',
      dataIndex: 'frequency',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'start',
      dataIndex: 'start',
    },
    {
      title: 'size',
      dataIndex: 'size',
    },
  ],
};

type UploadRuleProps = {
  fileName: string;
  type?: 'modbus' | 'plc';
};

const UploadRule = ({ fileName, type = 'modbus' }: UploadRuleProps) => {
  return (
    <>
      <div className="mb-[12px]">您应当确保上传的点位表必须遵守一定表头格式，例如：</div>
      <Table
        bordered
        dataSource={dataSource[type] as any}
        columns={columnsMap[type]}
        pagination={false}
        size="small"
      />
      <div className="mt-[24px]">
        文件格式不正确可能会导致上传失败，您确定要上传
        <span className="px-[5px] font-bold">{fileName}</span>文件吗？
      </div>
    </>
  );
};

export default UploadRule;
