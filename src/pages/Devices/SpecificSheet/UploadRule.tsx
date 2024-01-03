import { Table } from 'antd';

const dataSource = {
  modbus: [
    {
      tag: '标签',
      alias: '别名',
      function: 3,
      frequency: 1000,
      slaverId: 1,
      address: 0,
      quantity: 1,
    },
  ],
  plc: [
    {
      address: 'DB4900.DBD1000',
      tag: 'R0',
      alias: '新砂轮直径（mm）',
      type: 'FLOAT',
      order: 'ABCD',
      frequency: 1000,
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
      title: 'frequency',
      dataIndex: 'frequency',
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
