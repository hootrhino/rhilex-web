import { cn } from '@/utils/utils';
import type { ProTableProps } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { ConfigProvider, theme } from 'antd';

type SheetsProps = ProTableProps<any, any, any> & {
  reload: () => void;
  scrollY: number;
};

const Sheets = ({ dataSource, columns, reload, scrollY, ...props }: SheetsProps) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        components: { Table: { headerBg: '#21222c', rowHoverBg: '#323342' } },
      }}
    >
      {dataSource && dataSource?.length > 0 && (
        <ProTable
          search={false}
          dataSource={dataSource}
          columns={columns}
          className="data-center-sheets"
          tableClassName={cn('data-center-scrollbar', 'data-center-table')}
          scroll={{ y: scrollY }}
          pagination={false}
          options={{ density: true, setting: true, reload: () => reload() }}
          {...props}
        />
      )}
    </ConfigProvider>
  );
};

export default Sheets;
