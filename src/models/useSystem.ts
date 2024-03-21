import { getOsSystem } from '@/services/rulex/xitongshuju';
import { useMemo, useState } from 'react';
import { useRequest } from 'umi';

const useSystem = () => {
  const [cpuData, setCpuData] = useState<any[]>([]);
  const [isWindows, setWindows] = useState<boolean>(false);
  const [isH3, setH3] = useState<boolean>(false);

  const { data, run, cancel } = useRequest(() => getOsSystem(), {
    formatResult: (res) => res.data,
    pollingInterval: 5000,
    onSuccess: (res) => {
      if (!res) return;
      const { cpuPercent, osDist, product } = res?.hardWareInfo;
      setCpuData([...cpuData, cpuPercent].slice(-40));
      setWindows(osDist?.includes('windows'));
      setH3(product === 'EEKITH3');
    },
  });

  const dataSource = useMemo(() => data, [data]);

  return { dataSource, run, cancel, data, cpuData, isWindows, isH3 };
};

export default useSystem;
