import { filterLogByTopic } from '@/utils/utils';
import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProForm, ProList } from '@ant-design/pro-components';
import { Tag } from 'antd';
import dayjs from 'dayjs';

type ProOutputListProps = Omit<ProFormItemProps, 'children'> & {
  showOutput: boolean;
  data: string[];
  topic: string;
};

const ProOutputList = ({ showOutput, data, topic, ...props }: ProOutputListProps) => {
  return (
    <ProForm.Item name="output" label="输出结果" className="h-[300px]" {...props}>
      <ProList
        className="h-[250px] overflow-y-auto"
        rowKey={(record) => `log-${record.ts}-${Math.random()}`}
        dataSource={showOutput ? filterLogByTopic(data, topic) : []}
        metas={{
          title: {
            dataIndex: 'time',
            render: (_, row) => dayjs(row.time).format('YYYY-MM-DD hh:mm:ss'),
          },
          description: { dataIndex: 'msg' },
          subTitle: {
            dataIndex: 'level',
            render: (_, row) => <Tag color="blue">{row.level}</Tag>,
          },
        }}
      />
    </ProForm.Item>
  );
};

export default ProOutputList;
