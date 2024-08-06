import { modal } from '@/components/PopupHack';
import ProDescriptions from '@/components/ProDescriptions';
import { getOsOsRelease } from '@/services/rulex/xitongshuju';
import { Line } from '@ant-design/plots';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Space } from 'antd';

const Resource = () => {
  const { dataSource, resourceData } = useModel('useSystem');
  const { formatMessage } = useIntl();
  const { version, osUpTime, osArch, product } = dataSource?.hardWareInfo || {};

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

  const getTextAnnotationConfig = () => {
    const maxMemory = resourceData
      ?.filter((item) => item.category === 'memory')
      ?.reduce((max, current) => {
        return max.value > current.value ? max : current;
      });
    const maxDisk = resourceData
      ?.filter((item) => item.category === 'disk')
      ?.reduce((max, current) => {
        return max.value > current.value ? max : current;
      });
    const maxCpu = resourceData
      ?.filter((item) => item.category === 'cpu')
      ?.reduce((max, current) => {
        return max.value > current.value ? max : current;
      });

    return [
      {
        data: [maxMemory.time, maxMemory.value],
        ...commonConfig(`Max Memory ${maxMemory.value}%`),
      },
      {
        data: [maxDisk.time, maxDisk.value],
        ...commonConfig(`Max Disk ${maxDisk.value}%`),
      },
      {
        data: [maxCpu.time, maxCpu.value],
        ...commonConfig(`Max CPU ${maxCpu.value}%`, 70, -10),
      },
    ];
  };

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
      ...getTextAnnotationConfig(),
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
                <span className="text-[rgba(0,0,0,0.75)] text-[16px] pl-[5px]">{value}</span>
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
