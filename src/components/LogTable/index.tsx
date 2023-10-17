import type { ProTableProps } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

export type Pagination = {
  current: number;
  pageSize: number;
  total: number;
};

type LogTableProps = ProTableProps & {
  filters?: boolean;
  type?: 'home' | 'detail';
};

import { Tag } from 'antd';
import { useEffect, useState } from 'react';

enum levelColor {
  fatal = 'error',
  error = 'error',
  warn = 'warning',
  warning = 'warning',
  debug = 'default',
  info = 'blue',
}

const LogTable = ({ dataSource, filters = false, type = 'home', ...props }: LogTableProps) => {
  const [pagination, setPagination] = useState<Pagination>({ current: 1, pageSize: 10, total: 0 });

  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      valueType: 'dateTime',
      width: 180,
    },
    {
      title: '等级',
      dataIndex: 'level',
      renderText: (level: string) => <Tag color={levelColor[level]}>{level}</Tag>,
      width: 80,
      filters,
      onFilter: filters,
      hideInTable: type !== 'home',
      valueEnum: {
        fatal: { text: 'Fatal', status: 'Error' },
        error: {
          text: 'Error',
          status: 'Error',
        },
        warn: {
          text: 'Warn',
          status: 'Warning',
        },
        debug: {
          text: 'Debug',
          status: 'Default',
        },
        info: {
          text: 'Info',
          status: 'Processing',
        },
      },
    },
    {
      title: '内容',
      dataIndex: 'msg',
      ellipsis: true,
    },
  ];

  useEffect(() => {
    setPagination({ ...pagination, total: dataSource?.length });
  }, [dataSource]);

  return (
    <ProTable
      rowKey='ts'
      headerTitle="日志列表"
      columns={columns}
      dataSource={dataSource}
      search={false}
      pagination={{
        ...pagination,
        onChange: (current, pageSize) => setPagination({ ...pagination, current, pageSize }),
      }}
      {...props}
    />
  );
};

export default LogTable;
