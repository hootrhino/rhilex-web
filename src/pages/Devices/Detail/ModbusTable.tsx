import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { funcEnum } from '../SchemaForm/initialValue';

const columns = [
  {
    title: '数据标签',
    dataIndex: 'tag',
  },
  {
    title: '数据别名',
    dataIndex: 'alias',
  },
  {
    title: 'Modbus 功能',
    dataIndex: 'function',
    valueEnum: funcEnum,
  },
  {
    title: '从设备 ID',
    dataIndex: 'slaverId',
  },
  {
    title: '起始地址',
    dataIndex: 'address',
  },
  {
    title: '读取数量',
    dataIndex: 'quantity',
  },
];

const ModbusTable = () => {
  const { detail } = useModel('useDevice');
  const { registers } = detail?.config || { registers: [] };

  return (
    <ProTable
      rowKey="id"
      columns={columns}
      dataSource={registers}
      search={false}
      pagination={false}
      options={false}
    />
  );
};

export default ModbusTable;
