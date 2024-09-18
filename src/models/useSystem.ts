import { getOsSystem } from '@/services/rhilex/xitongshuju';
import { Product } from '@/utils/enum';
import { useRequest } from '@umijs/max';
import { useEffect, useMemo, useState } from 'react';

const useSystem = () => {
  const [isWindows, setWindows] = useState<boolean>(false);
  const [product, setProduct] = useState<string>(Product.COMMON);
  const [activeKey, setActiveKey] = useState<string>('resource');

  const accessToken = localStorage.getItem('accessToken');

  const { data, run, cancel } = useRequest(() => getOsSystem(), {
    manual: true,
    pollingInterval: 5000,
  });

  const dataSource = useMemo(() => data, [data]);

  useEffect(() => {
    if (!dataSource) return;
    const { hardWareInfo } = dataSource;
    const { osDist, product } = hardWareInfo;

    setWindows(osDist?.includes('windows'));
    setProduct(product);
  }, [dataSource]);

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
