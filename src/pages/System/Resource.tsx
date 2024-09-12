import { modal } from '@/components/PopupHack';
import ProDescriptions from '@/components/ProDescriptions';
import { getOsOsRelease } from '@/services/rhilex/xitongshuju';
import { IconFont, toPascalCase } from '@/utils/utils';
import { ClockCircleOutlined, DesktopOutlined, ForkOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/plots';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';

enum Category {
  MEMORY = 'memory',
  DISK = 'disk',
  CPU = 'cpu',
}

const Resource = () => {
  const { dataSource } = useModel('useSystem');
  const { formatMessage } = useIntl();
  const currentTimeRef = useRef(new Date());
  const [resourceData, setResourceData] = useState<Record<string, any>[]>([]);
  const { version, osUpTime, osArch, product, memPercent, diskInfo, cpuPercent } =
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

  const commonConfig = (text: string, dx?: number, dy?: number) => {
    return {
      type: 'text',
      style: {
        text,
        wordWrap: true,
        wordWrapWidth: 164,
        dx: dx || -140,
        dy: dy || -30,
        fill: '#2C3542',
        fillOpacity: 0.65,
        fontSize: 10,
        background: true,
        backgroundRadius: 2,
        connector: true,
        startMarker: true,
        startMarkerFill: '#2C3542',
        startMarkerFillOpacity: 0.65,
      },
      tooltip: false,
    };
  };

  const getMaxData = (category: Category) => {
    const maxData = resourceData
      ?.filter((item) => item.category === category)
      ?.reduce((max, current) => (max.value > current.value ? max : current), {
        time: currentTimeRef.current,
        value: 0,
      });

    return {
      data: [maxData.time, maxData.value],
      text: `Max ${toPascalCase(category)} ${maxData.value}%`,
    };
  };

  const getTextAnnotationConfig = [
    {
      data: getMaxData(Category.MEMORY).data,
      ...commonConfig(getMaxData(Category.MEMORY).text),
    },
    {
      data: getMaxData(Category.DISK).data,
      ...commonConfig(getMaxData(Category.DISK).text),
    },
    {
      data: getMaxData(Category.CPU).data,
      ...commonConfig(getMaxData(Category.CPU).text, 70, -10),
    },
  ];

  const config = {
    data: resourceData,
    xField: 'time',
    yField: 'value',
    colorField: 'category',
    tooltip: { channel: 'y', valueFormatter: (d: number) => `${d}%` },
    animate: { enter: { type: 'pathIn' } },
    axis: {
      y: { labelFormatter: (datum: number) => `${datum}%` },
      x: {
        label: null,
        tick: false,
      },
    },
    scale: {
      y: { tickCount: 40 },
    },
    label: {
      text: 'category',
      selector: 'last',
      dx: -22,
      dy: -10,
      connector: true,
      textAlign: 'right',
      textBaseline: 'bottom',
      style: {
        fontSize: 10,
      },
    },
    annotations: [
      {
        type: 'lineY',
        yField: 100,
        label: {
          text: 'Max',
          position: 'right',
          textBaseline: 'bottom',
          style: { fill: 'red' },
        },
        style: { stroke: 'red', lineDash: [2, 2] },
      },
      ...getTextAnnotationConfig,
    ],
  };

  const formatVersion = () => {
    if (!version) return;
    const v = version?.split('-');

    return v[0] || 'v0.0.0';
  };

  const formatTime = () => {
    if (osUpTime) {
      return osUpTime
        .replace(/days/g, formatMessage({ id: 'system.time.day' }))
        .replace(/Hours/g, formatMessage({ id: 'system.time.hour' }))
        .replace(/Minutes/g, formatMessage({ id: 'system.time.minute' }))
        .replace(/Seconds/g, formatMessage({ id: 'system.time.second' }));
    }

    return '-';
  };

  useEffect(() => {
    currentTimeRef.current = new Date();
    const time = currentTimeRef.current;
    const defaultValue = 0;

    const newData = [
      {
        value: memPercent || defaultValue,
        category: 'memory',
        time,
      },
      {
        value: diskInfo || defaultValue,
        category: 'disk',
        time,
      },
      {
        value: cpuPercent || defaultValue,
        category: 'cpu',
        time,
      },
    ];

    setResourceData([...resourceData, ...newData].slice(-100));
  }, [memPercent, diskInfo, cpuPercent]);

  return (
    <ProCard
      headStyle={{ flexWrap: 'wrap', paddingBlock: 0 }}
      className="h-full"
      title={formatMessage({ id: 'system.tab.resource' })}
      extra={
        <>
          <Button
            size="small"
            type="primary"
            ghost
            className="ml-[16px]"
            onClick={() => modal.info(detailConfig)}
          >
            {formatMessage({ id: 'system.button.more' })}
          </Button>
        </>
      }
    >
      <StatisticCard.Group direction="row" className="mb-[24px]">
        <StatisticCard
          statistic={{
            title: formatMessage({ id: 'system.table.title.product' }),
            value: product,
            valueStyle: { color: '#1677ff' },
            prefix: <IconFont type="icon-product" />,
          }}
        />
        <StatisticCard.Divider type="vertical" />
        <StatisticCard
          statistic={{
            title: formatMessage({ id: 'system.table.title.version' }),
            value: formatVersion(),
            valueStyle: { color: '#3f8600' },
            prefix: <ForkOutlined />,
          }}
        />
        <StatisticCard.Divider type="vertical" />
        <StatisticCard
          statistic={{
            title: formatMessage({ id: 'system.table.title.osUpTime' }),
            value: formatTime(),
            prefix: <ClockCircleOutlined />,
          }}
        />
        <StatisticCard.Divider type="vertical" />
        <StatisticCard
          statistic={{
            title: formatMessage({ id: 'system.table.title.osArch' }),
            value: osArch,
            prefix: <DesktopOutlined />,
          }}
        />
      </StatisticCard.Group>
      <Line {...config} containerStyle={{ minHeight: 560 }} />
    </ProCard>
  );
};

export default Resource;
