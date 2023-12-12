import { getModbusDataSheetList } from '@/services/rulex/Modbusdianweiguanli';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { funcEnum } from '../SchemaForm/initialValue';

import '../index.less';
import type { ModbusSheetItem } from '../SpecificSheet/ModbusSheet';

const columns: ProColumns<Partial<ModbusSheetItem>>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
    render: (index) => {
      return (
        <div className="text-[12px] text-[#fff] rounded-full w-[18px] h-[18px] bg-[#979797]">
          {index}
        </div>
      );
    },
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
    title: (
      <div>
        采集频率<span className="text-[12px] opacity-[.8] pl-[5px] font-normal">(毫秒)</span>
      </div>
    ),
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
      rootClassName="sheet-table"
      columns={columns}
      search={false}
      options={false}
      pagination={{ defaultPageSize: 10 }}
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
