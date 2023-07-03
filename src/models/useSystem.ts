import { getSystem } from '@/services/rulex/xitongshuju';
import { useMemo } from 'react';
import { useRequest } from 'umi';

const useSystem = () => {
  const { data, run } = useRequest(() => getSystem(), {
    formatResult: (res) => res.data,
    pollingInterval: 5000,
  });

  const dataSource = useMemo(() => data, [data]);

  return { dataSource, run, data };
};

export default useSystem;
