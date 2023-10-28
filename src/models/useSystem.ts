import { getOsSystem } from '@/services/rulex/xitongshuju';
import { useMemo, useState } from 'react';
import { useRequest } from 'umi';

const useSystem = () => {
  const [cpuData, setCpuData] = useState<any[]>([]);
  const [isWindows, setWindows] = useState<boolean>(false);

  const { data, run } = useRequest(() => getOsSystem(), {
    formatResult: (res) => res.data,
    pollingInterval: 5000,
    onSuccess: (res) => {
      setCpuData([...cpuData, res?.hardWareInfo?.cpuPercent].slice(-40));
      setWindows(res?.hardWareInfo?.osDist?.includes('windows'));
    },
  });

  const dataSource = useMemo(() => data, [data]);

  return { dataSource, run, data, cpuData, isWindows };
};

export default useSystem;
