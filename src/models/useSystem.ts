import { getSettingsCtrlTree } from '@/services/rulex/wangluopeizhi';
import { getOsSystem } from '@/services/rulex/xitongshuju';
import { Product } from '@/utils/enum';
import { useMemo, useState } from 'react';
import { useRequest } from 'umi';

const allMenu = [
  'dashboard',
  'device',
  'schema',
  'dataCenter',
  'inend',
  'outend',
  'appStack',
  'extend',
  'plugins',
  'port',
  'system',
];

export const ProductMenuAccess = {
  [Product.COMMON]: allMenu,
  [Product.EN6400]: allMenu.filter((menu) => !['extend', 'plugins'].includes(menu)),
  [Product.RASPI4B]: allMenu,
  [Product.RHILEXG1]: allMenu,
};

const useSystem = () => {
  const [cpuData, setCpuData] = useState<any[]>([]);
  const [isWindows, setWindows] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>(Product.COMMON);
  const [activeKey, setActiveKey] = useState<string>('resource');
  const [hasWifi, setwifi] = useState<boolean>(false);
  const [hasRoute, setRoute] = useState<boolean>(false);
  const [interfaceOption, setInterfaceOption] = useState<OptionItem[]>([]);
  const accessToken = localStorage.getItem('accessToken');

  const { data, run, cancel } = useRequest(() => getOsSystem(), {
    formatResult: (res) => res.data,
    pollingInterval: 5000,
    // ready: !!accessToken,
    onSuccess: (res) => {
      if (!res) return;
      const { cpuPercent, osDist } = res?.hardWareInfo;
      setCpuData([...cpuData, cpuPercent].slice(-40));
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

  return {
    dataSource,
    run,
    cancel,
    data,
    cpuData,
    isWindows,
    product,
    activeKey,
    setActiveKey,
    hasWifi,
    hasRoute,
    interfaceOption,
  };
};

export default useSystem;
