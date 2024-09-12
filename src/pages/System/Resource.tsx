import { modal } from '@/components/PopupHack';
import ProDescriptions from '@/components/ProDescriptions';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getOsOsRelease, getOsSysConfig } from '@/services/rhilex/xitongshuju';
import { IconFont, toPascalCase } from '@/utils/utils';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DesktopOutlined,
  ForkOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
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
  const { formatMessage, locale } = useIntl();
  const currentTimeRef = useRef(new Date());
  const [resourceData, setResourceData] = useState<Record<string, any>[]>([]);
  const { version, osUpTime, osArch, product, memPercent, diskInfo, cpuPercent } =
    dataSource?.hardWareInfo || {};

  const isEn = locale === 'en-US';

  // 获取系统详情
  const { data: osDetail } = useRequest(() => getOsOsRelease());

  const columns = osDetail
    ? Object.keys(osDetail)?.map((item) => ({ title: item, dataIndex: item, key: item }))
    : [];

  const systemConfigColumns = [
    {
      title: formatMessage({ id: 'system.desc.appId' }),
      dataIndex: 'appId',
    },
    {
      title: formatMessage({ id: 'system.desc.maxQueueSize' }),
      dataIndex: 'maxQueueSize',
    },
    {
      title: formatMessage({ id: 'system.desc.sourceRestartInterval' }),
      dataIndex: 'sourceRestartInterval',
      renderText: (sourceRestartInterval: number) => <UnitValue value={sourceRestartInterval} />,
    },
    {
      title: formatMessage({ id: 'system.desc.gomaxProcs' }),
      dataIndex: 'gomaxProcs',
    },
    {
      title: formatMessage({ id: 'system.desc.enablePProf' }),
      dataIndex: 'enablePProf',
      renderText: (enablePProf: boolean) => (
        <ProTag type={StatusType.BOOL}>{enablePProf || false}</ProTag>
      ),
    },
    {
      title: formatMessage({ id: 'system.desc.enableConsole' }),
      dataIndex: 'enableConsole',
      renderText: (enableConsole: boolean) => (
        <ProTag type={StatusType.BOOL}>{enableConsole || false}</ProTag>
      ),
    },
    {
      title: formatMessage({ id: 'system.desc.appDebugMode' }),
      dataIndex: 'appDebugMode',
      renderText: (appDebugMode: boolean) => (
        <ProTag type={StatusType.BOOL}>{appDebugMode || false}</ProTag>
      ),
    },
    {
      title: formatMessage({ id: 'system.desc.logLevel' }),
      dataIndex: 'logLevel',
    },
    {
      title: formatMessage({ id: 'system.desc.logPath' }),
      dataIndex: 'logPath',
    },
    {
      title: formatMessage({ id: 'system.desc.logMaxSize' }),
      dataIndex: 'logMaxSize',
      renderText: (logMaxSize: number) => <UnitValue value={logMaxSize} unit="MB" />,
    },
    {
      title: formatMessage({ id: 'system.desc.logMaxBackups' }),
      dataIndex: 'logMaxBackups',
    },
    {
      title: formatMessage({ id: 'system.desc.logMaxAge' }),
      dataIndex: 'logMaxAge',
      renderText: (logMaxAge: number) => (
        <UnitValue value={logMaxAge} unit={formatMessage({ id: 'system.time.day' })} />
      ),
    },
    {
      title: formatMessage({ id: 'system.desc.logCompress' }),
      dataIndex: 'logCompress',
      renderText: (logCompress: boolean) => (
        <ProTag
          color={logCompress ? 'success' : 'default'}
          icon={logCompress ? <CheckCircleOutlined /> : <MinusCircleOutlined />}
        >
          {formatMessage({ id: logCompress ? 'status.yes' : 'status.no' })}
        </ProTag>
      ),
    },
    {
      title: formatMessage({ id: 'system.desc.maxKvStoreSize' }),
      dataIndex: 'maxKvStoreSize',
    },
    {
      title: formatMessage({ id: 'system.desc.maxLostCacheSize' }),
      dataIndex: 'maxLostCacheSize',
    },
    {
      title: formatMessage({ id: 'system.desc.extLibs' }),
      dataIndex: 'extLibs',
      renderText: (extLibs: string[]) => extLibs?.join('、'),
    },
    {
      title: formatMessage({ id: 'system.desc.dataSchemaSecret' }),
      dataIndex: 'dataSchemaSecret',
      renderText: (dataSchemaSecret: string[]) => dataSchemaSecret?.join('、'),
    },
  ];

  // 展示系统详情
  const detailConfig = {
    title: formatMessage({ id: 'system.title.resource.detail' }),
    width: 700,
    okText: formatMessage({ id: 'button.close' }),
    content: <ProDescriptions columns={columns} dataSource={osDetail} labelWidth={170} />,
  };

  // 展示系统配置参数
  const showSystemConfig = {
    title: formatMessage({ id: 'system.modal.title.config' }),
    width: 700,
    okText: formatMessage({ id: 'button.close' }),
    content: (
      <ProDescriptions
        columns={systemConfigColumns}
        labelWidth={isEn ? 150 : 170}
        request={async () => {
          const { data } = await getOsSysConfig();

          return Promise.resolve({
            data: data,
            success: true,
          });
        }}
      />
    ),
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
            key="more-info"
            size="small"
            type="primary"
            ghost
            className="ml-[16px]"
            onClick={() => modal.info(detailConfig)}
          >
            {formatMessage({ id: 'system.button.more' })}
          </Button>
          <Button
            key="system-config"
            size="small"
            type="primary"
            className="ml-[16px]"
            onClick={() => modal.info(showSystemConfig)}
          >
            {formatMessage({ id: 'system.button.config' })}
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
