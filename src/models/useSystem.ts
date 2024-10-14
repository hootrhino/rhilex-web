import { getOsSystem } from '@/services/rhilex/xitongshuju';
import { useRequest } from '@umijs/max';
import { useEffect, useMemo, useState } from 'react';

const useSystem = () => {
  const [isWindows, setWindows] = useState<boolean>(false);
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

    setWindows(hardWareInfo?.osDist?.includes('windows'));
  }, [dataSource]);

  useEffect(() => {
    if (accessToken) {
      run();
    } else {
      cancel();
    }
  }, [accessToken]);

  return {
    dataSource,
    run,
    cancel,
    isWindows,
    activeKey,
    setActiveKey,
  };
};

export default useSystem;
