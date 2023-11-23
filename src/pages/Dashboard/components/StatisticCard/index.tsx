import { cn } from '@/utils/utils';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Space } from 'antd';
import sum from 'lodash/sum';

const StatisticCard = () => {
  const { dataSource } = useModel('useSystem');
  const { inSuccess, inFailed, outSuccess, outFailed } = dataSource?.statistic || {};

  const statisticData = [
    {
      label: '输入成功',
      value: inSuccess,
      status: 'success',
      key: 'inSuccess',
    },
    {
      label: '输入失败',
      value: inFailed,
      status: 'error',
      key: 'inFailed',
    },
    {
      label: '输出成功',
      value: outSuccess,
      status: 'success',
      key: 'outSuccess',
    },
    {
      label: '输出失败',
      value: outFailed,
      status: 'error',
      key: 'outFailed',
    },
  ];

  const total = statisticData?.map((data) => Number(data?.value));

  return (
    <ProCard bodyStyle={{ padding: 0 }} className="dashboard-card">
      <ProCard layout="center" direction="column" type="inner" colSpan="25%">
        <div className="text-[#585858]">输入/输出总数</div>
        <div className="font-bold text-[18px]">{sum(total) || 0}</div>
      </ProCard>
      <ProCard gutter={[16, 16]} wrap bodyStyle={{ paddingInline: 14 }}>
        {statisticData?.map((item) => (
          <ProCard
            key={item.key}
            layout="center"
            direction="column"
            type="inner"
            colSpan="50%"
            style={{ backgroundColor: 'rgba(42, 46, 54, 0.04)' }}
            bodyStyle={{ paddingBlock: 14, paddingInline: 14 }}
          >
            <Space>
              <div
                className={cn(
                  'w-[4px] h-[10px] bg-[#52C41B]',
                  item.status === 'success' ? 'bg-[#52C41B]' : 'bg-[#F54C4F]',
                )}
              />
              <div className="text-[#585858] text-[13px]">{item.label}</div>
            </Space>
            <div className="font-bold text-[16px]">{item.value || 0}</div>
          </ProCard>
        ))}
      </ProCard>
    </ProCard>
  );
};

export default StatisticCard;
