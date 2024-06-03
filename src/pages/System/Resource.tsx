import { modal } from '@/components/PopupHack';
import ProDescriptions from '@/components/ProDescriptions';
import { getOsOsRelease } from '@/services/rulex/xitongshuju';
import { RingProgress } from '@ant-design/plots';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Space } from 'antd';

const Resource = () => {
  const { dataSource } = useModel('useSystem');
  const { formatMessage } = useIntl();
  const { memPercent, diskInfo, cpuPercent, version, osUpTime, osArch, product } =
    dataSource?.hardWareInfo || {};

  // 获取系统详情
  const { data: osDetail } = useRequest(() => getOsOsRelease({}));

  const columns = osDetail
    ? Object.keys(osDetail)?.map((item) => ({ title: item, dataIndex: item, key: item }))
    : [];

  // 展示系统详情
  const detailConfig = {
    title: formatMessage({ id: 'system.title.resource.detail' }),
    width: 700,
    autoFocusButton: null,
    okText: formatMessage({ id: 'button.close' }),
    content: <ProDescriptions columns={columns} dataSource={osDetail} labelWidth={170} />,
  };

  const ringConfig = {
    height: 60,
    width: 60,
    autoFit: false,
    statistic: false,
    percent: Number(memPercent) / 100,
  } as any;

  return (
    <ProCard title={formatMessage({ id: 'system.tab.resource' })}>
      <Space split={<StatisticCard.Divider type="vertical" className="h-[12px]" />}>
        <span className="text-[#585858] text-[13px]">
          {formatMessage({ id: 'system.table.title.product' })} {product}
        </span>
        <span className="text-[#585858] text-[13px]">
          {formatMessage({ id: 'system.table.title.version' })} {version || 'v0.0.0'}
        </span>
        <span className="text-[#585858] text-[13px]">
          {formatMessage({ id: 'system.table.title.osUpTime' })} {osUpTime}
        </span>
        <span className="text-[#585858] text-[13px]">
          {formatMessage({ id: 'system.table.title.osArch' })} {osArch}
          <a className="pl-[5px]" onClick={() => modal.info(detailConfig)}>
            {formatMessage({ id: 'button.checkDetail' })}
          </a>
        </span>
      </Space>
      <div className="flex justify-between items-center mt-[12px]">
        <StatisticCard
          statistic={{
            title: formatMessage({ id: 'system.table.title.memPercent' }),
            value: memPercent,
            suffix: '%',
          }}
          chart={<RingProgress color={['#5B8FF9', '#E8EDF3']} {...ringConfig} />}
          className="bg-[#f5f5f5] mr-[36px]"
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: formatMessage({ id: 'system.table.title.diskInfo' }),
            value: diskInfo,
            suffix: '%',
          }}
          chart={<RingProgress color={['#F4664A', '#E8EDF3']} {...ringConfig} />}
          className="bg-[#f5f5f5] mr-[36px]"
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: formatMessage({ id: 'system.table.title.cpuPercent' }),
            value: cpuPercent,
            suffix: '%',
          }}
          chart={<RingProgress color={['#63DAAB', '#E8EDF3']} {...ringConfig} />}
          className="bg-[#f5f5f5]"
          chartPlacement="left"
        />
      </div>
    </ProCard>
  );
};

export default Resource;
