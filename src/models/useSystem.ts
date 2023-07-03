import { getSystem } from '@/services/rulex/xitongshuju';
import { useMemo, useState } from 'react';
import { useRequest } from 'umi';

const useSystem = () => {
  const [cpuData, setCpuData] = useState<any[]>([]);

  const { data, run } = useRequest(() => getSystem(), {
    formatResult: (res) => res.data,
    pollingInterval: 5000,
    onSuccess: (res) => setCpuData([...cpuData, res?.hardWareInfo?.cpuPercent].slice(-40)),
  });

  const dataSource = useMemo(() => data, [data]);

  return { dataSource, run, data, cpuData };
};

export default useSystem;
