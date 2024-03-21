import { message } from '@/components/PopupHack';
import { postOsResetInterMetric } from '@/services/rulex/xitongshuju';
import { cn } from '@/utils/utils';
import { ReloadOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Space, Statistic } from 'antd';
import sum from 'lodash/sum';

const StatisticCard = () => {
  const { dataSource, run } = useModel('useSystem');
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
      <Button
        size="small"
        type="primary"
        ghost
        className="absolute top-[8px] left-[8px]"
        icon={<ReloadOutlined />}
        onClick={async () =>
          await postOsResetInterMetric().then(() => {
            message.success('重置成功');
            run();
          })
        }
      >
        重置统计数据
      </Button>
      <ProCard layout="center" direction="column" type="inner" colSpan="25%">
        <div className="text-[#585858]">输入/输出总数</div>
        <Statistic value={sum(total)} />
      </ProCard>
      <ProCard gutter={[16, 16]} wrap bodyStyle={{ paddingInline: 14 }}>
        {statisticData?.map((item) => (
          <ProCard
            key={item.key}
            layout="center"
            direction="column"
            type="inner"
            colSpan="50%"
            className="bg-[rgba(42,46,54,0.04)]"
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
            <Statistic value={item.value} />
          </ProCard>
        ))}
      </ProCard>
    </ProCard>
  );
};

export default StatisticCard;
