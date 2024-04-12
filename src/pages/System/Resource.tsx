import { modal } from '@/components/PopupHack';
import { getOsOsRelease } from '@/services/rulex/xitongshuju';
import { RingProgress } from '@ant-design/plots';
import { StatisticCard } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { Descriptions, Space } from 'antd';
import Title from './components/Title';

const Resource = () => {
  const { dataSource } = useModel('useSystem');
  const { memPercent, diskInfo, cpuPercent, version, osUpTime, osArch, product } =
    dataSource?.hardWareInfo || {};

  // 获取系统详情
  const { data: osDetail } = useRequest(() => getOsOsRelease({}));

  // 展示系统详情
  const detailConfig = {
    title: '系统详情',
    width: 700,
    autoFocusButton: null,
    content: (
      <Descriptions
        className="w-[500px]"
        column={1}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 180, marginRight: 15 }}
      >
        {osDetail &&
          Object.keys(osDetail)?.map((item) => (
            <Descriptions.Item label={item} key={item}>
              {osDetail[item]}
            </Descriptions.Item>
          ))}
      </Descriptions>
    ),
  };

  // const config = {
  //   width: 200,
  //   height: 60,
  //   data: cpuData,
  //   xField: 'index',
  //   yField: 'value',
  //   smooth: true,
  //   guideLine: [
  //     {
  //       type: 'mean',
  //       text: {
  //         position: 'start',
  //         content: '平均值',
  //         style: {
  //           stroke: 'white',
  //           lineWidth: 2,
  //         },
  //       },
  //     },
  //   ],
  // };

  const ringConfig = {
    height: 60,
    width: 60,
    autoFit: false,
    statistic: false,
    percent: Number(memPercent) / 100,
  } as any;

  return (
    <>
      <Title name="系统资源" />
      <Space split={<StatisticCard.Divider type="vertical" className="h-[12px]" />}>
        <span className="text-[#585858] text-[13px]">产品 {product}</span>
        <span className="text-[#585858] text-[13px]">当前版本 {version || 'v0.0.0'}</span>
        <span className="text-[#585858] text-[13px]">运行时长 {osUpTime}</span>
        <span className="text-[#585858] text-[13px]">
          操作系统 {osArch}
          <a className="pl-[5px]" onClick={() => modal.info(detailConfig)}>
            查看详情
          </a>
        </span>
      </Space>
      <div className="flex justify-between items-center mt-[12px]">
        <StatisticCard
          statistic={{
            title: '内存使用',
            value: memPercent,
            suffix: '%',
          }}
          chart={<RingProgress color={['#5B8FF9', '#E8EDF3']} {...ringConfig} />}
          className="bg-[#f5f5f5] mr-[36px]"
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: '磁盘使用',
            value: diskInfo,
            suffix: '%',
          }}
          chart={<RingProgress color={['#F4664A', '#E8EDF3']} {...ringConfig} />}
          className="bg-[#f5f5f5] mr-[36px]"
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: 'CPU 使用',
            value: cpuPercent,
            suffix: '%',
          }}
          chart={<RingProgress color={['#63DAAB', '#E8EDF3']} {...ringConfig} />}
          className="bg-[#f5f5f5]"
          chartPlacement="left"
        />
      </div>
    </>
  );
};

export default Resource;
