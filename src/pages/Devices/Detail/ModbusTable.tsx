import { getModbusDataSheetList } from '@/services/rulex/Modbusdianweiguanli';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { funcEnum } from '../SchemaForm/initialValue';
import type { ModbusSheetItem } from '../SpecificSheet/ModbusSheet';
import IndexBorder from '@/components/IndexBorder';
import UnitTitle from '@/components/UnitTitle';

import '../index.less';
import { Tag } from 'antd';

const columns: ProColumns<Partial<ModbusSheetItem>>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
    render: (text, record, index) => <IndexBorder serial={index} />,
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
    title: <UnitTitle title='采集频率' />,
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
  {
    title: '最新值',
    dataIndex: 'value',
  },
  {
    title: '点位状态',
    dataIndex: 'status',
    width: 80,
    renderText(_, record) {
      const isSuccess = record?.status === 1;
      return <Tag color={isSuccess ? 'success' : 'error'}>{isSuccess ? '正常' : '异常'}</Tag>;
    },
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
      pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
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
