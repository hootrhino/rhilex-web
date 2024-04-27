import { message } from '@/components/PopupHack';
import { postOsResetInterMetric } from '@/services/rulex/xitongshuju';
import { sum } from '@/utils/redash';
import { cn } from '@/utils/utils';
import { ReloadOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Button, Space, Statistic } from 'antd';

const StatisticCard = () => {
  const { dataSource, run } = useModel('useSystem');
  const { inSuccess, inFailed, outSuccess, outFailed } = dataSource?.statistic || {};
  const { formatMessage } = useIntl();

  const statisticData = [
    {
      label: formatMessage({ id: 'dashboard.statistic.inSuccess' }),
      value: inSuccess,
      status: 'success',
      key: 'inSuccess',
    },
    {
      label: formatMessage({ id: 'dashboard.statistic.inFailed' }),
      value: inFailed,
      status: 'error',
      key: 'inFailed',
    },
    {
      label: formatMessage({ id: 'dashboard.statistic.outSuccess' }),
      value: outSuccess,
      status: 'success',
      key: 'outSuccess',
    },
    {
      label: formatMessage({ id: 'dashboard.statistic.outFailed' }),
      value: outFailed,
      status: 'error',
      key: 'outFailed',
    },
  ];

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
            message.success(formatMessage({ id: 'dashboard.message.reset.success' }));
            run();
          })
        }
      >
        {formatMessage({ id: 'dashboard.button.reset' })}
      </Button>
      <ProCard layout="center" direction="column" type="inner" colSpan="25%">
        <div className="text-[#585858]">{formatMessage({ id: 'dashboard.title.statistic' })}</div>
        <Statistic value={sum(statisticData, (s) => s.value || 0)} />
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
