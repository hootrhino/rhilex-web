import type { ProTableProps } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import type { FilterValue } from 'antd/es/table/interface';

export type Pagination = {
  current: number;
  pageSize: number;
  total: number;
};

type LogTableProps = ProTableProps<any, any, any> & {
  topic?: string;
  filters?: boolean;
};

import { LogItem } from '@/models/useWebsocket';
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

const LogTable = ({ filters = false, topic, options, ...props }: LogTableProps) => {
  const { logs } = useModel('useWebsocket');
  const [dataSource, setData] = useState<LogItem[]>([]);
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
      hideInTable: topic,
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

  const handleOnsearch = (keyword?: string, filters?: Record<string, FilterValue | null>) => {
    let filteredLogs = [...dataSource];

    if (keyword) {
      filteredLogs = logs.filter((log) => {
        return log.msg.includes(keyword);
      });
    }
    if (filters) {
      filteredLogs = logs.filter((log) => filters?.level?.includes(log?.level));
    }

    setData(filteredLogs);
  };

  useEffect(() => {
    let filterLogs = [...logs];

    if (topic) {
      filterLogs = logs?.filter((log) => log?.topic === topic);
    }

    filterLogs = filterLogs.slice(
      (pagination.current - 1) * pagination.pageSize,
      pagination.current * pagination.pageSize,
    );

    setData(filterLogs);
  }, [pagination, logs, topic]);

  useEffect(() => {
    setPagination({ ...pagination, total: logs?.length });
  }, [logs]);

  return (
    <ProTable
      rowKey="ts"
      columns={columns as any}
      dataSource={dataSource}
      search={false}
      pagination={{
        ...pagination,
        onChange: (current, pageSize) => setPagination({ ...pagination, current, pageSize }),
      }}
      options={
        options === false
          ? false : {
              search: {
                onSearch: (keyword: string) => {
                  handleOnsearch(keyword);
                  return true;
                },
                placeholder: '请输入内容进行搜索',
                allowClear: true,
              },
              reload: false,
              setting: false,
              density: false,
            }
      }
      onChange={(_: any, filters: any) => handleOnsearch(undefined, filters)}
      {...props}
    />
  );
};

export default LogTable;
