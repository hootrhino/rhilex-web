import { ProTable } from '@ant-design/pro-components';
import { funcEnum } from '../SchemaForm/initialValue';
import { getModbusDataSheetList } from '@/services/rulex/Modbusdianweiguanli';
import { useModel } from '@umijs/max';

import '../index.less';

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 50,
  },
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
    title: '采集频率（毫秒）',
    dataIndex: 'frequency',
    valueType: 'digit',
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

  return (
    <ProTable
      rowKey="uuid"
      rootClassName='sheet-table'
      columns={columns}
      search={false}
      options={false}
      pagination={{defaultPageSize: 10}}
      request={async ({ current = 1, pageSize = 10 }) => {
        const { data } = await getModbusDataSheetList({
          device_uuid: detail?.uuid,
          current,
          size: pageSize,
        });

        return Promise.resolve({
          data: data?.records,
          total: data?.total,
          success: true,
        });
      }}
    />
  );
};

export default ModbusTable;
