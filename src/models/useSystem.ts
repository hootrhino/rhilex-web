import { getOsSystem } from '@/services/rhilex/xitongshuju';
import { Product } from '@/utils/enum';
import { useRequest } from '@umijs/max';
import { useEffect, useMemo, useState } from 'react';

const allMenu = [
  'dashboard',
  'device',
  'schema',
  'dataRepository',
  'inend',
  'outend',
  'appStack',
  'plugin',
  'communicationModule',
  'system',
];

export const ProductMenuAccess = {
  [Product.COMMON]: allMenu,
  [Product.EN6400]: allMenu.filter((menu) => !['plugins'].includes(menu)),
  [Product.RASPI4B]: allMenu,
  [Product.RHILEXG1]: allMenu,
};

const useSystem = () => {
  const [isWindows, setWindows] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>(Product.COMMON);
  const [activeKey, setActiveKey] = useState<string>('resource');

  const accessToken = localStorage.getItem('accessToken');

  const { data, run, cancel } = useRequest(() => getOsSystem(), {
    manual: true,
    pollingInterval: 5000,
    formatResult: (res) => res.data,
    onSuccess: (res) => {
      if (!res) return;
      const { osDist } = res?.hardWareInfo;
      setWindows(osDist?.includes('windows'));
      setProduct(res?.hardWareInfo?.product);
    },
  });

  const dataSource = useMemo(() => data, [data]);

  useEffect(() => {
    if (accessToken) {
      run();
    } else {
      cancel();
    }
  }, []);

  return {
    dataSource,
    run,
    cancel,
    isWindows,
    product,
    activeKey,
    setActiveKey,
  };
};

export default useSystem;
