import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Tag } from 'antd';
import { blockTypeEnum } from '../SchemaForm/initialValue';
import type { PlcSheetItem } from '../SpecificSheet/PlcSheet';

import { getS1200DataSheetList } from '@/services/rulex/ximenzidianweiguanli';
import '../index.less';

const columns: ProColumns<Partial<PlcSheetItem>>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
    fixed: 'left',
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
    title: '块类型',
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: blockTypeEnum,
    width: 80,
  },
  {
    title: (
      <div>
        采集频率<span className="text-[12px] opacity-[.8] pl-[5px] font-normal">(毫秒)</span>
      </div>
    ),
    dataIndex: 'frequency',
    valueType: 'digit',
    width: 120,
  },
  {
    title: '块地址',
    dataIndex: 'address',
    valueType: 'digit',
  },
  {
    title: '起始地址',
    dataIndex: 'start',
    valueType: 'digit',
  },
  {
    title: (
      <div>
        采集长度<span className="text-[12px] opacity-[.8] pl-[5px] font-normal">(字节)</span>
      </div>
    ),
    dataIndex: 'size',
    valueType: 'digit',
    width: 120,
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
      if (!record?.status) return '-';
      const isSuccess = record?.status === 1;
      return <Tag color={isSuccess ? 'success' : 'error'}>{isSuccess ? '正常' : '异常'}</Tag>;
    },
  },
  {
    title: '采集时间',
    dataIndex: 'lastFetchTime',
    valueType: 'dateTime',
  },
];

const PlcTable = () => {
  const { detail } = useModel('useDevice');

  return (
    <ProTable
      rowKey="uuid"
      rootClassName="sheet-table"
      columns={columns}
      search={false}
      options={false}
      scroll={{ x: 1400 }}
      pagination={{ defaultPageSize: 10 }}
      request={async ({ current = 1, pageSize = 10 }) => {
        const { data } = await getS1200DataSheetList({
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

export default PlcTable;
