import { getDatacenterSecret } from '@/services/rulex/shujuzhongxin';
import { getSettingsCtrlTree } from '@/services/rulex/wangluopeizhi';
import { getOsSystem } from '@/services/rulex/xitongshuju';
import { Product } from '@/utils/enum';
import { useEffect, useMemo, useState } from 'react';
import { useRequest } from 'umi';

const allMenu = [
  'dashboard',
  'device',
  'schema',
  'dataRepository',
  'inend',
  'outend',
  'appStack',
  'extend',
  'plugin',
  'system',
];

export const ProductMenuAccess = {
  [Product.COMMON]: allMenu,
  [Product.EN6400]: allMenu.filter((menu) => !['extend', 'plugins'].includes(menu)),
  [Product.RASPI4B]: allMenu,
  [Product.RHILEXG1]: allMenu,
};

const useSystem = () => {
  const [isWindows, setWindows] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>(Product.COMMON);
  const [activeKey, setActiveKey] = useState<string>('resource');
  const [hasWifi, setwifi] = useState<boolean>(false);
  const [hasRoute, setRoute] = useState<boolean>(false);
  const [interfaceOption, setInterfaceOption] = useState<OptionItem[]>([]);
  const [resourceData, setResourceData] = useState<Record<string, any>[]>([]);

  const accessToken = localStorage.getItem('accessToken');

  const { data, run, cancel } = useRequest(() => getOsSystem(), {
    formatResult: (res) => res.data,
    pollingInterval: 5000,
    // ready: !!accessToken,
    onSuccess: (res) => {
      if (!res) return;
      const { osDist } = res?.hardWareInfo;
      setWindows(osDist?.includes('windows'));
      setProduct(res?.hardWareInfo?.product);
    },
  });

  useRequest(() => getSettingsCtrlTree(), {
    ready: !!accessToken,
    onSuccess: (res) => {
      if (!res) return;
      const { wlan, soft_router } = res;
      const newOption =
        res?.network && res?.network.length > 0
          ? res?.network?.map((item) => ({ label: item?.name || '', value: item?.name || '' }))
          : [];
      setwifi((wlan && wlan.length > 0) || false);
      setRoute((soft_router && soft_router.length > 0) || false);
      setInterfaceOption(newOption);
    },
  });

  const dataSource = useMemo(() => data, [data]);

  const { data: DataCenterSecret } = useRequest(() => getDatacenterSecret(), {
    ready: !!accessToken,
  });

  useEffect(() => {
    const { memPercent, diskInfo, cpuPercent } = dataSource?.hardWareInfo || {};

    if (activeKey === 'resource' && window.location.pathname === '/system') {
      const newData = [
        {
          value: memPercent || 0,
          category: 'memory',
          time: new Date(),
        },
        {
          value: diskInfo || 0,
          category: 'disk',
          time: new Date(),
        },
        {
          value: cpuPercent || 0,
          category: 'cpu',
          time: new Date(),
        },
      ];

      setResourceData([...resourceData, ...newData].slice(-100));
    } else {
      setResourceData([
        { time: new Date(), value: 0, category: 'memory' },
        { time: new Date(), value: 0, category: 'disk' },
        { time: new Date(), value: 0, category: 'cpu' },
      ]);
    }
  }, [
    dataSource?.hardWareInfo?.memPercent,
    dataSource?.hardWareInfo?.diskInfo,
    dataSource?.hardWareInfo?.cpuPercent,
    activeKey,
  ]);

  return {
    dataSource,
    run,
    cancel,
    data,
    resourceData,
    isWindows,
    product,
    activeKey,
    setActiveKey,
    hasWifi,
    hasRoute,
    interfaceOption,
    secret: DataCenterSecret?.secret,
  };
};

export default useSystem;
