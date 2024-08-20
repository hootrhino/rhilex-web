import { modal } from '@/components/PopupHack';
import ProDescriptions from '@/components/ProDescriptions';
import { getOsOsRelease } from '@/services/rulex/xitongshuju';
import { toPascalCase } from '@/utils/utils';
import { Line } from '@ant-design/plots';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Space } from 'antd';
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

  const extraData = [
    {
      label: formatMessage({ id: 'system.table.title.product' }),
      value: product || '-',
      key: 'product',
    },
    {
      label: formatMessage({ id: 'system.table.title.version' }),
      value: version || 'v0.0.0',
      key: 'version',
    },
    {
      label: formatMessage({ id: 'system.table.title.osUpTime' }),
      value: osUpTime || '-',
      key: 'osUpTime',
    },
    {
      label: formatMessage({ id: 'system.table.title.osArch' }),
      value: osArch || '-',
      key: 'osArch',
    },
  ];

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
          <Space split={<StatisticCard.Divider type="vertical" className="h-[12px]" />}>
            {extraData.map(({ key, label, value }) => (
              <span key={key}>
                <span className="text-[#585858] text-[12px]">{label}</span>
                <span className="text-[rgba(0,0,0,0.9)] text-[14px] pl-[5px]">{value}</span>
              </span>
            ))}
          </Space>
          <Button
            size="small"
            type="primary"
            ghost
            className="ml-[16px]"
            onClick={() => modal.info(detailConfig)}
          >
            {formatMessage({ id: 'button.checkDetail' })}
          </Button>
        </>
      }
    >
      <Line {...config} containerStyle={{ minHeight: 560 }} />
    </ProCard>
  );
};

export default Resource;
